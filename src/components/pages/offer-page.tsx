import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../header';
import { ReviewForm } from '../review-form';
import { ReviewList } from '../review-list';
import { OfferList } from '../offer-list';
import { Map } from '../map';
import { AuthorizationStatus, NEAR_PLACES_COUNT, AppRoute } from '../../const';
import { RootState, AppDispatch } from '../../store';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  toggleFavoriteAction,
  fetchFavoriteOffersAction
} from '../../store/action';
import { Spinner } from '../spinner';
import { capitalize, getBedroomsText, getAdultsText } from '../../utils';
import { getFavoriteOffers } from '../../store/selectors';

export function OfferPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const currentOffer = useSelector((state: RootState) => state.offer.currentOffer);
  const nearbyOffers = useSelector((state: RootState) => state.offer.nearbyOffers);
  const comments = useSelector((state: RootState) => state.offer.comments);
  const isOfferDataLoading = useSelector((state: RootState) => state.offer.isOfferDataLoading);
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);
  const favoriteOffers = useSelector(getFavoriteOffers);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [dispatch, authorizationStatus]);

  const handleFavoriteClick = useCallback(
    (offerId: string, isFavorite: boolean) => {
      if (authorizationStatus !== AuthorizationStatus.Auth) {
        navigate(AppRoute.Login);
        return;
      }
      dispatch(toggleFavoriteAction({ offerId, status: isFavorite ? 0 : 1 }));
    },
    [authorizationStatus, dispatch, navigate]
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [id, dispatch]);

  if (!isOfferDataLoading && !currentOffer) {
    navigate('/404', { replace: true });
    return null;
  }

  if (isOfferDataLoading || !currentOffer) {
    return <Spinner />;
  }

  const limitedNearbyOffers = nearbyOffers.slice(0, NEAR_PLACES_COUNT);
  const mapOffers = [currentOffer, ...limitedNearbyOffers];
  const ratingPercent = Math.round(currentOffer.rating) * 20;
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const sortedAndLimitedReviews = [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="page">
      <Header isAuthorized={isAuthorized} favoritesCount={favoriteOffers.length} />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt={currentOffer.title}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                  onClick={() => handleFavoriteClick(currentOffer.id, currentOffer.isFavorite)}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use href="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${ratingPercent}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalize(currentOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {getBedroomsText(currentOffer.bedrooms)}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {getAdultsText(currentOffer.maxAdults)}
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>

                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <ReviewList reviews={sortedAndLimitedReviews} />
                {isAuthorized && <ReviewForm offerId={currentOffer.id} />}
              </section>
            </div>
          </div>

          <section className="offer__map map">
            <Map
              offers={mapOffers}
              location={currentOffer.location}
              activeOfferId={currentOffer.id}
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferList
              offers={limitedNearbyOffers}
              listClassName="near-places__list places__list"
              cardClassName="near-places__card place-card"
              imageWrapperClassName="near-places__image-wrapper place-card__image-wrapper"
              onFavoriteClick={handleFavoriteClick}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
