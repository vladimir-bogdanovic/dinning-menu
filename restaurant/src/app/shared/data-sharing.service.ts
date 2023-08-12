import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SingleMealDetailsInterface } from '../types/meal-details';

@Injectable({ providedIn: 'root' })
export class DataSharingService {
  private dataSource: BehaviorSubject<SingleMealDetailsInterface> =
    new BehaviorSubject<SingleMealDetailsInterface>(null);
  data: Observable<SingleMealDetailsInterface> = this.dataSource.asObservable();

  sendData(data: SingleMealDetailsInterface) {
    this.dataSource.next(data);
  }
}
