type Key<T> = keyof T;

const getValueOfKey = <T>(elem: T, key: Key<T>): string | undefined => {
  const valueOfKey = elem[key];

  switch (typeof valueOfKey) {
    case 'object':
      return Object.values(valueOfKey).join(' ');
    case 'string':
      return valueOfKey;
  }
};

export const filterByKey = <T>(data: T[], value: string, key: Key<T>): T[] =>
  data.filter((elem) => {
    const valueOfKeyToFilter = getValueOfKey(elem, key);

    if (valueOfKeyToFilter) {
      if (valueOfKeyToFilter.toLowerCase().startsWith(value.toLowerCase())) {
        return elem;
      }
    }
  });
