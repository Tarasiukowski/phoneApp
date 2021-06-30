const getElements = (
  elem: HTMLElement | ChildNode,
  elements: HTMLElement[],
  withButton?: boolean,
) => {
  if (elem.hasChildNodes()) {
    Array.from(elem.childNodes).map((elem) => {
      const element = elem as HTMLElement;
      const isButton = elem.nodeName === 'BUTTON';

      if (withButton) {
        elements.push(element);
      } else {
        if (!isButton) {
          const element = elem as HTMLElement;

          elements.push(element);
        }
      }

      if (element.hasChildNodes() && (withButton || !isButton)) {
        getElements(elem, elements, withButton);
      }
    });
  }
};

export const getAllChildreenOfElement = (
  mainElement: HTMLElement,
  withButton?: boolean,
): HTMLElement[] => {
  const elements: HTMLElement[] = [];

  getElements(mainElement, elements, withButton);

  return elements;
};
