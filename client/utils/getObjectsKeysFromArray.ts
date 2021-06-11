export const getObjectsKeysFromArray = <T>(data: T[], key: keyof T) => {
  return data.map((elemOfData) => elemOfData[key]);
};
