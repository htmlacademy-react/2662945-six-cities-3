import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from './const';
import { reducer } from './store/reducer';
import App from './app';

const renderWithProviders = (initialRoute: string, isAuth: boolean = false) => {
  const store = configureStore({
    reducer,
    preloadedState: {
      user: {
        authorizationStatus: isAuth
          ? AuthorizationStatus.Auth
          : AuthorizationStatus.NoAuth,
        userEmail: isAuth ? 'test@test.com' : null,
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
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </Provider>,
  );
};

describe('Application Routing', () => {
  it('должен отрисовать HomePage при маршруте "/"', async () => {
    renderWithProviders(AppRoute.Main);
    await waitFor(() => {
      expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    });
  });

  it('должен отрисовать LoginPage при маршруте "/login"', () => {
    renderWithProviders(AppRoute.Login);
    expect(
      screen.getByRole('heading', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it('должен отрисовать NotFoundPage при неизвестном маршруте', () => {
    renderWithProviders('/unknown-route');
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('должен перенаправить неавторизованного пользователя с /favorites на /login', () => {
    renderWithProviders(AppRoute.Favorites, false);
    expect(
      screen.getByRole('heading', { name: /sign in/i }),
    ).toBeInTheDocument();
  });
});
