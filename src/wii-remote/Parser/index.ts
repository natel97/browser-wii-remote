import { HID } from "../../types/HID";
import { WiiRemoteEventHandler } from "../WiiRemoteEventHandler";
import { diffState, WiiRemoteState } from "./helpers";
import WiiRemoteButtons from "./Report/WiiRemoteButtons";
import WiiRemoteButtonsAndAccel from "./Report/WiiRemoteButtonsAndAccel";
import WiiRemoteReport, {
  WiiRemoteReportModes,
} from "./Report/WiiRemoteReport";

export default class WiiRemoteParser {
  private loadedParsers: WiiRemoteReport[] = [];
  private previousState: Partial<WiiRemoteState> = {};

  constructor(
    private rawDevice: HID,
    private reportMode: WiiRemoteReportModes = WiiRemoteReportModes.CORE_BUTTONS,
    private eventHandler: WiiRemoteEventHandler
  ) {
    this.loadedParsers.push(
      new WiiRemoteButtons(),
      new WiiRemoteButtonsAndAccel()
    );

    rawDevice.oninputreport = this.handleInputReport.bind(this);
    this.setReportMode(reportMode);
  }

  setReportMode(
    mode: WiiRemoteReportModes = WiiRemoteReportModes.CORE_BUTTONS
  ) {
    this.rawDevice.sendReport(0x12, new Uint8Array([0x00, mode]));
    this.reportMode = mode;
    this.loadedParsers
      .find((parser) => parser.reportId === mode)
      ?.initializeMode();
  }

  public handleInputReport(report: any) {
    const reportId = report.reportId;
    const inputBytes = new Uint8Array(report.data.buffer);

    if (reportId === 0x20) {
      this.setReportMode(this.reportMode);
      return;
    }

    const parser = this.loadedParsers.find(
      (parser) => parser.reportId === reportId
    );

    if (!parser) {
      console.error(
        `Parser could not recognize report: ${reportId}`,
        inputBytes
      );
      return;
    }

    const state = parser.parseInput(inputBytes);
    const diff = diffState(this.previousState, state);
    this.eventHandler.triggerEvents(diff, state);
    this.previousState = state;
  }
}
