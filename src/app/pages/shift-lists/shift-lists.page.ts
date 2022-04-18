import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shift-lists',
  templateUrl: './shift-lists.page.html',
  styleUrls: ['./shift-lists.page.scss'],
})
export class ShiftListsPage implements OnInit {

  @Input() emplist:any;
  @Input() selected_id:any;
  @Input() is_emplist:any;
  @Input() title:any;

  titleStr = 'Employee List'
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
      this.titleStr = 'Shift List'
  }

  changeShift(event){
    //console.log(event['detail']['value'])
    this.selected_id =event['detail']['value']
   this.modalCtrl.dismiss(this.selected_id);
  }

  closeModal(){
    this.modalCtrl.dismiss(this.selected_id);
  }


}
