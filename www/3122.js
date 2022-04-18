"use strict";(self.webpackChunkhsc_mobile=self.webpackChunkhsc_mobile||[]).push([[3122],{3122:(k,u,a)=>{a.r(u),a.d(u,{ion_reorder:()=>p,ion_reorder_group:()=>g});var _=a(4553),i=a(3150),f=a(7585),m=a(2954);const p=class{constructor(t){(0,i.r)(this,t)}onClick(t){const e=this.el.closest("ion-reorder-group");t.preventDefault(),(!e||!e.disabled)&&t.stopImmediatePropagation()}render(){const t=(0,f.b)(this);return(0,i.h)(i.H,{class:t},(0,i.h)("slot",null,(0,i.h)("ion-icon",{name:"ios"===t?"reorder-three-outline":"reorder-two-sharp",lazy:!1,class:"reorder-icon",part:"icon"})))}get el(){return(0,i.i)(this)}};p.style={ios:":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:34px;opacity:0.4}",md:":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:31px;opacity:0.3}"};const g=class{constructor(t){(0,i.r)(this,t),this.ionItemReorder=(0,i.e)(this,"ionItemReorder",7),this.lastToIndex=-1,this.cachedHeights=[],this.scrollElTop=0,this.scrollElBottom=0,this.scrollElInitial=0,this.containerTop=0,this.containerBottom=0,this.state=0,this.disabled=!0}disabledChanged(){this.gesture&&this.gesture.enable(!this.disabled)}connectedCallback(){var t=this;return(0,_.Z)(function*(){const e=t.el.closest("ion-content");e&&(t.scrollEl=yield e.getScrollElement()),t.gesture=(yield Promise.resolve().then(a.bind(a,7279))).createGesture({el:t.el,gestureName:"reorder",gesturePriority:110,threshold:0,direction:"y",passive:!1,canStart:s=>t.canStart(s),onStart:s=>t.onStart(s),onMove:s=>t.onMove(s),onEnd:()=>t.onEnd()}),t.disabledChanged()})()}disconnectedCallback(){this.onEnd(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}complete(t){return Promise.resolve(this.completeSync(t))}canStart(t){if(this.selectedItemEl||0!==this.state)return!1;const s=t.event.target.closest("ion-reorder");if(!s)return!1;const r=v(s,this.el);return!!r&&(t.data=r,!0)}onStart(t){t.event.preventDefault();const e=this.selectedItemEl=t.data,s=this.cachedHeights;s.length=0;const r=this.el,o=r.children;if(!o||0===o.length)return;let l=0;for(let c=0;c<o.length;c++){const d=o[c];l+=d.offsetHeight,s.push(l),d.$ionIndex=c}const n=r.getBoundingClientRect();if(this.containerTop=n.top,this.containerBottom=n.bottom,this.scrollEl){const c=this.scrollEl.getBoundingClientRect();this.scrollElInitial=this.scrollEl.scrollTop,this.scrollElTop=c.top+b,this.scrollElBottom=c.bottom-b}else this.scrollElInitial=0,this.scrollElTop=0,this.scrollElBottom=0;this.lastToIndex=h(e),this.selectedItemHeight=e.offsetHeight,this.state=1,e.classList.add(I),(0,m.a)()}onMove(t){const e=this.selectedItemEl;if(!e)return;const s=this.autoscroll(t.currentY),r=this.containerTop-s,l=Math.max(r,Math.min(t.currentY,this.containerBottom-s)),n=s+l-t.startY,d=this.itemIndexForTop(l-r);if(d!==this.lastToIndex){const M=h(e);this.lastToIndex=d,(0,m.b)(),this.reorderMove(M,d)}e.style.transform=`translateY(${n}px)`}onEnd(){const t=this.selectedItemEl;if(this.state=2,!t)return void(this.state=0);const e=this.lastToIndex,s=h(t);e===s?this.completeSync():this.ionItemReorder.emit({from:s,to:e,complete:this.completeSync.bind(this)}),(0,m.h)()}completeSync(t){const e=this.selectedItemEl;if(e&&2===this.state){const s=this.el.children,r=s.length,o=this.lastToIndex,l=h(e);o===l||void 0!==t&&!0!==t||this.el.insertBefore(e,l<o?s[o+1]:s[o]),Array.isArray(t)&&(t=C(t,l,o));for(let n=0;n<r;n++)s[n].style.transform="";e.style.transition="",e.classList.remove(I),this.selectedItemEl=void 0,this.state=0}return t}itemIndexForTop(t){const e=this.cachedHeights;let s=0;for(s=0;s<e.length&&!(e[s]>t);s++);return s}reorderMove(t,e){const s=this.selectedItemHeight,r=this.el.children;for(let o=0;o<r.length;o++){let n="";o>t&&o<=e?n=`translateY(${-s}px)`:o<t&&o>=e&&(n=`translateY(${s}px)`),r[o].style.transform=n}}autoscroll(t){if(!this.scrollEl)return 0;let e=0;return t<this.scrollElTop?e=-E:t>this.scrollElBottom&&(e=E),0!==e&&this.scrollEl.scrollBy(0,e),this.scrollEl.scrollTop-this.scrollElInitial}render(){const t=(0,f.b)(this);return(0,i.h)(i.H,{class:{[t]:!0,"reorder-enabled":!this.disabled,"reorder-list-active":0!==this.state}})}get el(){return(0,i.i)(this)}static get watchers(){return{disabled:["disabledChanged"]}}},h=t=>t.$ionIndex,v=(t,e)=>{let s;for(;t;){if(s=t.parentElement,s===e)return t;t=s}},b=60,E=10,I="reorder-selected",C=(t,e,s)=>{const r=t[e];return t.splice(e,1),t.splice(s,0,r),t.slice()};g.style=".reorder-list-active>*{-webkit-transition:-webkit-transform 300ms;transition:-webkit-transform 300ms;transition:transform 300ms;transition:transform 300ms, -webkit-transform 300ms;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none !important;transition:none !important;-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.4);box-shadow:0 0 10px rgba(0, 0, 0, 0.4);opacity:0.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}"}}]);