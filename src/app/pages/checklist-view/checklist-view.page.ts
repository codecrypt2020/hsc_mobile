import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { DatePipe } from '@angular/common';
import { environment as ENV } from "../../../environments/environment"
import { CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';

@Component({
  selector: 'app-checklist-view',
  templateUrl: './checklist-view.page.html',
  styleUrls: ['./checklist-view.page.scss'],
})
export class ChecklistViewPage implements OnInit {

  checklist_id;
  userName = 'User'
  isSubmitted = '0';
  item;
  status;
  by_sc;
  id:any

   d = new Date();
   todayDate = this.d.getFullYear()+'-'+(this.d.getMonth()+1)+'-'+this.d.getDate();
  selectedStartDate = this.todayDate;

  user_id =''
  baseUrl = ENV.NODE_URL+'public/answer/'
  constructor(private appConstant:AppConstantService ,private router:Router,private activatedRoute:ActivatedRoute,private restApi:RestApiService,
    private pdfGenerator:PDFGenerator,private photoViewer:PhotoViewer,private modalCtrl:ModalController) {
      
    this.checklist_id = this.activatedRoute.snapshot.paramMap.get('checklist_id');
    this.userName = this.activatedRoute.snapshot.paramMap.get('name');
   try{
    this.isSubmitted = this.activatedRoute.snapshot.paramMap.get('is_submitted');
   }catch(e){
    this.isSubmitted = '0'
   }
    this.item = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    this.status = this.activatedRoute.snapshot.paramMap.get('status'); 
    try{
      this.by_sc = this.activatedRoute.snapshot.paramMap.get('by_sc'); 
    }catch(e){
      this.by_sc = ''
    }
    this.id = JSON.parse( this.activatedRoute.snapshot.paramMap.get('id'));
    this.user_id = JSON.parse(this.activatedRoute.snapshot.paramMap.get('user_id'));
    
    this.loadDate();
    this.loadDetails();
   }

  async calendarModal() {   
    const options: CalendarModalOptions = {
      pickMode: 'single',
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
      this.selectedStartDate = date['string']
      this.loadDetails();
  }
}

    loadDate(){
      const datePipe = new DatePipe("en-US");
      const today1 =  new Date();
      var priorDateMax = new Date().setDate(today1.getDate())
  }


  ngOnInit() {

  }

  ViewPDf(){
    this.router.navigate(['/pdfview', {
      'is_submitted':this.isSubmitted,
      'checklist_id': this.checklist_id,
      'item': JSON.stringify(this.item),
      'id':this.id,
      'date':this.selectedStartDate,
      'user_id':this.user_id,
      'by_sc':this.by_sc,
      'status': this.status}]);
  }


  checklistSD = [];
  questionlist = [];
  saved_Images = [];
  loadDetails(){
    if(!this.appConstant.isInternet){
      return null;
    }else{
      let data={
        checklistId : this.checklist_id,
      }
      this.restApi.getQuestionByID(data).then((success) => {
        if(success['success']==true){
          this.questionlist=success['data'];
          this.loadAnswerNew();
        }else{
        }
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
   }
  }

  loadAnswerNew(){
    this.checklistSD = [];
    this.saved_Images = []
    let dataAns={
      checklistId: this.checklist_id,
      date: this.selectedStartDate,
      userId: this.user_id
    }
    this.restApi.getCheckListAnswerDetails(dataAns).then((success) => {
      if(success['success']==true){
        let ansO =[]
        ansO = success['data'];
        let indexA=0;
        this.questionlist.forEach(item => {
          try{
            if(item['id']==ansO[indexA]['question_ref_id']){
              this.checklistSD.push(ansO[indexA])
              this.saved_Images.push(ansO[indexA]['images'].split(','))
              indexA++
            }else{
              let ansObj = {
                comments: "N/A",
                images: [],
                input_answer: "N/A",
                question_ref_id: item['id'],
                selected_options: "N/A",
              }
              this.checklistSD.push(ansObj)
              this.saved_Images.push([])
              }
          }catch(e){
            let ansObj = {
              comments: "N/A",
              images: [],
              input_answer: "N/A",
              question_ref_id: item['id'],
              selected_options: "N/A",
            }
            this.checklistSD.push(ansObj)
            this.saved_Images.push([])
          }
        });
      }else{
      }
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }

  getComments(item){
    try{
      return item['comments']
    }catch(e){
      return 'N/A'
    }
  }

  getSAns(item){
    try{
      return item['selected_options']
    }catch(e){
      return 'N/A'
    }
  }

  getIAns(item){
    try{
      return item['input_answer']
    }catch(e){
      return 'N/A'
    }
  }

  getILength(saved_Images){
    try{
      return saved_Images.length;
    }catch(e){
      return 0
    }
  }

    
  viewImage(imgUrl){
    this.photoViewer.show(imgUrl);
  }
  
  goBack(){
    if(this.by_sc == "action"){
      this.router.navigate(['/checklist-action', {
        'is_submitted':this.isSubmitted,
        'checklist_id': this.checklist_id,
        'item': JSON.stringify(this.item),
        'id':this.id,
        'by_sc':this.by_sc,
        'status': this.status}]);
    }else{
      this.router.navigate(['/checklist-by-submitted', {
        'is_submitted':this.isSubmitted,
        'checklist_id': this.checklist_id,
        'item': JSON.stringify(this.item),
        'id':this.id,
        'by_sc':this.by_sc,
        'status': this.status}]);
    }
  }

}
