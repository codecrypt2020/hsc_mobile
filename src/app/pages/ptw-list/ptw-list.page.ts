import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DatePipe } from '@angular/common';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ModalController } from '@ionic/angular';
import { CalendarModal, CalendarModalOptions, DayConfig,CalendarResult } from 'ion2-calendar';

@Component({
  selector: 'app-ptw-list',
  templateUrl: './ptw-list.page.html',
  styleUrls: ['./ptw-list.page.scss'],
})
export class PtwListPage implements OnInit {

  cat_id;
  cat_name;
  cat_list = []
  is_list = false;

     /************************* Anjuman****************** */
     d = new Date();
     todayDate = this.d.getFullYear()+'-'+(this.d.getMonth()+1)+'-'+this.d.getDate();
     selectedStartDate = this.todayDate;
      selectedEndDate = this.d.getFullYear()+'-'+(this.d.getMonth()+1)+'-'+this.d.getDate();
     minDate;
     maxDate;
    /************************* Anjuman Ends****************** */

  contractorTypeList = [{id:1,name:'Internal'},{id:2,name:'Register Vendor'},{id:3,name:'Un-Register Vendor'}]
  constructor(private router:Router,private restApi:RestApiService,private activatedRoute:ActivatedRoute,private appCOnstant:AppConstantService,private modalCtrl:ModalController) { 
      
  }

  async calendarModal() {   
    const options: CalendarModalOptions = {
      pickMode: 'range',
      from: new Date(2021, 0, 1),
      to: new Date(2022, 12, 1),
      title:'Date',
      color : 'secondary',
      closeLabel : 'Cancel',
      doneLabel : 'Done',
      defaultScrollTo: new Date()
    };
 
 let calendarUi =  await this.modalCtrl.create({
   component: CalendarModal,
   componentProps: { options }
 });
 
 calendarUi.present();
 const event: any = await calendarUi.onDidDismiss();
 const date: CalendarResult = event.data;
 if(date!=null){
  this.minDate = date['from']['string']
  this.maxDate = date['to']['string']
  this.dateList = [];
  this.dateList.push(this.minDate);
  this.dateList.push(this.maxDate);
  this.isDateFilter = true
  this.loadPtwList();
 }
 }

  getLastSelectionD(){
    const datePipe = new DatePipe("en-US");
    const lastSelectionDay =  new Date();
    var lastSelectionDayF = new Date().setDate(lastSelectionDay.getDate()+30)
    this.selectedEndDate = datePipe.transform(lastSelectionDayF, 'YYY-MM-dd');
     return this.selectedEndDate;
  }

  initDate(){
    const datePipe = new DatePipe("en-US");
    const today1 =  new Date();
    var priorDateMax = new Date().setDate(today1.getDate()+30)
    this.maxDate = datePipe.transform(priorDateMax, 'YYY-MM-dd');
    var today = new Date()
    var priorDateMin = new Date().setDate(today.getDate()-180)
    this.minDate = datePipe.transform(priorDateMin, 'YYY-MM-dd');
  }


  getContractName(id){
    return this.contractorTypeList[Number(id)-1]['name']
  }

  ionViewDidEnter(){
    this.initDate();
    this.cat_id = this.activatedRoute.snapshot.paramMap.get('cat_id');
    this.cat_name = this.activatedRoute.snapshot.paramMap.get('cat_name');
    this.loadPtwList()
    this.loadCatList()
  }

  isExpiredPTW(lastDatePTW){
    const datePipe = new DatePipe("en-US");
    const today1 =  new Date();
    var priorDateMax = new Date().setDate(today1.getDate())
    let currentDate = datePipe.transform(priorDateMax, 'YYY-MM-dd');
    let todayDate = new Date(currentDate);
    
    let lastDateDB = datePipe.transform(lastDatePTW, 'YYY-MM-dd');
    let lastDate = new Date(lastDateDB);
    //console.log(todayDate +" : "+ lastDate)
    return todayDate.getTime() > lastDate.getTime()
  }

  loadCatList(){
    let data = {
      page: 0,
      searchText: "",
      sortby: "id"
    }
    this.restApi.getPTWCategory(data).then((success) => {
      this.cat_list = success['data']
    }, (error) => {
    });
  }

  ngOnInit() {
  }


  openDetails(id,catName){
    let catItem =  this.cat_list.find(x => x.cat_name == catName).id;
    this.router.navigate(['ptw-details',{ptw_id:id,cat_id:catItem,cat_name:this.cat_name}]);
  }

  addPTW(){
    let catName =  this.cat_list.find(x => x.id == this.cat_id).cat_name;
    this.router.navigate(['add-ptw',{cat_id:this.cat_id,cat_name:catName,r_by:'pwt_list',update_id:''}]);
  }

  extendPTW(id,catName){
    this.router.navigate(['extend-ptw',{cat_id:this.cat_id,cat_name:catName,r_by:'pwt_list',update_id:id}]);
  }

  goBack(){
      this.router.navigateByUrl('/admin/tabs/ptw');
  }

  clearDateFilter(){
    this.dateList=[];
    this.isDateFilter = false
    this.loadPtwList();
  }

 isDateFilter = false;
 dateList= []
 ptwList =[]
  loadPtwList(){
    let data = {
      page: 0,
      searchText: "",
      sortby: "id",
      limit: 0,
      dateRange: this.dateList,
      org_ref_id: this.appCOnstant.getORGId(),
      plant_Id: this.appCOnstant.getPlantId(),
      sorttype: "desc",
      status: "",
      whereData: [{"field":"`work_permit`.`permit_cat_ref_id`","value":this.cat_id,"type":"AND","nested":""}]
    }
    this.restApi.getPTWList(data).then((success) => {
      this.ptwList =[]
      this.ptwList = success['data']
      this.is_list = true;
    }, (error) => {
     // console.log(error);
    });
  }

  segmentModel = 'all';
  segmentChanged(ev: any) {
    this.segmentModel = ev['detail']['value'];
  }
}
