import { userReducer, initialUserState } from './user';
import { AuthorizationStatus } from '../../const';
import { loginAction, logoutAction } from '../action';

describe('UserReducer', () => {
  it('должен установить Auth при loginAction.fulfilled', () => {
    const action = loginAction.fulfilled(
      {
        token: 'secret',
        email: 'test@test.com',
        name: 'Test User',
        avatarUrl: 'http://test.com/avatar.jpg',
        isPro: false,
      },
      'requestId',
      { email: 'test@test.com', password: '123456' }
    );
    const result = userReducer(initialUserState, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userEmail).toBe('test@test.com');
  });

  it('должен установить NoAuth при logoutAction.fulfilled', () => {
    const stateWithAuth = {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: 'test@test.com',
    };
    const action = logoutAction.fulfilled(undefined, 'requestId', undefined);
    const result = userReducer(stateWithAuth, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userEmail).toBeNull();
  });
});
