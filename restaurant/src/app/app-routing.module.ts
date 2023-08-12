import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { CategoryMealsComponent } from './menu-page/category-meals/category-meals.component';
import { AddNewMealComponent } from './add-new-meal/add-new-meal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'home',
    component: WelcomePageComponent,
  },
  {
    path: 'menu',
    component: MenuPageComponent,
  },
  {
    path: 'menu/:food',
    component: CategoryMealsComponent,
  },
  {
    path: 'menu/:food/new-meal',
    component: AddNewMealComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '*',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '*' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
