import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { EmplistPage } from '../emplist/emplist.page';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ShiftListsPage } from '../shift-lists/shift-lists.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { FileUploadService } from 'src/app/upload/file-upload.service';
import { DatePipe } from '@angular/common';
import { CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';
import { CustomModelPage } from '../custom-model/custom-model.page';


@Component({
  selector: 'app-add-ptw',
  templateUrl: './add-ptw.page.html',
  styleUrls: ['./add-ptw.page.scss'],
})
export class AddPTWPage implements OnInit {

  step = 0; 
  progressCount = 1;
  totalStep = 5;
  stepTitle = ['Verified By','Contractor Details','Date/Time Selection','Worker Details','Questions','Description'] 
  contractorTypeList = [{id:1,name:'Internal'},{id:2,name:'Register Vendor'},{id:3,name:'Un-Register Vendor'}]


  isSafetyOfficer = false
  safety_officer_name ='Select Safety Oficer'
  safety_officer_id = '';

  co_signer_1 = false
  co_signer_1_name ='Select Co Signer 1'
  co_signer_1_id = '';

  co_signer_2 = false
  co_signer_2_name ='Select Co Signer 2'
  co_signer_2_id = '';

  process_owner_name = '';
  dept_c_contractor = '';
  owner_contact_no = '';
  contractor_name = '';
  no_of_workers = '';
  contractor_contact_no = '';


  is_process_owner_name = false;
  is_dept_c_contractor = false;
  is_owner_contact_no = false;
  is_contractor_name = false;
  is_no_of_workers = false;
  is_contractor_contact_no = false;

  // start_date ="Start Date";
  // end_date = "End Date";
  // start_time = 'Start Time'
  // end_time = "End Time"

  start_date_final = "";
  end_date_final = "";
  // start_time_final = ""
  // end_time_final = ""

  isWorkerCompansation = false;
  isWorkerStateInsurance = false;
  isProvidentFund = false;
  isMedicalReports = false;
  isGovID = false;
  isChildrenBelow14 = false;
  isAllWorkers = false;
  isSafePro = false;
  isValidTestTools = false;
  isUnderstandWork  = false;

  description = ''

  shift_id = '';
  shift_name = 'Select Shift'

  contractor_type_id = '0';
  contractor_type_name = 'Select Contract Type'

  cat_id;
  cat_name;
  r_by;

  hours = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
  minutes = ['00','05','10','15','20','25','30','35','40','45','50','55','60']
  time_type = ['AM','PM']

  start_hours = '00'
  end_hours = '00'

  start_minutes = '00'
  end_minutes = '00'
  
  title='Add PTW ';
  permitUID = 'PMT'+ this.appConstant.createUID(5)+this.appConstant.createUID(5);
  constructor(private modalCtrl:ModalController, private router:Router,private appConstant:AppConstantService,private restApi:RestApiService,private modalController:ModalController,private activatedRoute :ActivatedRoute,
    private actionSheetController:ActionSheetController,private camera:Camera,private file:File,private fileUploadService:FileUploadService,private platform:Platform,
    private changeRef: ChangeDetectorRef) {
    }

    // step4 = [20,18,18,18,22]
    // step5 = []
    // finalStepWidth = []
   questionList = []
   isShowQ = false;
   loadPTWQuestion(){
     let data = {
       catId: this.cat_id
     }
     this.restApi.getPTWQuestion(data).then((success) => {
       this.questionList=success['data']
       this.appConstant.consoleLog(success,this.questionList.length);
     }, (error) => {
     });
   }

   qusestionAnswer =[];
   saveOption(event,index,qId){
     let data = {
      question_ref_id : qId,
       selected_option : event.detail.value
     }
     this.qusestionAnswer[index]=data
    //this.saveAnswer(event.detail.value,question_id,ptw_id);
   }
 
 //   ques_ref_id: 29
 // selected_option: "test1"
 // work_permit_id: "6"
  
  getQuestionAnswer(questionID){
    try{
      let ans = this.qusestionAnswer.find(x => x.question_ref_id == questionID).selected_option;
      return ans;
    }catch(e){
      return '';
    }
  }

   saveAnswer(ptw_id){
    let index = 0;
    this.questionList.forEach(question => {
          let data = {
       ques_ref_id: question['id'],
       selected_option: this.getQuestionAnswer(question['id']),
       work_permit_id: ptw_id
     }
     console.log(data)
     this.restApi.savePTWQ_answer(data).then((success) => {
       console.log('answer saved succesfully');
     // this.appConstant.toastMsg('Answer submitted successfully.')
     }, (error) => {
     });
    });

    //  let data = {
    //    ques_ref_id: question_id,
    //    selected_option: answer,
    //    work_permit_id: ptw_id
    //  }
 
    //  this.restApi.savePTWQ_answer(data).then((success) => {
    //   // this.appConstant.toastMsg('Answer submitted successfully.')
    //  }, (error) => {
    //  });
 
   }

   isDateFilter = false;
   dateList= []
  async calendarModal() {   
    const options: CalendarModalOptions = {
      pickMode: 'range',
      from: new Date(),
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
  this.dateList.push(date['from']['string'])
  this.dateList.push(date['to']['string'])
  this.start_date_final = date['from']['string']
  this.end_date_final = date['to']['string']
  this.isDateFilter = true
 }
 }

   setCurrentTIme(){
    const datePipe = new DatePipe("en-US");
    const tomorrow =  new Date();
    const showTime = datePipe.transform(tomorrow, 'H:S');

    this.start_hours = (String(showTime.split(':')[0]).length<2)?'0'+String(showTime.split(':')[0]):String(showTime.split(':')[0]) //
    this.start_minutes =  (String( showTime.split(':')[1]).length<2)?'0'+String( showTime.split(':')[1]):String( showTime.split(':')[1])

    let endH = Number(this.start_hours)+6
    if(endH>23){
      endH = endH-23
    }

    this.end_hours = (String(endH).length<2)?'0'+String(endH):String(endH)
    this.end_minutes = (String(showTime.split(':')[1]).length<2)?'0'+String(showTime.split(':')[1]):String(showTime.split(':')[1]) //showTime.split(':')[1]
   }

   startDateListDisplay=[];
   genarateStartDateList(){
     let dateListDisplayData=[];
     for (let i = 0; i < 30; i++) {
       const today1 =  new Date();
       const tomorrow =  new Date(today1.setDate(today1.getDate() + i ));
       dateListDisplayData.push(tomorrow)
     }
     this.startDateListDisplay = dateListDisplayData;
   }

   endDateListDisplay=[];
   genarateEndDateList(date){
    let newDate = new Date(date);
    let dateListDisplayData=[];
    for (let i = 0; i < 30; i++) {
      let today1 =  new Date(date);
      let tomorrow ;
     try{
      tomorrow =  today1.setDate(today1.getDate() + i )
     }catch(e){
     }
      dateListDisplayData.push(tomorrow)
    }
    this.endDateListDisplay=[];
    this.endDateListDisplay = dateListDisplayData;
  }

   selectStartDateIndexValue=-1;
   selectStartDate(index,date){
     this.selectStartDateIndexValue =index;
     const datePipe = new DatePipe("en-US");
     const tomorrow =  new Date(date);
     const showDate = datePipe.transform(tomorrow, 'Y-MM-dd');
     this.start_date_final = showDate
     this.selectEndDateIndexValue=-1;
    this.end_date_final = ''
    this.genarateEndDateList(showDate);
   }

   selectEndDateIndexValue=-1;
   selectEndDate(index,date){
     this.selectEndDateIndexValue =index;
     const datePipe = new DatePipe("en-US");
     const tomorrow =  new Date(date);
     const showDate = datePipe.transform(tomorrow, 'Y-MM-dd');
     this.end_date_final = showDate
   }

   nextMinuteStart(){
    if(Number(this.start_minutes)==59){
      this.start_minutes = '00';
     }else{
       this.start_minutes = (String(String(Number(this.start_minutes)+1)).length<2)?'0'+String(String(Number(this.start_minutes)+1)):String(String(Number(this.start_minutes)+1)) //String(Number(this.start_minutes)+1)
     }
   }

   nextHourStart(){
     if(Number(this.start_hours)==23){
      this.start_hours = '01';
      this.start_minutes = '00';
     }else{
       this.start_hours = (String(String(Number(this.start_hours)+1)).length<2)?'0'+String(String(Number(this.start_hours)+1)):String(String(Number(this.start_hours)+1))
     }
   }

   preMinuteStart(){
    if(Number(this.start_minutes)==0){
      this.start_minutes = '59';
     }else{
       this.start_minutes = (String(String(Number(this.start_minutes)-1)).length<2)?'0'+String(String(Number(this.start_minutes)-1)):String(String(Number(this.start_minutes)-1)) //String(Number(this.start_minutes)-1)
     }
   }

   preHourStart(){
     if(Number(this.start_hours)==0){
      this.start_hours = '23';
      this.start_minutes = '59';
     }else{
       this.start_hours = (String(String(Number(this.start_hours)-1)).length<2)?'0'+String(String(Number(this.start_hours)-1)):String(String(Number(this.start_hours)-1)) //String(Number(this.start_hours)-1)
     }
   }

   nextMinuteEnd(){
    if(Number(this.end_minutes)==59){
      this.end_minutes = '00';
     }else{
       this.end_minutes = (String(String(Number(this.end_minutes)+1)).length<2)?'0'+String(String(Number(this.end_minutes)+1)):String(String(Number(this.end_minutes)+1))//String(Number(this.end_minutes)+1)
     }
   }

   nextHourEnd(){
     if(Number(this.end_hours)==23){
      this.end_hours = '01';
      this.end_hours = '00';
     }else{
       this.end_hours = (String(String(Number(this.end_hours)+1)).length<2)?'0'+String(String(Number(this.end_hours)+1)):String(String(Number(this.end_hours)+1))//String(Number(this.end_hours)+1)
     }
   }

   preMinuteEnd(){
    if(Number(this.end_minutes)==0){
      this.end_minutes = '59';
     }else{
       this.end_minutes = String(Number(this.end_minutes)-1)
     }
   }

   preHourEnd(){
     if(Number(this.end_hours)==0){
      this.end_hours = '23';
      this.end_hours = '59';
     }else{
       this.end_hours = String(Number(this.end_hours)-1)
     }
   }
   
   ngOnInit() {
    this.setCurrentTIme();
      this.genarateStartDateList();
      this.genarateEndDateList(new Date());
      this.cat_id = this.activatedRoute.snapshot.paramMap.get('cat_id');
      this.cat_name = this.activatedRoute.snapshot.paramMap.get('cat_name');
      this.r_by = this.activatedRoute.snapshot.paramMap.get('r_by');
      this.loadEMPList();
      this.loadShifts();
      this.loadPTWQuestion();
  }

  loadData(){

  }

  shift_list=[]
  loadShifts(){
    let data= {
      "searchText": "",
      "sortby": "",
      "page": 0,
    }
  
    this.restApi.getORGShifts(data).then((success) => {
        this.shift_list = success['data']
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }
  private imgBlobMD = [];
  private imgBlobAW = [];
  private imgBlobGI = [];
  private imgBlobTRC = [];
  savePTW(){
    if(this.isUnderstandWork){
      this.presentModal('Submit PTW','Are you sure, you want to create the permit?');
    }else{
      this.appConstant.toastMsg('Please confirm site inspection done.');
    }
  }


  async presentModal(title,msg) {
    const modal = await this.modalController.create({
      component: CustomModelPage,
      cssClass: 'modal-custom-css',
      componentProps: {
        'pop_up_type': 'ch_list_submit',
        'title':title,
        'msg':msg,
        'redirect': '/admin/tabs/inspections',
        'result':''
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.createPTW();
        });
    return await modal.present();
  }

  isHideSave = false;
  createPTW(){
    this.isHideSave = true;
    let data = {
      below_14_years_children: (this.isChildrenBelow14)?1:0,
      brief_description_work: this.description,
      co_signer2_comment: "",
      co_signer_1: this.co_signer_1_id,
      co_signer_1_approve: 0,
      co_signer_1_comment: "",
      co_signer_1_valid: (this.co_signer_1)?1:0,
      co_signer_2: this.co_signer_2_id,
      co_signer_2_approve: 0,
      co_signer_2_valid: (this.co_signer_2)?1:0,
      contactor: this.dept_c_contractor,
      contractor_mob: this.contractor_contact_no,
      contractor_name: this.contractor_name,
      employees_state_insurance: (this.isWorkerStateInsurance)?1:0,
      gov_id_evidences: (this.isGovID)?1:0,
      inspected_work: (this.isUnderstandWork)?1:0,
      list_all_workers: (this.isAllWorkers)?1:0,
      medical_reports: (this.isMedicalReports)?1:0,
      no_of_workers_expected: this.no_of_workers,
      owner_mob: this.owner_contact_no,
      owner_name: this.process_owner_name,
      permit_cat_ref_id: this.cat_id,
      permit_contract_type:this.contractor_type_id,
      ppe_equipment_tool: (this.isValidTestTools)?1:0,
      proposed_start_day_from: this.start_date_final,
      proposed_start_day_to: this.end_date_final,
      provident_fund: (this.isProvidentFund)?1:0,
      safe_operating_procedure: (this.isSafePro)?1:0,
      safety_officer: this.safety_officer_id,
      safety_officer_approve: 0,
      safety_officer_comment: "",
      safety_officer_valid: (this.isSafetyOfficer)?1:0,
      scheduled_work_day: this.shift_id,
      suspender_comment: "",
      worker_compensation: (this.isWorkerCompansation)?1:0,
      working_hours_from: this.start_hours+":"+this.start_minutes,
      working_hours_to: this.end_hours+":"+this.end_minutes,
      permit_id : this.permitUID
    }
    
      this.appConstant.showLoading('Creating Permit To Work..');
      this.restApi.savePTW(data).then((success) => {
        let permit_id = success['data'];
        let medical_reports_imgsIndex = 1;
        this.saveAnswer(permit_id);
        this.medical_reports_imgs.forEach(imageValue => {
          this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
            entry.file(file => {
              const reader = new FileReader();
              reader.onload = () => {
                  this.imgBlobMD.push(new Blob([reader.result], { type: file.type}))
                  if(medical_reports_imgsIndex==this.medical_reports_imgs.length){
                    this.fileUploadService.uploadPTWImage(this.imgBlobMD,permit_id,'medicalReports').subscribe((event: any) => {
                      console.log(event);
                    });
                  }
                  medical_reports_imgsIndex++;
              };
              reader.readAsArrayBuffer(file);
            });
          });
        });
  
        let all_worker_imgsIndex = 1;
        this.all_worker_imgs.forEach(imageValue => {
          this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
            entry.file(file => {
              //this.readFile(file,permit_id,'workers');
              const reader = new FileReader();
              reader.onload = () => {
                  this.imgBlobAW.push(new Blob([reader.result], { type: file.type}))
                  if(all_worker_imgsIndex==this.all_worker_imgs.length){
                    this.fileUploadService.uploadPTWImage(this.imgBlobAW,permit_id,'workers').subscribe((event: any) => {
                    });
                  }
                  all_worker_imgsIndex++;
              };
              reader.readAsArrayBuffer(file);
            });
          });
        });
  
        let gov_id_imgsIndex = 1;
        this.gov_id_imgs.forEach(imageValue => {
          this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
            entry.file(file => {
              //this.readFile(file,permit_id,'govId');
                const reader = new FileReader();
                reader.onload = () => {
                    this.imgBlobGI.push(new Blob([reader.result], { type: file.type}))
                    if(gov_id_imgsIndex==this.gov_id_imgs.length){
                        this.fileUploadService.uploadPTWImage(this.imgBlobGI,permit_id,'govId').subscribe((event: any) => {
                      });
                    }
                    gov_id_imgsIndex++;
                };
                reader.readAsArrayBuffer(file);
            });
          });
        });
  
        let trc_imgsIndex = 1;
        this.trc_imgs.forEach(imageValue => {
          this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
            entry.file(file => {
            // this.readFile(file,permit_id,'Tools');
            const reader = new FileReader();
            reader.onload = () => {
                this.imgBlobTRC.push(new Blob([reader.result], { type: file.type}))
                if(trc_imgsIndex==this.trc_imgs.length){
                  this.fileUploadService.uploadPTWImage(this.imgBlobTRC,permit_id,'Tools').subscribe((event: any) => {
                  });
                }
                trc_imgsIndex++;
            };
            reader.readAsArrayBuffer(file);
            });
          });
        });
        setTimeout(()=>{ 
          this.router.navigate(['ptw-list',{cat_id:this.cat_id,cat_name:this.cat_name}]);
          this.appConstant.toastMsg('PTW created successfully.');
          this.appConstant.dismissLoading()
        }, 2000)
      }, (error) => {
        this.appConstant.dismissLoading()
        this.appConstant.handleApiError(error)
      });
  }

// readFile(file: any,permitId,tag) {
//   const reader = new FileReader();
//   reader.onload = () => {
//       const imgBlob = new Blob([reader.result], { type: file.type});
//       this.fileUploadService.uploadPTWImage(imgBlob,permitId,tag).subscribe((event: any) => {
//       });
//   };
//   reader.readAsArrayBuffer(file);
// }

  async selectImage(type_image){
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM,type_image);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA,type_image);
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

  medical_reports_imgs = []
  all_worker_imgs = []
  gov_id_imgs = []
  trc_imgs = [];

  medical_reports_imgs_ui = []
  all_worker_imgs_ui = []
  gov_id_imgs_ui = []
  trc_imgs_ui = [];

  base64Image ='';
  pickImage(sourceType,imagTag) {
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
          this.base64Image = res;
          if(imagTag=='medicalReports'){
            this.medical_reports_imgs_ui.push(this.base64Image) 
          }else if(imagTag=='workers'){
            this.all_worker_imgs_ui.push(this.base64Image) 
          }else if(imagTag=='govId'){
            this.gov_id_imgs_ui.push(this.base64Image) 
          }else if(imagTag=='Tools'){
            this.trc_imgs_ui.push(this.base64Image) 
          }
        });
      }else{
        this.base64Image = (<any>window).Ionic.WebView.convertFileSrc(imageDataURI);;
        if(imagTag=='medicalReports'){
          this.medical_reports_imgs_ui.push(this.base64Image) 
        }else if(imagTag=='workers'){
          this.all_worker_imgs_ui.push(this.base64Image) 
        }else if(imagTag=='govId'){
          this.gov_id_imgs_ui.push(this.base64Image) 
        }else if(imagTag=='Tools'){
          this.trc_imgs_ui.push(this.base64Image) 
        }
      }
      if(imagTag=='medicalReports'){
        this.medical_reports_imgs.push(imageDataURI) 
      }else if(imagTag=='workers'){
        this.all_worker_imgs.push(imageDataURI) 
      }else if(imagTag=='govId'){
        this.gov_id_imgs.push(imageDataURI) 
      }else if(imagTag=='Tools'){
        this.trc_imgs.push(imageDataURI) 
      }
       
    }, (err) => {
      // Handle error
    });
  }

  // coSigner1(event){
  //     if(this.co_signer_1 = event['detail']['checked']){
  //       this.co_signer_1 = true;
  //       this.co_signer_1_name = 'Select Co-Signer 1'
  //       this.co_signer_1_id = ''
  //     }else{
  //       this.co_signer_1 = false;
  //       this.co_signer_1_name = 'Select Co-Signer 1'
  //       this.co_signer_1_id = ''
  //     }
  // }

  coSignerIcon1(){
    if(this.co_signer_1==false){
      this.co_signer_1 = true;
      this.co_signer_1_name = 'Select Co-Signer 1'
      this.co_signer_1_id = ''
      this.OpenEmpList(2)
    }else{
      this.co_signer_1 = false;
      this.co_signer_1_name = 'Select Co-Signer 1'
      this.co_signer_1_id = ''
    }
  }


coSignerIcon2(){
  if(this.co_signer_2==false){
    this.co_signer_2 = true;
    this.co_signer_2_name = 'Select Co-Signer 2'
    this.co_signer_2_id = ''
    this.OpenEmpList(3)
  }else{
    this.co_signer_2 = false;
    this.co_signer_2_name = 'Select Co-Signer 2'
    this.co_signer_2_id = ''
  }
}


safetyOfficer3(){
  if(this.isSafetyOfficer == false){
    this.isSafetyOfficer = true;
    this.safety_officer_name = 'Select Safty Oficer'
    this.safety_officer_id = ''
    this.OpenEmpList(1)
  }else{
    this.isSafetyOfficer = false;
    this.safety_officer_name = 'Select Safty Oficer'
    this.safety_officer_id = ''
  }
}


workerCompansation(event){
  if(this.isWorkerCompansation = event['detail']['checked']){
    this.isWorkerCompansation = true;
  }else{
    this.isWorkerCompansation = false;
  }
}

workerStateInsurance(event){
  if(this.isWorkerStateInsurance = event['detail']['checked']){
    this.isWorkerStateInsurance = true;
  }else{
    this.isWorkerStateInsurance = false;
  }
}

providentFund(event){
  if(this.isProvidentFund = event['detail']['checked']){
    this.isProvidentFund = true;
  }else{
    this.isProvidentFund = false;
  }
}

medicalReports(event){
  if(this.isMedicalReports = event['detail']['checked']){
    this.isMedicalReports = true;
  }else{
    this.isMedicalReports = false;
  }
}

govId(event){
  if(this.isGovID = event['detail']['checked']){
    this.isGovID = true;
  }else{
    this.isGovID = false;
  }
}

validTestTools(event){
  if(this.isValidTestTools = event['detail']['checked']){
    this.isValidTestTools = true;
  }else{
    this.isValidTestTools = false;
  }
}

childrenBelow14(event){
  if(this.isChildrenBelow14 = event['detail']['checked']){
    this.isChildrenBelow14 = true;
  }else{
    this.isChildrenBelow14 = false;
  }
}

allWorkers(event){
  if(this.isAllWorkers = event['detail']['checked']){
    this.isAllWorkers = true;
  }else{
    this.isAllWorkers = false;
  }
}

safeOpratPro(event){
  if(this.isSafePro = event['detail']['checked']){
    this.isSafePro = true;
  }else{
    this.isSafePro = false;
  }
}

understandWork(event){
  if(this.isUnderstandWork = event['detail']['checked']){
    this.isUnderstandWork = true;
  }else{
    this.isUnderstandWork = false;
  }
}

 async OpenEmpList(type){
   let selected_id = '';
  if(type==1){
    selected_id = this.safety_officer_id;
   }else if(type==2){
    selected_id = this.co_signer_1_id;
   }else if(type==3){
    selected_id = this.co_signer_2_id;
   }
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
     if(data['data']=='' || data['data']==null || data['data']==undefined){
       if(this.safety_officer_id==''){
        this.isSafetyOfficer = false;
       }
        if(this.co_signer_1_id==''){
        this.co_signer_1 = false;
       }
        if(this.co_signer_2_id==''){
        this.co_signer_2 = false;
      }
     }else{
        this.loadPTWVCount(data['data']);
        if(type==1){
        this.safety_officer_id = data['data'] ;
        this.isSafetyOfficer = true;
        }else if(type==2){
        this.co_signer_1_id = data['data'] ;
        this.co_signer_1 = true;
        }else if(type==3){
        this.co_signer_2_id = data['data'] ;
        this.co_signer_2 = true;
        }
      
        this.emp_list.forEach(item => {
          if(item['id']==data['data']){
          if(type==1){
            this.safety_officer_name=item['emp_name'];
            }else if(type==2){
            this.co_signer_1_name=item['emp_name'];
            }else if(type==3){
            this.co_signer_2_name=item['emp_name'];
            }
          }
        });
     }
   });
   return await modal.present();
}

isShift = false;
async OpenSgiftList(){
  let selected_id = (this.shift_id=='0')?'':this.shift_id;
  const modal = await this.modalController.create({
    component: ShiftListsPage,
    cssClass: 'modal-custom-css',
    componentProps: {
      'emplist': this.shift_list,
      'selected_id': selected_id,
      'is_emplist': false,
      'title':'Select Shift'
    }
  });
  modal.onDidDismiss()
  .then((data) => {
    if(data['data']==''){

    }else{
      this.isShift = true;
      this.shift_id = data['data'];
      this.shift_list.forEach(item => {
        if(item['id']==data['data']){
          let start_time = item['from'];
          let end_time = item['to'];
          this.start_hours = start_time.split(':')[0]
          this.start_minutes = start_time.split(':')[1]
          this.end_hours = end_time.split(':')[0]
          this.end_minutes = end_time.split(':')[1]
          this.shift_name = item['name'];
        }
      });
    }

  });
  return await modal.present();
}

//let catItem =  this.cat_list.find(x => x.cat_name == catName).id;
isContractorSelect = false;
async OpenContractorTypeList(){
  let selected_id = (this.contractor_type_id=='0')?'':this.contractor_type_id;
  const modal = await this.modalController.create({
    component: ShiftListsPage,
    cssClass: 'modal-custom-css',
    componentProps: {
      'emplist': this.contractorTypeList,
      'selected_id': selected_id,
      'is_emplist': false,
      'title': 'Select Contractor'
    }
  });
  modal.onDidDismiss()
  .then((data) => {
    if(data['data']==''){

    }else{
      this.isContractorSelect = true;
      this.contractor_type_id = data['data']
      let item = this.contractorTypeList.find(x => x.id == data['data']);
      this.contractor_type_name = item['name']
      this.isWorkerCompansation = false;
      this.isWorkerStateInsurance = false;
      this.isProvidentFund = false;
      this.isMedicalReports = false;
      this. isGovID = false;
      this. isChildrenBelow14 = false;
      this.isAllWorkers = false;
      this.isSafePro = false;
      this. isValidTestTools = false;
    }
  });
  return await modal.present();
}

  nextStep(){
    if(this.totalStep==this.step){
    }else{
      let isNext = true;
      if(this.step==0){
        if(this.co_signer_1 || this.co_signer_2 || this.isSafetyOfficer){
          if(this.co_signer_1_id!=''){
            isNext = true;
          }else if(this.co_signer_2_id!=''){
            isNext = true;
          }else if(this.safety_officer_id!=''){
            isNext = true;
          }else{
            isNext = false;
            this.appConstant.toastMsg('Please select at least one officer')
          }
        }else{
          isNext = false;
          this.appConstant.toastMsg('Please select at least one officer')
        }
        //Need to write different copy of officer
      }
      if(this.step==1){
        if(this.process_owner_name.length<3){
          this.is_process_owner_name = true
          isNext = false;
        }else{
          this.is_process_owner_name = false;
        }
            
          if(this.dept_c_contractor.length<3){
            this.is_dept_c_contractor = true
            isNext = false;
          }else{
            this.is_dept_c_contractor = false;
          }

          if(!((String(this.owner_contact_no)).length<11 && (String(this.owner_contact_no)).length>9)){
            this.is_owner_contact_no = true
            isNext = false;
          }else{
            this.is_owner_contact_no = false;
          }

          if(this.contractor_name.length<3){
            this.is_contractor_name = true
            isNext = false;
          }else{
            this.is_contractor_name = false;
          }

          if(((Number(this.no_of_workers))<1)){
            this.is_no_of_workers = true
            isNext = false;
          }else{
            this.is_no_of_workers = false;
          }
          if(!((String(this.contractor_contact_no)).length<11 && (String(this.contractor_contact_no)).length>9)){
            this.is_contractor_contact_no = true
            isNext = false;
          }else{
            this.is_contractor_contact_no = false;
          }   
    }
    if(this.step==2){
      if(this.start_date_final ==''){
        isNext = false;
        this.appConstant.toastMsg('Please select Start Date')
      }else if(this.end_date_final == ''){
        isNext = false;
        this.appConstant.toastMsg('Please select End Date')
      }else if(this.shift_id == ''){
        isNext = false;
        this.appConstant.toastMsg('Please select Shift')
      }
    }
      if(this.step==4){
          if(this.questionList.length==this.qusestionAnswer.length){
            this.saveAnswer(1);
          }else{
            isNext = false;
            this.appConstant.toastMsg('Please select answers')
          }
      }

      this.appConstant.consoleLog(this.questionList.length,this.qusestionAnswer.length)

      if(isNext){
        this.step++;
        this.progressCount++;
      }
    }
  }

 preStep(){
   if(this.step==0){
    this.router.navigate(['ptw-list',{cat_id:this.cat_id,cat_name:this.cat_name}]);
   }
   if(1>this.step){

   }else{
     this.step--;
     this.progressCount--;
   }
 }

  goBack(){
    this.router.navigate(['ptw-list',{cat_id:this.cat_id,cat_name:this.cat_name}]);
  }

isHighlight(step){
  if(this.progressCount>=step){
    return true;
  }else{
    return false;
  }
}

loadPTWVCount(empId){
  let data= {
    empId: empId
  }
    this.restApi.ptwVCount(data).then((success) => {
      if(Number(success['data'])>1){
        this.appConstant.toastMsg('The User Have Already More Than '+success['data']+' Work in Progress');
      }
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
}

  emp_list = []
  loadEMPList(){
    // let data= {
    //   "searchText": "",
    //   "sortby": "id",
    //   "sorttype": "desc",
    //   "page": 0,
    //   "whereData": [
    //     {
    //       "field": "`employee`.`plant_ref_id`",
    //       "value": this.appConstant.getPlantId(),
    //       "type": "AND",
    //       "nested": ""
    //     },
    //     {
    //       "field": "`employee`.`emp_type_ref_id`",
    //       "value": "0",
    //       "type": "AND",
    //       "nested": "("
    //     },
    //     {
    //       "field": "`employee`.`emp_type_ref_id`",
    //       "value": "2",
    //       "type": "OR",
    //       "nested": ")"
    //     }
    //   ]
    // }

    // this.appConstant.consoleLog(this.appConstant.isORGAdmin(),'isORGAdmin');
    // this.appConstant.consoleLog(this.appConstant.isPlnatSuperAdmin(),'isPlnatSuperAdmin');
    // this.appConstant.consoleLog(this.appConstant.isPlnatAdmin(),'isPlnatAdmin');

    // let whrData = [
    //   { "field":"`employee`.`organization_ref_id`","value":this.appConstant.getORGId(),"type":"AND","nested":""},
    //   {"field":"`employee`.`emp_type_ref_id`","value":"2","type":"AND","nested":"("},
    //   {"field":"`employee`.`emp_type_ref_id`","value":"3","type":"OR","nested":""},
    //   {"field":"`employee`.`emp_type_ref_id`","value":"4","type":"OR","nested":")"}]
    // if(this.appConstant.isORGAdmin()){
    //   whrData = [
    //     { "field":"`employee`.`organization_ref_id`","value":this.appConstant.getORGId(),"type":"AND","nested":""},
    //     {"field":"`employee`.`emp_type_ref_id`","value":"2","type":"AND","nested":"("},
    //     {"field":"`employee`.`emp_type_ref_id`","value":"4","type":"OR","nested":")"}]
    // }else if(this.appConstant.isPlnatSuperAdmin()){
    //   whrData = [
    //     { "field":"`employee`.`organization_ref_id`","value":this.appConstant.getORGId(),"type":"AND","nested":""},
    //     {"field":"`employee`.`emp_type_ref_id`","value":"2","type":"AND","nested":"("},
    //     {"field":"`employee`.`emp_type_ref_id`","value":"3","type":"OR","nested":""},
    //     {"field":"`employee`.`emp_type_ref_id`","value":"4","type":"OR","nested":")"}]
    // }else if(this.appConstant.isPlnatAdmin()){
    //   whrData = [
    //     { "field":"`employee`.`organization_ref_id`","value":this.appConstant.getORGId(),"type":"AND","nested":""},
    //     {"field":"`employee`.`emp_type_ref_id`","value":"2","type":"AND","nested":"("},
    //     {"field":"`employee`.`emp_type_ref_id`","value":"4","type":"OR","nested":")"}]
    // }
    let data = {
      "searchText":"",
      "sortby":"",
      "page":0,
      "whereData":[
        { "field":"`employee`.`organization_ref_id`","value":this.appConstant.getORGId(),"type":"AND","nested":""},
        {"field":"`employee`.`emp_type_ref_id`","value":"2","type":"AND","nested":"("},
        {"field":"`employee`.`emp_type_ref_id`","value":"4","type":"OR","nested":")"}]
      }
      this.restApi.getNodeEMPList(data).then((success) => {
        this.appConstant.consoleLog(success,'Emp list')
          //this.emp_list = success['data']
          let empList = success['data']
          empList.forEach(item => {
            if(Number(item['id'])==Number(localStorage.getItem(this.appConstant.TAG_IS_USER_ID))){
            }else{
              this.emp_list.push(item)
            }
          });
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
  }

}
