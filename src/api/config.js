import Qs from 'qs'
export default {
    url: '',//如axios.get(url,config);这里的url会覆盖掉config中的url
   
    method: 'POST',
    transformRequest: [function(data) {
        //为了避免qs格式化时对内层对象的格式化先把内层的对象转为
        data.CustData = JSON.stringify(data.CustData);
        //由于使用的form-data传数据所以要格式化
        data = Qs.stringify(data);
        return data;
    }],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function(data) {
        return data;
    }],
     // `headers` 是即将被发送的自定义请求头
    
    params: {},
    paramsSerializer: function(params) {
        return Qs.stringify(params)
    },
    data: {
        CustData: {}
    },
    timeout: 5000,
    //withCredentials: true, // default
    responseType: 'json', // default
    /*onUploadProgress: function(progressEvent) {
        // Do whatever you want with the native progress event
    },
    onDownloadProgress: function(progressEvent) {
        // Do whatever you want with the native progress event
    },*/
    maxContentLength: 2000,
    validateStatus: function(status) {
        return status >= 200 && status < 300; // default
    },
    progress: function(progressEvent) {
        console.log('progressEvent')
        // Do whatever you want with the native progress event
    },
    maxRedirects: 5, // default
}