import { WiiRemoteStateAccel, WiiRemoteStateKeys } from "../types/TypeHelpers";
import {
  ListerContainer,
  WiiRemoteState,
  WiiRemoteStateDiff,
} from "./Parser/helpers";

export class WiiRemoteEventHandler {
  private listeners: ListerContainer;

  constructor() {
    const obj: any = {};
    Object.values({ ...WiiRemoteStateKeys, ...WiiRemoteStateAccel }).map(
      (x) => (obj[x] = [])
    );
    this.listeners = obj;
  }

  triggerEvents(
    diff: Array<WiiRemoteStateDiff>,
    state: Partial<WiiRemoteState>
  ) {
    diff.forEach((change) =>
      this.listeners[change.key].forEach((callback) => callback(change, state))
    );
  }

  addListener(
    key: WiiRemoteStateAccel | WiiRemoteStateKeys,
    callback: (event: WiiRemoteStateDiff, state: Partial<WiiRemoteState>) => any
  ) {
    if (!this.listeners[key]) {
      console.error(key, " is not a valid event listener type");
      return;
    }
    this.listeners[key].push(callback);
  }

  removeListener(
    key: WiiRemoteStateAccel | WiiRemoteStateKeys,
    callback: (event: WiiRemoteStateDiff, state: Partial<WiiRemoteState>) => any
  ) {
    if (!this.listeners[key]) {
      console.error(key, " is not a valid event listener type");
      return;
    }
    this.listeners[key] = this.listeners[key].filter(
      (event) => event !== callback
    );
  }
}
