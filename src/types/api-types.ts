// Auth
export type FirebaseUser = {
  additionalUserInfo: {
    isNewUser: boolean;
    profile: unknown;
    providerId: string;
    username: string | null;
  };
  user: {
    displayName: string | null;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: unknown;
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: unknown;
    providerId: string;
    refreshToken: string;
    tenantId: string | null;
    uid: string;
  };
};

export type UserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  uuid: string;
  platform: string;
  version: string;
  osVersion: string;
  createdAt: string;
};

// Articles
export type NewsArticle = {
  _id: string;
  _score: number;
  author: string;
  authors: string;
  clean_url: string;
  country: string;
  excerpt: string;
  is_opinion: boolean;
  language: string;
  link: string;
  media: string;
  published_date: string;
  published_date_precision: string;
  rank: number;
  rights: string;
  summary: string;
  title: string;
  topic: string;
  twitter_account: string;
};
