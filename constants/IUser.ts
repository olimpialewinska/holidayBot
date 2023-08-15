export interface IUser {
  id: number | null;
  email: string | null;
  accessToken: string | null;
  preferences: {
    destination: string;
    mealType: string;
    duration: number;
    rating: number;
    price: number;
  } | null;
}
