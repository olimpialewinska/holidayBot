export interface IUser {
  id: number | null;
  email: string;
  preferences: {
    destination: string;
    mealType: string;
    duration: number;
    rating: number;
    price: number;
  };
}
