export interface IIngredientResponse {
  id: number;
  name: string;
}

export interface ITagResponse {
  id: number;
  name: string;
}

export interface IRecipeCreate {
  title: string;
  ingredients: any;
  tags: any;
  time_minutes: number;
  price: string;
  link: string;
}
