import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import Home from '../Screens/Home';
import axiosMock from 'axios';

describe('Home Screen', () => {
  it('shoud fetch data', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        ctn: '8',
        list: [
          {
            name: 'Paris',
            weather: {
              main: 'Clear',
              icon: '10d',
            },
            main: {
              temp: 32.9,
            },
          },
        ],
      },
    });

    const {getByTestId} = render(<Home />);

    const resolvedMaping = await waitFor(() => getByTestId('HomeContainer'));

    expect(resolvedMaping).toBeTruthy();
  });
});
