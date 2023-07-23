import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { NewMealInterface } from "../types/new-meal";
import { SingleMealDetailsInterface } from "../types/meal-details";

@Injectable({ providedIn: "root" })
export class DataSharingService {
  private dataSource: BehaviorSubject<SingleMealDetailsInterface> =
    new BehaviorSubject<SingleMealDetailsInterface>(null);
  data: Observable<SingleMealDetailsInterface> = this.dataSource.asObservable();

  sendData(data: any) {
    this.dataSource.next(data);
  }
}
