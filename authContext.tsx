import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

type User = {
  email: string;
  name: string;
};

type AuthState = {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
};

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "POPULATE"; payload: User }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" };

type Dispatch = React.Dispatch<Action>;

const StateContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  loading: true,
});

const DispatchContext = createContext((value: Action) => {});

const reducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        authenticated: false,
        user: null,
      };

    case "POPULATE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case "STOP_LOADING":
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
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  const loadUser = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/profile`;
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

      dispatch({ type: "LOGIN", payload: user });
    } catch (err) {
      console.log(err);
      localStorage.removeItem(storageItemName);
    } finally {
      dispatch({ type: "STOP_LOADING" });
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
export const useAuthDispatch: () => Dispatch = () =>
  useContext(DispatchContext);

export const storageItemName = "online-cafe-context";

export const getStorageAuthContext = () => {
  const authContext = localStorage.getItem(storageItemName);

  return authContext
    ? JSON.parse(authContext)
    : { token: null, remembered: false };
};
