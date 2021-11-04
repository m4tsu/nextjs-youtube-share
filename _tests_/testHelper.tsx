import { RenderOptions, RenderResult, render } from '@testing-library/react';

const customRender = (
  ui: React.ReactElement,
  options: RenderOptions = {}
): RenderResult => {
  const WrappedUI = () => ui;

  return render(WrappedUI(), { ...options });
};

export { customRender as render };
