import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './footer';

describe('Component: Footer', () => {
  it('должен отрисовать логотип с правильной ссылкой', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
  });
});
