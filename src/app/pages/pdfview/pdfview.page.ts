import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { environment as ENV } from "../../../environments/environment"

@Component({
  selector: 'app-pdfview',
  templateUrl: './pdfview.page.html',
  styleUrls: ['./pdfview.page.scss'],
})
export class PDFViewPage implements OnInit {
  checklist_id;
  chk_name = 'Checklist-details'
  userName
  isSubmitted = '0';
  item;
  status;
  id:any
  by_sc;
  imageLogo = 'https://www.momentumindia.in/wp-content/uploads/2021/07/Momentum-India-Logo.png'
  user_id =''
  d = new Date();
  todayDate = this.d.getFullYear()+'-'+(this.d.getMonth()+1)+'-'+this.d.getDate();
  date = this.todayDate;
  baseUrl = ENV.NODE_URL+'public/answer/'
  constructor(private appConstant:AppConstantService ,private router:Router,private activatedRoute:ActivatedRoute,private restApi:RestApiService,
    private pdfGenerator:PDFGenerator,private photoViewer:PhotoViewer) {
      
    this.checklist_id = this.activatedRoute.snapshot.paramMap.get('checklist_id');
    this.isSubmitted = this.activatedRoute.snapshot.paramMap.get('is_submitted');
    this.userName = this.activatedRoute.snapshot.paramMap.get('name');
    this.item = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    this.status = this.activatedRoute.snapshot.paramMap.get('status'); 
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id'); 
    
    try{
      this.date = this.activatedRoute.snapshot.paramMap.get('date'); 
    }catch(e){
      this.date = ''
    }

    try{
      this.by_sc = this.activatedRoute.snapshot.paramMap.get('by_sc'); 
    }catch(e){
      this.by_sc = ''
    }
    this.id = JSON.parse( this.activatedRoute.snapshot.paramMap.get('id'));
    this.chk_name = this.item['name']
    this.loadDetails();
   }

   getCommets(checklistSD,index){
    if(checklistSD.length==0){
      return 'N/A';
    }else{
      if(checklistSD[index]['comments'].length>3){
        return  checklistSD[index]['comments']
      }else{
        return  'N/A'
      }
    }
   }

   isImages(checklistSD,index){
    if(checklistSD.length==0){
      return false;
    }else{
     try{
      if(this.saved_Images[index][0].length>5){
        return true;
      }else{
        return false;
      }
     }catch(e){
      return false;
     }
    }
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
      date: this.date,
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

  getSelectedOptions(option){
    try{
      if(option==undefined){
        return 'N/A';
      }else{
        return option['']
      }
    }catch(e){
      return 'N/A';
    }
  }

    
  viewImage(imgUrl){
    this.photoViewer.show(imgUrl);
  }
  
  goBack(){
    this.router.navigate(['/checklist-view', {
      'is_submitted':this.isSubmitted,
      'checklist_id': this.checklist_id,
      'item': JSON.stringify(this.item),
      'id':this.id,
      'date':this.date,
      'user_id':this.user_id,
      'by_sc':this.by_sc,
      'status': this.status}]);
  }

  ngOnInit() {
  }

  content: string;
  downloadInvoice(){
    this.content = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"> '
    this.content += '<style>.card{color: white; height: 200px; border: 1px solid #ccc; padding: 10px; border-radius: 10px;}'
    this.content += '.cards{max-width: 1200px; margin: 0 auto; display: grid; grid-gap: 0.5rem;}@media (min-width: 300px){.cards{grid-template-columns: repeat(3, 1fr);}}@media (min-width: 600px){.cards{grid-template-columns: repeat(4, 1fr);}}@media (min-width: 1800px){.cards{grid-template-columns: repeat(4, 1fr);}}'
    this.content += '@supports (-webkit-touch-callout: none) {.cards { grid-template-columns: repeat(3, 1fr);}}</style></head><body> '
    this.content += '<div> '
    this.content += '<div style="text-align: end;margin: 5px;"><img class="user-profile-img" src="https://www.momentumindia.in/wp-content/uploads/2021/07/Momentum-India-Logo.png" alt="" style="width: 80px;"></div>'
    this.content += '<div style="border: 2px solid #6b6a6a;height: 100% !important;margin: 10px;padding: 20px;"> <h1 style="color:#E9CD00;text-align:center;">'+this.chk_name+'</h1> '
    let index = 0 ;
    this.questionlist.forEach(item => {
      this.content += '<div>'
      this.content += '<p style="color:#000;text-align:left;font-size: 16px;">'+(index+1)+' . '+item['question']+'</p>'
      this.content += '<p style="color:#000;text-align:left;font-size: 16px;">Selected Answer : '+this.getSelectedOptions(this.checklistSD[index])+'</p>'
      this.content += '<p style="color:#000;text-align:left;font-size: 16px;">Comments : '+ this.getCommets(this.checklistSD,index)+'</p>'
      //bind images to html
      if(this.isImages(this.checklistSD,index)){
        this.content += '<p style="color:#000;text-align:left;font-size: 16px;">Uploaded Images :</p>'
        this.content += '<div class="cards"> '
        let images = [];
        images = this.saved_Images[index]
        images.forEach(item => {
          if(item!='https://adminmisafe.in:3004/public/answer/'){
            let imgURL =this.baseUrl+item
            this.content += '<div class="card"> <img src="'+imgURL+'" alt="" style="border-radius: 10px;height: 100%;width: 100%;object-fit: cover;">'
            this.content += '</div>'
          }
        });
        this.content += '</div>'
      }
      this.content += '</div>'
      index++;
    });
    this.content += '</div></div></body></html>'

    let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: this.chk_name+'.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
      }).catch((error) => {
      });
  }

}
