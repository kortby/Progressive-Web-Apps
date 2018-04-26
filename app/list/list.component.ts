import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/Coffee';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: [Coffee];

  constructor(
    private data: DataService, 
    private router: Router,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.data.getList(
      list => {
        this.list = list;
      }
    );
  }


  goDetails(coffee: Coffee) {
    this.router.navigate(['/coffee', coffee._id]);
  }

  goMap(coffee: Coffee) {
    const mapUrl = this.geolocationService.getMapLink(coffee.location);
  }

  share(coffee: Coffee) {
    const shareText = `I had this coffee at ${coffee.place}`;
    if( 'share' in navigator) {
      navigator["share"]({
        title: coffee.name,
        text: shareText,
        url: window.location.href
      }).then(
        () => console.log('shared!')
      ).catch(
        () => console.log("error sharing")
      )
    } else {
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareURL;
    }
  }

}
