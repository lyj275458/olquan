import $ from 'jquery';
//import reqwest from 'reqwest';
//require('es6-promise').polyfill();
// To add to window  
/*if (!window.Promise) {  
  window.Promise = Promise;  
  console.log('Promise')
};*/
import axios from 'axios';
import config from './config';
 //接口地址
 const API = {
     host:'http://app.youx.mobi/',
     //host:'http://youxdev.tsou.cn/',
     womensdayoffserch: 'wap/activitys/womensday/winning/offserch',//38活动n码核销（店铺）
     womensdayShopDetail: 'wap/activitys/shop/detail',//店铺详情
     womensdayGetalluse:'wap/activitys/womensday/winning/getalluse',//38活动已核销SN码（店铺）
     sendRegCode:'app/user/2.0/sendRegCodeForCodePay',//发送验证码
     winningAdd:'wap/activitys/womensday/winning/add',//手机号抽奖
     womensdayDetail:'wap/activitys/womensday/detail',//活动详情

 };
 //ajax方法
 const commonAjax = function(URL, data, callBack) {

     //老的基于jquery
     var promise = $.ajax({
            url: API.host+URL,
            data:data,
            });
        //把方法作为回调提供并使用
       return promise.then(function(data){
        console.log(data);
        if(data.status==1){
            callBack(data.data);
        }else{
            alert(data.showMessage);
        };
        
        });
     //基于reqwest
    /* reqwest({
             url: API.host+URL,
             type: 'jsonp',
             method:'post',
             data:data,         
         }).then((data) => {   
         console.log(data)     
          // callBack(data.data)
         }).fail(function (err, msg) {
           console.log(err)
         }).always(function (resp) {
             console.log('always')
         });*/
     /* axios.get(API.host + URL, {
          params: data
      }).then((response) => {
          console.log(response.data)
          if (response.data.status == 1) {
              callBack(response.data.data)
          }
      }).catch(function(error) {
          console.log(error);
      })*/
     /*var config = {
         progress: function(progressEvent) {
             console.log('progressEvent')
         }
     };
     //axios.create([config])
     var instance = axios.create({
         baseURL: API.host
     });
     
     axios.get( + URL, {
         params: data
     }, config).then((response) => {
         console.log(response.data)
         if (response.data.status == 1) {
             callBack(response.data.data)
         }
     }).catch(function(error) {
         console.log(error);
     })*/
   /* config.params = data;
     axios.get(URL, config).then((response) => {
        alert(response)
       // alert(response)
         if (response.data.status==1) {
             callBack(response.data.data)
         }else{
            alert(response.data.showMessage);
         }
     }).catch(function(error) {
         console.log(error);
     });
*/
   
 }
 export {
     API,
     commonAjax
 };