import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../../store/reducer';
import { NotFoundPage } from './not-found-page';
import { AuthorizationStatus } from '../../const';

const renderWithProviders = (component: React.ReactNode) => {
  const store = configureStore({
    reducer,
    preloadedState: {
      user: { authorizationStatus: AuthorizationStatus.NoAuth, userEmail: null },
      app: { city: 'Paris', isLoading: false, offers: [], favoriteOffers: [] },
      offer: { currentOffer: null, nearbyOffers: [], comments: [], isOfferDataLoading: false },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </Provider>
  );
};

describe('Component: NotFoundPage', () => {
  it('должен отрисовать текст 404 Not Found', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('должен отрисовать ссылку на главную страницу', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByRole('link', { name: /go to main page/i })).toBeInTheDocument();
  });
});

