export type TUserSignUp = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "user" | "admin";
  address: string;
};
