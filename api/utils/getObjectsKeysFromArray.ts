export const getObjectsKeysFromArray = <T>(data: T[], key: keyof T) =>
  data.map((elemOfData) => elemOfData[key]);
