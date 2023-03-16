import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SurveyProvider, ThemeProvider } from '../../utils/context';

const Wrapper = ({ children }) => {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <SurveyProvider>{children}</SurveyProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

export const render = (ui) => {
  rtlRender(ui, { wrapper: Wrapper });
};
