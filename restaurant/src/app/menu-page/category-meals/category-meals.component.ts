import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CallingService } from 'src/app/services/calling.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { DataSharingService } from 'src/app/shared/data-sharing.service';
import {
  CategoryMealsInterface,
  SingleCategoryMealInterface,
} from 'src/app/types/category-meals';
import {
  SingleMealDetailsInterface,
  mealsDetailsInterface,
} from 'src/app/types/meal-details';
import {
  RandomMealInterface,
  SingleRandomMealInterface,
} from 'src/app/types/random-meal';

@Component({
  selector: 'app-category-meals',
  templateUrl: './category-meals.component.html',
  styleUrls: ['./category-meals.component.css'],
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
  searchValue = '';

  //random meal values
  randomMeal!: SingleRandomMealInterface;
  ////////////////////////////////////

  isEditing: boolean = false;
  editButtonClicked: boolean = false;
  dynamicFormName!: FormGroup;

  newMealInfo: SingleMealDetailsInterface | null;
  addedItemInfo!: SingleMealDetailsInterface;

  ingredients: (string | null)[] = [];
  randomMealIngredients: (string | null)[] = [];
  dynamicForm!: FormGroup;
  ingredientValue: any;

  constructor(
    private callingService: CallingService,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private navService: NavigationService,
    private formBuilder: FormBuilder
  ) {}

  // search form methods
  searchForm = new FormGroup({
    search: new FormControl(),
  });
  get getForm() {
    return this.searchForm.get('search');
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
    if (this.searchValue != '') {
      this.isSearching = true;
    } else if (this.searchValue.length < 1) {
      this.isSearching = false;
    }
  }

  ngOnInit(): void {
    const param = this.route.snapshot.params['food'];
    this.callingService
      .getRandomMeal()
      .subscribe((resData: RandomMealInterface) => {
        this.randomMeal = resData.meals[0];
        Object.entries(this.randomMeal).map((data) => {
          if (data[0].includes('strIngredient') && data[1] !== '') {
            this.randomMealIngredients.push(data[1]);
          }
        });
      });
    this.callingService
      .getCategoryMeals(param)
      .subscribe((resData: CategoryMealsInterface) => {
        this.dataSharingService.data.subscribe(
          (resData: SingleMealDetailsInterface) => {
            this.newMealInfo = resData;
          }
        );
        // getting all meals
        this.categoryMeals = [...resData.meals, this.newMealInfo];
        // for pagination
        this.numberOfMeals = this.categoryMeals.length;
        // search feature
        this.getForm.valueChanges.subscribe((input: string) => {
          this.callingService
            .getCategoryMeals(param)
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

    ////////////////////////////////////////////
    // geting added item from local storage
    this.addedItemInfo = JSON.parse(localStorage.getItem('key'));
  }

  // get details of selected meal
  getMealDetails(id: string) {
    this.isEditing = false;
    this.editButtonClicked = false;
    this.mealSelected = true;
    if (!id) {
      this.selectedMealDetail = this.addedItemInfo;
      this.ingredients.length = 0;
      Object.entries(this.selectedMealDetail).map((data: string[]) => {
        if (data[0].includes('strIngredient') && data[1] !== '') {
          this.ingredients.push(data[1]);
        }
      });
    } else {
      this.callingService
        .getMealDetails(id)
        .subscribe((resData: mealsDetailsInterface) => {
          this.selectedMealDetail = resData.meals[0];
          this.ingredients.length = 0;
          Object.entries(this.selectedMealDetail).map((data: string[]) => {
            if (data[0].includes('strIngredient') && data[1] !== '') {
              this.ingredients.push(data[1]);
            }
          });
        });
    }
  }

  // go to add-new-meal page
  goToNewMealPage() {
    this.navService.navigation('menu/' + this.param + '/new-meal');
  }

  // EDITING MEAL START
  editMeal(meal: SingleMealDetailsInterface) {
    this.isEditing = true;
    this.editButtonClicked = true;
    this.dynamicForm = this.formBuilder.group({});

    Object.entries(meal).map((data: string[]) => {
      if (
        data[0].includes('strIngredient') &&
        data[1] !== '' &&
        data[1] !== undefined &&
        data[1] !== null
      ) {
        this.dynamicForm.addControl(data[0], new FormControl(data[1]));
      }
    });
  }
  saveMealChanges() {
    this.editButtonClicked = false;
    this.isEditing = false;
  }
  cancelMealChanges() {
    this.isEditing = false;
    this.editButtonClicked = false;
  }

  editSpecificIngredient(test: string, id: string, sastojakId: number) {
    this.ingredients[sastojakId] = this.dynamicForm.controls[test].value;

    console.log(this.dynamicForm.controls[test].value, id);
    console.log(test);
    // Object.entries(this.dynamicForm.value).map((data) => {
    //   console.log(data);
    // });
    // if (+data[0].slice(13) === i + 1) {
    //   console.log(data[1]);
    // }
  }
  // EDITING MEAL END
}
