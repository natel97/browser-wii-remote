import {
  parseFirstButtonByte,
  parseSecondButtonByte,
} from "../Feature/Buttons";
import { WiiRemoteState } from "../helpers";
import WiiRemoteReport, { WiiRemoteReportModes } from "./WiiRemoteReport";

export default class WiiRemoteButtons implements WiiRemoteReport {
  reportId = WiiRemoteReportModes.CORE_BUTTONS;
  parsers = [...parseFirstButtonByte(), ...parseSecondButtonByte()];

  parseInput(report: Uint8Array): Partial<WiiRemoteState> {
    const state: Partial<WiiRemoteState> = {};
    this.parsers.forEach((parser) => {
      state[parser.type] = parser.value(report);
    });
    return state;
  }

  initializeMode() {
    // No special initialization needed for this functionality
    console.info("init");
  }
}
