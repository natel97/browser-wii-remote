import { WiiRemoteStateKeys } from "../../../types/TypeHelpers";

export function getBitInByte(byte: number, flag: number): boolean {
  return Boolean(byte & flag);
}

export function parseBit(bitIndex: number, mask: number) {
  return function (input: Uint8Array) {
    return getBitInByte(input[bitIndex], mask);
  };
}

export enum WiiRemoteButtonBits {
  TWO = 0x01,
  ONE = 0x02,
  B = 0x04,
  A = 0x08,
  MINUS = 0x10,
  HOME = 0x80,
}

export enum FirstBitWiiRemoteButtons {
  DPAD_LEFT = 0x01,
  DPAD_RIGHT = 0x02,
  DPAD_DOWN = 0x04,
  DPAD_UP = 0x08,
  PLUS = 0x10,
}

export function parseFirstButtonByte(byteIndex = 0) {
  return [
    {
      type: WiiRemoteStateKeys.btn_plus,
      value: parseBit(byteIndex, FirstBitWiiRemoteButtons.PLUS),
    },
    {
      type: WiiRemoteStateKeys.dpad_down,
      value: parseBit(byteIndex, FirstBitWiiRemoteButtons.DPAD_DOWN),
    },
    {
      type: WiiRemoteStateKeys.dpad_left,
      value: parseBit(byteIndex, FirstBitWiiRemoteButtons.DPAD_LEFT),
    },
    {
      type: WiiRemoteStateKeys.dpad_right,
      value: parseBit(byteIndex, FirstBitWiiRemoteButtons.DPAD_RIGHT),
    },
    {
      type: WiiRemoteStateKeys.dpad_up,
      value: parseBit(byteIndex, FirstBitWiiRemoteButtons.DPAD_UP),
    },
  ];
}

export function parseSecondButtonByte(byteIndex = 1) {
  return [
    {
      type: WiiRemoteStateKeys.btn_a,
      value: parseBit(byteIndex, WiiRemoteButtonBits.A),
    },
    {
      type: WiiRemoteStateKeys.btn_b,
      value: parseBit(byteIndex, WiiRemoteButtonBits.B),
    },
    {
      type: WiiRemoteStateKeys.btn_one,
      value: parseBit(byteIndex, WiiRemoteButtonBits.ONE),
    },
    {
      type: WiiRemoteStateKeys.btn_two,
      value: parseBit(byteIndex, WiiRemoteButtonBits.TWO),
    },
    {
      type: WiiRemoteStateKeys.btn_minus,
      value: parseBit(byteIndex, WiiRemoteButtonBits.MINUS),
    },
    {
      type: WiiRemoteStateKeys.btn_home,
      value: parseBit(byteIndex, WiiRemoteButtonBits.HOME),
    },
  ];
}

export function initDefaultButtonState(): {
  [P in WiiRemoteStateKeys]: boolean;
} {
  const state: any = {};
  Object.values(WiiRemoteStateKeys).map((key) => (state[key] = false));
  return state;
}
