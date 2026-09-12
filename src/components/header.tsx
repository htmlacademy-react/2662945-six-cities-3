import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../store/action';
import { AppDispatch, RootState } from '../store';
import { AppRoute } from '../const';

type HeaderProps = {
  isAuthorized: boolean;
  favoritesCount?: number;
};

export function Header({ isAuthorized, favoritesCount = 0 }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userEmail = useSelector((state: RootState) => state.user.userEmail);

  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction()).then(() => {
      navigate(AppRoute.Main);
    });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorized ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">{userEmail || 'User'}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={handleLogoutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
