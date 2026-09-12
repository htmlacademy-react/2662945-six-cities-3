import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../../store/reducer';
import { FavoritesPage } from './favorites-page';
import { AuthorizationStatus } from '../../const';

const renderWithProviders = (component: React.ReactNode) => {
  const store = configureStore({
    reducer,
    preloadedState: {
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
      },
      app: { city: 'Paris', isLoading: false, offers: [], favoriteOffers: [] },
      offer: {
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isOfferDataLoading: false,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
};

describe('Component: FavoritesPage', () => {
  it('должен отрисовать сообщение о пустом списке избранного', () => {
    renderWithProviders(<FavoritesPage />);
    expect(screen.getByText(/nothing yet saved/i)).toBeInTheDocument();
    expect(
      screen.getByText(/save properties to narrow down search/i),
    ).toBeInTheDocument();
  });
});
