import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import Freelances from './';
import { render } from '../../utils/test';

const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: '',
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: '',
  },
];

const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    //console.log(res);
    return res(ctx.json({ freelancersList: freelancersMockedData }));
  })
);

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen());
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers());
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close());

describe('Freelances', () => {
  it('Should display freelancers names', async () => {
    render(<Freelances />);
    //screen.debug();
    // test 1
    /* expect(screen.getByTestId('loader')).toBeTruthy();
  await waitFor(() => {
    expect(screen.getByText('Harry Potter')).toBeTruthy();
    expect(screen.getByText('Hermione Granger')).toBeTruthy();
  });*/

    // test 2
    await waitForElementToBeRemoved(screen.getByTestId('loader'));

    expect(screen.getByText('Harry Potter')).toBeTruthy();
    expect(screen.getByText('Hermione Granger')).toBeTruthy();
  });

  /*it('Should display error content', async () => {
    server.use(
      rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({
            errorMessage: `Oups il y a eu une  erreur dans l'API`,
          })
        );
      })
    );
    render(<Freelances />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    //screen.debug();
    expect(screen.getByTestId('error')).toMatchInlineSnapshot();
  });*/
});
