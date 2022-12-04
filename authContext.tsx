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

  const loadUser = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}auth/profile`;
    try {
      const { token } = getStorageAuthContext();
      if (token === null || token === undefined) return;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await res.json();

      if (user.statusCode && user.message) {
        throw new Error(user.message);
      }

      dispatch({ type: ActionType.Login, payload: user });
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
export const getStorageAuthContext = () => {
  const authContext = localStorage.getItem(StorageItemName);
  return authContext ? JSON.parse(authContext) : { token: null };
};
