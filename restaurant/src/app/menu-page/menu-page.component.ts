import { Component, OnInit } from "@angular/core";
import { CallingService } from "../services/calling.service";
import {
  CategoriesInterface,
  SingleCategoryInterface,
} from "../types/categories-list";
import { AreasInterface, SingleAreaInterface } from "../types/area-list";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu-page",
  templateUrl: "./menu-page.component.html",
  styleUrls: ["./menu-page.component.css"],
})
export class MenuPageComponent implements OnInit {
  categoriesList!: SingleCategoryInterface[];
  areasList!: SingleAreaInterface[];
  showDiv: boolean = true;

  constructor(private callingService: CallingService, private router: Router) {}

  ngOnInit(): void {
    this.callingService
      .getCategoriesList()
      .subscribe((resData: CategoriesInterface) => {
        this.categoriesList = resData.meals;
      });
  }

  sortingByAreas() {
    this.callingService.getAreaList().subscribe((resData: AreasInterface) => {
      this.showDiv = false;
      this.areasList = resData.meals;
    });
  }

  sortingByCategories() {
    this.callingService
      .getCategoriesList()
      .subscribe((resData: CategoriesInterface) => {
        this.showDiv = true;
        this.categoriesList = resData.meals;
      });
  }

  goToFoodCategory(food: string) {
    this.router.navigate(["/menu" + "/" + food]);
  }
}
