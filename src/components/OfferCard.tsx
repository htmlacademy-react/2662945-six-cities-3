import React from 'react';

interface OfferCardProps {
  premium?: boolean;
  title: string;
  type: string;
  price: number;
  isBookmarked?: boolean;
  ratingPercent: number;
  image: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  premium = false,
  title,
  type,
  price,
  isBookmarked = false,
  ratingPercent,
  image,
}) => (
  <article className="cities__card place-card">
    {premium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}

    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img
          className="place-card__image"
          src={image}
          width={260}
          height={200}
          alt="Place image"
        />
      </a>
    </div>

    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>

        <button
          className={`place-card__bookmark-button button ${
            isBookmarked ? 'place-card__bookmark-button--active' : ''
          }`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width={18} height={19}>
            <use href="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">
            {isBookmarked ? 'In bookmarks' : 'To bookmarks'}
          </span>
        </button>
      </div>

      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${ratingPercent}%` }} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>

      <h2 className="place-card__name">
        <a href="#">{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>
);
