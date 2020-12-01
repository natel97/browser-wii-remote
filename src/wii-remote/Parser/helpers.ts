import {
  WiiRemoteStateAccel,
  WiiRemoteStateKeys,
} from "../../types/TypeHelpers";

export type WiiRemoteActions = WiiRemoteStateAccel | WiiRemoteStateKeys;

export type WiiRemoteState = {
  [P in WiiRemoteStateAccel | WiiRemoteStateKeys]: number | boolean;
};

export type WiiRemoteEvent = {
  key: WiiRemoteStateAccel | WiiRemoteStateKeys;
  previous: number | boolean;
  current: number | boolean;
  state: WiiRemoteStateDiff;
};

export type WiiRemoteStateDiff = {
  key: WiiRemoteStateKeys | WiiRemoteStateAccel;
  previous: number | boolean;
  current: number | boolean | undefined;
};

export type ListerContainer = {
  [P in WiiRemoteStateKeys | WiiRemoteStateAccel]: Array<
    (event: WiiRemoteStateDiff, wiiRemoteState: Partial<WiiRemoteState>) => any
  >;
};

export function initDefaultState() {
  return Object.keys({ ...WiiRemoteStateAccel, ...WiiRemoteStateKeys }).map(
    (key) => key
  );
}

export function diffState(
  previousState: Partial<WiiRemoteState>,
  currentState: Partial<WiiRemoteState>
): Array<WiiRemoteStateDiff> {
  const diff = Object.keys(previousState)
    .filter(
      (x) =>
        previousState[x as WiiRemoteStateAccel | WiiRemoteStateKeys] !==
        currentState[x as WiiRemoteStateAccel | WiiRemoteStateKeys]
    )
    .map((key: string) => ({
      key: key as WiiRemoteStateAccel | WiiRemoteStateKeys,
      previous: previousState[key as WiiRemoteStateAccel | WiiRemoteStateKeys],
      current: currentState[key as WiiRemoteStateAccel | WiiRemoteStateKeys],
    }));

  return diff as Array<WiiRemoteStateDiff>;
}
