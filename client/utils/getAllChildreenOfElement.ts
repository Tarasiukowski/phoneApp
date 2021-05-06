const getChildren = (elem: HTMLElement | ChildNode, arr: any[]): boolean => {
  let end = false;

  if (elem.hasChildNodes()) {
    Array.from(elem.childNodes).map((elem) => {
      if (!(elem.nodeName === 'BUTTON')) {
        arr.push(elem);
      }

      if (elem.hasChildNodes() && !(elem.nodeName === 'BUTTON')) {
        getChildren(elem, arr);
      }
    });
  } else {
    end = true;
  }

  return !end;
};

export const getAllChildreenOfElement = (mainElement: HTMLElement): HTMLElement[] => {
  const elements: HTMLElement [] = [];

  getChildren(mainElement, elements);

  return elements;
};
