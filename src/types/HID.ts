export type HID = {
  oninputreport: any;
  opened: boolean;
  productId: number;
  productName: string;
  vendorId: number;
  collections: any[];
  open: () => Promise<any>;
  close: () => Promise<any>;
  sendReport: (reportId: number, data: ArrayBuffer) => Promise<any>;
  sendFeatureReport: (reportId: number, data: ArrayBuffer) => Promise<any>;
  receiveFeatureReport: () => void;
};
