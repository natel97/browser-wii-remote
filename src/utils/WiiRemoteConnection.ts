import { HID } from "../types/HID";
import { WiiRemoteReportModes } from "../wii-remote/Parser/Report/WiiRemoteReport";
import WiiRemote from "../wii-remote/WiiRemote";

export const ConnectToWiiRemote = async function (
  showBluetoothDialog = true,
  connectionMode: WiiRemoteReportModes = WiiRemoteReportModes.CORE_BUTTONS_AND_ACCEL
) {
  if (showBluetoothDialog) {
    const device = await getWiiRemote();
    await device.gatt?.connect();
  }

  return () => () =>
    connectViaHID().then((device) =>
      device.open().then(() => new WiiRemote(device, connectionMode))
    );
};

export const navigatorIncludesAPI = (name: string) => name in navigator;

const getWiiRemote = async () => {
  if (!navigatorIncludesAPI("bluetooth")) {
    throw new Error("Bluetooth API Not Supported");
  }
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: "Nintendo" }],
  });

  return device;
};

const connectViaHID = async (vendorId = 0x057e, deviceIndex = 0) => {
  const nav: any = navigator; // bypass typescript missing experimental API
  if (!navigatorIncludesAPI("hid")) {
    throw new Error("HID APIs not supported");
  }

  const device: HID[] = await nav.hid.requestDevice({
    filters: [{ vendorId }],
  });

  if (!device || !device[deviceIndex]) {
    throw new Error("HID Not Listed");
  }

  return device[deviceIndex];
};
