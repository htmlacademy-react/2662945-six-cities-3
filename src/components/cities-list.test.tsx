import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CitiesList } from './cities-list';
import { reducer } from '../store/reducer';
import { AuthorizationStatus } from '../const';

describe('Component: CitiesList', () => {
  it('должен отрисовать список городов', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        user: {
          authorizationStatus: AuthorizationStatus.Unknown,
          userEmail: null
        },
        app: {
          city: 'Paris',
          isLoading: false,
          offers: [],
          favoriteOffers: []
        },
        offer: {
          currentOffer: null,
          nearbyOffers: [],
          comments: [],
          isOfferDataLoading: false
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CitiesList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
  });
});
