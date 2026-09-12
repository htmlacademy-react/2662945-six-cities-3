import { Offer, Review } from '../../types';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
  toggleFavoriteAction,
  fetchFavoriteOffersAction
} from '../action';

export type OfferState = {
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferDataLoading: boolean;
};

export const initialOfferState: OfferState = {
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferDataLoading: false,
};

export type OfferAction =
  | ReturnType<typeof fetchOfferAction.pending>
  | ReturnType<typeof fetchOfferAction.fulfilled>
  | ReturnType<typeof fetchOfferAction.rejected>
  | ReturnType<typeof fetchNearbyOffersAction.fulfilled>
  | ReturnType<typeof fetchCommentsAction.fulfilled>
  | ReturnType<typeof postCommentAction.fulfilled>
  | ReturnType<typeof toggleFavoriteAction.fulfilled>
  | ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

export const offerReducer = (state = initialOfferState, action: OfferAction): OfferState => {
  switch (action.type) {
    case fetchOfferAction.pending.type:
      return { ...state, isOfferDataLoading: true };
    case fetchOfferAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchOfferAction.fulfilled>;
      return { ...state, currentOffer: typedAction.payload, isOfferDataLoading: false };
    }
    case fetchOfferAction.rejected.type:
      return { ...state, currentOffer: null, isOfferDataLoading: false };
    case fetchNearbyOffersAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;
      return { ...state, nearbyOffers: typedAction.payload };
    }
    case fetchCommentsAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchCommentsAction.fulfilled>;
      return { ...state, comments: typedAction.payload };
    }
    case postCommentAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof postCommentAction.fulfilled>;
      return { ...state, comments: [typedAction.payload, ...state.comments] };
    }

    case toggleFavoriteAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof toggleFavoriteAction.fulfilled>;
      const updatedOffer = typedAction.payload;
      return {
        ...state,
        currentOffer: state.currentOffer?.id === updatedOffer.id ? updatedOffer : state.currentOffer,
        nearbyOffers: state.nearbyOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        ),
      };
    }

    case fetchFavoriteOffersAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;
      const favoriteIds = typedAction.payload.map((offer) => offer.id);
      return {
        ...state,
        currentOffer: state.currentOffer
          ? {
            ...state.currentOffer,
            isFavorite: favoriteIds.includes(state.currentOffer.id),
          }
          : null,
        nearbyOffers: state.nearbyOffers.map((offer) => ({
          ...offer,
          isFavorite: favoriteIds.includes(offer.id),
        })),
      };
    }

    default:
      return state;
  }
};
