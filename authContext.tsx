import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { handleFetchRequest } from "./utils";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
};

type AuthState = {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
};

type Action = { type: string; payload?: User };

export enum ActionType {
  Login = "LOGIN",
  Populate = "POPULATE",
  Logout = "LOGOUT",
  StopLoading = "STOP_LOADING",
}

type Dispatch = React.Dispatch<Action>;

const StateContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  loading: true,
});
const DispatchContext = createContext((value: Action) => {});

const reducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case ActionType.Login:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };

    case ActionType.Logout:
      localStorage.removeItem(StorageItemName);
      return {
        ...state,
        authenticated: false,
        user: null,
      };

    case ActionType.Populate:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case ActionType.StopLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      throw new Error("Unknown action type");
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<React.Reducer<any, any>>(reducer, {
    user: null,
    authenticated: false,
    loading: false,
  });
  const stateUser = state.user;

  const logoutUser = async() => {
    const { data, error } = await handleFetchRequest(`${process.env.NEXT_PUBLIC_API_DOMAIN}auth/logout`, {
      headers: { Authorization: `Bearer ${state.user?.accessToken}` },
    })
    if(error) {
      console.error(error);
      return;
    }
    console.log({ message: data.message });
  }

  const getNewAuthTokens = async () => {
    try {
      const { refreshToken: token, id } = getStorageAuthContext();
      if(!token || !id) return;
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/refresh/${id}`;
      const { data, error } = await handleFetchRequest(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(error) throw new Error(error.message);
      const { accessToken, refreshToken } = data.tokens;
      localStorage.removeItem(StorageItemName);
      localStorage.setItem(StorageItemName, JSON.stringify({ refreshToken, id }));
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  const loadUser = async () => {
    if(stateUser && stateUser.accessToken) return;
    try {
      let accessToken = await getNewAuthTokens();
      if (!accessToken) return;
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/profile`;
      const { data, error } = await handleFetchRequest(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if(error) throw new Error(error.message);
      const user = data.user;
      if(user) {
        dispatch({ type: ActionType.Login, payload: { ...user, accessToken } });
      }
    } catch (err) {
      console.error(err);
      await logoutUser();
      localStorage.removeItem(StorageItemName);
    } finally {
      dispatch({ type: ActionType.StopLoading });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch: () => Dispatch = () => useContext(DispatchContext);
export const StorageItemName = "online-cafe-context";
export const getStorageAuthContext = (): { refreshToken: string; id: string } => {
  const authContext = localStorage.getItem(StorageItemName);
  const noAuthContextFound = { refreshToken: null, id: null };
  return authContext ? JSON.parse(authContext) : noAuthContextFound;
};
