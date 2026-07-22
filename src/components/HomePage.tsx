import React, { useMemo, useState } from 'react';
import { OfferCard } from './OfferCard';

interface HomePageProps {
  offerCount: number;
}

type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type Offer = {
  premium: boolean;
  title: string;
  type: string;
  price: number;
  isBookmarked: boolean;
  ratingPercent: number;
  image: string;
};

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const offers: Offer[] = [
  {
    premium: true,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    isBookmarked: false,
    ratingPercent: 80,
    image: 'img/apartment-01.jpg',
  },
  {
    premium: false,
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    isBookmarked: true,
    ratingPercent: 80,
    image: 'img/room.jpg',
  },
  {
    premium: false,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    isBookmarked: false,
    ratingPercent: 80,
    image: 'img/apartment-02.jpg',
  },
  {
    premium: true,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    isBookmarked: false,
    ratingPercent: 100,
    image: 'img/apartment-03.jpg',
  },
  {
    premium: false,
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    isBookmarked: true,
    ratingPercent: 80,
    image: 'img/room.jpg',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ offerCount }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>('Popular');

  const sortedOffers = useMemo(() => {
    const copiedOffers = [...offers];

    switch (sortType) {
      case 'Price: low to high':
        return copiedOffers.sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return copiedOffers.sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return copiedOffers.sort((a, b) => b.ratingPercent - a.ratingPercent);
      default:
        return copiedOffers;
    }
  }, [sortType]);

  const handleSortOptionClick = (value: SortType) => {
    setSortType(value);
    setIsSortOpen(false);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <li key={city} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item ${
                      city === 'Amsterdam' ? 'tabs__item--active' : ''
                    }`}
                    href="#"
                  >
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerCount} places to stay in Amsterdam</b>

              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                  onClick={() => setIsSortOpen((prev) => !prev)}
                >
                  {sortType}
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use href="#icon-arrow-select" />
                  </svg>
                </span>

                {isSortOpen && (
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className={`places__option ${sortType === 'Popular' ? 'places__option--active' : ''}`}
                      tabIndex={0}
                      onClick={() => handleSortOptionClick('Popular')}
                    >
                      Popular
                    </li>
                    <li
                      className={`places__option ${
                        sortType === 'Price: low to high' ? 'places__option--active' : ''
                      }`}
                      tabIndex={0}
                      onClick={() => handleSortOptionClick('Price: low to high')}
                    >
                      Price: low to high
                    </li>
                    <li
                      className={`places__option ${
                        sortType === 'Price: high to low' ? 'places__option--active' : ''
                      }`}
                      tabIndex={0}
                      onClick={() => handleSortOptionClick('Price: high to low')}
                    >
                      Price: high to low
                    </li>
                    <li
                      className={`places__option ${
                        sortType === 'Top rated first' ? 'places__option--active' : ''
                      }`}
                      tabIndex={0}
                      onClick={() => handleSortOptionClick('Top rated first')}
                    >
                      Top rated first
                    </li>
                  </ul>
                )}
              </form>

              <div className="cities__places-list places__list tabs__content">
                {sortedOffers.slice(0, offerCount).map((offer) => (
                  <OfferCard
                    key={offer.title + offer.price}
                    premium={offer.premium}
                    title={offer.title}
                    type={offer.type}
                    price={offer.price}
                    isBookmarked={offer.isBookmarked}
                    ratingPercent={offer.ratingPercent}
                    image={offer.image}
                  />
                ))}
              </div>
            </section>

            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
