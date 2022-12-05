import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

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

  const getNewAuthTokens = async () => {
    try {
      const { refreshToken: token, id } = getStorageAuthContext();
      if(!token && !id) return;

      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/refresh/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      const authTokensResponse = await response.json();

      if(authTokensResponse.statusCode && authTokensResponse.message) {
        throw new Error(authTokensResponse.message);
      }

      if(!authTokensResponse.success) {
        const message = authTokensResponse.error.message;
        throw new Error(message);
      }

      const { accessToken, refreshToken } = authTokensResponse.data.tokens;
      localStorage.removeItem(StorageItemName);
      localStorage.setItem(StorageItemName, JSON.stringify({ refreshToken, id }));
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  const loadUser = useCallback(async () => {
    try {
      let accessToken = state.user ? state.user.accessToken : null;
      if (!accessToken) {
        const token = await getNewAuthTokens();
        if(!token) return;

        accessToken = token;
      };
      
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/profile`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userResponse = await response.json();

      if (userResponse.statusCode && userResponse.message) {
        throw new Error(userResponse.message);
      }

      if (!userResponse.success) {
        const message = userResponse.error.message
        throw new Error(message);
      }

      const user = userResponse.data.user;
      dispatch({ type: ActionType.Login, payload: { ...user, accessToken } });
    } catch (err) {
      console.log(err);
      localStorage.removeItem(StorageItemName);
    } finally {
      dispatch({ type: ActionType.StopLoading });
    }
  }, []);

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
export const useAuthDispatch: () => Dispatch = () => {
  return useContext(DispatchContext);
};

export const StorageItemName = "online-cafe-context";
export const getStorageAuthContext = (): { refreshToken: string; id: string } => {
  const authContext = localStorage.getItem(StorageItemName);
  const noAuthContextFound = { refreshToken: null, id: null };
  return authContext ? JSON.parse(authContext) : noAuthContextFound;
};
