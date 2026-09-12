import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { OfferCard } from './offer-card';

const mockOffer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  isPremium: true,
  isFavorite: false,
  rating: 5,
  previewImage: 'img.jpg',
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
  images: ['img.jpg'],
  bedrooms: 1,
  maxAdults: 2,
  goods: ['Wi-Fi'],
  description: 'Test',
  host: { name: 'Host', avatarUrl: 'img.jpg', isPro: false },
};

describe('Component: OfferCard', () => {
  it('должен корректно отрисовать заголовок и цену', () => {
    render(
      <MemoryRouter>
        <OfferCard
          offer={mockOffer}
          cardClassName="test-class"
          imageWrapperClassName="test-img"
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });
});
