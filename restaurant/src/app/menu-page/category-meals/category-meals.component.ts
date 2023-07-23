import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CallingService } from "src/app/services/calling.service";
import { DataSharingService } from "src/app/shared/data-sharing.service";
import {
  CategoryMealsInterface,
  SingleCategoryMealInterface,
} from "src/app/types/category-meals";
import {
  SingleMealDetailsInterface,
  mealsDetailsInterface,
} from "src/app/types/meal-details";
import {
  RandomMealInterface,
  SingleRandomMealInterface,
} from "src/app/types/random-meal";

@Component({
  selector: "app-category-meals",
  templateUrl: "./category-meals.component.html",
  styleUrls: ["./category-meals.component.css"],
})
export class CategoryMealsComponent implements OnInit {
  param!: string;
  categoryMeals!: SingleCategoryMealInterface[];
  selectedMealDetail!: SingleMealDetailsInterface;

  mealSelected = false;
  defaultPage = 1;
  numberOfMeals!: number;
  itemsPerPage = 10;

  isSearching = false;
  searchValue = "";

  //random meal values
  randomMeal!: SingleRandomMealInterface;
  randomMealName!: string;
  randomMealThumb!: string;
  randomMealCategory!: string;
  ingredient1!: string;
  ingredient2!: string;
  ingredient3!: string;
  ingredient4!: string;
  ingredient5!: string;
  ingredient6!: string;
  ingredient7!: string;
  ingredient8!: string;
  ingredient9!: string;
  ////////////////////////////////////

  isEditing: boolean = false;
  editButtonClicked: boolean = false;
  editMealForm!: FormGroup;

  newMealInfo: SingleMealDetailsInterface;
  // newMealAdded: boolean = false;

  constructor(
    private callingService: CallingService,
    private route: ActivatedRoute,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  // search form methods
  searchForm = new FormGroup({
    search: new FormControl(),
  });
  get getForm() {
    return this.searchForm.get("search");
  }
  // params
  getParams() {
    this.route.params.subscribe((params: Params) => {
      this.param = params.food;
    });
  }

  // removing pagination options while searching for meal
  searchValueChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
    if (this.searchValue != "") {
      this.isSearching = true;
    } else if (this.searchValue.length < 1) {
      this.isSearching = false;
    }
  }

  ngOnInit(): void {
    this.getParams();
    this.callingService
      .getCategoryMeals(this.param)
      .subscribe((resData: CategoryMealsInterface) => {
        this.dataSharingService.data.subscribe(
          (resData: SingleMealDetailsInterface) => {
            this.newMealInfo = resData;
          }
        );
        // getting all meals
        //  this.categoryMeals = resData.meals;
        this.categoryMeals = [...resData.meals, this.newMealInfo];
        //  console.log(this.categoryMeals);
        // for pagination
        this.numberOfMeals = this.categoryMeals.length;
        // search feature
        this.getForm.valueChanges.subscribe((input: string) => {
          this.callingService
            .getCategoryMeals(this.param)
            .subscribe((resData: CategoryMealsInterface) => {
              this.categoryMeals = resData.meals;
              this.categoryMeals = this.categoryMeals.filter(
                (resData: SingleCategoryMealInterface): boolean => {
                  const inputValue = input.toLowerCase();
                  return resData.strMeal.toLowerCase().includes(inputValue);
                }
              );
            });
        });
      });
    // getting all necessaery random meal values
    this.callingService
      .getRandomMeal()
      .subscribe((resData: RandomMealInterface) => {
        this.randomMeal = resData.meals[0];
        this.randomMealName = resData.meals[0].strMeal;
        this.randomMealThumb = resData.meals[0].strMealThumb;
        this.randomMealCategory = resData.meals[0].strCategory;
        this.ingredient1 = resData.meals[0].strIngredient1;
        this.ingredient2 = resData.meals[0].strIngredient2;
        this.ingredient3 = resData.meals[0].strIngredient3;
        this.ingredient4 = resData.meals[0].strIngredient4;
        this.ingredient5 = resData.meals[0].strIngredient5;
        this.ingredient6 = resData.meals[0].strIngredient6;
        this.ingredient7 = resData.meals[0].strIngredient7;
        this.ingredient8 = resData.meals[0].strIngredient8;
        this.ingredient9 = resData.meals[0].strIngredient9;
      });
    ////////////////////////////////////////////
  }

  // get details of selected meal
  getMealDetails(id: string) {
    this.mealSelected = true;
    this.callingService
      .getMealDetails(id)
      .subscribe((resData: mealsDetailsInterface) => {
        this.selectedMealDetail = resData.meals[0];
        console.log(resData.meals);
        console.log(resData);
      });
  }

  // go to add-new-meal page
  goToNewMealPage() {
    this.router.navigate(["menu/" + this.param + "/" + "new-meal"]);
  }

  // EDITING MEAL START
  editMeal(meal: SingleMealDetailsInterface) {
    this.isEditing = true;
    this.editButtonClicked = true;
    this.editMealForm = new FormGroup({
      strMeal: new FormControl(meal.strMeal),
      strIngredient1: new FormControl(meal.strIngredient1),
      strIngredient2: new FormControl(meal.strIngredient2),
      strIngredient3: new FormControl(meal.strIngredient3),
      strIngredient4: new FormControl(meal.strIngredient4),
      strIngredient5: new FormControl(meal.strIngredient5),
      strIngredient6: new FormControl(meal.strIngredient6),
      strIngredient7: new FormControl(meal.strIngredient7),
      strIngredient8: new FormControl(meal.strIngredient8),
      strIngredient9: new FormControl(meal.strIngredient9),
    });
  }
  saveMealChanges() {
    this.selectedMealDetail.strMeal = this.editMealForm.value.strMeal;
    this.selectedMealDetail.strIngredient1 =
      this.editMealForm.value.strIngredient1;
    this.selectedMealDetail.strIngredient2 =
      this.editMealForm.value.strIngredient2;
    this.selectedMealDetail.strIngredient3 =
      this.editMealForm.value.strIngredient3;
    this.selectedMealDetail.strIngredient4 =
      this.editMealForm.value.strIngredient4;
    this.selectedMealDetail.strIngredient5 =
      this.editMealForm.value.strIngredient5;
    this.selectedMealDetail.strIngredient6 =
      this.editMealForm.value.strIngredient6;
    this.selectedMealDetail.strIngredient7 =
      this.editMealForm.value.strIngredient7;
    this.selectedMealDetail.strIngredient8 =
      this.editMealForm.value.strIngredient8;
    this.selectedMealDetail.strIngredient9 =
      this.editMealForm.value.strIngredient9;
    this.editButtonClicked = false;
    this.isEditing = false;
  }
  cancelMealChanges() {
    this.isEditing = false;
    this.editButtonClicked = false;
  }
  // EDITING MEAL END
}
