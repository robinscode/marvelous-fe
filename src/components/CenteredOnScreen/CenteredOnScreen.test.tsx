import { render, screen } from '@testing-library/react';
import React from 'react';
import CenteredOnScreen from './CenteredOnScreen';

describe('test', () => {

  test('renders div with child', () => {
    render(<CenteredOnScreen>test</CenteredOnScreen>);
    const element = screen.getByText(/test/i);
    expect(element).toBeInTheDocument();
  });

});
