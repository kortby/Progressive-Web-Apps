import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coffee } from '../logic/Coffee';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit, OnDestroy {

  coffee: Coffee;
  tastingEnabled: boolean = false;

  types = ['capationo', 'espreso', 'normal', 'frape'];

  constructor(
    private route: ActivatedRoute, 
    private geolocation: GeolocationService,
    private router: Router,
    private dataService: DataService
  ) { }

  routingSubscription : any;


  tastingRatingChanged(checked: boolean) {
    if(checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  ngOnInit() {
    this.coffee = new Coffee();
    
    this. routingSubscription = this.route.params.subscribe(
      params => {
        if(params['id']) {
          this.dataService.get(params['id'], response => {
              this.coffee = response;
              if(this.coffee.tastingRating) {
                this.tastingEnabled = true;
              }
            }
          );
        }
      }
    );

    this.geolocation.requestLocation(
      location => {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    )
  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  onSave() {
    this.dataService.save(this.coffee,result => {
      if(result) {
        this.router.navigate(['/']);
      }
    })
  }

}
