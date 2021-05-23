export const formatToListData = (obj: any) => {
  const arr: any[] = [];

  for (const key in obj) {
    arr.push({ [key]: obj[key] });
  }

  return arr;
};
