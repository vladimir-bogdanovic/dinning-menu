import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MenuPageComponent } from "./menu-page/menu-page.component";
import { CategoryMealsComponent } from "./menu-page/category-meals/category-meals.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddNewMealComponent } from './add-new-meal/add-new-meal.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MenuPageComponent,
    CategoryMealsComponent,
    AddNewMealComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
