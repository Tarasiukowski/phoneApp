const getChildren = (
  elem: HTMLElement | ChildNode,
  arr: HTMLElement[],
  withButton?: boolean,
): boolean => {
  let end = false;

  if (elem.hasChildNodes()) {
    Array.from(elem.childNodes).map((elem) => {
      const element = elem as HTMLElement;

      if (withButton) {
        arr.push(element);
      } else {
        if (!(elem.nodeName === 'BUTTON')) {
          const element = elem as HTMLElement;

          arr.push(element);
        }
      }

      if (elem.hasChildNodes() && withButton ? true : !(elem.nodeName === 'BUTTON')) {
        getChildren(elem, arr, withButton);
      }
    });
  } else {
    end = true;
  }

  return !end;
};

export const getAllChildreenOfElement = (
  mainElement: HTMLElement,
  withButton?: boolean,
): HTMLElement[] => {
  const elements: HTMLElement[] = [];

  getChildren(mainElement, elements, withButton);

  return elements;
};
