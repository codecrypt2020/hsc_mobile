"use strict";(self.webpackChunkhsc_mobile=self.webpackChunkhsc_mobile||[]).push([[8592],{6633:(g,u,l)=>{l.d(u,{c:()=>_});var t=l(3150),r=l(2954),d=l(7279);const _=(p,o)=>{let i,e;const a=(c,m,h)=>{if("undefined"==typeof document)return;const f=document.elementFromPoint(c,m);f&&o(f)?f!==i&&(n(),s(f,h)):n()},s=(c,m)=>{i=c,e||(e=i);const h=i;(0,t.c)(()=>h.classList.add("ion-activated")),m()},n=(c=!1)=>{if(!i)return;const m=i;(0,t.c)(()=>m.classList.remove("ion-activated")),c&&e!==i&&i.click(),i=void 0};return(0,d.createGesture)({el:p,gestureName:"buttonActiveDrag",threshold:0,onStart:c=>a(c.currentX,c.currentY,r.a),onMove:c=>a(c.currentX,c.currentY,r.b),onEnd:()=>{n(!0),(0,r.h)(),e=void 0}})}},7330:(g,u,l)=>{l.d(u,{a:()=>d,d:()=>_});var t=l(4553),r=l(2377);const d=function(){var p=(0,t.Z)(function*(o,i,e,a,s){if(o)return o.attachViewToDom(i,e,s,a);if("string"!=typeof e&&!(e instanceof HTMLElement))throw new Error("framework delegate is missing");const n="string"==typeof e?i.ownerDocument&&i.ownerDocument.createElement(e):e;return a&&a.forEach(c=>n.classList.add(c)),s&&Object.assign(n,s),i.appendChild(n),yield new Promise(c=>(0,r.c)(n,c)),n});return function(i,e,a,s,n){return p.apply(this,arguments)}}(),_=(p,o)=>{if(o){if(p)return p.removeViewFromDom(o.parentElement,o);o.remove()}return Promise.resolve()}},2954:(g,u,l)=>{l.d(u,{a:()=>d,b:()=>_,c:()=>r,d:()=>o,h:()=>p});const t={getEngine(){const i=window;return i.TapticEngine||i.Capacitor&&i.Capacitor.isPluginAvailable("Haptics")&&i.Capacitor.Plugins.Haptics},available(){return!!this.getEngine()},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(i){const e=this.getEngine();if(!e)return;const a=this.isCapacitor()?i.style.toUpperCase():i.style;e.impact({style:a})},notification(i){const e=this.getEngine();if(!e)return;const a=this.isCapacitor()?i.style.toUpperCase():i.style;e.notification({style:a})},selection(){this.impact({style:"light"})},selectionStart(){const i=this.getEngine();!i||(this.isCapacitor()?i.selectionStart():i.gestureSelectionStart())},selectionChanged(){const i=this.getEngine();!i||(this.isCapacitor()?i.selectionChanged():i.gestureSelectionChanged())},selectionEnd(){const i=this.getEngine();!i||(this.isCapacitor()?i.selectionEnd():i.gestureSelectionEnd())}},r=()=>{t.selection()},d=()=>{t.selectionStart()},_=()=>{t.selectionChanged()},p=()=>{t.selectionEnd()},o=i=>{t.impact(i)}},408:(g,u,l)=>{l.d(u,{S:()=>r});const r={bubbles:{dur:1e3,circles:9,fn:(d,_,p)=>{const o=d*_/p-d+"ms",i=2*Math.PI*_/p;return{r:5,style:{top:9*Math.sin(i)+"px",left:9*Math.cos(i)+"px","animation-delay":o}}}},circles:{dur:1e3,circles:8,fn:(d,_,p)=>{const o=_/p,i=d*o-d+"ms",e=2*Math.PI*o;return{r:5,style:{top:9*Math.sin(e)+"px",left:9*Math.cos(e)+"px","animation-delay":i}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(d,_)=>({r:6,style:{left:9-9*_+"px","animation-delay":-110*_+"ms"}})},lines:{dur:1e3,lines:12,fn:(d,_,p)=>({y1:17,y2:29,style:{transform:`rotate(${30*_+(_<6?180:-180)}deg)`,"animation-delay":d*_/p-d+"ms"}})},"lines-small":{dur:1e3,lines:12,fn:(d,_,p)=>({y1:12,y2:20,style:{transform:`rotate(${30*_+(_<6?180:-180)}deg)`,"animation-delay":d*_/p-d+"ms"}})}}},1269:(g,u,l)=>{l.d(u,{c:()=>d,g:()=>p,h:()=>r,o:()=>i});var t=l(4553);const r=(e,a)=>null!==a.closest(e),d=(e,a)=>"string"==typeof e&&e.length>0?Object.assign({"ion-color":!0,[`ion-color-${e}`]:!0},a):a,p=e=>{const a={};return(e=>void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter(s=>null!=s).map(s=>s.trim()).filter(s=>""!==s):[])(e).forEach(s=>a[s]=!0),a},o=/^[a-z][a-z0-9+\-.]*:/,i=function(){var e=(0,t.Z)(function*(a,s,n,c){if(null!=a&&"#"!==a[0]&&!o.test(a)){const m=document.querySelector("ion-router");if(m)return null!=s&&s.preventDefault(),m.push(a,n,c)}return!1});return function(s,n,c,m){return e.apply(this,arguments)}}()},1194:(g,u,l)=>{l.d(u,{O:()=>s});var t=l(639),r=l(649),d=l(7823),_=l(3056),p=l(8583);function o(n,c){if(1&n){const m=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",3),t.\u0275\u0275elementStart(1,"div",4),t.\u0275\u0275element(2,"ion-icon",5),t.\u0275\u0275elementStart(3,"p",6),t.\u0275\u0275text(4),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(5,"p",7),t.\u0275\u0275text(6),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(7,"div",8),t.\u0275\u0275elementStart(8,"ion-button",9),t.\u0275\u0275listener("click",function(){return t.\u0275\u0275restoreView(m),t.\u0275\u0275nextContext().cancelDialog()}),t.\u0275\u0275text(9,"OK"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd()}if(2&n){const m=t.\u0275\u0275nextContext();t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate(m.title),t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(m.msg)}}function i(n,c){1&n&&t.\u0275\u0275element(0,"ion-icon",16)}function e(n,c){1&n&&t.\u0275\u0275element(0,"ion-icon",17)}function a(n,c){if(1&n){const m=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",3),t.\u0275\u0275elementStart(1,"div",4),t.\u0275\u0275template(2,i,1,0,"ion-icon",10),t.\u0275\u0275template(3,e,1,0,"ion-icon",11),t.\u0275\u0275elementStart(4,"p",12),t.\u0275\u0275text(5),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(6,"p",13),t.\u0275\u0275text(7),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(8,"div",14),t.\u0275\u0275elementStart(9,"ion-button",15),t.\u0275\u0275listener("click",function(){return t.\u0275\u0275restoreView(m),t.\u0275\u0275nextContext().goBack()}),t.\u0275\u0275text(10,"OK"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd()}if(2&n){const m=t.\u0275\u0275nextContext();t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf","Yes"==m.result),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","No"==m.result),t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(m.title),t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(m.msg)}}let s=(()=>{class n{constructor(m,h,f){this.router=m,this.modalCtrl=h,this.updateData=f}ngOnInit(){}cancelDialog(){this.modalCtrl.dismiss()}goBack(){localStorage.setItem("dataUpdate","1"),this.updateData.dataChangeState.next(!0),this.router.navigateByUrl(this.redirect),this.modalCtrl.dismiss()}}return n.\u0275fac=function(m){return new(m||n)(t.\u0275\u0275directiveInject(r.F0),t.\u0275\u0275directiveInject(d.ModalController),t.\u0275\u0275directiveInject(_.X))},n.\u0275cmp=t.\u0275\u0275defineComponent({type:n,selectors:[["app-custom-model"]],inputs:{pop_up_type:"pop_up_type",title:"title",msg:"msg",redirect:"redirect",result:"result"},decls:4,vars:2,consts:[[1,"fullheight","xc"],[2,"text-align","center !important","margin","24px !important"],["class","parent",4,"ngIf"],[1,"parent"],[1,"contentDiv","clear"],["name","checkmark-circle",2,"width","72px","height","72px","color","#E9CD00"],[1,"margin10","text-color-primary","font-size-18","headingFont",2,"font-weight","bold"],[1,"font-size-input","lightFont",2,"text-align","center"],[2,"text-align","center"],["expand","block",2,"margin","20px","text-transform","capitalize",3,"click"],["name","checkmark-circle","style","width: 72px;height: 72px;color: green;",4,"ngIf"],["name","close-circle-outline","style","width: 72px;height: 72px;color: red;",4,"ngIf"],[1,"margin10","text-color-primary","font-size1-heading","headingFont"],[1,"font-size-content","lightFont",2,"text-align","center"],[2,"margin","20px"],["expand","block",2,"margin","10px","text-transform","capitalize",3,"click"],["name","checkmark-circle",2,"width","72px","height","72px","color","green"],["name","close-circle-outline",2,"width","72px","height","72px","color","red"]],template:function(m,h){1&m&&(t.\u0275\u0275elementStart(0,"div",0),t.\u0275\u0275elementStart(1,"div",1),t.\u0275\u0275template(2,o,10,2,"div",2),t.\u0275\u0275template(3,a,11,4,"div",2),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd()),2&m&&(t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf","ch_list_submit"==h.pop_up_type),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","self_d"==h.pop_up_type))},directives:[p.NgIf,d.IonIcon,d.IonButton],styles:["ion-content[_ngcontent-%COMP%]{--background: transparent !important}.success[_ngcontent-%COMP%]{font-size:64px!important;color:#7d9197!important;margin-bottom:-64px;background:white;border-radius:50%;padding:32px}.fullheight[_ngcontent-%COMP%]{height:100%;width:100%}.xc[_ngcontent-%COMP%]{margin-top:40%;align-items:center;justify-content:center}.contentDiv[_ngcontent-%COMP%]{text-align:center!important;background:white!important;border-radius:10px!important;padding:24px!important}.nextbutton[_ngcontent-%COMP%]{height:40px!important;--background: var(--ion-color-tertiary) !important;--border-radius: 10px !important;text-align:left!important;padding-left:10px!important;padding-right:10px!important}#parent[_ngcontent-%COMP%]{float:left;width:100%}span.clear[_ngcontent-%COMP%]{clear:left;display:block}.spanCss[_ngcontent-%COMP%]{margin-left:20px;margin-right:20px}.under[_ngcontent-%COMP%]{position:absolute;left:0px;top:0px;z-index:-1}.over[_ngcontent-%COMP%]{position:absolute;left:40px;top:10px;z-index:-1}.End-of-Chapter[_ngcontent-%COMP%]{height:18px;font-family:AvantGarde-Demi;font-size:19px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.37;letter-spacing:.44px;text-align:center;color:#70909f}"]}),n})()},2010:(g,u,l)=>{l.d(u,{E:()=>e});var t=l(639),r=l(7823),d=l(8583);function _(a,s){if(1&a&&(t.\u0275\u0275elementStart(0,"ion-item"),t.\u0275\u0275elementStart(1,"ion-label"),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd(),t.\u0275\u0275element(3,"ion-radio",8),t.\u0275\u0275elementEnd()),2&a){const n=s.$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(n.emp_name),t.\u0275\u0275advance(1),t.\u0275\u0275propertyInterpolate("value",n.id)}}function p(a,s){if(1&a){const n=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"ion-list"),t.\u0275\u0275elementStart(1,"ion-radio-group",6),t.\u0275\u0275listener("ionChange",function(m){return t.\u0275\u0275restoreView(n),t.\u0275\u0275nextContext().changeUser(m)}),t.\u0275\u0275template(2,_,4,2,"ion-item",7),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd()}if(2&a){const n=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275propertyInterpolate("value",n.selected_id),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngForOf",n.emplist)}}function o(a,s){if(1&a&&(t.\u0275\u0275elementStart(0,"ion-item"),t.\u0275\u0275elementStart(1,"ion-label",9),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd(),t.\u0275\u0275element(3,"ion-radio",8),t.\u0275\u0275elementEnd()),2&a){const n=s.$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(n.name),t.\u0275\u0275advance(1),t.\u0275\u0275propertyInterpolate("value",n.id)}}function i(a,s){if(1&a){const n=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"ion-list"),t.\u0275\u0275elementStart(1,"ion-radio-group",6),t.\u0275\u0275listener("ionChange",function(m){return t.\u0275\u0275restoreView(n),t.\u0275\u0275nextContext().changeCheckList(m)}),t.\u0275\u0275template(2,o,4,2,"ion-item",7),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd()}if(2&a){const n=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275propertyInterpolate("value",n.selected_id),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngForOf",n.emplist)}}let e=(()=>{class a{constructor(n){this.modalCtrl=n,this.titleStr="Employee List"}ngOnInit(){this.titleStr=this.is_emplist?"Employee List":"Inspections"}changeUser(n){this.selected_id=n.detail.value,this.modalCtrl.dismiss(this.selected_id)}changeCheckList(n){this.selected_id=n.detail.value,this.modalCtrl.dismiss(this.selected_id)}closeCheckList(){this.modalCtrl.dismiss(this.selected_id)}}return a.\u0275fac=function(n){return new(n||a)(t.\u0275\u0275directiveInject(r.ModalController))},a.\u0275cmp=t.\u0275\u0275defineComponent({type:a,selectors:[["app-emplist"]],inputs:{emplist:"emplist",selected_id:"selected_id",is_emplist:"is_emplist"},decls:12,vars:3,consts:[["mode","md",1,"ionToolbar"],[3,"click"],["slot","icon-only","name","arrow-back-outline",1,"TabBarIcon"],[2,"padding-left","0px","padding-right","0px"],[1,"margin10","text-color-black","font-size1-heading","lightFont",2,"text-align","left !important"],[4,"ngIf"],[3,"value","ionChange"],[4,"ngFor","ngForOf"],["mode","md","slot","start",3,"value"],[1,"lightFont","font-size-heading"]],template:function(n,c){1&n&&(t.\u0275\u0275elementStart(0,"ion-header"),t.\u0275\u0275elementStart(1,"ion-toolbar",0),t.\u0275\u0275elementStart(2,"ion-buttons"),t.\u0275\u0275elementStart(3,"ion-button",1),t.\u0275\u0275listener("click",function(){return c.closeCheckList()}),t.\u0275\u0275element(4,"ion-icon",2),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(5,"ion-title",3),t.\u0275\u0275elementStart(6,"p",4),t.\u0275\u0275text(7),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275element(8,"ion-title"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(9,"ion-content"),t.\u0275\u0275template(10,p,3,2,"ion-list",5),t.\u0275\u0275template(11,i,3,2,"ion-list",5),t.\u0275\u0275elementEnd()),2&n&&(t.\u0275\u0275advance(7),t.\u0275\u0275textInterpolate(c.titleStr),t.\u0275\u0275advance(3),t.\u0275\u0275property("ngIf",c.is_emplist),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",!c.is_emplist))},directives:[r.IonHeader,r.IonToolbar,r.IonButtons,r.IonButton,r.IonIcon,r.IonTitle,r.IonContent,d.NgIf,r.IonList,r.IonRadioGroup,r.SelectValueAccessor,d.NgForOf,r.IonItem,r.IonLabel,r.IonRadio,r.RadioValueAccessor],styles:["ion-radio[_ngcontent-%COMP%]{--color-checked: #E9CD00}"]}),a})()},9885:(g,u,l)=>{l.d(u,{e:()=>p});var t=l(8583),r=l(665),d=l(7823),_=l(639);let p=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=_.\u0275\u0275defineNgModule({type:o}),o.\u0275inj=_.\u0275\u0275defineInjector({imports:[[t.CommonModule,r.FormsModule,d.IonicModule]]}),o})()},3624:(g,u,l)=>{l.d(u,{p:()=>p});var t=l(639),r=l(7823),d=l(8583);function _(o,i){if(1&o&&(t.\u0275\u0275elementStart(0,"ion-item"),t.\u0275\u0275elementStart(1,"ion-label"),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd(),t.\u0275\u0275element(3,"ion-radio",7),t.\u0275\u0275elementEnd()),2&o){const e=i.$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(e.name),t.\u0275\u0275advance(1),t.\u0275\u0275propertyInterpolate("value",e.id)}}let p=(()=>{class o{constructor(e){this.modalCtrl=e,this.titleStr="Employee List"}ngOnInit(){this.titleStr="Shift List"}changeShift(e){this.selected_id=e.detail.value,this.modalCtrl.dismiss(this.selected_id)}closeModal(){this.modalCtrl.dismiss(this.selected_id)}}return o.\u0275fac=function(e){return new(e||o)(t.\u0275\u0275directiveInject(r.ModalController))},o.\u0275cmp=t.\u0275\u0275defineComponent({type:o,selectors:[["app-shift-lists"]],inputs:{emplist:"emplist",selected_id:"selected_id",is_emplist:"is_emplist",title:"title"},decls:13,vars:3,consts:[["mode","md",1,"ionToolbar"],[3,"click"],["slot","icon-only","name","arrow-back-outline",1,"TabBarIcon"],[2,"padding-left","0px","padding-right","0px"],[1,"margin10","text-color-black","font-size1-heading","lightFont",2,"text-align","left !important"],[3,"value","ionChange"],[4,"ngFor","ngForOf"],["mode","md","slot","start",3,"value"]],template:function(e,a){1&e&&(t.\u0275\u0275elementStart(0,"ion-header"),t.\u0275\u0275elementStart(1,"ion-toolbar",0),t.\u0275\u0275elementStart(2,"ion-buttons"),t.\u0275\u0275elementStart(3,"ion-button",1),t.\u0275\u0275listener("click",function(){return a.closeModal()}),t.\u0275\u0275element(4,"ion-icon",2),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(5,"ion-title",3),t.\u0275\u0275elementStart(6,"p",4),t.\u0275\u0275text(7),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275element(8,"ion-title"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(9,"ion-content"),t.\u0275\u0275elementStart(10,"ion-list"),t.\u0275\u0275elementStart(11,"ion-radio-group",5),t.\u0275\u0275listener("ionChange",function(n){return a.changeShift(n)}),t.\u0275\u0275template(12,_,4,2,"ion-item",6),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd()),2&e&&(t.\u0275\u0275advance(7),t.\u0275\u0275textInterpolate(a.title),t.\u0275\u0275advance(4),t.\u0275\u0275propertyInterpolate("value",a.selected_id),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngForOf",a.emplist))},directives:[r.IonHeader,r.IonToolbar,r.IonButtons,r.IonButton,r.IonIcon,r.IonTitle,r.IonContent,r.IonList,r.IonRadioGroup,r.SelectValueAccessor,d.NgForOf,r.IonItem,r.IonLabel,r.IonRadio,r.RadioValueAccessor],styles:[""]}),o})()},3056:(g,u,l)=>{l.d(u,{X:()=>p});var t=l(6215),r=l(639),d=l(7823),_=l(3037);let p=(()=>{class o{constructor(e,a){this.plt=e,this.appConstant=a,this.dataChangeState=new t.X(!1),this.plt.ready().then(()=>{this.checkDataUpdate()})}checkDataUpdate(){"1"==localStorage.getItem("dataUpdate")?this.dataChangeState.next(!0):this.dataChangeState.next(!1)}isUpdateData(){return this.dataChangeState.value}}return o.\u0275fac=function(e){return new(e||o)(r.\u0275\u0275inject(d.Platform),r.\u0275\u0275inject(_.Z))},o.\u0275prov=r.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},3866:(g,u,l)=>{l.d(u,{$:()=>p});var t=l(6215),r=l(639),d=l(7823),_=l(3037);let p=(()=>{class o{constructor(e,a){this.plt=e,this.appConstant=a,this.updateListState=new t.X(!1),this.plt.ready().then(()=>{this.checkListUpdate()})}checkListUpdate(){"1"==localStorage.getItem("dataUpdateAdminInc")?this.updateListState.next(!0):this.updateListState.next(!1)}isUpdateList(){return this.updateListState.value}}return o.\u0275fac=function(e){return new(e||o)(r.\u0275\u0275inject(d.Platform),r.\u0275\u0275inject(_.Z))},o.\u0275prov=r.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},763:(g,u,l)=>{l.d(u,{Y:()=>p});var t=l(6215),r=l(639),d=l(7823),_=l(3037);let p=(()=>{class o{constructor(e,a){this.plt=e,this.appConstant=a,this.updateStatusState=new t.X(!1),this.plt.ready().then(()=>{this.checkStatusUpdate()})}checkStatusUpdate(){"1"==localStorage.getItem("dataUpdateStatus")?this.updateStatusState.next(!0):this.updateStatusState.next(!1)}isUpdateStatus(){return this.updateStatusState.value}}return o.\u0275fac=function(e){return new(e||o)(r.\u0275\u0275inject(d.Platform),r.\u0275\u0275inject(_.Z))},o.\u0275prov=r.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},3220:(g,u,l)=>{l.d(u,{J:()=>p});var t=l(2340),r=l(639),d=l(1841),_=l(3037);let p=(()=>{class o{constructor(e,a){this.http=e,this.appConstatnt=a,this.baseApiUrl=t.N.NODE_URL+this.appConstatnt.API_ANSWER_IMAGE,this.basePTWApiUrl=t.N.NODE_URL+this.appConstatnt.API_N_PTW_UPLOAD_IMAGE,this.basePTW_S_IMG_ApiUrl=t.N.NODE_URL+this.appConstatnt.API_N_PTW_UPLOAD_S_IMAGE}uploadImage(e,a){const s=new FormData;return s.append("image",e),s.append("answerId",a),this.http.post(this.baseApiUrl,s)}uploadPTWImage(e,a,s){console.log(e),console.log(a),console.log(s),console.log(this.basePTWApiUrl);const n=new FormData;return e.forEach(c=>{n.append("image",c)}),n.append("permitId",a),n.append("filetype","1"),n.append("type",s),this.http.post(this.basePTWApiUrl,n)}uploadPTW_S_Image(e,a,s){console.log("upload_tag : "+s);const n=new FormData;return n.append("image",e),n.append("permitId",a),n.append("filetype","1"),n.append("type",s),this.http.post(this.basePTW_S_IMG_ApiUrl,n)}uploadImagesCL_api(e,a,s,n){const c=new FormData;return c.append("id",e),c.append("file_type",a),s.forEach(m=>{c.append("image",m)}),c.append("type",n),this.http.post(t.N.NODE_URL+this.appConstatnt.API_N_INC_CL_IMAGE,c)}uploadImagesPL_api(e,a,s,n){const c=new FormData;return c.append("id",e),c.append("file_type",a),s.forEach(m=>{c.append("image",m)}),c.append("type",n),this.http.post(t.N.NODE_URL+this.appConstatnt.API_N_INC_IP_IMAGE,c)}uploadIncidentImages(e,a){const s=new FormData;return s.append("id",e),s.append("filetype","1"),a.forEach(n=>{s.append("image",n)}),this.http.post(t.N.NODE_URL+this.appConstatnt.API_N_INC_IMAGE,s)}uploadProfileImage(e,a){const s=new FormData;return s.append("id",a),s.append("file_type","1"),s.append("image",e),this.http.post(t.N.NODE_URL+this.appConstatnt.API_N_INC_USER_IMAGE,s)}}return o.\u0275fac=function(e){return new(e||o)(r.\u0275\u0275inject(d.eN),r.\u0275\u0275inject(_.Z))},o.\u0275prov=r.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()}}]);