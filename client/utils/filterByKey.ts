type Key<T> = keyof T;

const getValueOfKey = <T>(elem: T, key: Key<T>): string | undefined => {
  const valueOfKey = elem[key];

  if (typeof valueOfKey === 'object') {
    return Object.values(valueOfKey).join(' ');
  } else if (typeof valueOfKey === 'string') {
    return valueOfKey;
  }
};

export const filterByKey = <T>(data: T[], value: string, key: Key<T>): T[] => {
  return data.filter((elem) => {
    const valueOfKeyToFilter = getValueOfKey(elem, key);

    if (valueOfKeyToFilter) {
      if (valueOfKeyToFilter.toLowerCase().startsWith(value.toLowerCase())) {
        return elem;
      }
    }
  });
};
