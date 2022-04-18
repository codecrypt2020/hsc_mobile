import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet} from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthStatusService } from './auth/auth-status.service';
import { AppConstantService } from './services/app-constant.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment as ENV } from '../environments/environment'
import { RestApiService } from './services/rest-api.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AlertController } from '@ionic/angular';
import { ConnectionStatusService } from './connection/connection-status.service';
import { Badge } from '@ionic-native/badge/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  //@ViewChild(RouterOutlet , {static : true}) outlet: RouterOutlet;
  ngOnInit(): void {
    // this.router.events.subscribe(e => {
    //   if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
    //     this.outlet.deactivate();
    // });
  }

  
  constructor(    
    public appConstant: AppConstantService,
    private authenticationService: AuthStatusService,
    private router: Router,  private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private alertCtrl:AlertController,
    private restApi:RestApiService,
    private internetStatus : ConnectionStatusService,
    private badge: Badge
    ) {
      this.initializeApp();
        window.addEventListener('offline', () => {
          internetStatus.connectionState.next(window.navigator.onLine);
          // this.showAlertNetStatus('You are Offline','Internet connection not available, App in offline mode',false);
        });
        window.addEventListener('online', () => {
          internetStatus.connectionState.next(window.navigator.onLine);
          
          // this.showAlertNetStatus('You are Online','Internet connection available',true);
        });
        this.internetStatus.connectionState.subscribe(state => {
          if(state){
          }
        });
    }

  
  initializeApp() {
    localStorage.setItem('current_selection','0');
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#fff');
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
    //this.loadMasterDetails()
    this.authenticationService.authenticationState.subscribe(state => {
     // this.loadMasterDetails();
     localStorage.setItem('load_inc','0')
     //this.router.navigateByUrl('/upload-doc');
      if (state) {
        localStorage.setItem('load_inc','1')
        this.loadUserAccess();
        this.setupOneSignal();
        this.saveOneSignalID()
        let user_role = this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE));
        if(user_role=='user'){
          this.router.navigateByUrl('/users');
        }else{
          this.router.navigateByUrl('/admin/tabs/action');
        }
      } else {
        this.router.navigateByUrl('/landing');
      }
     
    });
  }

  loadUserAccess(){
    let data = {};
    this.restApi.getNodeUserAccess(data).then((success) => {
      let showDetails =  success['data'][0];
      localStorage.setItem('org_name',showDetails['org_name'])
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
}

  setupOneSignal(){
    this.setupPush();
  }


  setupPush() {
    this.oneSignal.startInit("f38a59f0-8ba3-4321-9da8-76798d4e338a", "625160820680");
    
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(jsonData => {
      this.badge.increase(1);
      //  let msg = data.payload.body;
      //  let title = data.payload.title;
      //  let additionalData = data.payload.additionalData;
      //  this.showAlert(title, msg);
      // //  this.showAlert(title, additionalData);
      //  this.showAlert(title, JSON.parse(additionalData)); 
    
    });
 
    //Input data 
    // data:{"param": "issue"},
    // data:{"param": "inspection"},


    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(jsonData => {
      // Just a note that the data is a different place here!
         let jsonNoti = jsonData['notification'];
         let jsonPayload = jsonNoti['payload'];
         let jsonAdditionalData = jsonPayload['additionalData'];
         let typeOfScreen = jsonAdditionalData['param'];
         localStorage.setItem('is_noti_r','0')
      if(typeOfScreen=="issue"){
        let issue_id = '';
        try{
          issue_id =  jsonAdditionalData['id'];
        }catch(e){
          issue_id = ''
        }
        if(issue_id == '' || issue_id == null || issue_id == undefined){
          if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
            this.router.navigateByUrl('/users/tabs/home');
          }else{
            this.router.navigateByUrl('/admin/tabs/overview');
          } 
        }else{
            localStorage.setItem('is_noti_r','1')
            this.router.navigate(['/inc-response', {id: issue_id,status:'',type:'list'}]);
        }
        
      }else if(typeOfScreen=="inspection"){
        if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
          this.router.navigateByUrl('/users/tabs/inspections');
        }else{
          this.router.navigateByUrl('/admin/tabs/inspections');
        }
      }
      
    });

    this.oneSignal.enableVibrate(true);

    this.oneSignal.setSubscription(true);
 
    this.oneSignal.endInit();
   // this.appConstant.toastMsg('id');
    this.oneSignal.getIds().then((id) => {
       localStorage.setItem('player_id',id['userId']);

      //this.appConstant.toastMsg('id');
     // this.showAlert('id',JSON.stringify(id));
      this.saveOneSignalID();

    });
  }

  async presentAlertMultipleButtons(title,msg) {
    const alert = await this.alertCtrl.create({
      // my-custom-class
      cssClass: '',
      header: title,
      subHeader: '',
      message: msg,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          
        }
      }, {
        text: 'Okay',
        handler: () => {
         
        }
      }]
    });

    await alert.present();
  }

  saveOneSignalID(){
    let player_id = localStorage.getItem('player_id');
    if(player_id!=null){
      let dataObject = {
        user_id: localStorage.getItem(this.appConstant.TAG_IS_USER_ID),
        player_id: localStorage.getItem('player_id')
      };
      this.restApi.nodeStorePlayerID(dataObject).then((success) => {
      }, (error) => {
      });
    }else{
     // this.appConstant.toastMsg('Not onesignal id');
    }
  }

  async showAlert(title, msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }

  async showAlertNetStatus(title, msg,status) {
    this.appConstant.isInternet = status;
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (this.authenticationService.isAuthenticated()) {
              let user_role = this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE));
              if(user_role=='user'){
                this.router.navigateByUrl('/users');
              }else{
                this.router.navigateByUrl('/admin');
              }
            } else {
              this.router.navigateByUrl('/landing');
            }
          }
        }
      ]
    })
    alert.present();
  }


  // loadMasterDetails(){
  //   if(!this.appConstant.isInternet){
  //       return null;
  //   }else{
  //     this.restApi.getMasterDetails().then((success) => {
  //       localStorage.setItem(this.appConstant.TAG_MASTER_DETAILS, JSON.stringify(success));
  //     }, (error) => {
  //       this.appConstant.handleApiError(error)
  //     });
  //   }
  // }
}
