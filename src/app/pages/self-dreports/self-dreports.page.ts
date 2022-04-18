import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self-dreports',
  templateUrl: './self-dreports.page.html',
  styleUrls: ['./self-dreports.page.scss'],
})
export class SelfDReportsPage implements OnInit {
  checklist_id = 0;
  d = new Date();
   todayDate = this.d.getFullYear()+'-'+(this.d.getMonth()+1)+'-'+this.d.getDate();
   selectedStartDate = this.todayDate;
   showStart=0;
   datePickerObj: any = { 
     btnProperties: {color: '#000' },
     toDate: new Date(),
     inputDate: new Date(),
     titleLabel:'Select Date',
     clearButton : false,
     dateFormat: 'YYYY-MM-DD',
   }
  constructor(private appConstant:AppConstantService,private restApi:RestApiService,private modalCtrl:ModalController,private router:Router) { 
    this.loadCheckList();
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
        'objConfig': this.datePickerObj, 
        'selectedDate': this.selectedStartDate 
      }
    });
    await datePickerModal.present();
    datePickerModal.onDidDismiss()
      .then((data) => {  
        this.selectedStartDate = (data.data.date=='Invalid date'?this.todayDate:data.data.date);
        this.showStart = 1;
        this.loadUsers();
      });   
  }

  ngOnInit() {
  }

  checklistSDUser = [];
  loadUsers(){
    if(!this.appConstant.isInternet){
      return null;
    }else{
      this.checklistSDUser = [];
      let data={
        checklistId : this.checklist_id,
        date: this.selectedStartDate
      }
      this.restApi.getSDReportedUser(data).then((success) => {
        if(success['success']==true){
         this.checklistSDUser=success['data'];
        }else{
        }
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
   }
  }

  geListLength(){
    let isListSHow = false;
    try{
      let listLength = 0;
      this.checklistSDUser.forEach(item => {
        if(this.isIDNull(item['id'])=='true'){
          listLength++;
        }
      });
      if(listLength==0){
        isListSHow = false
      }else{
        isListSHow =  true
      }
    }catch(e){
      isListSHow =  false
    }
    return isListSHow;
  }

  isIDNull(id){
    if(id==null){
      return 'false';
    }else{
      return 'true';
    }
  }

  openSDResult(item){
    this.router.navigate(['/self-ddetails', {id: this.checklist_id,userData:JSON.stringify(item),date:this.selectedStartDate}]);
  }


  checklist=[]
  loadCheckList(){   
    if(!this.appConstant.isInternet){
        return null;
    }else{
      let data ={
        page: 0,
        searchText: "",
        sortby:""
      }
      this.restApi.getCheckList(data).then((success) => {
        if(success['success']==true){
          this.checklist=success['data'];
        }else{
        }
        this.checklist.forEach(item => {
          if(item['identifier']=='SD'){
            this.checklist_id =item['id']
          }else{
          }
        });
        this.loadUsers();
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }

}
