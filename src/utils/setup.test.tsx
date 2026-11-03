import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Initial test environment', () => {
  it('renders a sample element and tests assertions', () => {
    render(<div data-testid="test-element">e-manager initialized</div>);
    expect(screen.getByTestId('test-element')).toHaveTextContent('e-manager initialized');
  });
});
