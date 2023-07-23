export interface SingleCategoryMealInterface {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface CategoryMealsInterface {
  meals: SingleCategoryMealInterface[];
}
