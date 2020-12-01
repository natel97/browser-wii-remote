import { HID } from "../types/HID";

export enum LEDS {
  ONE = 0x10,
  TWO = 0x20,
  THREE = 0x40,
  FOUR = 0x80,
}

const FEEDBACK_REPORT_ID = 0x11;

export default class WiiRemoteFeedback {
  state: WiiRemoteFeedbackState;

  constructor(private rawDevice: HID) {
    this.state = new WiiRemoteFeedbackState();
    this.state.setLed(LEDS.ONE, true);
  }

  setLed(led: LEDS, isSet: boolean) {
    this.state.setLed(led, isSet);
    const byte = this.state.getStateCode();
    const buffer = new Int8Array([byte]);
    this.rawDevice.sendReport(FEEDBACK_REPORT_ID, buffer);
  }

  setRumble(active: boolean) {
    this.state.setRumble(active);
    const byte = this.state.getStateCode();
    const buffer = new Int8Array([byte]);
    this.rawDevice.sendReport(FEEDBACK_REPORT_ID, buffer);
  }
}

class WiiRemoteFeedbackState {
  leds: { [P in LEDS]: boolean } = {
    "16": false,
    "32": false,
    "64": false,
    "128": false,
  };
  rumble: boolean = false;

  setLed(led: LEDS, set: boolean) {
    this.leds[led] = set;
  }
  setRumble(set: boolean) {
    this.rumble = set;
  }

  getStateCode() {
    return (
      +this.leds[LEDS.ONE] * LEDS.ONE +
      +this.leds[LEDS.TWO] * LEDS.TWO +
      +this.leds[LEDS.THREE] * LEDS.THREE +
      +this.leds[LEDS.FOUR] * LEDS.FOUR +
      +this.rumble
    );
  }
}
