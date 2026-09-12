import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Review } from './review';

const mockReview = {
  id: '1',
  comment: 'Great place!',
  date: '2023-10-10T10:00:00.000Z',
  rating: 5,
  user: {
    name: 'Max',
    avatarUrl: 'img/avatar-max.jpg',
  },
};

describe('Component: Review', () => {
  it('должен отрисовать имя автора и текст отзыва', () => {
    render(<Review review={mockReview} />);
    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
  });
});
