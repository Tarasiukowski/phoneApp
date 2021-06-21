type Key<T> = keyof T;

const getValueOfKey = <T>(elem: T, key: Key<T>): any => {
  const valueOfKey = elem[key];

  if (typeof valueOfKey === 'object') {
    return Object.values(valueOfKey).join(' ');
  }

  return valueOfKey;
};

export const filterByKey = <T>(data: T[], value: string, key: Key<T>): any => {
  if (data.length) {
    // const valueOfKey = data[0][key];

    // if (typeof valueOfKey === 'object' && !end) {
    //   type allowKey = keyof typeof valueOfKey;

    //   console.log()

    //   return (key: allowKey) => {
    //     return [];
    //   };

    return data.filter((elem) => {
      const valueOfKeyToFilter = getValueOfKey(elem, key);

      if (valueOfKeyToFilter.toLowerCase().startsWith(value.toLowerCase())) {
        return elem;
      }
    });
  }

  return []
};
