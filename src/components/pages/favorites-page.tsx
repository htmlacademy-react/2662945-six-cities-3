import { useSelector } from 'react-redux';
import { Header } from '../header';
import { Footer } from '../footer';
import { OfferCard } from '../offer-card';
import { getFavoriteOffers, getGroupedFavoriteOffers } from '../../store/selectors';
import { Offer } from '../../types';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

export function FavoritesPage() {
  const favoriteOffers = useSelector(getFavoriteOffers);
  const groupedFavorites = useSelector(getGroupedFavoriteOffers);
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  const hasFavorites = favoriteOffers.length > 0;
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <div className="page">
      <Header isAuthorized={isAuthorized} favoritesCount={favoriteOffers.length} />

      <main
        className={
          hasFavorites
            ? 'page__main page__main--favorites'
            : 'page__main page__main--favorites page__main--favorites-empty'
        }
      >
        <div className="page__favorites-container container">
          <section className={hasFavorites ? 'favorites' : 'favorites favorites--empty'}>
            {hasFavorites ? (
              <>
                <h1 className="favorites__title">Saved listing</h1>

                <ul className="favorites__list">
                  {Object.entries(groupedFavorites).map(([city, cityOffers]) => (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to="/">
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>

                      <div className="favorites__places">
                        {cityOffers.map((offer: Offer) => (
                          <OfferCard
                            key={offer.id}
                            offer={offer}
                            cardClassName="favorites__card place-card"
                            imageWrapperClassName="favorites__image-wrapper place-card__image-wrapper"
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future trips.
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {hasFavorites && <Footer />}
    </div>
  );
}
