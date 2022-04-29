import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { AppConstantService } from '../services/app-constant.service';
import { RestApiService } from '../services/rest-api.service';
import { UpdateDataStatusService } from '../services/update-data-status.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EmplistPage } from '../pages/emplist/emplist.page';
import { FileUploadService } from '../upload/file-upload.service';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';
import { UpdateStatusIncService } from '../services/update-status-inc.service';

@Component({
  selector: 'app-save-issue-response',
  templateUrl: './save-issue-response.page.html',
  styleUrls: ['./save-issue-response.page.scss'],
})
export class SaveIssueResponsePage implements OnInit {

  // @Input() status:any;
  // @Input() role:any;
  // @Input() rsponseDetails:any;
  // @Input() is_s_plant_admin:any;
  // @Input() inc_id:any;
  // @Input() severity:any;

  status:any;
  role:any;
  rsponseDetails:any;
  is_s_plant_admin:any;
  inc_id:any;
  severity:any;

  
  inc_d_id
  des_ica = ''
  des_uc = ''
  root_c = ''
  images_ip = []
  images_cl = []
  action_point = ''
  actionpoints_list = []
  action_points_check = []
  action_points_assign = []
  action_points_assign_name = []
  is_disable = 'disable'
  croppedImagepath: string;
  isCheckedAR = false
  emp_list: any;
  due_date = 'Add Due Date'
  assign_name = ''
  type = 'list'
  constructor(private camera: Camera,private activatedRoute:ActivatedRoute,private router:Router,private modalCtrl:ModalController,private updateStatus:UpdateStatusIncService,
    private restApi:RestApiService,private appConstant:AppConstantService,private actionSheetController:ActionSheetController,private modalController:ModalController,private fileUploadService:FileUploadService,
    private file:File,private platform:Platform) {
      this.inc_id = this.activatedRoute.snapshot.paramMap.get('inc_id');
      this.status = this.activatedRoute.snapshot.paramMap.get('status');
      this.role = this.activatedRoute.snapshot.paramMap.get('role'); 
      this.rsponseDetails = JSON.parse( this.activatedRoute.snapshot.paramMap.get('rsponseDetails'));
      this.is_s_plant_admin = this.activatedRoute.snapshot.paramMap.get('is_s_plant_admin');
      this.severity = this.activatedRoute.snapshot.paramMap.get('severity');

      try{
        this.type = this.activatedRoute.snapshot.paramMap.get('type');
      }catch(e){
        this.type = 'list'
      }
      console.log(this.rsponseDetails);
     
   }

   getUserName(index){
      return this.action_points_assign_name[index];
   }

   async OpenEmpList(index,selected_id){
     if(this.is_delete_enable){
      const modal = await this.modalController.create({
        component: EmplistPage,
        cssClass: 'modal-custom-css',
        componentProps: {
          'emplist': this.emp_list,
          'selected_id': selected_id,
          'is_emplist': true
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        this.action_points_assign[index]=data['data']
        this.emp_list.forEach(item => {
          if(item['id']==data['data']){
            this.action_points_assign_name[index]=item['emp_name'];
            let actionP = this.loadFinalActionPoints();
            this.editAction(actionP,this.inc_id,'add')
          }
        });
      });
      return await modal.present();
     }
   }

   isAllowToChange(assignID){
      if(assignID ==localStorage.getItem(this.appConstant.TAG_IS_USER_ID) || (this.appConstant.getUserType()=="plantsadmin")){
      return true;
     }else{
      return false;
     } 
   }

   AddPonit(){
    if(!this.is_add_a_point){
      if(this.action_point.length>1){
        this.actionpoints_list.push(this.action_point);
        this.action_points_check.push('false');
        this.action_points_assign.push(localStorage.getItem(this.appConstant.TAG_IS_USER_ID));
        this.action_points_assign_name.push('Assign user')
        this.action_point = ''
       }else{
       }
    }
    this.loadFinalActionPoints();
   }

  btnTitle = 'Save'
  is_in_progress = true
  is_add_a_point = false
  is_severity_high = true
  is_add_rc = false
  is_delete_enable = false
  is_Check_Action_P = false; 
   ngOnInit() {
    if(this.status=='In Progress'){
      this.btnTitle = 'Save'
      this.is_in_progress = false
    }else{
      if(this.severity=='High'){
          if(this.appConstant.getUserType()=="plantsadmin"){
            this.btnTitle = 'Update'
          }else{ 
            this.btnTitle = 'none'
          }
          this.is_in_progress = true
      }else{
        this.btnTitle = 'Update'
        this.is_in_progress = true
      }
    }
    // let yesNo = this.action_points_assign.includes(localStorage.getItem(this.appConstant.TAG_IS_USER_ID))
//(!this.is_in_progress) && 

    if(this.is_s_plant_admin == 'true'){
      this.is_add_a_point = false;
    }else{
      this.is_add_a_point = true;
    }

    if(this.severity=='High'){
      this.is_add_rc = false
    }else{
      this.is_add_rc = true
    }

    if((!this.is_in_progress) && this.severity=='High'){
      this.is_Check_Action_P = false
    }else{
      this.is_Check_Action_P = true
    }

    try{
      this.des_ica = (this.rsponseDetails['imc_action']==null)?'':this.rsponseDetails['imc_action']
      this.des_uc = (this.rsponseDetails['underlying_cause']==null)?'':this.rsponseDetails['underlying_cause']//this.rsponseDetails['underlying_cause']
      this.root_c = (this.rsponseDetails['root_cause']==null)?'':this.rsponseDetails['root_cause']//this.rsponseDetails['root_cause']
      let a_p = this.rsponseDetails['action_points'];
      let action_p = a_p.split("~");
      this.actionpoints_list =  action_p[1].split(","); 
      this.action_points_check =  action_p[0].split(",");
      this.action_points_assign =  action_p[2].split(",");
    }catch(e){ 
    }

    if(this.appConstant.getUserType()=="plantsadmin"){
      this.is_delete_enable = true
    }else{
      this.is_delete_enable = false
    }

    try{
      if((this.rsponseDetails['assigned_to']==null || this.rsponseDetails['assigned_to']=="") && (this.rsponseDetails['due_date']==null||this.rsponseDetails['due_date']=="")){
        this.isCheckedAR = false;
        this.due_date = 'Add Due Date'
        this.assign_name = ''
        this.finalDueDate = ''
      }else{
        this.isCheckedAR = true;
        this.due_date = this.rsponseDetails['due_date']
        this.finalDueDate =  this.rsponseDetails['due_date']
        this.assign_name = this.rsponseDetails['assigned_to']
      }
    }catch(e){

    }
    this.loadEMPList(); 
   }

   finalDueDate = ''
   selected_images_ip = []
    pickImagePA(sourceType) {
      const options: CameraOptions = {
        quality: 20,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true, 
      }
      this.camera.getPicture(options).then((imageDataURI) => {
        this.base64Image = '';
          if(this.platform.is('ios')){
            let filename = imageDataURI.substring(imageDataURI.lastIndexOf('/')+1);
            let path =  imageDataURI.substring(0,imageDataURI.lastIndexOf('/')+1);
              this.file.readAsDataURL(path, filename).then(res=>{
              this.base64Image= res;
              this.selected_images_ip.push(this.base64Image)
            });
          }else{
            this.base64Image = (<any>window).Ionic.WebView.convertFileSrc(imageDataURI);;
            this.selected_images_ip.push(this.base64Image)
          }
  
         this.images_ip.push(imageDataURI)  
      }, (err) => {
        // Handle error
      });
    }

    base64Image ='';
    selected_images_cl = []
  
    pickImageOR(sourceType) {
      const options: CameraOptions = {
        quality: 20,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true, 
      }
      //'data:image/jpeg;base64,' +
      this.camera.getPicture(options).then((imageDataURI) => {
        this.base64Image = '';
        if(this.platform.is('ios')){
          let filename = imageDataURI.substring(imageDataURI.lastIndexOf('/')+1);
          let path =  imageDataURI.substring(0,imageDataURI.lastIndexOf('/')+1);
            this.file.readAsDataURL(path, filename).then(res=>{
            this.base64Image= res;
            this.selected_images_cl.push(this.base64Image)
          });
        }else{
          this.base64Image = (<any>window).Ionic.WebView.convertFileSrc(imageDataURI);;
          this.selected_images_cl.push(this.base64Image)
        }
        this.images_cl.push(imageDataURI)
      }, (err) => {
        // Handle error
      });
    }

    onChangeAR(event){
      if(this.isCheckedAR = event['detail']['checked']){
        this.isCheckedAR = true;
        this.due_date = 'Add Due Date'
        this.finalDueDate = ''
        this.assign_name = ''
      }else{
        this.isCheckedAR = false;
        this.due_date = 'Add Due Date'
        this.finalDueDate = ''
        this.assign_name = ''
      }
    }

  async calendarModal() {   
    if(!this.is_Check_Action_P){
        const options: CalendarModalOptions = {
          pickMode: 'single',
          from: new Date(),
          to: new Date(2030, 0, 1),
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
     // console.log(date)
      if(date!=null){
        this.finalDueDate = date['string']
        this.due_date = date['string']
      }
    }
}

  async selectPlantAdminImage() {
    if(!this.is_in_progress){
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Load from Library',
          handler: () => {
            this.pickImagePA(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImagePA(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    }
  }

    async selectOrgAdminImage(){
      if(this.is_in_progress){
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Load from Library',
          handler: () => {
            this.pickImageOR(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImageOR(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
  }
  }

   goBack(){
      localStorage.setItem("dataUpdateStatus","0");
      this.updateStatus.updateStatusState.next(false);
      this.router.navigate(['/inc-response', {id: this.inc_id,status:this.status,type:this.type}]);
    }

    saveResponse(){
      if(this.status == 'In Progress'){
        if(this.des_ica.trim().length<1){
          this.appConstant.toastMsg('Add Immediate Containment Action.')
          return;
        }
        if(this.des_uc.trim().length<1){
          this.appConstant.toastMsg('Underlying cause is a required field.')
          return;
        }
        if(this.isCheckedAR){
          if(this.assign_name.trim().length<1){
            this.appConstant.toastMsg('Assign Name is a required field.')
            return;
          }

          if(this.finalDueDate.length<1){
            this.appConstant.toastMsg('Due Date is a required field.')
            return;
          }
        }
        if(this.severity=='High'){
          if(this.root_c.trim().length<1){
            this.appConstant.toastMsg('Add Root Cause.')
            return;
          }
        }
      }
      
      let actionP = this.loadFinalActionPoints();
      let data = { 
        'action_points': actionP,
        'assigned_to': this.assign_name,
        'due_date': this.finalDueDate,
        'id': this.inc_id,
        'imc_action': this.des_ica,
        'root_cause': this.root_c,
        'underlying_cause': this.des_uc,
        }
        if(this.checkNotAssignUser()){
          this.appConstant.toastMsg('Assgin User to Actiion point');
        }else{
          this.restApi.saveINCStatus(data).then((success) => {
           // console.log(success)
            this.uploadImagesIP(success['insertid'])
        }, (error) => {
          this.appConstant.handleApiError(error)
        });
        }
 }

 checkNotAssignUser(){
   return this.action_points_assign.join(',').includes(localStorage.getItem(this.appConstant.TAG_IS_USER_ID));
 }
  closeIssue(){
    let closeIssue = false;
    if(this.severity=='High'){
      let isP = this.action_points_check.includes('false')
      if(isP){
        closeIssue = false;
      }else{
        closeIssue = true;
      }
    }else{
      closeIssue = true
    }
    if(closeIssue){
      let data = { 
        id: this.inc_id
        }
      this.restApi.closeIssue(data).then((success) => {
         // console.log(success)
          this.uploadImagesCL(success['insertid'])
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }else{
      this.appConstant.toastMsg('Action points not completed')
    }
  }

  loadEMPList(){
    let data= {
      "searchText": "",
      "sortby": "id",
      "sorttype": "desc",
      "page": 0,
      "whereData": [
        {
          "field": "`employee`.`plant_ref_id`",
          "value": this.appConstant.getPlantId(),
          "type": "AND",
          "nested": ""
        },
        {
          "field": "`employee`.`emp_type_ref_id`",
          "value": "0",
          "type": "AND",
          "nested": "("
        },
        {
          "field": "`employee`.`emp_type_ref_id`",
          "value": "2",
          "type": "OR",
          "nested": ")"
        }
      ]
    }
      this.restApi.getNodeEMPList(data).then((success) => {
          this.emp_list = success['data']
          // && item['']!="1"
          this.action_points_assign.forEach(item_id => {
            this.emp_list.forEach(item => {
              if(item['id']==item_id){
                this.action_points_assign_name.push(item['emp_name']);
              }
            });
          });
          

      }, (error) => {
        this.appConstant.handleApiError(error)
      });
  }

  deleteActionPoint(index){
    this.action_points_check.splice(index,1)
    this.actionpoints_list.splice(index,1)
    this.action_points_assign.splice(index,1)
    let actionP = this.loadFinalActionPoints();
    this.editAction(actionP,this.inc_id,'remove')
  }

  loadFinalActionPoints(){
    let data = this.action_points_check.join(',')+'~'+this.actionpoints_list.join(',')+'~'+this.action_points_assign.join(',')
    return data;
  }

    editAction(actionPoints,id,type){
      let data= {
        "action_points": actionPoints,
        "id": id,
        "type": type,
      }
      this.restApi.saveNEditAPoints(data).then((success) => {
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }

    changeStatus(index,status){
      if(localStorage.getItem(this.appConstant.TAG_IS_USER_ID)==this.action_points_assign[index]){
        this.action_points_check.splice(index,1,status)
      let data = this.action_points_check.join(',')+'~'+this.actionpoints_list.join(',')+'~'+this.action_points_assign.join(',')
      this.changeActionPStatus(data);
      }
      
    }
  

    changeActionPStatus(actionPoints){
      let data= {
        "action_points": actionPoints,
        "incId": this.inc_id,
      }
      this.restApi.changeActionStatus(data).then((success) => {
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }

    private imgBlobIP = [];
    uploadImagesIP(inc_R_id){
      this.appConstant.showLoading('Updating status. Please wait...')
      if(this.images_ip.length>0){
        let imageIndex = 1;
        this.images_ip.forEach(imageValue => {
        this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
          entry.file(file => {
            const reader = new FileReader();
            reader.onload = () => {
              let blogImage = new Blob([reader.result], { type: file.type})
                this.imgBlobIP.push(blogImage)
                if(imageIndex==this.images_ip.length){
                this.fileUploadService.uploadImagesPL_api(inc_R_id,1,this.imgBlobIP,this.appConstant.getUserType()).subscribe((event: any) => {
                });
                }
                imageIndex ++;
            };
            reader.readAsArrayBuffer(file);
          });
        });
      });
      setTimeout(()=>{ 
        this.appConstant.dismissLoading();
        this.appConstant.toastMsg('Status updated successfully.');
        localStorage.setItem("dataUpdateStatus","1");
        this.updateStatus.updateStatusState.next(true);
        this.router.navigate(['/inc-response', {id: this.inc_id,status:this.status,type:this.type}]);
      }, 2000)
      }else{
        setTimeout(()=>{ 
          this.appConstant.dismissLoading();
          this.appConstant.toastMsg('Status updated successfully.');
          localStorage.setItem("dataUpdateStatus","1");
          this.updateStatus.updateStatusState.next(true);
          this.router.navigate(['/inc-response', {id: this.inc_id,status:this.status,type:this.type}]);
        }, 2000)
      }
    }

    private imgBlobClose = [];
    uploadImagesCL(inc_R_id){
      this.appConstant.showLoading('Updating status. Please wait...')
      if(this.images_cl.length>0){
        let imageIndex = 1;
          this.images_cl.forEach(imageValue => {
            this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
              entry.file(file => {
                const reader = new FileReader();
                reader.onload = () => {
                     this.imgBlobClose.push(new Blob([reader.result], { type: file.type}))
                     if(imageIndex==this.images_cl.length){
                         this.fileUploadService.uploadImagesCL_api(inc_R_id,1,this.imgBlobClose,this.appConstant.getUserType()).subscribe((event: any) => {
                      });
                     }
                     imageIndex ++;
                   
                };
                reader.readAsArrayBuffer(file);
              });
            });
          });
          setTimeout(()=>{ 
            this.appConstant.dismissLoading()
            this.appConstant.toastMsg('Status updated successfully.');
            localStorage.setItem("dataUpdateStatus","1");
            this.updateStatus.updateStatusState.next(true);
            this.router.navigate(['/inc-response', {id: this.inc_id,status:this.status,type:this.type}]);
          }, 2000)
      }else{
        setTimeout(()=>{ 
          this.appConstant.dismissLoading()
          this.appConstant.toastMsg('Status updated successfully.');
          localStorage.setItem("dataUpdateStatus","1");
          this.updateStatus.updateStatusState.next(true);
          this.router.navigate(['/inc-response', {id: this.inc_id,status:this.status,type:this.type}]);
        }, 2000)
      }
    }

}
