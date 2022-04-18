import { Component, OnInit } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private platform:Platform,private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        navigator['app'].exitApp();
      }
    }); 
  }

}
