import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage } from './components/home-page';
import { LoginPage } from './components/pages/login-page';
import { FavoritesPage } from './components/pages/favorites-page';
import { OfferPage } from './components/pages/offer-page';
import { AppRoute } from './const';
import { NotFoundPage } from './components/pages/not-found-page';
import { PrivateRoute } from './components/pages/private-route';
import {
  fetchOffersAction,
  checkAuthAction,
  fetchFavoriteOffersAction,
} from './store/action';
import { AppDispatch, RootState } from './store';
import { AuthorizationStatus } from './const';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus,
  );

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [dispatch, authorizationStatus]);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<HomePage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
