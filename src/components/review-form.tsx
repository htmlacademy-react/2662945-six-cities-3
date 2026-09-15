import {
  Fragment,
  useState,
  FormEvent,
  ChangeEvent,
  useRef,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { ratingTitles } from '../const';
import { postCommentAction } from '../store/action';
import { AppDispatch } from '../store';

interface ReviewFormProps {
  offerId: string;
}

export function ReviewForm({ offerId }: ReviewFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  const isFormValid =
    rating !== '' && review.length >= 50 && review.length <= 300;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!offerId || !isFormValid) {
      return;
    }

    setIsSubmitting(true);

    dispatch(
      postCommentAction({
        offerId,
        comment: review,
        rating: Number(rating),
      }),
    )
      .unwrap()
      .then(() => {
        if (isMounted.current) {
          setReview('');
          setRating('');
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted.current) {
          setIsSubmitting(false);
        }
      });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingTitles)
          .reverse()
          .map(([value, title]) => (
            <Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                checked={rating === value}
                onChange={handleRatingChange}
                disabled={isSubmitting}
              />
              <label
                htmlFor={`${value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use href="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
        disabled={isSubmitting}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
