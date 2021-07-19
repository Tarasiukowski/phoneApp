import { ComponentType, FunctionComponent } from 'react';

export const WithLoading = <T extends object>(
  Component: ComponentType<T>,
  DefaultComponent: FunctionComponent,
) => {
  const withLoading: React.FC<T & { loading: boolean }> = (wrapperProps) => {
    const { loading, ...restProps } = wrapperProps;

    return loading ? <DefaultComponent /> : <Component {...(restProps as T)} />;
  };

  return withLoading;
};
