import { DatePipe } from '@angular/common';
import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { AuthStatusService } from 'src/app/auth/auth-status.service';
import { ConnectionStatusService } from 'src/app/connection/connection-status.service';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';
import { UpdateIncListService } from 'src/app/services/update-inc-list.service';
import { UpdateStatusIncService } from 'src/app/services/update-status-inc.service';

@Component({
  selector: 'app-overview',
  templateUrl: 'overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class overviewPage implements OnInit {
  is_list = false;
  netStatus = true;
  constructor(private changeRef: ChangeDetectorRef, private platform:Platform, private restApi: RestApiService, private router: Router, private authService: AuthStatusService, private appConstant: AppConstantService,private updateListService:UpdateIncListService,  private connectionService:ConnectionStatusService) {
 
  }
  ngOnInit(): void {
    this.updateListService.updateListState.subscribe(state => {
      console.log('Inc List state :'+state)
      console.log(' dataUpdateAdminInc : '+localStorage.getItem("dataUpdateAdminInc"))
      if (state) {
       // if(localStorage.getItem("dataUpdateAdminInc")=='1'){
        this.appConstant.showLoading('Loading observations. Please wait');
          this.getAllIncident();
          this.is_list = true;
          this.changeRef.detectChanges(); 
          localStorage.setItem("dataUpdateAdminInc","0");
          this.updateListService.updateListState.next(false);
       // }
      } else {
      }
    });
    this.getplantListOverView(this.appConstant.getORGId());
  }

  doRefresh(event){
    setTimeout(() => {
     // this.appConstant.showLoading('Loading observations. Please wait');
      this.getAllIncident();
      event.target.complete();
    }, 2000);
  }


  onPlantChange(event){
    this.isHideSpan = false;
    let index = event.value.id;
    let name = event.value.name;
    this.plant_d_name = name;
    this.plant_id = index;
    this.getAllIncident();
  }

  plant = 'Site';
  plantList :any;
  plant_d_name = '';
  plant_id = ''
  isHideSpan = true;
  getplantListOverView(org_id) { 
  //   let data= { 
  //     org_id :  org_id,
  //     emp_id :  localStorage.getItem(this.appConstant.TAG_IS_USER_ID)
  //   }
  //   this.restApi.getPlantList(data).then((success) => {
  //      this.plantList = success['data'][0];
  //      this.plant_d_name = this.plantList[0]['name'];
  //      this.plant_id = this.plantList[0]['id']
  //      this.getAllIncident();
  //  }, (error) => {
  //    this.appConstant.handleApiError(error)
  //  });
  let nData = {
    "searchText":"",
    "sortby":"id",
    "page":0,
    "whereData":[
      {"field":"`plant`.`organization_ref_id`","value":this.appConstant.getORGId(),"type":"AND","nested":""},
      {"field":"`plant`.`id`","value":this.appConstant.getPlantId(),"type":"AND","nested":""}
    ]
  }
  this.restApi.nodeGetPlantByOrgId(nData).then((success) => {
           this.plantList = success['data'];
          this.plant_d_name = this.plantList[0]['name'];
          this.plant_id = this.plantList[0]['id']
          this.getAllIncident();
  }, (error) => {
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

  ionViewDidEnter(){
    //if(this.connectionService.isConnectionAvailable()){
      this.getAllIncident();
    // }else{
    //   let storedObj = localStorage.getItem('issue_details')
    //   this.incidentList = (storedObj==null)?[]: JSON.parse(storedObj)
    //   this.is_list = true;
    //   this.changeRef.detectChanges(); 

    // }
   }

   addIncident(){
      this.router.navigateByUrl('/incident-details');
   }

  //  getAreaByID(area_id){
  //    return this.appConstant.getAreaNameById(area_id)['name']
  //  }

   openInc_res(inc_id,status, index){
    if(this.connectionService.isConnectionAvailable()){
      this.router.navigate(['/inc-response', {id: inc_id,status:status,type:'list'}]);
    }
  }

   incidentList =[];
   incidentListData =[];
   isEmptyList = false;
   txtMSG = "Loading..."
   index = 0;
   getAllIncident() { 
    if(localStorage.getItem('load_inc')=='1'){
      this.appConstant.showLoading('Loading observations. Please wait');
      localStorage.setItem('load_inc','0')
    }
    this.index++;
    this.totalPages = 0;
    this.currentPage = 0
    this.incidentList =[];
    this.isEmptyList = false;
    this.is_list = false;
    this.txtMSG = "Loading..."
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
      "whereData":[
      {"field":"`incident_details`.`plant_ref_id`","value":this.plant_id,"type":"AND","nested":""}]}
    
     this.restApi.getIssueListByFilter(data).then((success) => {
       this.incidentList =[];
       this.incidentListData =[];
        this.incidentListData = success['data'];
        if(this.incidentListData.length>0){
          this.isEmptyList = false;
          this.txtMSG =""
        }else{
          this.isEmptyList = true;
          this.txtMSG ="Issue not available."
        }
         this.totalPages = Math.floor(this.incidentListData.length/this.pageStep)
         let pendingItems = this.incidentListData.length%this.pageStep
         if(pendingItems>0){
          this.totalPages+=1;
         }
         this.showPageList();
        this.is_list = true;
        this.appConstant.dismissLoading()
    }, (error) => {
      this.appConstant.dismissLoading()
      this.appConstant.handleApiError(error)
    });
  }

  totalPages = 0
  currentPage = 0
  pageStep=10;
  showPageList(){
    let startIndex = this.currentPage*10;
    let endIndex = startIndex+this.pageStep;
    let list = this.incidentListData.slice(startIndex,endIndex)
    this.incidentList =  this.incidentList.concat(list)
  }

  isEnd = false;
  doInfinite(event){
    if(this.currentPage<(this.totalPages-1)){
      this.currentPage++;
      this.showPageList();
    }else{
      this.isEnd = true;
    }
   event.target.complete();
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
}
