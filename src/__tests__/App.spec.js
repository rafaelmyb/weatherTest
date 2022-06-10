import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../../App';

describe('Screen 1', () => {
  it('should render the title of screen', () => {
    const {getByText} = render(<App />);

    expect(getByText('Weather')).toBeDefined();
  });
});
