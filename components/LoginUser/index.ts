// ログイン成功時のcontextから提供されるユーザ
export type LoginUser = {
  uid: string; // user id
};

// ログインユーザのみが参照できるユーザのプライベートな情報 今回のAPIのレスポンス
export type UserInfo = {
  id: string; // user id
  email: string;
  userName: string;
};
