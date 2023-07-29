import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Location } from '@angular/common';
import { DataSharingService } from '../shared/data-sharing.service';

@Component({
  selector: 'app-add-new-meal',
  templateUrl: './add-new-meal.component.html',
  styleUrls: ['./add-new-meal.component.css'],
})
export class AddNewMealComponent implements OnInit {
  mealToAdd: string = 'key';
  addNewMealForm: FormGroup;

  constructor(
    private location: Location,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.addNewMealForm = new FormGroup({
      strMeal: new FormControl(null, Validators.required),
      strMealThumb: new FormControl(),
      strIngredient1: new FormControl(null, Validators.required),
      strIngredient2: new FormControl(),
      strIngredient3: new FormControl(),
      strIngredient4: new FormControl(),
      strIngredient5: new FormControl(),
      strIngredient6: new FormControl(),
      strIngredient7: new FormControl(),
      strIngredient8: new FormControl(),
      strIngredient9: new FormControl(),
    });
  }

  onSubmit() {
    console.log(this.addNewMealForm);
    this.dataSharingService.sendData(this.addNewMealForm.value);
    this.location.back();
    localStorage.setItem(
      this.mealToAdd,
      JSON.stringify(this.addNewMealForm.value)
    );
  }
}
