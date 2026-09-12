import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../store/reducer';
import { AuthorizationStatus } from '../const';
import { ReviewForm } from './review-form';

const renderWithProviders = (component: React.ReactNode) => {
  const store = configureStore({
    reducer,
    preloadedState: {
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com'
      },
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

describe('Component: ReviewForm', () => {
  it('кнопка отправки должна быть заблокирована при пустой форме', () => {
    renderWithProviders(<ReviewForm offerId="1" />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('кнопка отправки должна разблокироваться при валидном вводе', async () => {
    renderWithProviders(<ReviewForm offerId="1" />);
    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const star5 = screen.getByTitle('perfect');

    await userEvent.click(star5);
    const validText = 'a'.repeat(50);
    await userEvent.type(textarea, validText);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
  });
});

