import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../action';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

export const initialUserState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export type UserAction =
  | ReturnType<typeof checkAuthAction.fulfilled>
  | ReturnType<typeof checkAuthAction.rejected>
  | ReturnType<typeof loginAction.fulfilled>
  | ReturnType<typeof loginAction.rejected>
  | ReturnType<typeof logoutAction.fulfilled>
  | ReturnType<typeof logoutAction.rejected>;

export const userReducer = (state = initialUserState, action: UserAction): UserState => {
  switch (action.type) {
    case checkAuthAction.fulfilled.type:
    case loginAction.fulfilled.type:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: (action.payload as { email: string }).email,
      };
    case checkAuthAction.rejected.type:
    case loginAction.rejected.type:
    case logoutAction.fulfilled.type:
    case logoutAction.rejected.type:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      };
    default:
      return state;
  }
};
