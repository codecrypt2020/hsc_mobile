"use strict";(self.webpackChunkhsc_mobile=self.webpackChunkhsc_mobile||[]).push([[7660],{7660:(y,h,o)=>{o.r(h),o.d(h,{SelfDHomePageModule:()=>P});var c=o(8583),f=o(665),l=o(7823),m=o(649),e=o(639),u=o(3037),x=o(4714),S=o(3056);function v(t,a){1&t&&e.\u0275\u0275element(0,"ion-icon",15)}function D(t,a){1&t&&e.\u0275\u0275element(0,"ion-icon",16)}function C(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"div",8),e.\u0275\u0275elementStart(1,"div",9),e.\u0275\u0275template(2,v,1,0,"ion-icon",10),e.\u0275\u0275template(3,D,1,0,"ion-icon",11),e.\u0275\u0275elementStart(4,"div",12),e.\u0275\u0275elementStart(5,"p",13),e.\u0275\u0275text(6),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(7,"p",14),e.\u0275\u0275text(8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd()),2&t){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",n.result),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",!n.result),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(n.title),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(n.msg)}}function I(t,a){if(1&t){const n=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",17),e.\u0275\u0275elementStart(1,"div",9),e.\u0275\u0275element(2,"ion-icon",18),e.\u0275\u0275elementStart(3,"p",14),e.\u0275\u0275text(4,"You are not suubmitted Self Declaration"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"ion-button",19),e.\u0275\u0275listener("click",function(){return e.\u0275\u0275restoreView(n),e.\u0275\u0275nextContext().openSDForm()}),e.\u0275\u0275text(6," Submit "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd()}}const E=[{path:"",component:(()=>{class t{constructor(n,i,s,p,r){this.changeRef=n,this.router=i,this.appConstant=s,this.restApi=p,this.updateData=r,this.checklist_id=0,this.checklist=[],this.title="",this.msg="",this.result=!0,this.is_submitted=!1,this.updateData.dataChangeState.subscribe(d=>{d&&(this.loadCheckList(),this.changeRef.detectChanges(),localStorage.setItem("dataUpdate","0"),this.updateData.dataChangeState.next(!1))})}ngOnInit(){}ionViewDidEnter(){this.loadCheckList()}getSDAnswer(){const n=new Date;let s=new c.DatePipe("en-US").transform(n,"YYYY-MM-d"),p={checklistId:this.checklist_id,date:s,userId:localStorage.getItem(this.appConstant.TAG_IS_USER_ID)};this.restApi.getNodeCHKAns(p).then(r=>{let d=r.data;this.is_submitted=d.length>0,d.forEach(g=>{("yes"==g.selected_options||"Yes"==g.selected_options)&&(this.result=!1)}),this.result?(this.msg="Entry Granted. You are Safe to enter in premises.",this.title="Safe to Enter"):(this.msg="Entry Denied. You are not allowed to enter in the premises.",this.title="Unsafe to Enter")},r=>{this.appConstant.handleApiError(r)})}openSDForm(){this.is_submitted?this.appConstant.toastMsg("Self Declaration already submitted."):this.router.navigate(["/self-d",{id:this.checklist_id}])}loadCheckList(){if(!this.appConstant.isInternet)return null;this.restApi.getCheckList({page:0,searchText:"",sortby:""}).then(i=>{1==i.success&&(this.checklist=i.data),this.checklist.forEach(s=>{"SD"==s.identifier&&(this.checklist_id=s.id)}),this.getSDAnswer()},i=>{this.appConstant.handleApiError(i)})}}return t.\u0275fac=function(n){return new(n||t)(e.\u0275\u0275directiveInject(e.ChangeDetectorRef),e.\u0275\u0275directiveInject(m.F0),e.\u0275\u0275directiveInject(u.Z),e.\u0275\u0275directiveInject(x.e),e.\u0275\u0275directiveInject(S.X))},t.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["app-self-dhome"]],decls:17,vars:2,consts:[["mode","md",1,"ionToolbar"],[1,"margin10","text-color-black","font-size1-heading","lightFont",2,"text-align","center !important"],[1,"divBoxCss",3,"click"],["name","document-text-outline","mode","md",1,"iconCss"],[2,"margin-left","8px"],[1,"tabButtonFont","pMargin"],["class","parent","style","text-align: center;padding-top: 20px;",4,"ngIf"],["class","parent","style","text-align: center;margin-top: 100px;",4,"ngIf"],[1,"parent",2,"text-align","center","padding-top","20px"],[1,"contentDiv","clear"],["name","checkmark-circle","style","width: 100px;height: 100px;color: green;padding-bottom: 20px !important;",4,"ngIf"],["name","close-circle-outline","style","width: 100px;height: 100px;color: red;padding-bottom: 20px !important;",4,"ngIf"],[1,"(result)?","safeCss",":","unsafeCss"],[1,"margin10","font-size1-heading","headingFont"],[1,"font-size-input","headingFont",2,"text-align","center"],["name","checkmark-circle",2,"width","100px","height","100px","color","green","padding-bottom","20px !important"],["name","close-circle-outline",2,"width","100px","height","100px","color","red","padding-bottom","20px !important"],[1,"parent",2,"text-align","center","margin-top","100px"],["name","document-text-outline",2,"width","100px","height","100px","color","gray"],["size","small","shape","round","mode","ios",1,"shodowCss",2,"margin-bottom","14px !important","height","40px",3,"click"]],template:function(n,i){1&n&&(e.\u0275\u0275elementStart(0,"ion-header"),e.\u0275\u0275elementStart(1,"ion-toolbar",0),e.\u0275\u0275elementStart(2,"ion-buttons"),e.\u0275\u0275elementStart(3,"ion-title"),e.\u0275\u0275elementStart(4,"p",1),e.\u0275\u0275text(5,"Self Declaration"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(6,"ion-title"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(7,"ion-content"),e.\u0275\u0275elementStart(8,"div",2),e.\u0275\u0275listener("click",function(){return i.openSDForm()}),e.\u0275\u0275element(9,"ion-icon",3),e.\u0275\u0275elementStart(10,"div",4),e.\u0275\u0275elementStart(11,"p",5),e.\u0275\u0275text(12,"Parent on Behalf of Student"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(13,"p",5),e.\u0275\u0275text(14,"COVID Screening Form"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(15,C,9,4,"div",6),e.\u0275\u0275template(16,I,7,0,"div",7),e.\u0275\u0275elementEnd()),2&n&&(e.\u0275\u0275advance(15),e.\u0275\u0275property("ngIf",i.is_submitted),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",!i.is_submitted))},directives:[l.IonHeader,l.IonToolbar,l.IonButtons,l.IonTitle,l.IonContent,l.IonIcon,c.NgIf,l.IonButton],styles:[".divBoxCss[_ngcontent-%COMP%]{display:flex;margin:16px;border:2px solid #E9CD00;padding:10px;border-radius:20px;box-shadow:0 4px 10px #0003,0 6px 20px #00000030}.pMargin[_ngcontent-%COMP%]{margin-top:0;margin-bottom:0;color:#e9cd00!important;font-weight:bold}.iconCss[_ngcontent-%COMP%]{color:#e9cd00!important;width:40px;height:40px}"]}),t})()}];let b=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=e.\u0275\u0275defineInjector({imports:[[m.Bz.forChild(E)],m.Bz]}),t})(),P=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=e.\u0275\u0275defineInjector({imports:[[c.CommonModule,f.FormsModule,l.IonicModule,b]]}),t})()}}]);