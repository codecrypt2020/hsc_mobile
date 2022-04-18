import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController, Platform } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FileUploadService } from 'src/app/upload/file-upload.service';
import { EmplistPage } from '../emplist/emplist.page';
import { ShiftListsPage } from '../shift-lists/shift-lists.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';
import { DatePipe } from '@angular/common';
import { CustomModelPage } from '../custom-model/custom-model.page';

@Component({
  selector: 'app-extend-ptw',
  templateUrl: './extend-ptw.page.html',
  styleUrls: ['./extend-ptw.page.scss'],
})
export class ExtendPTWPage implements OnInit {


  step = 0;
  progressCount = 1;
  totalStep = 5;
  stepTitle = ['Verified By','Contractor Details','Date and Time','Worker Details','Questions','Description']  
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

  start_date ="Start Date";
  end_date = "End Date";
  start_time = 'Start Time'
  end_time = "End Time"

  start_date_final = "";
  end_date_final = "";
  start_time_final = ""
  end_time_final = ""

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
  update_id = '';
  
  title='Add PTW ';
  permitUID = 'PMT'+ this.appConstant.createUID(5)+this.appConstant.createUID(5);
  constructor(private modalCtrl:ModalController, private router:Router,private appConstant:AppConstantService,private restApi:RestApiService,private modalController:ModalController,private activatedRoute :ActivatedRoute,
    private actionSheetController:ActionSheetController,private camera:Camera,private file:File,private fileUploadService:FileUploadService,private platform:Platform,
    private changeRef: ChangeDetectorRef) {}

   ngOnInit() {
    this.setCurrentTIme();
    this.cat_id = this.activatedRoute.snapshot.paramMap.get('cat_id');
    this.cat_name = this.activatedRoute.snapshot.paramMap.get('cat_name');
    this.r_by = this.activatedRoute.snapshot.paramMap.get('r_by');
    try{
      this.update_id = this.activatedRoute.snapshot.paramMap.get('update_id');
    }catch(e){
      this.update_id = ''
    }
    this.loadEMPList();
    this.loadShifts();
    this.loadDetails();
    this.loadPTWQuestion();
  }

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
    }
  
   getQuestionAnswer(questionID){
     try{
       let ans = this.qusestionAnswer.find(x => x.question_ref_id == questionID).selected_option;
       return ans;
     }catch(e){
       return '';
     }
   }
 
    saveAnswer(ptw_id){
     this.questionList.forEach(question => {
           let data = {
        ques_ref_id: question['id'],
        selected_option: this.getQuestionAnswer(question['id']),
        work_permit_id: ptw_id
      }
      console.log(data)
      this.restApi.savePTWQ_answer(data).then((success) => {
        console.log('answer saved succesfully');
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

start_hours = '00'
end_hours = '00'

start_minutes = '00'
end_minutes = '00'
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

// async OpenSgiftList(){
//   let selected_id = (this.shift_id=='0')?'':this.shift_id;
//   const modal = await this.modalController.create({
//     component: ShiftListsPage,
//     cssClass: 'modal-custom-css',
//     componentProps: {
//       'emplist': this.shift_list,
//       'selected_id': selected_id,
//       'is_emplist': false,
//       'title':'Select Shift'
//     }
//   });
//   modal.onDidDismiss()
//   .then((data) => {
//     if(data['data']==''){

//     }else{
//       this.shift_id = data['data'];
//       this.shift_list.forEach(item => {
//         if(item['id']==data['data']){
//           this.start_time = item['from'];
//           this.end_time = item['to'];
//           this.shift_name = item['name'];
//         }
//       });
//     }

//   });
//   return await modal.present();
// }


  ngOnDestroy(){

  this.isSafetyOfficer = false
  this.safety_officer_name ='Select Safety Oficer'
  this.safety_officer_id = '';

  this.co_signer_1 = false
  this.co_signer_1_name ='Select Co Signer 1'
  this.co_signer_1_id = '';

  this.co_signer_2 = false
  this.co_signer_2_name ='Select Co Signer 2'
  this.co_signer_2_id = '';

  this.process_owner_name = '';
  this.dept_c_contractor = '';
  this.owner_contact_no = '';
  this.contractor_name = '';
  this.no_of_workers = '';
  this.contractor_contact_no = '';


  this.is_process_owner_name = false;
  this.is_dept_c_contractor = false;
  this.is_owner_contact_no = false;
  this.is_contractor_name = false;
  this.is_no_of_workers = false;
  this.is_contractor_contact_no = false;

  this.start_date ="Start Date";
  this.end_date = "End Date";
  this.start_time = 'Start Time'
  this.end_time = "End Time"

  this.start_date_final = "";
  this.end_date_final = "";
  this.start_time_final = ""
  this.end_time_final = ""

  this.isWorkerCompansation = false;
  this.isWorkerStateInsurance = false;
  this.isProvidentFund = false;
  this.isMedicalReports = false;
  this.isGovID = false;
  this.isChildrenBelow14 = false;
  this.isAllWorkers = false;
  this.isSafePro = false;
  this.isValidTestTools = false;
  this.isUnderstandWork  = false;

  this.description = ''

  this.shift_id = '';
  this.shift_name = 'Select Shift'

  this.contractor_type_id = '0';
  this.contractor_type_name = 'Select Contract Type'

  // this.cat_id = '';
  // this.cat_name = '';
  this.r_by = '';
  this.update_id = '';
  }

  isCheckedValue(value){
    console.log(value)
    if(value==1){
      return true
    }else{
      return false
    }
  }

  ptwDetails=[]
  loadDetails(){
    let data = {
      updateId: this.update_id
    }
    this.restApi.getPTWDetails(data).then((success) => {
      // this.requester_id = success['empId']
     try{
        this.ptwDetails = [];
        this.ptwDetails = success['data'][0]
        try{
          if(this.ptwDetails['co_signer_1_valid']==1){
            this.co_signer_1 = true
            this.co_signer_1_name = this.ptwDetails['coSigner_1_officer_name']
            this.co_signer_1_id = this.ptwDetails['co_signer_1']
           }else{
            this.co_signer_1 = false
            this.co_signer_1_id = ''
            this.ptwDetails['coSigner_1_officer_name'] = this.co_signer_1_name
           }
        }catch(e){
        //  console.log(e)
        }
      
        if(this.ptwDetails['co_signer_2_valid']==1){
         this.co_signer_2 = true
         this.co_signer_2_name= this.ptwDetails['coSigner_2_officer_name']
         this.co_signer_2_id = this.ptwDetails['co_signer_2']
        }else{
         this.co_signer_2 = false
         this.co_signer_2_id = ''
         this.ptwDetails['coSigner_2_officer_name'] = this.co_signer_2_name
        }

        if(this.ptwDetails['safety_officer_valid']==1){
         this.isSafetyOfficer = true
         this.safety_officer_name= this.ptwDetails['safety_officer_name']
         this.safety_officer_id = this.ptwDetails['safety_officer']
        }else{
         this.isSafetyOfficer = false
         this.safety_officer_id = ''
         this.ptwDetails['safety_officer_name'] = this.safety_officer_name
        }
 
        this.process_owner_name = this.ptwDetails['owner_name'];
        this.dept_c_contractor = this.ptwDetails['contactor'];
        this.owner_contact_no = this.ptwDetails['owner_mob'];
        this.contractor_name = this.ptwDetails['contractor_name'];
        this.no_of_workers = this.ptwDetails['no_of_workers_expected'];
        this.contractor_contact_no = this.ptwDetails['contractor_mob'];
 

        // this.start_date_final =this.ptwDetails['proposed_start_day_from'];
        // this.end_date_final = this.ptwDetails['proposed_start_day_to'];
        // this.start_time_final = this.ptwDetails['working_hours_from'];
        // this.end_time_final = this.ptwDetails['working_hours_to']

        // this.start_date = this.ptwDetails['proposed_start_day_from'];;
        // this.end_date = this.ptwDetails['proposed_start_day_to'];;
        // this.start_time = this.ptwDetails['working_hours_from'];
        // this.end_time = this.ptwDetails['working_hours_to'];

        //console.log('start_time : '+this.ptwDetails['working_hours_from'])
        //console.log('end_time : '+this.ptwDetails['working_hours_to'])

        // this.shift_id = this.ptwDetails['scheduled_work_day'];
        // this.shift_name  = this.shift_list.find(x => x.id == this.ptwDetails['scheduled_work_day']).name;


        this.contractor_type_id = this.ptwDetails['permit_contract_type'];
        this.contractor_type_name = this.contractorTypeList.find(x => x.id == this.ptwDetails['permit_contract_type']).name
     
        this.isWorkerCompansation = (this.ptwDetails['worker_compensation']==1)?true:false;
        this.isWorkerStateInsurance = (this.ptwDetails['employees_state_insurance']==1)?true:false;
        this.isProvidentFund =  (this.ptwDetails['provident_fund']==1)?true:false;
        this.isMedicalReports =  (this.ptwDetails['medical_reports']==1)?true:false;
        this.isGovID =  (this.ptwDetails['gov_id_evidences']==1)?true:false;
        this.isChildrenBelow14 =  (this.ptwDetails['below_14_years_children']==1)?true:false;
        this.isAllWorkers =  (this.ptwDetails['list_all_workers']==1)?true:false;
        this.isSafePro =  (this.ptwDetails['safe_operating_procedure']==1)?true:false;
        this.isValidTestTools =  (this.ptwDetails['ppe_equipment_tool']==1)?true:false;
        this.isUnderstandWork  =  (this.ptwDetails['inspected_work']==1)?true:false;
       this.description =  this.ptwDetails['brief_description_work'] 
       this.changeRef.detectChanges()
      }catch(e){
      }
    }, (error) => {
    });
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
      this.presentModal('Extend PTW','Are you sure, you want to extend the permit?');
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
        this.extendPTW();
        });
    return await modal.present();
  }

  isHideSave = false;
  extendPTW(){
    this.isHideSave = true;
    let newData ={
      "permit_id": this.permitUID,
      "permit_contract_type": this.contractor_type_id,
      "safety_officer": this.safety_officer_id,
      "safety_officer_valid": (this.isSafetyOfficer)?1:0,
      "co_signer_1": this.co_signer_1_id,
      "co_signer_1_valid": (this.co_signer_1)?1:0,
      "medical_reports": (this.isMedicalReports)?1:0,
      "gov_id_evidences": (this.isGovID)?1:0,
      "list_all_workers": (this.isAllWorkers)?1:0,
      "ppe_equipment_tool":(this.isValidTestTools)?1:0,
      "co_signer_2": this.co_signer_2_id,
      "co_signer_2_valid":(this.co_signer_2)?1:0,
      "permit_cat_ref_id": this.ptwDetails['permit_cat_ref_id'],
      "scheduled_work_day": this.shift_id,
      "suspender_comment": "",
      "safety_officer_approve": 0,
      "safety_officer_comment": "",
      "co_signer_1_approve": 0,
      "co_signer_1_comment": "",
      "co_signer_2_approve": 0,
      "co_signer2_comment": "",
      "permit_status": 2,
      "contactor": this.dept_c_contractor,
      "owner_name": this.process_owner_name,
      "owner_mob": this.owner_contact_no,
      "contractor_name": this.contractor_name,
      "contractor_mob":this.contractor_contact_no,
      "no_of_workers_expected": this.no_of_workers,
      "brief_description_work": this.description,
      "proposed_start_day_from": this.start_date_final,
      "proposed_start_day_to":this.end_date_final,
      "provident_fund": (this.isProvidentFund)?1:0,
      "worker_compensation": (this.isWorkerCompansation)?1:0,
      "employees_state_insurance": (this.isWorkerStateInsurance)?1:0,
      "below_14_years_children": (this.isChildrenBelow14)?1:0,
      "inspected_work":(this.isUnderstandWork)?1:0,
      "safe_operating_procedure": (this.isSafePro)?1:0,
      "working_hours_from": this.start_time,
      "working_hours_to": this.end_time,
      "updateId": btoa(this.update_id),
      "empOrg": this.appConstant.getORGId(),
      "emp_ref_Id": localStorage.getItem(this.appConstant.TAG_IS_USER_ID)
    }

    this.appConstant.showLoading('Extending Permit To Work..');
    this.restApi.savePTW(newData).then((success) => {
      let permit_id = success['data'];
      let medical_reports_imgsIndex = 1;
      this.saveAnswer(permit_id);
      this.medical_reports_imgs.forEach(imageValue => {
        this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
          entry.file(file => {
            //this.readFile(file,permit_id,'medicalReports');
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
        this.appConstant.dismissLoading()
        this.appConstant.toastMsg('PTW extended successfully.');
      }, 2000)
      // this.medical_reports_imgs.forEach(imageValue => {
      //   this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
      //     entry.file(file => {
      //       this.readFile(file,permit_id,'medicalReports');
      //     });
      //   });
      // });

      // this.all_worker_imgs.forEach(imageValue => {
      //   this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
      //     entry.file(file => {
      //       this.readFile(file,permit_id,'workers');
      //     });
      //   });
      // });

      // this.gov_id_imgs.forEach(imageValue => {
      //   this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
      //     entry.file(file => {
      //       this.readFile(file,permit_id,'govId');
      //     });
      //   });
      // });

      // this.trc_imgs.forEach(imageValue => {
      //   this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
      //     entry.file(file => {
      //       this.readFile(file,permit_id,'Tools');
      //     });
      //   });
      // });
    // this.router.navigate(['ptw-list',{cat_id:this.cat_id,cat_name:this.cat_name}]);
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }

readFile(file: any,permitId,tag) {
  const reader = new FileReader();
  reader.onload = () => {
      const imgBlob = new Blob([reader.result], { type: file.type});
      this.fileUploadService.uploadPTWImage(imgBlob,permitId,tag).subscribe((event: any) => {
      });
  };
  reader.readAsArrayBuffer(file);
}

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
      // this.base64Image = '';
      // if(this.platform.is('ios')){
      //   let filename = imageDataURI.substring(imageDataURI.lastIndexOf('/')+1);
      //   let path =  imageDataURI.substring(0,imageDataURI.lastIndexOf('/')+1);
      //   this.file.readAsDataURL(path, filename).then(res=>{
      //     this.base64Image = res;
      //     if(imagTag=='medicalReports'){
      //       this.medical_reports_imgs.push(imageDataURI) 
      //     }else if(imagTag=='workers'){
      //       this.all_worker_imgs.push(imageDataURI) 
      //     }else if(imagTag=='govId'){
      //       this.gov_id_imgs.push(imageDataURI) 
      //     }else if(imagTag=='Tools'){
      //       this.trc_imgs.push(imageDataURI) 
      //     }
      //   });
      // }else{
      //   let filename = imageDataURI.substring(imageDataURI.lastIndexOf('/')+1);
      //   let path =  imageDataURI.substring(0,imageDataURI.lastIndexOf('/')+1);
      //   this.file.readAsDataURL(path, filename).then(res=>{
      //     this.base64Image = res;
              
      //     if(imagTag=='medicalReports'){
      //       this.medical_reports_imgs.push(imageDataURI) 
      //     }else if(imagTag=='workers'){
      //       this.all_worker_imgs.push(imageDataURI) 
      //     }else if(imagTag=='govId'){
      //       this.gov_id_imgs.push(imageDataURI) 
      //     }else if(imagTag=='Tools'){
      //       this.trc_imgs.push(imageDataURI) 
      //     }
      //   });
      // }
      // if(imagTag=='medicalReports'){
      //   this.medical_reports_imgs_ui.push(imageDataURI) 
      // }else if(imagTag=='workers'){
      //   this.all_worker_imgs_ui.push(imageDataURI) 
      // }else if(imagTag=='govId'){
      //   this.gov_id_imgs_ui.push(imageDataURI) 
      // }else if(imagTag=='Tools'){
      //   this.trc_imgs_ui.push(imageDataURI) 
      // }
       
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
  //       this.ptwDetails['co_signer_1'] = ''
  //       this.ptwDetails['coSigner_1_officer_name'] = this.co_signer_1_name
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
      this.ptwDetails['co_signer_1'] = ''
      this.ptwDetails['coSigner_1_officer_name'] = this.co_signer_1_name
    }
  }

//   coSigner2(event){
//     if(this.co_signer_2 = event['detail']['checked']){
//       this.co_signer_2 = true;
//       this.co_signer_2_name = 'Select Co-Signer 2'
//       this.co_signer_2_id = ''
//     }else{
//       this.co_signer_2 = false;
//       this.co_signer_2_name = 'Select Co-Signer 2'
//       this.co_signer_2_id  = ''
//       this.ptwDetails['co_signer_2'] = ''
//       this.ptwDetails['coSigner_2_officer_name'] = this.co_signer_2_name
//     }
// }

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
    this.ptwDetails['co_signer_2'] = ''
    this.ptwDetails['coSigner_2_officer_name'] = this.co_signer_2_name
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
    this.ptwDetails['safety_officer'] = ''
    this.ptwDetails['safety_officer_name'] = this.safety_officer_name
  }
}


//   safetyOfficer(event){
//     if(this.isSafetyOfficer = event['detail']['checked']){
//       this.isSafetyOfficer = true;
//       this.safety_officer_name = 'Select Safty Oficer'
//       this.safety_officer_id = ''
//     }else{
//       this.isSafetyOfficer = false;
//       this.safety_officer_name = 'Select Safty Oficer'
//       this.safety_officer_id = ''
//       this.ptwDetails['safety_officer'] = ''
//       this.ptwDetails['safety_officer_name'] = this.safety_officer_name
//     }
// }


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
     //console.log('data : '+data['data'])
     if(data['data']!='' && data['data']!=null && data['data']!=undefined){
      this.loadPTWVCount(data['data']);
     }

     if(type==1){
      this.safety_officer_id = data['data'];
      this.ptwDetails['safety_officer'] = data['data'];
     }else if(type==2){
      this.co_signer_1_id = data['data'];
      this.ptwDetails['co_signer_1'] = data['data'];
     }else if(type==3){
      this.co_signer_2_id = data['data'];
      this.ptwDetails['co_signer_2'] = data['data'];
     }
   
     this.emp_list.forEach(item => {
       if(item['id']==data['data']){
        if(type==1){
          this.safety_officer_name=item['emp_name'];
          this.ptwDetails['safety_officer_name'] = item['emp_name'];
         }else if(type==2){
          this.co_signer_1_name=item['emp_name'];
          this.ptwDetails['coSigner_1_officer_name'] = item['emp_name'];
         }else if(type==3){
          this.co_signer_2_name=item['emp_name'];
          this.ptwDetails['coSigner_2_officer_name'] = item['emp_name'];
         }
       }
     });
     if(this.safety_officer_id==''){
      this.isSafetyOfficer = false;
     }else{
      this.isSafetyOfficer = true;
     }
      if(this.co_signer_1_id==''){
      this.co_signer_1 = false;
     }else{
      this.co_signer_1 = true;
     }

    if(this.co_signer_2_id==''){
      this.co_signer_2 = false;
    }else{
      this.co_signer_2 = true;
    }

   });
   return await modal.present();
}


isContractorSelect = true;
//let catItem =  this.cat_list.find(x => x.cat_name == catName).id;
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
            if(this.ptwDetails['co_signer_1']!='' || this.ptwDetails['co_signer_2']!='' || this.ptwDetails['safety_officer']!=''){
              isNext = true;
            }else{
              isNext = false;
              this.appConstant.toastMsg('Please select at least one officer')
            }

          }
        }else{
          isNext = false;
          this.appConstant.toastMsg('Please select at least one officer')
        }
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
     // console.log(success['data']);
      this.appConstant.toastMsg('The User Have Already More Than '+success['data']+' Work in Progress');
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
}

  emp_list = []
  loadEMPList(){
    let data= {
      "searchText": "",
      "sortby": "id",
      "sorttype": "desc",
      "page": 0,
      "whereData":[
        { "field":"`employee`.`organization_ref_id`","value":this.appConstant.getORGId(),"type":"AND","nested":""},
        {"field":"`employee`.`emp_type_ref_id`","value":"2","type":"AND","nested":"("},
        {"field":"`employee`.`emp_type_ref_id`","value":"4","type":"OR","nested":")"}]
    }
      this.restApi.getNodeEMPList(data).then((success) => {
          this.emp_list = success['data']

      }, (error) => {
        this.appConstant.handleApiError(error)
      });
  }
}
