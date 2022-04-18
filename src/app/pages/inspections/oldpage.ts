import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';
import { UpdateDataService } from 'src/app/services/update-data.service';
import { ChecklistActionPage } from '../checklist-action/checklist-action.page';

@Component({
  selector: 'app-inspections',
  templateUrl: 'inspections.page.html',
  styleUrls: ['inspections.page.scss']
})
export class inspectionsPage {

  constructor(private router:Router,private appConstant:AppConstantService,private restApi:RestApiService,
    private modalController:ModalController,private updateData:UpdateDataStatusService) {
      this.loadCheckListCat();
      this.loadCheckList();
      this.updateData.dataChangeState.subscribe(state => {
        if (state) {
          this.loadCheckListCat();
          this.loadCheckList();
          localStorage.setItem("dataUpdate","0");
          this.updateData.dataChangeState.next(false);
        } else {
        }
      });
  }
  getUserRole(){
    return this.appConstant.getUserType();
  }

  //my-custom-class
  async presentModal(checklist_id,item,itemP,status) {
    const modal = await this.modalController.create({
      component: ChecklistActionPage,
      cssClass: '',
      componentProps: {
        'checklist_id': checklist_id,
        'dataObj': item,
        'dataObjP': itemP,
        'status': status
      }
    });
    return await modal.present();
  }
  
  segmentModel = 'ck_list';
  segmentChanged(ev: any) {
    this.segmentModel = ev['detail']['value'];
  }

  openCheckList(chk_id,item,itemP,percentage){
    this.router.navigate(['/checklist-action', {
      'checklist_id': chk_id,
      'item': JSON.stringify(item),  
      'itemP': JSON.stringify(itemP),
      'status': this.appConstant.getCurrentStatus(percentage)
    }]);
   // this.presentModal(chk_id,item,itemP,this.getCurrentStatus(percentage));
  }

  getCurrentStatus(percentage){
   return this.appConstant.getCurrentStatus(percentage)
  }

  ionViewWillEnter(){
  }

  
  openCheckListReport(chk_id,item,itemP,percentage){
    this.router.navigate(['/checklist-by-submitted', {  'checklist_id': chk_id,
    'item': JSON.stringify(item),  
    'itemP': JSON.stringify(itemP),
    'status': this.appConstant.getCurrentStatus(percentage),is_submitted:'0'}]);
  }

  openCheckListReportNS(chk_id,item,itemP,percentage){
    this.router.navigate(['/checklist-by-submitted', {'checklist_id': chk_id,
    'item': JSON.stringify(item),  
    'itemP': JSON.stringify(itemP),
    'status': this.appConstant.getCurrentStatus(percentage),is_submitted:'1'}]);
  }
  
  isNotSelfAssign(emp_id,is_fill){
    if(this.appConstant.getUserType()!="user"){
      if(emp_id==localStorage.getItem(this.appConstant.TAG_IS_USER_ID) && is_fill==0){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
      // if(emp_id==localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
      //   return true;
      // }else{
      //   return false;
      // }
    }
    
  }


  checklist = [];

  checklistD = [];
  checklistW = [];
  checklistF = [];
  checklistM = [];

  checklistDP = [];
  checklistWP = [];
  checklistFP = [];
  checklistMP = [];

  newCheckList = []
  newCheckListP = []
  is_list = false;
  loadCheckList(){   
    if(!this.appConstant.isInternet){
        return null;
    }else{
      let data ={
        page: 0,
        searchText: "",
        sortby:"",
        whereData:[{"field":"`employee`.`plant_ref_id`","value":this.appConstant.getPlantId(),"type":"AND","nested":""},{"field":"`employee`.`emp_type_ref_id`","value":"1","type":"AND","nested":"("},{"field":"`employee`.`emp_type_ref_id`","value":"2","type":"OR","nested":")"}]
      }
      this.restApi.getChkListAssignedList(data).then((success) => {
       
        this.newCheckList = []
        this.newCheckListP = []

        this.newCheckList = success['data']
        this.newCheckListP = success['data_percent']
        

        this.checklistD = [];
        this.checklistW = [];
        this.checklistF = [];
        this.checklistM = [];

        this.checklistDP = [];
        this.checklistWP = [];
        this.checklistFP = [];
        this.checklistMP = [];

        let indexC = 0;
      
        this.newCheckList.forEach(item => {
         if(this.appConstant.getUserType()=="user"){
              if(item['frequency']==1 && item['emp_id'] == localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
                this.checklistD.push(item)
                this.checklistDP.push(this.newCheckListP[indexC])
              }else if(item['frequency']==7 && item['emp_id'] == localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
                this.checklistW.push(item)
                this.checklistWP.push(this.newCheckListP[indexC])
              }else if(item['frequency']==15 && item['emp_id'] == localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
                this.checklistF.push(item)
                this.checklistFP.push(this.newCheckListP[indexC])
              }else if(item['frequency']==30 && item['emp_id'] == localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
                this.checklistM.push(item)
                this.checklistMP.push(this.newCheckListP[indexC])
              }
         }else{
            if(item['frequency']==1){
              this.checklistD.push(item)
              this.checklistDP.push(this.newCheckListP[indexC])
            }else if(item['frequency']==7){
              this.checklistW.push(item)
              this.checklistWP.push(this.newCheckListP[indexC])
            }else if(item['frequency']==15){
              this.checklistF.push(item)
              this.checklistFP.push(this.newCheckListP[indexC])
            }else if(item['frequency']==30){
              this.checklistM.push(item)
              this.checklistMP.push(this.newCheckListP[indexC])
            }
         }
        indexC++;
        this.calculateLength();
        });
        this.is_list = true;
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }

  

  checklistCat : any;
  loadCheckListCat(){
    if(!this.appConstant.isInternet){
        return null;
    }else{
      let data ={
        page: 0,
        searchText: "",
        sortby:""
      }
      this.restApi.getCheckListCat(data).then((success) => {
        if(success['success']==true){
          this.checklistCat=success['data'];
        }else{
        }
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }

  getdateByTD(current_id){
    return '';
    const datePipe = new DatePipe("en-US");
      const today1 =  new Date();
      if(current_id==1){
        return datePipe.transform(today1, 'd-MMM-yyyy');
      }else if(current_id==7){
        const wkly =  new Date(today1.setDate(today1.getDate() + 7 ));
        return datePipe.transform(wkly, 'd-MMM-yyyy');
      }else if(current_id==15){
        const ft =  new Date(today1.setDate(today1.getDate() + 15 ));
        return datePipe.transform(ft, 'd-MMM-yyyy');
      }else if(current_id==30){
        const mtly =  new Date(today1.setDate(today1.getDate() + 30 ));
        return datePipe.transform(mtly, 'd-MMM-yyyy');
      }
    
  }

  geListLength(){
      let isListSHow = false;
      try{
        if(this.newCheckList.length==0){
          isListSHow = false
        }else{
          isListSHow =  true
        }
      }catch(e){
        isListSHow =  false
      }
      return isListSHow;
    }
    /*
  checklistD = [];
  checklistW = [];
  checklistF = [];
  checklistM = [];
    */


  calculateLength(){
    this.isShowDH();
    this.isShowWH();
    this.isShowDF();
    this.isShowDM();
  }

  checklistDPH = false;
  checklistDCPH = false;

    isShowDH(){
      let pending = 0;
      let isCProgress = 0;
      try{
        if(this.checklistDP.length==0){
          this.checklistDPH = false;
          this.checklistDCPH = false
        }else{
          this.checklistDP.forEach(item => {
            if(item['percent'] == 0 ){
              pending +=1;
            }else if(item['percent'] > 0 ){
              isCProgress+=1;
            }

            if(pending>0){
              this.checklistDPH = true
            }else{
              this.checklistDPH = false
            }
            if(isCProgress>0){
              this.checklistDCPH = true
            }else{
              this.checklistDCPH = false
            }
          });
        }
      }catch(e){
        this.checklistDPH = false
        this.checklistDCPH = false
      }
    }


  checklistWPH = false;
  checklistWCPH = false;

    isShowWH(){
      let pending = 0;
      let isCProgress = 0;
      try{
        if(this.checklistWP.length==0){
          this.checklistWPH = false;
          this.checklistWCPH = false
        }else{
          this.checklistWP.forEach(item => {
            if(item['percent'] == 0 ){
              pending +=1;
            }else if(item['percent'] > 0 ){
              isCProgress+=1;
            }

            if(pending>0){
              this.checklistWPH = true
            }else{
              this.checklistWPH = false
            }
            if(isCProgress>0){
              this.checklistWCPH = true
            }else{
              this.checklistWCPH = false
            }
          });
        }
      }catch(e){
        this.checklistWPH = false;
        this.checklistWCPH = false
      }
    }


    checklistFPH = false;
    checklistFCPH = false;

    isShowDF(){
      let pending = 0;
      let isCProgress = 0;
      try{
        if(this.checklistFP.length==0){
          this.checklistFPH = false;
          this.checklistFCPH = false
        }else{
          this.checklistFP.forEach(item => {
            if(item['percent'] == 0 ){
              pending +=1;
            }else if(item['percent'] > 0 ){
              isCProgress+=1;
            }

            if(pending>0){
              this.checklistFPH = true
            }else{
              this.checklistFPH = false
            }
            if(isCProgress>0){
              this.checklistFCPH = true
            }else{
              this.checklistFCPH = false
            }
          });
        }
      }catch(e){
        this.checklistFPH = false;
        this.checklistFCPH = false
      }
    }

    checklistMPH = false;
    checklistMCPH = false;
    isShowDM(){
      let pending = 0;
      let isCProgress = 0;
      try{
        if(this.checklistMP.length==0){
          this.checklistMPH = false;
          this.checklistMCPH = false
        }else{
          let index = 0;
          this.checklistMP.forEach(item => {
            if(item['percent'] == 0 ){
              pending +=1;
            }else if(item['percent'] > 0 ){
              isCProgress+=1;
            }

            if(pending>0){
              this.checklistMPH = true
            }else{
              this.checklistMPH = false
            }
            if(isCProgress>0){
              this.checklistMCPH = true
            }else{
              this.checklistMCPH = false
            }
            index++;
          });
        }
      }catch(e){
        this.checklistMPH = false;
        this.checklistMCPH = false
      }
    }

    getFrequuency(days){
      if(days=='1'){
        return 'Daily'
      }else if(days=='7'){
        return 'Weekly'
      }else if(days=='15'){
        return 'Fortnight'
      }else if(days=='30'){
        return 'Monthly'
      }
      return '';
    }
}
