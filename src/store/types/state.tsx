export type Restaurant = {
  name: string;
  url: string;
  geo: {
    address: {
      streetAddress: string;
      postalCode: string;
      addressLocality: string;
    };
  };
};

export type RootState = {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  login: {
    isLogging: boolean;
    loginError: null | string;
    loginInfo: null | any;
  };
  signup: {
    isRegistering: boolean;
    registeringError: null | string;
    registrationInfo: null | any;
  };
  data: {
    data: {
      data: {
        restaurant: {
          items: Restaurant[] | null;
        };
      };
    };
  };
};

type State = {
  data: Restaurant[] | [];
};

export default State;
