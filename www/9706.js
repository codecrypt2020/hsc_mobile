"use strict";(self.webpackChunkhsc_mobile=self.webpackChunkhsc_mobile||[]).push([[9706],{9706:(f,c,e)=>{e.r(c),e.d(c,{createSwipeBackGesture:()=>m});var h=e(2377),_=e(7279);e(960);const m=(a,E,D,M,b)=>{const r=a.ownerDocument.defaultView;return(0,_.createGesture)({el:a,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:t=>t.startX<=50&&E(),onStart:D,onMove:t=>{M(t.deltaX/r.innerWidth)},onEnd:t=>{const s=r.innerWidth,n=t.deltaX/s,o=t.velocityX,l=o>=0&&(o>.2||t.deltaX>s/2),d=(l?1-n:n)*s;let u=0;if(d>5){const O=d/Math.abs(o);u=Math.min(O,540)}b(l,n<=0?.01:(0,h.j)(0,n,.9999),u)}})}}}]);