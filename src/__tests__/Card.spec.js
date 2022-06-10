import React from 'react';
import {render} from '@testing-library/react-native';
import Card from '../components/Card';

describe('Card Component', () => {
  it('renders the Card Texts', async () => {
    const {getByText} = render(
      <Card
        path="Home"
        title="Paris"
        subtitle="Clear"
        temperature={13.73}
        image="10d"
      />,
    );

    expect(getByText('Paris')).toBeDefined();
    expect(getByText('Clear')).toBeDefined();
    expect(getByText('13.73 ºF')).toBeDefined();
  });
});
