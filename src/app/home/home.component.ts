import { Component, OnInit, Optional } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // animation triggers
    trigger('items', [
      // any state change
      transition('* => *', [
        query(
          ':enter', // Query for newly inserted element
          stagger('250ms', [
            animate(
              '.6s ease-in', // Duration is 600 milliseconds, easing in.
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
              ])
            )
          ]), { optional: true }),
          query(
            ':leave', //  Query for removed element
            stagger('250ms', [
              animate(
                '.6s ease-in',
                keyframes([
                  style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                  style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
                  style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 })
                ])
              )
            ]), { optional: true } )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount;
  btnText = 'Add item';
  wantText = 'Anyting';
  items = []; // empty
  constructor(private _data : DataService) {} // DataService Injection

  ngOnInit() {
    this._data.item.subscribe(res => this.items = res); // item subscribe
    this._data.changeItem(this.items); // item change
    this.itemCount = this.items.length;
  }

  addItem() {
    this.items.push(this.wantText);
    this.wantText = '';
    this.itemCount = this.items.length;
    this._data.changeItem(this.items); // item change
  }

  removeItem(i) {
    this.items.splice(i, 1);
    this.itemCount = this.items.length;
    this._data.changeItem(this.items); // item change
  }
}
