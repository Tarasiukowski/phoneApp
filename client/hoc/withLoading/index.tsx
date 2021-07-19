import { ComponentType, FunctionComponent } from 'react';

export const withLoading = <T extends object>(
  Component: ComponentType<T>,
  DefaultComponent: FunctionComponent,
) => {
  const initLoading: React.FC<T & { loading: boolean }> = (wrapperProps) => {
    const { loading, ...restProps } = wrapperProps;

    return loading ? <DefaultComponent /> : <Component {...(restProps as T)} />;
  };

  return initLoading;
};
