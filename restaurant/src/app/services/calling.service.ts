import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIRoutes } from "../types/api-routes";
import { CategoriesInterface } from "../types/categories-list";
import { Observable } from "rxjs";
import { AreasInterface } from "../types/area-list";
import { CategoryMealsInterface } from "../types/category-meals";
import { mealsDetailsInterface } from "../types/meal-details";
import { RandomMealInterface } from "../types/random-meal";

@Injectable({
  providedIn: "root",
})
export class CallingService {
  constructor(private http: HttpClient) {}

  getCategoriesList(): Observable<CategoriesInterface> {
    return this.http.get<CategoriesInterface>(APIRoutes.categoriesList);
  }

  getAreaList(): Observable<AreasInterface> {
    return this.http.get<AreasInterface>(APIRoutes.areaList);
  }

  getCategoryMeals(foodCategory: string): Observable<CategoryMealsInterface> {
    return this.http.get<CategoryMealsInterface>(
      APIRoutes.baseCategoryMeals + foodCategory
    );
  }

  getMealDetails(id: string): Observable<mealsDetailsInterface> {
    return this.http.get<mealsDetailsInterface>(APIRoutes.baseMealDetails + id);
  }

  getRandomMeal(): Observable<RandomMealInterface> {
    return this.http.get<RandomMealInterface>(APIRoutes.randomMeal);
  }
}
