export const separateObject = <T extends object>(obj: T) => {
  const arr: any[] = [];

  for (const key in obj) {
    arr.push({ [key]: obj[key] });
  }

  return arr;
};
