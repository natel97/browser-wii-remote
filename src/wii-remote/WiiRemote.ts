import { HID } from "../types/HID";
import WiiRemoteParser from "./Parser";
import {
  WiiRemoteStateDiff,
  WiiRemoteActions,
  WiiRemoteState,
} from "./Parser/helpers";
import { WiiRemoteReportModes } from "./Parser/Report/WiiRemoteReport";
import { WiiRemoteEventHandler } from "./WiiRemoteEventHandler";
import WiiRemoteFeedback, { LEDS } from "./WiiRemoteFeedback";

export default class WiiRemote {
  private WiiRemoteEventHandler: WiiRemoteEventHandler;
  private WiiRemoteDataParser: WiiRemoteParser;
  private Feedback: WiiRemoteFeedback;

  constructor(
    private rawDevice: HID,
    public reportMode: WiiRemoteReportModes = WiiRemoteReportModes.CORE_BUTTONS
  ) {
    this.WiiRemoteEventHandler = new WiiRemoteEventHandler();
    this.WiiRemoteDataParser = new WiiRemoteParser(
      rawDevice,
      reportMode,
      this.WiiRemoteEventHandler
    );
    this.Feedback = new WiiRemoteFeedback(rawDevice);
  }

  addListener(
    key: WiiRemoteActions,
    callback: (event: WiiRemoteStateDiff, state: Partial<WiiRemoteState>) => any
  ) {
    // if (Object.keys({WiiRemoteActions}).includes(key))
    this.WiiRemoteEventHandler.addListener(key, callback);
  }

  removeListener(
    key: WiiRemoteActions,
    callback: (event: WiiRemoteStateDiff, state: Partial<WiiRemoteState>) => any
  ) {
    // if (Object.keys(WiiRemoteActions).includes(key))
    this.WiiRemoteEventHandler.removeListener(key, callback);
  }

  setReportMode(mode: WiiRemoteReportModes) {
    this.WiiRemoteDataParser.setReportMode(mode);
    this.reportMode = mode;
  }

  setRumble(active: boolean) {
    this.Feedback.setRumble(active);
  }

  setLed(led: LEDS, active: boolean) {
    this.Feedback.setLed(led, active);
  }
}
