import Home from './';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../utils/context';
import { MemoryRouter } from 'react-router-dom';

describe('Home', () => {
  test('Should render without crash', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    //screen.debug();
    expect(
      screen.getByRole('heading', {
        level: 2,
        text: 'Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents',
      })
    ).toBeTruthy();
  });
});
