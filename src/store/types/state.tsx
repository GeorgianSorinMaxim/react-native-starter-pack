export type University = {
  name: string;
  url: string;
  imageUrl?: string;
  geo?: {
    address: {
      streetAddress: string;
      postalCode: string;
      addressLocality: string;
    };
  };
};

export type RootState = {
  app: {
    // App state
    state: {
      prevState?: string;
      newState?: string;
    };
  };
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  login: {
    isAuthenticating: boolean;
    error?: string | null;
    loginInfo?: any;
    tokenValidation?: any;
    tokenValidationError?: string | null;
  };
  signup: {
    isRegistering: boolean;
    registeringError?: string | null;
    registrationInfo?: any;
  };
  data: {
    universities: University[];
  };
};

export type DataState = {
  universities: University[] | [];
};

export type AppState = {
  // App state
  state: {
    prevState?: string;
    newState?: string;
  };
};

export type SignupState = {
  isRegistering: boolean;
  registeringError?: string | null;
  registrationInfo?: any;
};

export type LoginState = {
  isAuthenticating: boolean;
  error?: string | null;
  loginInfo?: any;
  tokenValidation?: any;
  tokenValidationError?: string | null;
};

export type UserState = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export default RootState;
