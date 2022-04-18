import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild , ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, PopoverController } from '@ionic/angular';
import { AuthStatusService } from 'src/app/auth/auth-status.service';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { CalendarModal, CalendarModalOptions, DayConfig,CalendarResult } from 'ion2-calendar';


import { Chart, ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip } from 'chart.js';
import { ModalController } from '@ionic/angular';
import { ConnectionStatusService } from 'src/app/connection/connection-status.service';
import { Badge } from '@ionic-native/badge/ngx';
import { interval, observable,Subscription } from 'rxjs';
import { EmplistPage } from '../emplist/emplist.page';

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Filler,
    Legend,
    Title,
    Tooltip
  );

@Component({
  selector: 'app-action',
  templateUrl: 'action.page.html',
  styleUrls: ['action.page.scss']
})
export class actionPage implements OnInit {

  @ViewChild('doughnutCanvas', {static: true}) private doughnutCanvas: ElementRef;
  @ViewChild('doughnutCanvasStatus', {static: true}) private doughnutCanvasStatus: ElementRef;
  
  @ViewChild('horizontalCanvas', {static: true}) private horizontalCanvas: ElementRef;
  @ViewChild('doughnutCanvasByArea', {static: true}) private doughnutCanvasByArea: ElementRef;
  @ViewChild('doughnutCanvasByCat', {static: true}) private doughnutCanvasByCat: ElementRef;
  @ViewChild('scorePercentage', {static: true}) private scorePercentage: ElementRef;
  @ViewChild('doughnutCanvasByAreaCHK', {static: true}) private doughnutCanvasByAreaCHK: ElementRef;
  @ViewChild('doughnutCanvasByPtwCat', {static: true}) private doughnutCanvasByPtwCat: ElementRef;
  @ViewChild('doughnutCanvasByPtwActivity', {static: true}) private doughnutCanvasByPtwActivity: ElementRef;
  
  
  doughnutChart: any;
  doughnutStatusChart: any;
  
  doughnutChartByArea: any;
  doughnutChartByCat: any;
  horizontalChart : any;
  scorePercentageChart : any

  doughnutChartByAreaCHK: any;
  doughnutChartByPTWCat: any;
  doughnutChartByPtwActivity :any;

  is_list = false;
  start_date;
  end_date;
  plant_name ="";
  org_id = "";
  emp_id;
  minDate;
  maxDate;
  plant = 'Plant';

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  //currentDashbord  = 'c_d';
  bColor = '#F0F4F8'//#f5f5f5
  netStatus = true;
  showLoader = false
  subscription: Subscription;
  subscriptionLoadTime: Subscription;

  dateTest:any
  constructor(private platform:Platform, private restApi: RestApiService, private router: Router, private authService: AuthStatusService, private appConstant: AppConstantService,private modalCtrl:ModalController,
    private connectionService:ConnectionStatusService,private badge:Badge,private popoverController:PopoverController,private modalController:ModalController,
    private alertController:AlertController,private changeRef: ChangeDetectorRef,) {
      localStorage.setItem('load_d',null)
      localStorage.setItem('status_d',null)
      this.connectionService.connectionState.subscribe(state => {
      this.netStatus=state;
      if(!state){
        this.router.navigateByUrl('/admin/tabs/overview');
      }
    });
    interval(10000).subscribe(() => {
      this.getNotiCount();
      this.loadUserAccess();
     // this.getAllCategories();
    });

    interval(20000).subscribe(() => {
      this.showLoader = true;
      this.loadDashboard();
      this.subscription = interval(2000).subscribe(() => {
        this.showLoader = false;
        this.subscription.unsubscribe();
      });
    });

    this.subscriptionLoadTime = interval(3000).subscribe(() => {
        this.showLoader = false;
        this.subscriptionLoadTime.unsubscribe();
      });
     // appConstant.toastMsg('Converted String : '+this.getEncode(12));
  }  

  

  dateList = []
  isDateFilter = false
  async calendarModal() {   
      const options: CalendarModalOptions = {
        pickMode: 'range',
        from: new Date(2021, 0, 1),
        to: new Date(),
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
      //console.log(this.dateList);
      localStorage.setItem('load_d',null)
      this.loadDashboard();
  }
 }

  doRefresh(event){ 
    setTimeout(() => {
     // this.dummyList = Array(5);
      event.target.complete();
    }, 1500); 
  }

  // isShowSegment(id){
  //   if(id==this.currentDashbord){
  //     return false
  //   }else{
  //     return true
  //   }
  // }
  
  is_UAUC = true;
  isIssue = true;
  segmentChanged(selectedOption) {
    if(selectedOption=='uauc'){
      localStorage.setItem('current_selection','1');
      this.userAccess[0]['is_selected'] = true
      this.userAccess[1]['is_selected'] = false
      this.userAccess[2]['is_selected'] = false
      this.userAccess[3]['is_selected'] = false
      this.isUAUC = true;
      this.isChecklist = false;
      this.is_ptw = false;
      this.is_sd = false;
    }else if(selectedOption=='chkList'){
      localStorage.setItem('current_selection','2');
      this.userAccess[0]['is_selected'] = false
      this.userAccess[1]['is_selected'] = true
      this.userAccess[2]['is_selected'] = false
      this.userAccess[3]['is_selected'] = false
      this.isUAUC = false;
      this.isChecklist = true;
      this.is_ptw = false;
      this.is_sd = false;
    }else if(selectedOption=='ptw'){
      localStorage.setItem('current_selection','3');
      this.userAccess[0]['is_selected'] = false
      this.userAccess[1]['is_selected'] = false
      this.userAccess[2]['is_selected'] = true
      this.userAccess[3]['is_selected'] = false
      this.isUAUC = false;
      this.isChecklist = false;
      this.is_ptw = true;
      this.is_sd = false;
    }else if(selectedOption=='sd'){
      localStorage.setItem('current_selection','4');
      this.userAccess[0]['is_selected'] = false
      this.userAccess[1]['is_selected'] = false
      this.userAccess[2]['is_selected'] = false
      this.userAccess[3]['is_selected'] = true
      this.isUAUC = false;
      this.isChecklist = false;
      this.is_ptw = false;
      this.is_sd = true;
    }
    // this.currentDashbord = selectedOption
    // if(this.currentDashbord=='i_d'){
    //   this.isIssue = true;
    // }else{
    //   this.isIssue = false;
    // }
  }

  notificatioCount = '0';
  getNotiCount(){
    let data= this.appConstant.getNotiData()
    this.restApi.getNodeNCount(data).then((success) => {
      let nCount = success['data'][0]['count'];
      this.appConstant.getCurrentCount(nCount)
      this.notificatioCount = localStorage.getItem("noti_count") 
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }
    
  ngOnInit(): void {
    const datePipe = new DatePipe("en-US");
    const today1 =  new Date();
    var priorDateMax = new Date().setDate(today1.getDate())
    this.maxDate = datePipe.transform(priorDateMax, 'YYY-MM-dd');
    var today = new Date()
    var priorDateMin = new Date().setDate(today.getDate()-360)
    this.minDate = datePipe.transform(priorDateMin, 'YYY-MM-dd');
    this.getNotiCount();
    this.loadUserAccess();
    this.loadData();
  }


  loadData(){
    this.getOrgList();
    this.loadChecklistCat();
    this.loadPTWStats();
    this.loadPTWDashboard();
    this.loadPTWCatDashboard();
    this.getPTWOpen();
    //this.initOfflineMode();
  }

  isChecklist = false;
  isUAUC = false;
  is_ptw = false;
  is_sd = false;
  userAccess = []
  loadUserAccess(){
    if(!this.appConstant.isInternet){
        return null;
    }else{

      let data = {};
      this.restApi.getNodeUserAccess(data).then((success) => {
        //console.log(success)
        this.isSelectionPresent(success);
        this.userAccess = []
        let uauc ={
          id : 0,
          name : 'UA-UC',
          is_show : success['data'][0]['issue_selected']==1?true:false,
          is_selected : (localStorage.getItem('current_selection')=='1')?true:false,
          s_id : 'uauc',
          img : 'i_d.png',
          s_img : 'i_m.png'
        }

        let chkList ={
          id : 1,
          name : 'Inspection',
          is_show : success['data'][0]['checklist_selected']==1?true:false,
          is_selected :  (localStorage.getItem('current_selection')=='2')?true:false,
          s_id : 'chkList',
          img : 'chk_d.png',
          s_img : 'chk_m.png'
        }

        let ptw ={
          id : 2,
          name : 'PTW',
          is_show : success['data'][0]['work_permit_selected']==1?true:false,
          is_selected :  (localStorage.getItem('current_selection')=='3')?true:false,
          s_id : 'ptw',
          img : 'ptw_d.png',
          s_img : 'ptw_s.png'
        }

        let sd ={
          id : 3,
          name : 'SD',
          is_show : success['data'][0]['sd_selected']==1?true:false,
          is_selected :  (localStorage.getItem('current_selection')=='4')?true:false,
          s_id : 'sd',
          img : 'i_m.png',
          s_img : 'i_m.png'
        }

        this.userAccess.push(uauc);
        this.userAccess.push(chkList);
        this.userAccess.push(ptw);
        this.userAccess.push(sd);
        this.setSelection()
        this.initData();
       
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }

  isSelectionPresent(success){
    try{
      if(localStorage.getItem('current_selection')=='1'){ 
        if(success['data'][0]['issue_selected']==1){
        }else{
          localStorage.setItem('current_selection','0')
        }
      }else if(localStorage.getItem('current_selection')=='2'){
        if(success['data'][0]['checklist_selected']==1){
        }else{
          localStorage.setItem('current_selection','0')
        }
      }else if(localStorage.getItem('current_selection')=='3'){
        if(success['data'][0]['work_permit_selected']==1){
        }else{
          localStorage.setItem('current_selection','0')
        }
      }else if(localStorage.getItem('current_selection')=='4'){
        if(success['data'][0]['sd_selected']==1){
        }else{
          localStorage.setItem('current_selection','0')
        }
      }
    }catch(e){
    }
  }

  setSelection(){
    let current_selection = '0'
        try{
          current_selection = localStorage.getItem('current_selection');
        }catch(e){
          current_selection = '0'
        }
        if(current_selection =='0' || current_selection == null){
          if(this.userAccess[0]['is_show']){
            localStorage.setItem('current_selection','1');
            this.userAccess[0]['is_selected'] = true
            this.userAccess[1]['is_selected'] = false
            this.userAccess[2]['is_selected'] = false
            this.userAccess[3]['is_selected'] = false
            this.isUAUC = true;
            this.isChecklist = false;
            this.is_ptw = false;
            this.is_sd = false;
          }else if(this.userAccess[1]['is_show']){
            localStorage.setItem('current_selection','2');
            this.userAccess[0]['is_selected'] = false
            this.userAccess[1]['is_selected'] = true
            this.userAccess[2]['is_selected'] = false
            this.userAccess[3]['is_selected'] = false
            this.isUAUC = false;
            this.isChecklist = true;
            this.is_ptw = false;
            this.is_sd = false;
          }else if(this.userAccess[2]['is_show']){
            localStorage.setItem('current_selection','3');
            this.userAccess[0]['is_selected'] = false
            this.userAccess[1]['is_selected'] = false
            this.userAccess[2]['is_selected'] = true
            this.userAccess[3]['is_selected'] = false
            this.isUAUC = false;
            this.isChecklist = false;
            this.is_ptw = true;
            this.is_sd = false;
          }else if(this.userAccess[3]['is_show']){
            localStorage.setItem('current_selection','4');
            this.userAccess[0]['is_selected'] = false
            this.userAccess[1]['is_selected'] = false
            this.userAccess[2]['is_selected'] = false
            this.userAccess[3]['is_selected'] = true
            this.isUAUC = false;
            this.isChecklist = false;
            this.is_ptw = false;
            this.is_sd = true;
          }else{
            this.router.navigateByUrl('/admin/tabs/profile');
          }
        }else{
          if(localStorage.getItem('current_selection')=='1'){
            this.isUAUC = true;
            this.isChecklist = false;
            this.is_ptw = false;
            this.is_sd = false;
          }else if(localStorage.getItem('current_selection')=='2'){
            this.isUAUC = false;
            this.isChecklist = true;
            this.is_ptw = false;
            this.is_sd = false;
          }else if(localStorage.getItem('current_selection')=='3'){
            this.isUAUC = false;
            this.isChecklist = false;
            this.is_ptw = true;
            this.is_sd = false;
          }else if(localStorage.getItem('current_selection')=='4'){
            this.isUAUC = false;
            this.isChecklist = false;
            this.is_ptw = false;
            this.is_sd = true;
          }
        }
  }

  initData(){
    this.loadUserProfile();
      this.saveOneSignalID();
  }

  userDetails : any
  profileImg : any;
  userName = ''
  userRole = ''
  loadUserProfile(){
    let data= {
      user_id :  localStorage.getItem(this.appConstant.TAG_IS_USER_ID)
     }
    this.restApi.loadUserDetails(data).then((success) => {
      this.userDetails = success['data'][0];
         this.userName = this.userDetails['emp_name']
       localStorage.setItem(this.appConstant.TAG_USER_DETAILS, JSON.stringify(this.userDetails));
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }

  ptw_stats ={};
  loadPTWStats(){
    let data= {
      plant_Id :  this.appConstant.getPlantId()
     }
    this.restApi.getPTWStats(data).then((success) => {
     this.ptw_stats = success;
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }

  ptw_dashboard ={};
  loadPTWDashboard(){
    let data= {
      plant_Id :  this.appConstant.getPlantId()
     }
    this.restApi.getPTWDashboard(data).then((success) => {
      this.ptwChartByActivity(success['date'],success['openn'])
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }

  isShowPTWCat = true;
  ptw_cat_dashboard ={};
  loadPTWCatDashboard(){
    let data= {
      plant_Id :  this.appConstant.getPlantId()
     }
    this.restApi.getPTWCatDashboard(data).then((success) => {
      this.ptwChartByCat(success['name'],success['data']);
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }

  ptw_open = '0';
  getPTWOpen(){
    let data= {
      plant_Id :  this.appConstant.getPlantId()
     }
    this.restApi.getPTWTOpen(data).then((success) => {
      this.ptw_open = success['data'];
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }

  // getDesiganation(){
  //   let des=this.appConstant.getDegignationNameById(this.userDetails['designation_ref_id']);
  //   return des['designation_name'];
  // }

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

    plantSearchList = [];
    plantNameType($event){
      let searchTrem = $event['detail']['value'];
      if(searchTrem.length>2){
        this.plantSearchList = this.plantList.filter((item) => {
          return ((item.name.toLowerCase().indexOf(searchTrem.toLowerCase()) > -1));
        })
      }else{
        this.showPlantList();
      }
    }

    ngAfterViewInit() {
    }

    openNotiFication(){
      this.router.navigateByUrl('/notifications');
    }

    OpenIssueList(filterType){
      this.router.navigate(['issue-list-by-filter',{type:filterType}]);
    }
//my-custom-class
    async presentAlertMultipleButtons() {
      const alert = await this.alertController.create({
        cssClass: '',
        header: 'Inspection Status',
        subHeader: '',
        message: 'Dear, shrwan you have not completed your assigned Task',
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
  
    totalUAUC = 0;
    uaUcChart(incidentStataData) {
      this.totalUAUC = incidentStataData['ua_uc_count'];
      if (this.doughnutChart) this.doughnutChart.destroy();
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'pie',
        data: {
          labels: ['UA', 'UC'],
          datasets: [{
            label: '',
            data: [incidentStataData['ua_count'], incidentStataData['uc_count']],
           // borderColor :'#F4511E',
            backgroundColor: [
              '#44c8f5',
              '#3140b5',
            ],
            hoverBackgroundColor: [
              '#44c8f5',
              '#3140b5',
            ],
            borderWidth: 3,
          }]
        },
        options:{
          onClick: (evt, item) => {
            let clickedIndex = item[0]['index']
            // let index = item[0]["_index"];
            // let fruit = item[0]["_chart"].data.labels[index];
            // let votes = item[0]["_chart"].data.datasets[0].data[index];
        },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
        },
      //   elements: {
      //    line: {
      //        tension: 0.4
      //    }
      //  }
        }
      });
    }


    highP = 0;
    mediumP = 0;
    lowP=0;

    highPN = 0;
    mediumPN = 0;
    lowPN=0;

    calculateSeverityP(severity_by_h,severity_by_m,severity_by_low){
      this.highP = 0
      this.mediumP = 0
      this.lowP = 0
      this.highPN = 0;
      this.mediumPN = 0;
      this.lowPN=0;
     let maxLimt = this.getMaxSize(severity_by_h, severity_by_m, severity_by_low)
     this.highPN = severity_by_h;
     this.mediumPN = severity_by_m;
     this.lowPN = severity_by_low; 
     
     let h_P_final = (severity_by_h*100)/maxLimt;
      let m_P_final = (severity_by_m*100)/maxLimt;
      let l_P_final = (severity_by_low*100)/maxLimt;

      this.highP = Math.floor(h_P_final);
      this.mediumP = Math.floor(m_P_final);
      this.lowP = Math.floor(l_P_final);

      if(this.highP>0){
        this.isHigh = true;
      }else{
        this.isHigh = false;
      }

      if(this.mediumP>0){
        this.isMedium = true;
      }else{
        this.isMedium = false;
      }

      if(this.lowP>0){
        this.isLow = true;
      }else{
        this.isLow = false;
      }

      if(this.highP<10 && this.highP>0){
        this.highP = 18;
      }

      if(this.mediumP<20 && this.mediumP>0){
        this.mediumP = 22;
      }

      if(this.lowP<10 && this.lowP>0){
        this.lowP = 15;
      }

    }

    statusChart(incidentStataData) {
      this.totalUAUC = incidentStataData['ua_uc_count'];
      if (this.doughnutStatusChart) this.doughnutStatusChart.destroy();
      this.doughnutStatusChart = new Chart(this.doughnutCanvasStatus.nativeElement, {
        type: 'line',
        data: {
          labels: ['Open', 'In progress', 'Close'],
          datasets: [{
            label: '',
            data: [incidentStataData['open_count'],incidentStataData['in_p_count'], incidentStataData['close_count']],
            borderColor :'#F4511E',
            borderWidth: 1,
          }]
        },
        options:{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
        }, 
            scales: {
            x: {
              display: true //this will remove all the x-axis grid lines
             },
            y: {
              min : 0, 
              ticks:{
                stepSize : 4
              }, 
          }, 
        },   elements: {
          line: {
              tension: 0.4
          }
        }
        }
      });
    }

    byArea(areaList,areaListValue) {
      if (this.doughnutChartByArea) this.doughnutChartByArea.destroy();
      this.doughnutChartByArea = new Chart(this.doughnutCanvasByArea.nativeElement, {
        type: 'doughnut',
        data: {
          labels: areaList,
          datasets: [{
            label: '',
            data: areaListValue,
            //  borderColor :'#F4511E',
            borderWidth: 1,
            backgroundColor: [
              '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4'
            ],
            hoverBackgroundColor: [
              '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4'
            ]
          }]
        },
        options:{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        //   , scales: {
        //     x: {
        //       display: false //this will remove all the x-axis grid lines
        //      },
        //     y: {
        //       min : 0, 
        //       max : 10,
        //       // grid: {
        //       //   offset: true
        //       // }
        //       ticks:{
        //         stepSize : 5
        //       }, 
        //   }, 
        // }

        }
      });
    }

    byCategory(areaList,areaListValue) {
      if (this.doughnutChartByCat) this.doughnutChartByCat.destroy();
      this.doughnutChartByCat = new Chart(this.doughnutCanvasByCat.nativeElement, {
        type: 'pie',
        data: {
          labels: areaList,
          datasets: [{
            label: '',
            data: areaListValue,
             //borderColor :'#F4511E',
             borderWidth: 1,
            backgroundColor: [
              '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe','#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
            ],
            hoverBackgroundColor: [
              '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe','#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
            ]
          }]
        },
        options:{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          } ,
          onClick: (evt, item) => {
            let index = item[0]["_index"];
            let fruit = item[0]["_chart"].data.labels[index];
            let votes = item[0]["_chart"].data.datasets[0].data[index];
        },
        //    scales: {
        //     x: {
        //       display: false //this will remove all the x-axis grid lines
        //      },
        //     y: {
        //       min : 0, 
        //       max : 10,
        //       // grid: {
        //       //   offset: true
        //       // }
        //       ticks:{
        //         stepSize : 5
        //       }, 
        //   }, 
        // },
         elements: {
          line: {
              tension: 0.4
          }
        }
        }
      });
    }

    bySevirity(incidentStataData) {
      this.totalUAUC = incidentStataData['ua_uc_count'];
      if (this.horizontalChart) this.horizontalChart.destroy();
      this.horizontalChart = new Chart(this.horizontalCanvas.nativeElement, {
        type: 'pie',
        data: {
          labels: ['High','Medium','Low'],
          datasets: [{
            label: '',
            data: [incidentStataData['severity_by_h'], incidentStataData['severity_by_m'], incidentStataData['severity_by_low']],
            // borderColor :'#F4511E',
            backgroundColor: [
              '#fa0202',
              '#ec9e0d',
              '#574cb9'
            ],
            borderColor: [
              '#fff',
              '#fff',
              '#fff'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          } , scales: {
          //   y: {
          //     display: true, //this will remove all the x-axis grid lines
          //     min : 0, 
          //     max : 10,
          //     // grid: {
          //     //   offset: true
          //     // }
          //     ticks:{
          //       stepSize : 5
          //     }, 
          //    },
          //   x: {
          //     min : 0, 
          //     max : 10,
          //     // grid: {
          //     //   offset: true
          //     // }
          //     ticks:{
          //       stepSize : 5
          //     }, 
          // }, 
        },
         elements: {
          line: {
              tension: 0.4
          }
        }
        }
      });
    }

    getMaxSize(num1,num2,num3){
      //return num1+num2+num3;

      if(num1==0 && num2==0 && num3==0){
        return 0;
      }else{
        let max = 0;
        if(num1 > num2){
          if(num1 > num3) {
              max = num1;
          }else {
              max = num3;
          }
      }else {
          if(num2 > num3) {
              max = num2;
          }else {
              max = num3;
          }
      }
      if(max>5){
        return max+5;
      }else{
        return max+2;
      }
      }
    }

    getStepSize(maxLimit){
      let size = maxLimit/3;
      return Math.floor(size);
    }
    
    
  incidentStataData :any;
  index = 0;
  isShowgraph = false;
  isHigh = false;
  isMedium = false;
  isLow = false;
  loadDashboard() { 
    this.index+=1;
  //   let data = {
  //    emp_id :  localStorage.getItem(this.appConstant.TAG_IS_USER_ID),
  //    start_date :  this.minDate+' 00:01',
  //    end_date :  this.maxDate+ ' 23:59',
  //    plant_name :  this.plant_name,
  //    org_id :  this.org_id
  //   }
  //   this.restApi.getDashboard(data).then((success) => {
  //    this.initDashboardData(success)
  //  }, (error) => {
  //     this.is_list = false;
  //     this.appConstant.handleApiError(error)
  //  });

    let nodeDObj = {
      "startDate" :  this.minDate+' 00:01',
      "endDate" :  this.maxDate+ ' 23:59',
      "whereData":[
        {"field":"`incident_details`.`organization_ref_id`","value":this.org_id,"type":"AND","nested":""},
        {"field":"`incident_details`.`plant_ref_id`","value":this.plant_name,"type":"AND","nested":""}]}
        this.restApi.nodeGetUAUCDashboard(nodeDObj).then((success) => {
          let uaucData = success['data'][0];
          this.totalUAUCNode = Number(uaucData['ua'])+Number(uaucData['uc'])
          if(this.totalUAUCNode>0){
            this.isShowgraph = true;
          }else{
            this.isShowgraph = false;
          }
          if(localStorage.getItem('load_d')== 'null'){
            this.uaUcChartNode(Number(uaucData['ua']),Number(uaucData['uc']))
            this.calculateSeverityP(Number(uaucData['high']),Number(uaucData['medium']),Number(uaucData['low']));
           // this.nodeStatusChart(Number(uaucData['open']),Number(uaucData['inprocess']),Number(uaucData['close']))  
           this.loadAreaAndCatData();
            localStorage.setItem('load_d',String(this.totalUAUCNode))
          }else if(Number(localStorage.getItem('load_d'))<this.totalUAUCNode){
            this.uaUcChartNode(Number(uaucData['ua']),Number(uaucData['uc']))
            this.calculateSeverityP(Number(uaucData['high']),Number(uaucData['medium']),Number(uaucData['low']));
            this.loadAreaAndCatData();
           // this.nodeStatusChart(Number(uaucData['open']),Number(uaucData['inprocess']),Number(uaucData['close']))  
            localStorage.setItem('load_d',String(this.totalUAUCNode))
          }else if(Number(localStorage.getItem('load_d'))==this.totalUAUCNode){
          }else{
          }
      
          let pstatus = [uaucData['open'],uaucData['inprocess'], uaucData['close']]
          let pstatus_l = localStorage.getItem('status_d')
      
            if(!(String(pstatus_l)==String(pstatus))){
              this.nodeStatusChart(Number(uaucData['open']),Number(uaucData['inprocess']),Number(uaucData['close']))  
              localStorage.setItem('status_d',String(pstatus) )
            }
          this.is_list = true;
      }, (error) => {
         // this.is_list = false;
          this.appConstant.handleApiError(error)
      });


    let data2 = {
      plantid :  this.plant_name,
    }
    this.restApi.getLastIncDays(data2).then((success) => {
        try{
          let daysF = Number(success['data'][0]['days']);
          if(daysF<1){
            this.sinceLastDays = 0
          }else{
            this.sinceLastDays = daysF
          }
        
        }catch(e){
          this.sinceLastDays = 0
        }
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
 }


 loadAreaAndCatData(){
    let areaCatData = {
      "startDate" :  this.minDate+' 00:01',
      "endDate" :  this.maxDate+ ' 23:59',
      "whereData":[
        {"field":"`incident_details`.`plant_ref_id`","value":this.plant_name,"type":"AND","nested":""}
      ]
    }

    this.restApi.getStatsByArea(areaCatData).then((success) => {
      let areaNameList = [];
      let areaValueList = [];
      let areaListObj = []
      let catNameList = [];
      let catValueList = [];
      let catListObj = []
      catListObj = success['data']
      areaListObj = success['data1']
      //areaListObj.fo
      areaListObj.forEach(item => {
        areaNameList.push(item['name'])
        areaValueList.push(item['area_count'])
      });
      catListObj.forEach(item => {
        catValueList.push(item['incident_count'])
        catNameList.push(item['inc_cat_name'])
      });
      this.chartByAreaNode(areaNameList,areaValueList);
      this.chartByCategoryNode(catNameList,catValueList);
  }, (error) => {
      this.is_list = false;
      this.appConstant.handleApiError(error)
  });
 }

 nodeStatusChart(open_count,in_p_count,close_count) {
  if (this.doughnutStatusChart) this.doughnutStatusChart.destroy();
  this.doughnutStatusChart = new Chart(this.doughnutCanvasStatus.nativeElement, {
    type: 'line',
    data: {
      labels: ['Open', 'In progress', 'Close'],
      datasets: [{
        label: '',
        data: [open_count,in_p_count, close_count],
        borderColor :'#F4511E',
        borderWidth: 2,
       // borderCapStyle:'butt'
      }]
    },
    options:{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
    }, 
        scales: {
        x: {
          display: true //this will remove all the x-axis grid lines
         },
        y: {
          min : 0, 
          ticks:{
            stepSize : 4
          }, 
      }, 
    },   elements: {
      line: {
          tension: 0.4
      }
    }
    }
  });
}

 totalUAUCNode = 0;
 uaUcChartNode(uaCount,ucCount) {
   if (this.doughnutChart) this.doughnutChart.destroy();
   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
     type: 'pie',
     data: {
       labels: ['UA', 'UC'],
       datasets: [{
         label: '',
         data: [uaCount, ucCount],
        // borderColor :'#F4511E',
         backgroundColor: [
           '#44c8f5',
           '#3140b5',
         ],
         hoverBackgroundColor: [
           '#44c8f5',
           '#3140b5',
         ],
         borderWidth: 3,
       }]
     },
     options:{
       onClick: (evt, item) => {
         let clickedIndex = item[0]['index']
         // let index = item[0]["_index"];
         // let fruit = item[0]["_chart"].data.labels[index];
         // let votes = item[0]["_chart"].data.datasets[0].data[index];
     },
       responsive: true,
       maintainAspectRatio: false,
       plugins: {
         legend: {
           display: false
         }
     },
   //   elements: {
   //    line: {
   //        tension: 0.4
   //    }
   //  }
     }
   });
 }


 chartByAreaNode(areaList,areaListValue) {
  if (this.doughnutChartByArea) this.doughnutChartByArea.destroy();
  this.doughnutChartByArea = new Chart(this.doughnutCanvasByArea.nativeElement, {
    type: 'doughnut',
    data: {
      labels: areaList,
      datasets: [{
        label: '',
        data: areaListValue,
        //  borderColor :'#F4511E',
        borderWidth: 1,
        backgroundColor: [
          '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4'
        ],
        hoverBackgroundColor: [
          '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4'
        ]
      }]
    },
    options:{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    //   , scales: {
    //     x: {
    //       display: false //this will remove all the x-axis grid lines
    //      },
    //     y: {
    //       min : 0, 
    //       max : 10,
    //       // grid: {
    //       //   offset: true
    //       // }
    //       ticks:{
    //         stepSize : 5
    //       }, 
    //   }, 
    // }

    }
  });
}

chartByCategoryNode(areaList,areaListValue) {
  if (this.doughnutChartByCat) this.doughnutChartByCat.destroy();
  this.doughnutChartByCat = new Chart(this.doughnutCanvasByCat.nativeElement, {
    type: 'pie',
    data: {
      labels: areaList,
      datasets: [{
        label: '',
        data: areaListValue,
         //borderColor :'#F4511E',
         borderWidth: 1,
        backgroundColor: [
          '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe','#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
        ],
        hoverBackgroundColor: [
          '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe','#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
        ]
      }]
    },
    options:{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      } ,
      onClick: (evt, item) => {
        let index = item[0]["_index"];
        let fruit = item[0]["_chart"].data.labels[index];
        let votes = item[0]["_chart"].data.datasets[0].data[index];
    },
    //    scales: {
    //     x: {
    //       display: false //this will remove all the x-axis grid lines
    //      },
    //     y: {
    //       min : 0, 
    //       max : 10,
    //       // grid: {
    //       //   offset: true
    //       // }
    //       ticks:{
    //         stepSize : 5
    //       }, 
    //   }, 
    // },
     elements: {
      line: {
          tension: 0.4
      }
    }
    }
  });
}
 

 sinceLastDays = 0;
 initDashboardData(initData){
  this.incidentStataData = initData['data'];
    if(initData['data']['ua_uc_count']>0){
      this.isShowgraph = true;
    }else{
      this.isShowgraph = false;
    }

  let areaList = initData['data']['area_list_name'];
  let areaListValue = initData['data']['area_list_value'];

  let areaListValueFinal=[];
  let areaListFinal=[];
  let index=0;
  let graphIndexArea = (areaListValue.length>10)?2:1;
  for ( let i = 0; i < areaListValue.length; i++ ) {
      if(areaListValue[i]>= graphIndexArea){
        areaListValueFinal[index]=areaListValue[i];
        areaListFinal[index]=areaList[i];
        index+=1;
      }
    }

    let catList = initData['data']['cat_list_name'];
    let catListValue = initData['data']['cat_list_value'];
    let catListValueFinal=[];
    let catListFinal=[];
    let index_j=0;
    let graphIndexCat = (catListValue.length>10)?2:1;
    for ( let i = 0; i < catListValue.length; i++ ) {
      if(catListValue[i]>=graphIndexCat){
        catListValueFinal[index_j]=catListValue[i];
        catListFinal[index_j]=catList[i];
        index_j+=1;
      }
    }

    if(localStorage.getItem('load_d')== 'null'){
      this.uaUcChart(this.incidentStataData);
      this.byArea(areaListFinal,areaListValueFinal);
      this.byCategory(catListFinal,catListValueFinal);
      //this.calculateSeverityP(this.incidentStataData);
      this.bySevirity(this.incidentStataData);
      localStorage.setItem('load_d',this.incidentStataData['ua_uc_count'])
    }else if(localStorage.getItem('load_d')<this.incidentStataData['ua_uc_count']){
      this.uaUcChart(this.incidentStataData);
      this.byArea(areaListFinal,areaListValueFinal);
      this.byCategory(catListFinal,catListValueFinal);
     // this.calculateSeverityP(this.incidentStataData);
      this.bySevirity(this.incidentStataData);
      localStorage.setItem('load_d',this.incidentStataData['ua_uc_count'])
    }else if(localStorage.getItem('load_d')==this.incidentStataData['ua_uc_count']){
    }else{
    }

    let pstatus = [this.incidentStataData['open_count'],this.incidentStataData['in_p_count'], this.incidentStataData['close_count']]
    let pstatus_l = localStorage.getItem('status_d')


      if(!(String(pstatus_l)==String(pstatus))){
        this.statusChart(this.incidentStataData);
        localStorage.setItem('status_d',String(pstatus) )
      }

  this.is_list = true;
  
 }
 
 filterCriteriaCat = 'Organization';
 isSelectedCat=-2
 loadCatData(index,name,i){
   this.filterCriteriaCat = name;
   this.toggleFilterCat();
   this.org_id = index;
   this.showLoader = true;
   this.loadDashboard();
 }

 toggledFilterCat = false;
 toggleFilterCat(){
   if(this.toggledFilterCat){
     this.toggledFilterCat = false;
   }else{
     this.toggledFilterCat = true;
   }
 }
   
filterCriteria = 'Plant';
isSelected=-2
loadReport(event){
  this.isHideSpan = false;
   let index = event.value.id;
   let name = event.value.name;
   this.filterCriteria = name;
   this.toggleFilter();
   this.plant_name = index;
   this.isSelected=index; //i
   this.is_list = false;
   this.showLoader = true;
   this.loadDashboard();
 }

 toggledFilter = false;
 toggleFilter(){
    if(this.toggledFilter){
      this.toggledFilter = false;
    }else{
      this.toggledFilter = true;
    }
    this.showPlantList();
 }

 closeFilter(){
  this.toggledFilter = false;
 }

dateErrorMsg = ''
getMinDate($event){
 this.minDate = $event;
    let sDate = new Date(this.minDate);
    let edate = new Date(this.maxDate);

 if (sDate > edate) {
    this.dateErrorMsg = 'Start date must be earlier than end date.'
  }else{
    this.showLoader = true;
    this.loadDashboard();
    this.dateErrorMsg = ''
  }
}

getMaxDate($event){
 this.maxDate =$event;
  let sDate = new Date(this.minDate);
  let edate = new Date(this.maxDate);

  if (sDate > edate) {
    this.dateErrorMsg = 'End date must be come after the start date'
  }else{
    this.is_list = false;
    this.showLoader = true;
    this.loadDashboard();
    this.dateErrorMsg = ''
  }
}

 orgList :any;
 getOrgList() { 
  let dataObj={
    "searchText":"",
    "sortby":"",
    "page":0,
    "whereData":[
      {"field":"`organization`.`id`","value":this.appConstant.getORGId(),"type":"AND","nested":""}]}
   this.restApi.nodeGetOrgList(dataObj).then((success) => {
     this.orgList = success['data'];
     if(this.orgList.length>0){
        this.getPlantListbyOrg(this.orgList[0]['id']);
        this.org_id = this.orgList[0]['id'];
     }else{
       this.is_list = false;
        this.showLoader = true;
       this.loadDashboard();
     }
  }, (error) => {
    this.appConstant.handleApiError(error)
  });
}

plantList :any;
isHideList = false;
isHideSpan = true;
plant_d_name = '';
heightValue = '55px';
getPlantListbyOrg(org_id) { 
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
            this.showPlantList();
            if(this.plantList.length>0){
            this.plant_name=this.plantList[0]['id'];
            this.plant_d_name = this.plantList[0]['name'];
            }
            if(this.plantList.length==1){
              this.isHideList = true;
              this.heightValue = '55px'
            }else{
              this.heightValue = '300px'
            }
            this.is_list = false;
            this.showLoader = true;
            this.loadDashboard();
    }, (error) => {
      this.appConstant.handleApiError(error)
    });

}
 
showPlantList(){
  this.plantSearchList = this.plantList;
  return;
}

// initOfflineMode(){
//   this.getAllCategories();
//   this.getAllAreaByPlant();
// }


// getAllAreaByPlant() { 
//   let data= {
//      plant_id :  this.appConstant.getPlantId()
//   }
//   this.restApi.getAreaListByPlant(data).then((success) => {
//     localStorage.setItem('area_list',JSON.stringify(success['data'][0]))
//   }, (error) => {
//     this.appConstant.handleApiError(error)
//   });
// }

// getAllCategories() { 
//   let data= {
//     org_id :  this.appConstant.getORGId(),
//   }
//   this.restApi.getCatListByOrg(data).then((success) => {
//     localStorage.setItem('cat_list',JSON.stringify(success['data'][0]))
//  }, (error) => {
//    this.appConstant.handleApiError(error)
//  });
// }

// Checklist Dashboard 
chkCatList = []
chkCatListLength = 0
bcolor =['#8EA4C8','#9BD9DB','#FFC2B8']
selectedCatIndex = 0;
loadChecklistCat(){
  let data= {
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.getChkCatList(data).then((success) => {

   this.chkCatList=success['data'];
   if(this.chkCatList.length==3){
      this.chkCatListLength = 4
   }else if(this.chkCatList.length==2){
    this.chkCatListLength = 6
   }else if(this.chkCatList.length==1){
    this.chkCatListLength = 12
   }else{
    this.chkCatListLength = 3
   }
   if(this.chkCatList.length>0){
    this.loadChkByCat(this.chkCatList[0]['id'],0)
    let index = 0
    this.selectedCatIndex = 0;
    this.chkCatList.forEach(item => {
     this.getChkCatListAssigned(item['id'],index)
     this.loadChkByCatPercentage(item['id'],index)
     index++;
      });
   }
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

chCatP = []
loadChkByCatPercentage(catId,index){
  let data= {
    id : catId,
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.getChkListByCatP(data).then((success) => {
      let chkP = success['data_percent'].split(',')
      let total = 100*chkP.length
      let totalP = 0;
      chkP.forEach(item => {
        totalP+=Number(item);
        let finalCount = (totalP*100)/total;
        this.chCatP[index] = finalCount
      });
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

//Get Checklist by assigned 
dataListCont = []
getChkCatListAssigned(catId,index){
  let data = {
    id : catId,
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.getChkCatListAssigned(data).then((success) => {
   let countList = success['data_assigned'].split(',');
   let finalCount = 0;
   countList.forEach(itemCount => {
    finalCount+=Number(itemCount);
    this.dataListCont[index] = finalCount
     });
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

//Load Checklist by category
checkList = []
checklistID = 0;
checkListName = '';
loadChkByCat(catId,index){
  if(this.chkCatList[index]['cat_name']=='Fire Safety'){
    this.loadAreaChart(catId);
  }else{
    this.isShowAreaCHK = false;
  }
  this.selectedCatIndex = index;
  let data= {
    id : catId,
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.getChkListByCatP(data).then((success) => {
      this.checkList = success['data']
      this.checklistID = this.checkList[0]['id']
      this.checkListName = this.checkList[0]['name']
      this.loadCheckListData(this.checklistID);
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

getTypeP(progress){
  try{
    let p = Number(progress);
    if(p>50){
      return 'over50';
    }else{
      return '';
    }
  }catch(e){
    return '';
  }
}

async updateCHK(){
  const modal = await this.modalController.create({
    component: EmplistPage,
    cssClass: 'modal-custom-css',
    componentProps: {
      'emplist': this.checkList,
      'selected_id': this.checklistID,
      'is_emplist': false
    }
  });
  modal.onDidDismiss()
  .then((data) => {
    this.checklistID=data['data']
    this.loadCheckListData(this.checklistID);
    this.checkList.forEach(item => {
      if(item['id']==data['data']){
        this.checkListName =item['name'];
      }
    });
  });
  return await modal.present();
}

loadCheckListData(chk_id){
  this.getChkScore(chk_id);
  this.getChkListDetail(chk_id);
  this.getCheckListData(chk_id);
}

//Checklist Score
chkScore = 0;
getChkScore(chk_id){
  let data= {
    id : chk_id,
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.getChkScore(data).then((success) => {
   this.chkScore = success['data'];
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

//Checklist Details assigned/complete 
assignedChk = 0;
completedChk = 0;
inCompletedChk = 0;
getChkListDetail(chk_id){
  let data= {
    id : chk_id,
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.getChkListDetail(data).then((success) => {
    this.assignedChk = success['data'];
    this.completedChk = success['user_completed'];
    this.inCompletedChk = success['user_not_completed'];
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

getCheckListData(chk_id){
  let data= {
    id : chk_id,
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.getCheckListData(data).then((success) => {
    this.loadCHkGraph(success);
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

isShowAreaCHK = false;
loadAreaChart(cat_id){
  this.isShowAreaCHK = false;
  let data= {
    id : cat_id,
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.getAreaChartData(data).then((success) => {
    this.isShowAreaCHK = true;
    this.chkByArea(success['data'],success['data_percent']);
    
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

loadCHkGraph(details){
  let dateList = details['date'];
  let newdateList=[];
  const datePipe = new DatePipe("en-US");
  //MMM_d
  if(dateList[0].length>12){
    dateList.forEach(item => {
      let date1 =item.split('_')[1]
      let date2 =item.split('_')[0]
      let finalDate = datePipe.transform(date1, 'd')+"-"+datePipe.transform(date2, 'd')
      newdateList.push(finalDate);
    });
  }else{
    dateList.forEach(item => {
      let finalDate = datePipe.transform(item, 'd')
      newdateList.push(finalDate);
    });
  }

  if (this.scorePercentageChart) {
    this.scorePercentageChart.destroy();
  }

    
  this.scorePercentageChart = new Chart(this.scorePercentage.nativeElement, {
    type: 'bar',
    data: {
      labels: newdateList,
      datasets: [{
        label: '',
        data: details['data'],
         borderColor :['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe','#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'],
         borderWidth: 1,
        backgroundColor: [
          '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe','#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
        ],
        hoverBackgroundColor: [
          '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe','#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
        ]
      }]
    },
    options:{
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          // callbacks: {
          //     label: function(context) {
          //       let label = context.dataset.label || '';
          //       let label2 = context.dataset.data || '';

          //       if (label) {
          //           label += ': ';
          //       }
          //       console.log(context.label);
          //       context.label = '';
          //       console.log(context.label);
          //         return 'ffffff';
          //     }
          // }
      }
      } ,
       scales: {
        x: {
          display: true //this will remove all the x-axis grid lines
         },
        y: {
          min : 0, 
          max : 100,
          // grid: {
          //   offset: true
          // }
          ticks:{
            //stepSize : 5
          }, 
      }, 
    },
     elements: {
      line: {
         // tension: 0.4
      }
    }
    }
  });
}

chkByArea(areaList,areaListValue) {
  if (this.doughnutChartByAreaCHK) this.doughnutChartByAreaCHK.destroy();
  this.doughnutChartByAreaCHK = new Chart(this.doughnutCanvasByAreaCHK.nativeElement, {
    type: 'doughnut',
    data: {
      labels: areaList,
      datasets: [{
        label: '',
        data: areaListValue,
        borderWidth: 1,
        backgroundColor: [
          '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4'
        ],
        hoverBackgroundColor: [
          '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4'
        ]
      }]
    },
    options:{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      }
    //   , scales: {
    //     x: {
    //       display: false //this will remove all the x-axis grid lines
    //      },
    //     y: {
    //       min : 0, 
    //       max : 10,
    //       // grid: {
    //       //   offset: true
    //       // }
    //       ticks:{
    //         stepSize : 5
    //       }, 
    //   }, 
    // }

    }
  });
}

//PTW Charts 
ptwChartByCat(dataLabels,catListValue) {
  if (this.doughnutChartByPTWCat) this.doughnutChartByPTWCat.destroy();
  this.doughnutChartByPTWCat = new Chart(this.doughnutCanvasByPtwCat.nativeElement, {
    type: 'doughnut',
    data: {
      labels: dataLabels,
      datasets: [{
        label: '',
        data: catListValue,
        borderWidth: 1,
        backgroundColor: [
          '#ffc2b8','#f6cf76','#a25098','#8da47d','#4481bb','#9bd9db' 
        ],
        hoverBackgroundColor: [
          '#ffc2b8','#f6cf76','#a25098','#8da47d','#4481bb','#9bd9db'
        ]
      }]
    },
    options:{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    //   , scales: {
    //     x: {
    //       display: false //this will remove all the x-axis grid lines
    //      },
    //     y: {
    //       min : 0, 
    //       max : 10,
    //       // grid: {
    //       //   offset: true
    //       // }
    //       ticks:{
    //         stepSize : 5
    //       }, 
    //   }, 
    // }

    }
  });
}

ptwChartByActivity(dataLabels,catListValue) {
  if (this.doughnutChartByPtwActivity) this.doughnutChartByPtwActivity.destroy();
  this.doughnutChartByPtwActivity = new Chart(this.doughnutCanvasByPtwActivity.nativeElement, {
    type: 'bar',
    data: {
      labels: dataLabels,
      datasets: [{
        label: '',
        data: catListValue,
        borderWidth: 1,
        backgroundColor: [
          '#ffc2b8','#f6cf76','#a25098','#8da47d','#4481bb','#9bd9db'
        ],
        hoverBackgroundColor: [
          '#ffc2b8','#f6cf76','#a25098','#8da47d','#4481bb','#9bd9db'
        ]
      }]
    },
    options:{
      //indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    //   , scales: {
    //     x: {
    //       display: false //this will remove all the x-axis grid lines
    //      },
    //     y: {
    //       min : 0, 
    //       max : 10,
    //       // grid: {
    //       //   offset: true
    //       // }
    //       ticks:{
    //         stepSize : 5
    //       }, 
    //   }, 
    // }

    }
  });
}
}
