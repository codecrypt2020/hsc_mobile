import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Platform } from '@ionic/angular';
import { AuthStatusService } from 'src/app/auth/auth-status.service';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';
import { interval, observable,Subscription } from 'rxjs';
import { UpdateIncListService } from 'src/app/services/update-inc-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class homePage  implements OnInit{
  is_list = false;
  constructor(private platform:Platform, private restApi: RestApiService, private router: Router,
    private appConstant: AppConstantService,private updateListService: UpdateIncListService,) {

   }
  ngOnInit(): void {
    this.saveOneSignalID();
    // this.updateData.dataChangeState.subscribe(state => {
    //   if (state) {
    //     this.getNotiCount();
    //     this.getAllIncident(false);
    //     localStorage.setItem("dataUpdate","0");
    //     this.updateData.dataChangeState.next(false);
    //   } else {
    //   }
    // });
    this.updateListService.updateListState.subscribe(state => {
      console.log('Inc List state :'+state)
      console.log(' dataUpdateAdminInc : '+localStorage.getItem("dataUpdateAdminInc"))
      if (state) {
       // if(localStorage.getItem("dataUpdateAdminInc")=='1'){
        this.appConstant.showLoading('Loading observations. Please wait');
        this.getNotiCount();
        this.getAllIncident();
        localStorage.setItem("dataUpdateAdminInc","0");
        this.updateListService.updateListState.next(false);
       // }
      } else {
      }
    });
    this.getNotiCount();
    interval(10000).subscribe(() => {
      this.getNotiCount();
    });
  }

  getNotiCount(){
    let data= this.appConstant.getNotiData()
    this.restApi.getNodeNCount(data).then((success) => {
      console.log(success)
      let nCount = success['data'][0]['count'];
      this.appConstant.getCurrentCount(nCount)
      this.notificatioCount = localStorage.getItem("noti_count") 
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }

  getFormatedDate(date){
    let date2 =  date.replace(' ','T');
    const datePipe = new DatePipe("en-US");
    const final_date = datePipe.transform(date2, 'dd.MM.YYYY');
    let ShowTime = '';
    let final_time = date2.split('T')[1]; 
    let finalTime = final_time.substring(0,final_time.length-1);
    let dTime = finalTime.split(':')[0];
    if(dTime>=12){
      if(dTime==12){
        ShowTime = '12'+":"+finalTime.split(':')[1]+" PM"
      }else{
        let fTime = dTime-12;
        ShowTime = fTime+":"+finalTime.split(':')[1]+" PM"
      }
     
    }else{
      ShowTime = finalTime.split(':')[0]+":"+finalTime.split(':')[1]+" AM"
    }
    return final_date + ' | ' +ShowTime;
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
        //this.appConstant.toastMsg('Not onesignal id');
      }
  }

  getDays(incident){
      let currentdate = incident['updated_at'];
      const today1 =  new Date();
      var date1 = new Date(today1); 
      var date2 = new Date(currentdate); 
    
      var Time = date1.getTime() - date2.getTime(); 
      var Days = Time / (1000 * 3600 * 24);
      if(isNaN(Days)){
        return 0
      }else{
        return Math.floor(Days);
      }
  }

  doRefresh(event){
    setTimeout(() => {
     // this.appConstant.showLoading('Loading observations. Please wait');
      this.getAllIncident();
      event.target.complete();
    }, 2000);
  }

  openInc_res(inc_id,status, index){
    this.router.navigate(['/inc-response', {id: inc_id,status:status,type:'list'}]);
  }

   ionViewDidEnter(){
       this.getAllIncident();
    }

   addIncident(){
      this.router.navigateByUrl('/incident-details');
   }

  //  getAreaByID(area_id){
  //    return this.appConstant.getAreaNameById(area_id)['name']
  //  }

   incidentList = [];
   getAllIncident() { 
    let data = {
      "searchText":"",
      "sortby":"id",
      "category":"",
      "status":"",
      "severity":"",
      "plant":"",
      "area":"",
      "emp":"",
      "date":"",
      "sorttype":"desc",
      "page":0,
      "limit":10,
    }
    if(localStorage.getItem('load_inc')=='1'){
      this.appConstant.showLoading('Loading observations. Please wait');
      localStorage.setItem('load_inc','0')
    }
   
     this.restApi.getIssueListByFilter(data).then((success) => {
     //   localStorage.setItem('load_inc','1')
            this.incidentList = []
          this.incidentList = success['data'];
          this.is_list = true;
          this.appConstant.dismissLoading()
    }, (error) => {
      this.appConstant.dismissLoading()
      this.appConstant.handleApiError(error)
    });
    // let userData = localStorage.getItem(this.appConstant.TAG_USER_DETAILS);
    // let plant_id_ = JSON.parse(userData)['plant_ref_id'];
    // let org_id_ = JSON.parse(userData)['organization_ref_id'];
    //  let data= {
    //   user_id :  localStorage.getItem(this.appConstant.TAG_IS_USER_ID),
    //   plant_id : plant_id_,
    //   org_id : org_id_
    //  }
    //  this.is_list = false;
    //  this.restApi.getAllIncidentUsers(data).then((success) => {
    //   this.incidentList = []
    //   this.incidentList = success['data'][0];
    //   this.is_list = true;
    // }, (error) => {
    //   this.appConstant.handleApiError(error)
    // });
  }

  getIncidentListLength(){
    try{
      if(this.incidentList.length==0){
        return false
      }else{
        return true
      }
    }catch(e){
    }
  }

  notificatioCount = '00';
  openNotiFication(){
    this.router.navigateByUrl('/notifications');
  }

}
