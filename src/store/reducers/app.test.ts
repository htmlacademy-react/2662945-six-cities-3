import { describe, it, expect } from 'vitest';
import { appReducer, initialAppState, AppAction } from './app';
import { fetchOffersAction, ActionCreator, toggleFavoriteAction } from '../action';
import { Offer } from '../../types';
import '@testing-library/jest-dom';

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  isPremium: false,
  isFavorite: false,
  rating: 4.5,
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

describe('AppReducer', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const initialState = { ...initialAppState };
    const unknownAction = { type: 'UNKNOWN_ACTION' } as AppAction;
    const result = appReducer(initialState, unknownAction);

    expect(result).toEqual(initialState);
  });

  it('должен установить isLoading в true при fetchOffersAction.pending', () => {
    const result = appReducer(initialAppState, fetchOffersAction.pending('', undefined));
    expect(result.isLoading).toBe(true);
  });

  it('должен сохранить офферы при fetchOffersAction.fulfilled', () => {
    const action = fetchOffersAction.fulfilled([mockOffer], '', undefined);
    const result = appReducer(initialAppState, action);

    expect(result.isLoading).toBe(false);
    expect(result.offers).toEqual([mockOffer]);
  });

  it('должен изменить город при ActionCreator.changeCity', () => {
    const action = ActionCreator.changeCity('Amsterdam');
    const result = appReducer(initialAppState, action);

    expect(result.city).toBe('Amsterdam');
  });
  it('должен установить isLoading в false при fetchOffersAction.rejected', () => {
    const state = { ...initialAppState, isLoading: true };
    const action = fetchOffersAction.rejected(new Error('Error'), '', undefined);
    const result = appReducer(state, action);
    expect(result.isLoading).toBe(false);
  });

  it('должен обновить оффер в списке при toggleFavoriteAction.fulfilled', () => {
    const state = { ...initialAppState, offers: [mockOffer] };
    const updatedOffer = { ...mockOffer, isFavorite: true };
    const action = toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '1', status: 1 });
    const result = appReducer(state, action);
    expect(result.offers[0].isFavorite).toBe(true);
  });
});
