import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Component: Spinner', () => {
  it('должен отрисовать текст загрузки', () => {
    render(<Spinner />);

    expect(screen.getByText(/Loading places\.\.\./i)).toBeInTheDocument();
  });
});
