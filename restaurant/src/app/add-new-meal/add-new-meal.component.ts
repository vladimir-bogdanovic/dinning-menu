import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

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
    private dataSharingService: DataSharingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addNewMealForm = new FormGroup({
      strIngredient1: new FormControl(null, Validators.required),
      strMealThumb: new FormControl(null, Validators.required),
      strMeal: new FormControl(null, Validators.required),
    });
  }

  addInputField() {
    const fieldNumber = Object.keys(this.addNewMealForm.controls).length - 1;
    const newFieldName = `strIngredient${fieldNumber}`;
    this.addNewMealForm.addControl(
      newFieldName,
      this.formBuilder.control(null, Validators.required)
    );
  }

  removeInputField() {
    //   const fieldName = Object.keys(this.addNewMealForm.controls).length;
    console.log(Object.keys(this.addNewMealForm.controls).splice(1));
    const i = Object.keys(this.addNewMealForm.controls).pop();
    const length = Object.keys(this.addNewMealForm.controls).length - 1;
    console.log(length);
    if (length >= 3) {
      this.addNewMealForm.removeControl(i);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.addNewMealForm.get(controlName);
    return control.invalid && control.touched;
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
