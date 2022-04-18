import { Component, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Badge } from '@ionic-native/badge/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { IonTabs } from '@ionic/angular';
import { interval } from 'rxjs';
import { ConnectionStatusService } from 'src/app/connection/connection-status.service';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  netStatus = this.appConstant.getNetStatus()
  @ViewChild('tabs', { static: false }) tabs: IonTabs;

  showDetails = [];
  constructor(private router: Router,private connectionService:ConnectionStatusService,private appConstant : AppConstantService,private restApi:RestApiService,
    private badge : Badge,private onesignal:OneSignal,private alertCtrl:AlertController,private platform:Platform) {
      this.showDetails['issue_selected']=1 
    this.connectionService.connectionState.subscribe(state => {
      this.netStatus=state;
    });
    try {
      let uD = localStorage.getItem('user_details')
      let email = JSON.parse(uD)['emp_email'];
      onesignal.setEmail(email).then((id) => {
      });
    } catch (error) {
    }
    //this.checkForUpdate();
    this. loadUserAccessDefault();
    interval(10000).subscribe(() => {
      this.loadUserAccess();
      this.getNotiCount();
     // this.checkForUpdate()
    });
  }
  
  alert:any;
  async showUpdateForce(title, msg,d_type) {
    if(this.alert == undefined || this.alert==null){
      console.log('inside if')
      this.alert = await this.alertCtrl.create({
        header: title,
        subHeader: msg,
        backdropDismiss: false,
        buttons: [
          // {
          //   text: 'Exit',
          //   handler: () => {
          //     navigator['app'].exitApp();
          //   }
          // },
          {
            text: 'Update',
            handler: () => {
              if(d_type=='ios'){
                   window.open("https://apps.apple.com/vn/app/misafe-by-momentumindia/id1571452822","_system");
              }else{
                   window.open("https://play.google.com/store/apps/details?id=com.mi.hse.app","_system");
              }
              this.alert = null
            }
          }
        ]
      })
      this.alert.present();
    }
  }

  checkForUpdate(){
      this.restApi.nodeGetForceUpdate().then((success) => {
        let isForceUpdate = success['data'][0]['is_force_update']
        if(isForceUpdate=='true'){
          if(this.platform.is('ios')){
            let ios_version_fu = success['data'][0]['ios_b_version']
           if(Number(ios_version_fu)>Number(this.appConstant.APP_IOS_BUILD)){
              this.showUpdateForce('New update',success['data'][0]['ios_message'],'ios');
            }else{
              if(this.alert != undefined && this.alert!=null){
                this.alert.dismiss();
              }
            }
          }else if(this.platform.is('android')){
            let ios_fu = success['data'][0]['android_b_version']
            if(Number(ios_fu)>Number(this.appConstant.APP_ANDROID_BUILD)){
              this.showUpdateForce('New update',success['data'][0]['android_message'],'android');
            }else{
              if(this.alert != undefined && this.alert!=null){
                this.alert.dismiss();
              }
            }
          }else{
            console.log('No platform detect true');
          }
        }else{
          console.log('False : No Update app')
        }
      }, (error) => {
          this.appConstant.handleApiError(error)
      });
  }

  selectedTab;
  setCurrentTab() {
    localStorage.setItem('default_tab',this.tabs.getSelected())
  }

  loadUserAccess(){
    if(!this.appConstant.isInternet){
        return null;
    }else{
      let data = {};
      this.restApi.getNodeUserAccess(data).then((success) => {
        this.showDetails =  success['data'][0];
        //this.tabs.select(localStorage.getItem('default_tab'))
        localStorage.setItem('org_name',this.showDetails['org_name'])
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }

  loadUserAccessDefault(){
    if(!this.appConstant.isInternet){
        return null;
    }else{
      let data = {};
      this.restApi.getNodeUserAccess(data).then((success) => {
        this.showDetails =  success['data'][0];
        if(this.showDetails['issue_selected']==1 || this.showDetails['sd_selected']==1 || this.showDetails['checklist_selected']==1 || this.showDetails['work_permit_selected']==1){
          //this.tabs.select('action')
          this.router.navigateByUrl('/admin/tabs/action');
          //localStorage.setItem('default_tab','action')
        }else{
          //this.tabs.select('profile')
          this.router.navigateByUrl('/admin/tabs/profile');
          //localStorage.setItem('default_tab','profile')
        }
        // if(this.showDetails['sd_selected']==1){
        // }
        // if(this.showDetails['checklist_selected']==1){
        // }
        // if(this.showDetails['work_permit_selected']==1){
        // }
        // if( localStorage.getItem('is_noti_r')=='0'){
        //   if(this.isUAUC){
        //     this.router.navigateByUrl('/admin/tabs/action');
        //   }else if(this.isSD){
        //     this.router.navigateByUrl('/admin/tabs/self-dreports');
        //   }else if(this.isChecklist){
        //     this.router.navigateByUrl('/admin/tabs/inspections');
        //   }else{
        //     this.router.navigateByUrl('/admin/tabs/profile');
        //   }
        // }
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }  

  notificatioCount = '0';
  getNotiCount(){
    let data= this.appConstant.getNotiData()
    this.restApi.getNodeNCount(data).then((success) => {
      let nCount = success['data'][0]['count'];
      this.appConstant.getCurrentCount(nCount)
      this.notificatioCount = localStorage.getItem("noti_count") 
      if(Number(this.notificatioCount)<1){
        this.badge.clear()
      }else{
        this.badge.set(Number(this.notificatioCount));
      }
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  } 
}
