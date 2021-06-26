export const formatToListData = <T extends Object>(obj: T) => {
  const arr: any[] = [];

  for (const key in obj) {
    arr.push({ [key]: obj[key] });
  }

  return arr;
};
