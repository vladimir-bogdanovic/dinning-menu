import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { Location } from "@angular/common";
import { DataSharingService } from "../shared/data-sharing.service";

@Component({
  selector: "app-add-new-meal",
  templateUrl: "./add-new-meal.component.html",
  styleUrls: ["./add-new-meal.component.css"],
})
export class AddNewMealComponent {
  constructor(
    private location: Location,
    private dataSharingService: DataSharingService
  ) {}

  addNewMealForm = new FormGroup({
    strMeal: new FormControl(),
    strMealThumb: new FormControl(),
    strIngredient1: new FormControl(),
    strIngredient2: new FormControl(),
    strIngredient3: new FormControl(),
    strIngredient4: new FormControl(),
    strIngredient5: new FormControl(),
    strIngredient6: new FormControl(),
    strIngredient7: new FormControl(),
    strIngredient8: new FormControl(),
    strIngredient9: new FormControl(),
  });

  onSubmit() {
    this.dataSharingService.sendData(this.addNewMealForm.value);
    // console.log(this.dataSharingService.sendData(this.addNewMealForm));
    //  console.log(this.addNewMealForm);
    console.log(this.addNewMealForm.value);
    this.location.back();
    // console.log(data);
  }
}
