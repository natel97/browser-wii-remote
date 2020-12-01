export enum WiiRemoteStateKeys {
  btn_a = "button_a",
  btn_b = "button_b",
  btn_plus = "button_plus",
  btn_minus = "button_minus",
  btn_home = "button_home",
  btn_one = "button_one",
  btn_two = "button_two",
  dpad_left = "dpad_left",
  dpad_right = "dpad_right",
  dpad_up = "dpad_up",
  dpad_down = "dpad_down",
}

export enum WiiRemoteStateAccel {
  X = "AXIS_X",
  Y = "AXIS_Y",
  Z = "AXIS_Z",
}

export type TransformStateCallback = (data: Uint8Array) => any;

export type WiiRemoteInputTransformer = {
  type: WiiRemoteStateKeys | WiiRemoteStateAccel;
  value: TransformStateCallback;
};
