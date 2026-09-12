import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { AuthorizationStatus } from '../../const';

describe('Component: PrivateRoute', () => {
  it('должен отрисовать дочерний компонент для авторизованного пользователя', () => {
    const testText = 'Секретный контент';
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <span>{testText}</span>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('должен перенаправить неавторизованного пользователя на /login', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <span>Секретный контент</span>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<span>Login Page Mock</span>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.queryByText('Секретный контент')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page Mock')).toBeInTheDocument();
  });
});
