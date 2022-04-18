import {  Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ActionSheetController, AnimationController, IonSlides, NavController, ModalController} from '@ionic/angular';

import { AppConstantService } from 'src/app/services/app-constant.service';
import { environment as ENV } from '../../../environments/environment'
import { DatePipe } from '@angular/common';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Platform } from '@ionic/angular';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';
import { ConnectionStatusService } from 'src/app/connection/connection-status.service';
import { CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { FileUploadService } from 'src/app/upload/file-upload.service';
import { UpdateIncListService } from 'src/app/services/update-inc-list.service';


@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.page.html',
  styleUrls: ['./incident-details.page.scss'],
})
export class IncidentDetailsPage {


  step = 0;
  progressCount = 1;
  totalStep = 5;

  inc_details = {};
  images = [];
  injuries = [];
  
  hours = ['01','02','03','04','05','06','07','08','09','10','11','12']
  minutes = ['00','05','10','15','20','25','30','35','40','45','50','55','60']
  time_type = ['AM','PM']
  //'Was there any injury?',
  stepTitle = ['What happened?','Severity','Category','Do you have picture?','When was it?','Where it happened']


  selectedHoursIndex = 0;
  selectedMinutesIndex = 0;
  selectedTypeIndex = 0;

  selectedHoursIndexValue = 0;
  selectedMinutesIndexValue = 0;
  selectedTypeIndexValue = 0;

  severity=''
  whatHappned=''

  croppedImagepath='';

  cameraOptions: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true, 
  }

  part_clicked($event){
    let body_part = $event['srcElement']['id'];
    if(body_part=='' || body_part==null){
    }else{
      if(this.injuries.includes(body_part)){
        this.injuries.forEach((element,index)=>{
          if(element==body_part) this.injuries.splice(index,1);
       });
      }else{
        this.injuries.push(body_part)
      }
    }  
  }

  loadareaselected = 'Area';
  area_id = 0;
  loadAreaSelected(event){
    let index = event.value.id;
    let name = event.value.name;
    this.area_id = index;
  }

  filterCriteriaCat = 'Category';
  cat_id = 0;
  loadCatData(event){
    let index = event.value.id;
    this.cat_id = index;
  }


  filterCriteriaPlant = 'Site';
  plant_id = 0;
  loadPlantData(event){
    let index = event.value.id;
    this.plant_id = index;
    this.getAllAreaByPlant(index);
  }

  //latitude: any = 0; //latitude
  //longitude: any = 0; //longitude
  
  constructor( private camera: Camera,private animationCtrl: AnimationController,public toastController: ToastController,
    public actionSheetController: ActionSheetController,private restApi: RestApiService, private router: Router, 
     private appConstant: AppConstantService,private platform:Platform,private navController:NavController,
     private updateIncList:UpdateIncListService,private connectionService:ConnectionStatusService,private modalCtrl:ModalController,
     private fileUploadService:FileUploadService,private file:File) { 
      this.getAllCategories();
      this.genarateDateList();
      this.getplantListAction();
      this.saveOneSignalID();
    }

    isDateFilter = false;
    selectedDate = '';
    async calendarModal() {   
      const today1 =  new Date();
      const tomorrow =  new Date(new Date().setDate(today1.getDate() - 6 ));
      const options: CalendarModalOptions = {
        pickMode: 'single',
        from: tomorrow,
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
    //console.log(date)
    if(date!=null){
       this.selectedDate = date['string']
       this.isDateFilter = true;
    }
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

    ionViewDidEnter(){
      this.platform.backButton.subscribe(() => {
          if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
              this.router.navigateByUrl('/users/tabs/home');
          }else{
            this.router.navigateByUrl('/admin/tabs/overview');
          }
      });
     }


    isInjurySelected(body_part){
      let is_incude = this.injuries.includes(body_part)
      return is_incude;
    }

    removeItem(injury){
      this.RemoveElementFromStringArray(injury);
    }

    RemoveElementFromStringArray(element: string) {
      this.injuries.forEach((value,index)=>{
          if(value==element) this.injuries.splice(index,1);
      });
  }

    resetAllPara(){
      this. step = 0;
      this. progressCount = 0;
      this. totalStep = 7;
    
      this. inc_details = {};
      this. images = [];
      this. selectedHoursIndex = 0;
      this. selectedMinutesIndex = 0;
    
      this.selectedHoursIndexValue = -1;
      this.selectedMinutesIndexValue = -1;
    
    
      this. severity=''
      this.whatHappned=''
    
      this.croppedImagepath='';
      this.index_image = 0;
      // this.dateListDisplay=[];
      // this.dateListStore=[];
      this.areaList=[];
      this.area_id = 0;
  }
 
    description: string = "";
    index_image = 0;
    selected_images = []
    base64Image ='';
    pickImage(sourceType) {
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
              this.selected_images.push(this.base64Image)
            });
          }else{
            this.base64Image = (<any>window).Ionic.WebView.convertFileSrc(imageDataURI);;
            this.selected_images.push(this.base64Image)
          }
  
         this.images.push(imageDataURI)  

        // this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
        // this.images.push(this.croppedImagepath);

      }, (err) => {
        // Handle error
      });
    }

    private imgBlobIP = [];
    uploadImagesNode(inc_id){
      if(this.images.length>0){
        this.appConstant.showLoading('Uploading images. Please wait...')
        let imageIndex = 1;
        this.images.forEach(imageValue => {
          this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
            entry.file(file => {
              const reader = new FileReader();
              reader.onload = () => {
                let blogImage = new Blob([reader.result], { type: file.type})
                  this.imgBlobIP.push(blogImage)
                  if(imageIndex==this.images.length){
                    this.fileUploadService.uploadIncidentImages(inc_id,this.imgBlobIP).subscribe((event: any) => {
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
        this. resetAllPara();
        if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
          localStorage.setItem("dataUpdateAdminInc","1");
          this.updateIncList.updateListState.next(true);
          this.router.navigateByUrl('/users/tabs/home');
        }else{
          localStorage.setItem("dataUpdateAdminInc","1");
          this.updateIncList.updateListState.next(true);
          this.router.navigateByUrl('/admin/tabs/overview');
        }
      }, 1000)
      }else{
        setTimeout(()=>{ 
          this. resetAllPara();
          if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
            localStorage.setItem("dataUpdateAdminInc","1");
            this.updateIncList.updateListState.next(true);
            this.router.navigateByUrl('/users/tabs/home');
          }else{
            localStorage.setItem("dataUpdateAdminInc","1");
            this.updateIncList.updateListState.next(true);
            this.router.navigateByUrl('/admin/tabs/overview');
          }
        }, 1000)
      }
    }
  
    async selectImage() {
      if(this.images.length>=5){
        this.appConstant.toastMsg('You can upload only 5 images.')
      }else{
        const actionSheet = await this.actionSheetController.create({
          header: "Select Image source",
          buttons: [{
            text: 'Load from Library',
            handler: () => {
              this.pickImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.pickImage(this.camera.PictureSourceType.CAMERA);
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

    dateListDisplay=[];
    dateListStore=[];
    genarateDateList(){
      let dateListDisplayData=[];
      let dateListStoreData=[];
      const today =  new Date();
      const datePipe = new DatePipe("en-US");
      for (let i = -7; i <= 0; i++) {
        const today1 =  new Date();
        const tomorrow =  new Date(today1.setDate(today1.getDate() + i ));
        const show = datePipe.transform(tomorrow, 'EEEE-MMMM-d');
        const store = datePipe.transform(tomorrow, 'YYY-MM-d');
        let dateArray ={
          day : show.split("-")[0],
          date : show.split("-")[2],
          month : show.split("-")[1]
        }
        dateListDisplayData.push(dateArray)
        dateListStoreData.push(store)
      }
      this.dateListDisplay = dateListDisplayData.reverse();
      this.dateListStore = dateListStoreData.reverse();
    }

    getImageStatus(){
      if(this.images.length==0){
        return true
      }else{
        return false
      }
    }

    nextHour(){
      if(this.selectedHoursIndex<11){
        this.selectedHoursIndex++;
      }
      this.selectedHoursIndexValue = this.selectedHoursIndex;

    }

    preHour(){
      if(this.selectedHoursIndex>0){
        this.selectedHoursIndex--;
      }
      this.selectedHoursIndexValue = this.selectedHoursIndex;
    }

    nextMinute(){
      if(this.selectedMinutesIndex<12){
        this.selectedMinutesIndex++;
      }
      this.selectedMinutesIndexValue = this.selectedMinutesIndex;
    }

    preMinute(){
      if(this.selectedMinutesIndex>0){
        this.selectedMinutesIndex--;
      }
      this.selectedMinutesIndexValue = this.selectedMinutesIndex;
    }

    nextType(){
      if(this.selectedTypeIndex<1){
        this.selectedTypeIndex++;
      }
      this.selectedTypeIndexValue = this.selectedTypeIndex;
    }

    preType(){
      if(this.selectedTypeIndex>0){
        this.selectedTypeIndex--;
      }
      this.selectedTypeIndexValue = this.selectedTypeIndex;
    }

    selectDateIndexValue=-1;
    selectDateIndex(index){
      this.selectDateIndexValue =index;
    }

    setSeverity(dataValue){
      this.severity = dataValue
      this.inc_details['severity']=dataValue
    }

    setWhatHappned(dataValue){
    this.whatHappned = dataValue
    this.inc_details['what_happned']=dataValue
  }

  ngOnInit() {
  }

  swipeToReport(){
    this.step++;
    this.progressCount++;
  }

  nextStep(){
    if(this.totalStep==this.step){
    }else{
      let isNext = true;
      if(this.step==0){
        if(this.whatHappned==''){
          isNext = false;
          this.presentToast('Please select one option');
        }else{ 
        }
      }

      if(this.step==1){
        if(this.severity==''){
          isNext = false;
          this.presentToast('Please select severity');
        }else{ 
        }
      }

      if(this.step==2){
        if(this.cat_id==0){
          isNext = false;
          this.presentToast('Please select Category');
        }else{ 
        }
      }

      // if(this.step==3){
      //   if(this.images.length<1){
      //     isNext = false;
      //     this.presentToast('Please upload image');
      //   }
      // }

      if(this.step==4){
        if(this.selectDateIndexValue==-1){
          isNext = false;
          this.presentToast('Please select Date');
        }else{ 
        }
      }

      if(isNext){
        this.step++;
        this.progressCount++;
      }
    }
  }

 async presentToast(strMsg) {
   const toast = await this.toastController.create({
     message: strMsg,
     duration: 2000
   });
   toast.present();
 }

 preStep(){
   if(this.step==0){
    if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
      // localStorage.setItem("dataUpdate","1");
      // this.updateData.dataChangeState.next(true);
      this.router.navigateByUrl('/users/tabs/home');
    }else{
      // localStorage.setItem("dataUpdateAdminInc","1");
      // this.updateData.dataChangeState.next(true);
      this.router.navigateByUrl('/admin/tabs/overview');
    }
   }
   if(1>this.step){

   }else{
     this.step--;
     this.progressCount--;
   }
 }

  convertTimeFrom12To24(timeStr) {
  var colon = timeStr.indexOf(':');
  var hours = timeStr.substr(0, colon),
      minutes = timeStr.substr(colon+1, 2),
      meridian = timeStr.substr(colon+4, 2).toUpperCase();
 
  
  var hoursInt = parseInt(hours, 10),
      offset = meridian == 'PM' ? 12 : 0;
  
  if (hoursInt === 12) {
    hoursInt = offset;
  } else {
    hoursInt += offset;
  }
  return hoursInt + ":" + minutes;
}

incident_local_list : any ;
 saveData(){
  if(this.plant_id==0){
    this.presentToast('Please select Plant');
    return
  }
  
  if(this.area_id==0){
    this.presentToast('Please select Area');
    return
  }
  
  let finalDate = this.dateListStore[this.selectDateIndexValue] //this.selectedDate; //
  let date =finalDate +' '+this.hours[this.selectedHoursIndex]+':'+this.minutes[this.selectedMinutesIndexValue]+':00'

   this.inc_details['date_time'] = date;
   this.inc_details['time_type'] = this.time_type[this.selectedTypeIndexValue];
   this.inc_details['is_injury_involved']=(this.injuries.length>0)?1:0
   this.inc_details['incident_description']=(this.description==''||this.description==null)?'-':this.description
   this.inc_details['immediate_action_taken']=1
   this.inc_details['leave_the_workplace']=1
   this.inc_details['explanation_of_event_by_w']='--'
   this.inc_details['incident_id']= this.appConstant.createUniqueId()
   this.inc_details['severity']=this.severity
   this.inc_details['what_happned']=this.whatHappned
   this.inc_details['organization_ref_id']=this.appConstant.getORGId();
   this.inc_details['incident_type_ref_id']=1
   this.inc_details['incident_category_ref_id']=this.cat_id
   this.inc_details['incident_sub_category_ref_id']=null
   this.inc_details['incident_ss_category_ref_id']=null
   this.inc_details['area_ref_id']=this.area_id
   this.inc_details['plant_ref_id']=this.plant_id
   this.inc_details['body_parts']= this.injuries.toString()
   this.inc_details['status']= 'open'
   this.inc_details['employee_ref_id'] = localStorage.getItem(this.appConstant.TAG_IS_USER_ID)
   this.inc_details['user_id'] = localStorage.getItem(this.appConstant.TAG_IS_USER_ID)




// let data = {
//   area_ref_id: this.area_id,
//   date_time: date,
//   employee_ref_id: localStorage.getItem(this.appConstant.TAG_IS_USER_ID),
//   explanation_of_event_by_w: "",
//   immediate_action_taken: 0,
//   incident_category_ref_id: this.cat_id,
//   incident_description: (this.description==''||this.description==null)?'-':this.description,
//   incident_id: this.appConstant.createUniqueId(),
//   incident_ss_category_ref_id: "",
//   incident_sub_category_ref_id: "",
//   incident_type_ref_id: 1,
//   is_injury_involved: (this.injuries.length>0)?1:0,
//   leave_the_workplace: 0,
//   organization_ref_id: this.appConstant.getORGId(),
//   plant_ref_id: this.plant_id,
//   severity: this.severity,
//   what_happned: this.whatHappned,
// }

   //if(this.connectionService.isConnectionAvailable()){
    this.appConstant.showLoading('Submitting Observation..');
    this.restApi.saveIncidentByNode(this.inc_details).then((success) => {
     this.appConstant.dismissLoading();
     this.uploadImagesNode(success['data']);
   }, (error) => {
     this.appConstant.dismissLoading();
     this.appConstant.handleApiError(error)
   });
 }

//  uploadImages(inc_id){
//    if(this.images.length>0){
//       for(let i=0;i<this.images.length;i++){
//         let data={}
//         data['image'] = this.images[i];
//         data['incident_ref_id'] = inc_id;

//           this.appConstant.showLoading('Uploading images');
//           this.restApi.uploadDocument(data,this.appConstant.API_INC_IMG).then((success) => {
//           this.appConstant.dismissLoading();
  
//         }, (error) => {
//           this.appConstant.dismissLoading();
//           this.appConstant.handleApiError(error)
//         });
//       }
//       this. resetAllPara();
//       if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
//         localStorage.setItem("dataUpdate","1");
//         this.updateData.dataChangeState.next(true);
//         this.router.navigateByUrl('/users/tabs/home');
//       }else{
//         localStorage.setItem("dataUpdateAdminInc","1");
//         this.updateData.dataChangeState.next(true);
//         this.router.navigateByUrl('/admin/tabs/overview');
//       }
//    }else{
//       this. resetAllPara();
//       if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
//         localStorage.setItem("dataUpdate","1");
//         this.updateData.dataChangeState.next(true);
//         this.router.navigateByUrl('/users/tabs/home');
//       }else{
//         localStorage.setItem("dataUpdateAdminInc","1");
//         this.updateData.dataChangeState.next(true);
//         this.router.navigateByUrl('/admin/tabs/overview');
//       }
//    }
//  }

 areaList=[];
//  getAllArea() { 
//   let data= {
//      org_id :  this.appConstant.getORGId()
//   }
//   this.restApi.getAllAreaList(data).then((success) => {
//     this.areaList = success['data'][0];
//   }, (error) => {
//     this.appConstant.handleApiError(error)
//   });
// }

allAreas = [];
getAllAreaByPlant(selected_plant_id) { 
    let data= {
      "searchText":"",
      "sortby":"id",
      "page":0
    }
   this.restApi.nodeGetAllArea(data).then((success) => {
     this.allAreas = success['data'];
     let ndata = {
      plantId : selected_plant_id
     }
     this.restApi.nodeGetAreabyPlant(ndata).then((success) => {
      let areaListObj = success['areaIds'];
      areaListObj.forEach(item => {
        let area = this.allAreas.find(x => x.id == item);
        this.areaList.push(area)
      });
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
   }, (error) => {
     this.appConstant.handleApiError(error)
   });
}


plantList = [];
getplantListAction() { 
  if(this.connectionService.isConnectionAvailable()){
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
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
  }else{
    let plant_List = localStorage.getItem('org_plant_list')
    if(plant_List==null){
    }else{
        this.plantList = JSON.parse(plant_List)
    }
  }
}

categoryList=[];
getAllCategories() { 
  if(this.connectionService.isConnectionAvailable()){
    let data= {
      page: 0,
      searchText: "",
      sortby: "id"
    }
    this.restApi.getCatListByOrg(data).then((success) => {
        this.loadOrgCat(success['data']);
   }, (error) => {
     this.appConstant.handleApiError(error)
   });
  }else{
    let catList = localStorage.getItem('cat_list')
    this.categoryList = JSON.parse(catList)
  }
}


loadOrgCat(allCat){
  let data= {
    orgId :  this.appConstant.getORGId(),
  }
  this.restApi.nodeGetOrgCat(data).then((success) => {
    let catLiist = success['data'];
    catLiist.forEach(item => {
      console.log('id : '+item['incident_category_id']);
      let catItem = allCat.find(x => x.id == item['incident_category_id']);
      console.log('catItem : '+catItem);
      this.categoryList.push(catItem)
    });
 }, (error) => {
   this.appConstant.handleApiError(error)
 });
}

isHighloght(step){
  if(this.progressCount>=step){
    return true;
  }else{
    return false;
  }
}
}
