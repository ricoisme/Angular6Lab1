import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';


@Injectable()

export class DataService {

  private items = new BehaviorSubject<any>(['music', 'movie', 'basketball']);
  item = this.items.asObservable();

  constructor() { }

  changeItem(item) {
    this.items.next(item);
  }
}
