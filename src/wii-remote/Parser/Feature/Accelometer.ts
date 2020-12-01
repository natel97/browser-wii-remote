import {
  WiiRemoteInputTransformer,
  WiiRemoteStateAccel,
} from "../../../types/TypeHelpers";

export function parseAxis(index: number) {
  return function (byte: Uint8Array) {
    return byte[index];
  };
}

export function getAxisListeners(startIndex = 0): WiiRemoteInputTransformer[] {
  return [
    {
      type: WiiRemoteStateAccel.X,
      value: parseAxis(startIndex + 2),
    },
    {
      type: WiiRemoteStateAccel.Y,
      value: parseAxis(startIndex + 3),
    },
    {
      type: WiiRemoteStateAccel.Z,
      value: parseAxis(startIndex + 4),
    },
  ];
}

export function initDefaultAccelState(): {
  [P in WiiRemoteStateAccel]: number;
} {
  const state: any = {};
  Object.values(WiiRemoteStateAccel).map((key) => (state[key] = 0));
  return state;
}
