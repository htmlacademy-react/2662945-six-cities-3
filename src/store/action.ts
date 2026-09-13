import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, AuthInfo, Review } from '../types';
import { cities } from '../const';
import { saveToken, dropToken } from '../token';

type CityName = (typeof cities)[number];

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/offers');
  return data;
});

export const fetchOfferAction = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance }
>('offer/fetchOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer>(`/offers/${offerId}`);
  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offer[],
  string,
  { extra: AxiosInstance }
>('offer/fetchNearby', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>('offer/fetchComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<Review[]>(`/comments/${offerId}`);
  return data;
});

export const postCommentAction = createAsyncThunk<
  Review,
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>('offer/postComment', async ({ offerId, comment, rating }, { extra: api }) => {
  const { data } = await api.post<Review>(`/comments/${offerId}`, {
    comment,
    rating,
  });
  return data;
});

export const checkAuthAction = createAsyncThunk<
  AuthInfo,
  undefined,
  { extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<AuthInfo>('/login');
  return data;
});

export const loginAction = createAsyncThunk<
  AuthInfo,
  { email: string; password: string },
  { extra: AxiosInstance }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<AuthInfo>('/login', { email, password });
  saveToken(data.token);
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete('/logout');
  dropToken();
});

export const fetchFavoriteOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('user/fetchFavoriteOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/favorite');
  return data;
});

export const toggleFavoriteAction = createAsyncThunk<
  Offer,
  { offerId: string; status: number },
  { extra: AxiosInstance }
>('offer/toggleFavorite', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);
  return data;
});

export const ActionCreator = {
  changeCity: (city: CityName) =>
    ({
      type: 'city/change',
      payload: city,
    }) as const,
};
