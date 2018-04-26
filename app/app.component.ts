import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private snackBar: MatSnackBar) {}


  ngOnInit() {
    if((navigator as any).standalone == false) {
      this.snackBar.open('Install the App on your Phone', '', {duration: 3000});
    } 
    
    if((navigator as any).standalone == undefined) {
      if(window.matchMedia('(display-mode: browser').matches) {
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackBar.open('Do you want to install this app?', 'Install', {duration: 3000});
          sb.onAction().subscribe( () => {
            (event as any).prompt();
            (event as any).userChoice.then( result => {
              if(result.outcome == 'dismissed') {

              } else {

              }
            });
          }); 
        })
      }
    } 
  }
  
}
