export interface IOffer {
  id: number;
  offerlink: string;
  title: string;
  destination: string;
  rating: number;
  price: number;
  duration: string;
  startDate: Date;
  endDate: Date;
  provider: string;
  mealType: string;
  image: string;
}
