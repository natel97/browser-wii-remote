import { getAxisListeners } from "../Feature/Accelometer";
import {
  parseFirstButtonByte,
  parseSecondButtonByte,
} from "../Feature/Buttons";
import { WiiRemoteState } from "../helpers";
import WiiRemoteReport, { WiiRemoteReportModes } from "./WiiRemoteReport";

export default class WiiRemoteButtonsAndAccel implements WiiRemoteReport {
  reportId = WiiRemoteReportModes.CORE_BUTTONS_AND_ACCEL;
  parsers = [
    ...parseFirstButtonByte(),
    ...parseSecondButtonByte(),
    ...getAxisListeners(),
  ];

  parseInput(report: Uint8Array): Partial<WiiRemoteState> {
    const state: any = {};
    this.parsers.forEach((parser) => {
      state[parser.type] = parser.value(report);
    });
    return state;
  }

  initializeMode() {
    // No special initialization needed for this functionality
    // In the future, maybe a calibration process?
    console.info("init");
  }
}
