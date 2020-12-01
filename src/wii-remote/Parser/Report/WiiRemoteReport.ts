import { WiiRemoteState } from "../helpers";

export enum WiiRemoteReportModes {
  CORE_BUTTONS = 0x30,
  CORE_BUTTONS_AND_ACCEL = 0x31,
  CORE_BUTTONS_AND_8_EXTENSION_BYTES = 0x32,
  CORE_BUTTONS_ACCEL_IR = 0x33,
  CORE_BUTTONS_AND_19_EXTENSION_BYTES = 0x34,
  CORE_BUTTONS_ACCEL_16_EXTENSION_BYTES = 0x35,
}

export default interface WiiRemoteReport {
  reportId: WiiRemoteReportModes;
  parseInput: (report: Uint8Array) => Partial<WiiRemoteState>;
  initializeMode: () => void;
}
