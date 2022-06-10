import React from 'react';
import {render} from '@testing-library/react-native';
import WeatherProperty from '../components/WeatherProperty';

describe('WeatherProperty Component', () => {
  it('renders the WeatherProperty title and value', async () => {
    const {getByText} = render(
      <WeatherProperty title="Humidity" value="62%" />,
    );

    expect(getByText('Humidity')).toBeDefined();
    expect(getByText('62%')).toBeDefined();
  });
});
