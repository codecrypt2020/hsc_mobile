import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment as ENV } from '../../../environments/environment'

@Component({
  selector: 'app-ptw',
  templateUrl: './ptw.page.html',
  styleUrls: ['./ptw.page.scss'],
})
export class PTWPage implements OnInit {
  ptwCatList =[]
  baseURL = ENV.NODE_URL+"public/permit/permitCategoryImage/"
  constructor(private appConstant:AppConstantService,private restApi:RestApiService,private router:Router) {
   }

  ngOnInit() {
    this.loadCategory();
  }

  openList(cat_id,cat_name){
    this.router.navigate(['ptw-list',{cat_id:cat_id,cat_name:cat_name}]);
  }

  loadCategory(){
    let data = {
      page: 0,
      searchText: "",
      sortby: "id"
    }
    this.restApi.getPTWCategory(data).then((success) => {
      this.ptwCatList =[]
      this.ptwCatList = success['data']
    }, (error) => {
    });
  }

}
