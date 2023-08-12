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
  editMealForm!: FormGroup;

  newMealInfo: SingleMealDetailsInterface | null;
  addedItemInfo!: SingleMealDetailsInterface;

  sastojci: (string | null)[] = [];
  sastojciRandomJela: (string | null)[] = [];

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
        this.categoryMeals = [...resData.meals, this.newMealInfo];
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
        Object.entries(this.randomMeal).map((data) => {
          if (data[0].includes('strIngredient') && data[1] !== '') {
            this.sastojciRandomJela.push(data[1]);
          }
        });
      });
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
      this.sastojci.length = 0;
      console.log(this.selectedMealDetail);
      console.log(this.addedItemInfo);
      Object.entries(this.selectedMealDetail).map((data: string[]) => {
        if (data[0].includes('strIngredient') && data[1] !== '') {
          this.sastojci.push(data[1]);
        }
      });
    } else {
      this.callingService
        .getMealDetails(id)
        .subscribe((resData: mealsDetailsInterface) => {
          this.selectedMealDetail = resData.meals[0];
          this.sastojci.length = 0;
          Object.entries(this.selectedMealDetail).map((data: string[]) => {
            if (data[0].includes('strIngredient') && data[1] !== '') {
              this.sastojci.push(data[1]);
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

    // this.editMealForm = new FormGroup({
    //   strMeal: new FormControl(meal.strMeal),
    //   strIngredient1: new FormControl(meal.strIngredient1),
    //   strIngredient2: new FormControl(meal.strIngredient2),
    //   strIngredient3: new FormControl(meal.strIngredient3),
    //   strIngredient4: new FormControl(meal.strIngredient4),
    //   strIngredient5: new FormControl(meal.strIngredient5),
    //   strIngredient6: new FormControl(meal.strIngredient6),
    //   strIngredient7: new FormControl(meal.strIngredient7),
    //   strIngredient8: new FormControl(meal.strIngredient8),
    //   strIngredient9: new FormControl(meal.strIngredient9),
    // });

    this.editMealForm = this.formBuilder.group({
      strMeal: new FormControl(meal.strMeal),
      // strMeal: [null],
      strIngredient1: [null],
      strIngredient2: [null],
      strIngredient3: [null],
      strIngredient4: [null],
      strIngredient5: [null],
      strIngredient6: [null],
      strIngredient7: [null],
      strIngredient8: [null],
      strIngredient9: [null],
      strIngredient10: [null],
      strIngredient11: [null],
      strIngredient12: [null],
      strIngredient13: [null],
      strIngredient14: [null],
      strIngredient15: [null],
      strIngredient16: [null],
      strIngredient17: [null],
      strIngredient18: [null],
      strIngredient19: [null],
      strIngredient20: [null],
    });

    this.editMealForm.patchValue(this.selectedMealDetail);
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
