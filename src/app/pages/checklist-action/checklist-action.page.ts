import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';

@Component({
  selector: 'app-checklist-action',
  templateUrl: './checklist-action.page.html',
  styleUrls: ['./checklist-action.page.scss'],
})
export class ChecklistActionPage implements OnInit {


    checklist_id: any;
    dataObj: any;
    status: any;
    id : any;
  
  constructor(public modalCtrl: ModalController,private router:Router,private appConstant:AppConstantService,private activatedRoute : ActivatedRoute,
    private updateData:UpdateDataStatusService,private restApi:RestApiService) { 
      this.checklist_id = this.activatedRoute.snapshot.paramMap.get('checklist_id');
      this.dataObj = JSON.parse( this.activatedRoute.snapshot.paramMap.get('item'));
      this.id = JSON.parse( this.activatedRoute.snapshot.paramMap.get('id'));
      this.status = this.activatedRoute.snapshot.paramMap.get('status'); 
     
  }

  ionViewDidEnter(){
    this.loadCHKData(this.checklist_id);
 }

  newCheckListP = []
  newCheckList = []
  loadCHKData(inc_id){
    let data ={
      page: 0,
      searchText: "",
      sortby:"",
      whereData:[{"field":"`employee`.`plant_ref_id`","value":this.appConstant.getPlantId(),"type":"AND","nested":""},{"field":"`employee`.`emp_type_ref_id`","value":"1","type":"AND","nested":"("},{"field":"`employee`.`emp_type_ref_id`","value":"2","type":"OR","nested":")"}]
    }
    this.restApi.getChkListAssignedList(data).then((success) => {

      let indexC = 0;

      this.newCheckList = []
      this.newCheckListP = []

      this.newCheckList = success['data']
      this.newCheckListP = success['data_percent']

      let indexV = 0
      let finalList = [];

      this.newCheckList.forEach(item => {
        let item1 = this.newCheckListP[indexV]
        let finalItem = { ...item, ...item1 };
        finalList.push(finalItem);
        indexV++;
      });
      finalList.sort((a, b) => (Number(a.percent) > Number(b.percent)) ? 1 : -1)
      finalList.forEach(item => {
        if(item['checkId']==inc_id && item['id'] == this.id){
          this.dataObj = item
          this.status = this.appConstant.getCurrentStatus(item['percent'])
        }
      indexC++;
      });

    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }

  ngOnInit() {
    localStorage.setItem("dataUpdate","1");
    this.updateData.dataChangeState.next(true);
    this.isShowActionBtn();
  }

  closeModel(){
    if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
      this.router.navigateByUrl('/users/tabs/inspections');
    }else{
      this.router.navigateByUrl('/admin/tabs/inspections');
    }
  }

  
  openQuestionPage(statusStr){
    if(statusStr!='Completed'){
      if(this.dataObj['identifier']=='SD'){
        this.router.navigate(['/self-d', {checklist_id: this.checklist_id}]);
        this.modalCtrl.dismiss();
      }else{
        this.router.navigate(['/checklist', {checklist_id: this.checklist_id,
          item : JSON.stringify(this.dataObj),
          id:this.id,
          status: this.status}]);
      }
    }else{
      this.appConstant.toastMsg('Checklist already submitted.')
    }
  }

  isShowBtn = false;
  isShowActionBtn(){
    if( this.getUserRole() != 'user'){
      if(this.dataObj['is_filled']==1 && this.dataObj['emp_id'] == localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
        this.isShowBtn = true;
      }else{
        this.isShowBtn = false;
      }
    }else{
      this.isShowBtn = true;
    }
  }

  getUserRole(){
    return this.appConstant.getUserType();
  }

  openDetailsPage(){
    this.router.navigate(['/checklist-view', {checklist_id: this.checklist_id,
      item : JSON.stringify(this.dataObj),
      id:this.id,
      is_submitted: '0',
      by_sc:'action',
      status: this.status}]);
  }

  openReportDetailsPage(){
    localStorage.setItem('ins_tab','')
    this.router.navigate(['/checklist-by-submitted', {
    checklist_id: this.checklist_id,
    is_submitted:'0',
    item : JSON.stringify(this.dataObj),
    id:this.id,
    status: this.status}]);
  }


  openCheckListReportNS(){
    localStorage.setItem('ins_tab','')
    this.router.navigate(['/checklist-by-submitted', {
    checklist_id: this.checklist_id,
    is_submitted:'1',
    item : JSON.stringify(this.dataObj),
    id:this.id,
    status: this.status}]);
  }
  

}
