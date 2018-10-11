import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  Name = '';
  items: any; // declare variable

  constructor(private route: ActivatedRoute, private router: Router,private _data : DataService) {
    this.route.params.subscribe(res => {
      this.Name = res.name;
      console.log(res.name);
    });
  }

  ngOnInit() {
    this._data.item.subscribe(res => this.items = res); // item subscribe
  }

  backToHome() {
    this.router.navigate(['']);
  }

}
