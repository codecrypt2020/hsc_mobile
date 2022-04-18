import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.page.html',
  styleUrls: ['./emplist.page.scss'],
})
export class EmplistPage implements OnInit {

  @Input() emplist:any;
  @Input() selected_id:any;
  @Input() is_emplist:any;

  titleStr = 'Employee List'
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    if(this.is_emplist){
      this.titleStr = 'Employee List'
    }else{
      this.titleStr = 'Inspections'
    }
  }

  changeUser(event){
    //console.log(event['detail']['value'])
    this.selected_id =event['detail']['value']
   this.modalCtrl.dismiss(this.selected_id);
  }

  changeCheckList(event){
    this.selected_id =event['detail']['value']
    this.modalCtrl.dismiss(this.selected_id);
  }

  closeCheckList(){
    this.modalCtrl.dismiss(this.selected_id);
  }

}
