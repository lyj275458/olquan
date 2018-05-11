'use strict';
const {parse, format} = require('url');
const crypto = require('crypto');

const uuid = require('uuid');
//const httpx = require('httpx');
//const debug = require('debug')('api-gateway');

//const ua = require('./ua');
const Base = require('./base');
const form = 'application/x-www-form-urlencoded';
const hasOwnProperty = function (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

/**
 * API Gateway Client
 */
class Client extends Base {
  constructor(key, secret, stage = 'RELEASE') {
    super();
    this.appKey = key;
    this.appSecret = Buffer.from(secret, 'utf8');
    this.stage = stage;
  }

  buildStringToSign(method, headers, signedHeadersStr, url,data) {
    // accept, contentMD5, contentType,
    //console.log(headers)
    const lf = '\n';
    var list = [method, lf];
		//console.log(data)
    var accept = headers['Accept'];
    if (accept) {	
      list.push(accept);
    }
    list.push(lf);

    var contentMD5 = headers['Content-MD5'];
    if (contentMD5) {
      list.push(contentMD5);
    }
    list.push(lf);

    var contentType = headers['content-type'] || '';
//  if (contentType) {
//    list.push(contentType);
//  }
//  list.push(lf);

    var date = headers['Date'];
    
    if (date) {
      list.push(date);
    }
    list.push(lf);

    if (signedHeadersStr) {
      list.push(signedHeadersStr);
      list.push(lf);
    }
		
    if (contentType.startsWith(form)) {
    	
      list.push(this.buildUrl(url,data));
    } else {
      list.push(this.buildUrl(url));
    }
		console.log(list.join(''));
    return list.join('');
  }

  sign(stringToSign) {
    return crypto.createHmac('sha256', this.appSecret)
      .update(stringToSign, 'utf8').digest('base64');
  }

  md5(content) {
    return crypto.createHash('md5')
      .update(content, 'utf8')
      .digest('base64');
  }

  getSignHeaderKeys(headers, signHeaders) {
    var keys = Object.keys(headers).sort();
    var signKeys = [];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // x-ca- 开头的header或者指定的header
      if (key.startsWith('X-Ca-') || hasOwnProperty(signHeaders, key)) {
        signKeys.push(key);
      }
    }

    // 按字典序排序
    return signKeys.sort();
  }

  buildUrl(parsedUrl,data) {
    var toStringify = Object.assign(parsedUrl.query,data);
    var result = parsedUrl.pathname;
    if (Object.keys(toStringify).length) {
      var keys = Object.keys(toStringify).sort();
      var list = new Array(keys.length);
      for (var i = 0; i < keys.length; i++) {
      	//console.log(keys[i])
        var key = keys[i];
        
        if (toStringify[key] && ('' + toStringify[key]) || ('' + toStringify[key])=='0'){
        	//console.log(toStringify[key])
        	//console.log('' + toStringify[key])
          list[i] = `${key}=${toStringify[key]}`;
        } else {
          list[i] = `${key}`;
        }
      }
      result += '?' + list.join('&');
			//console.log(result)
    }
    return result;
    
  }

  buildHeaders(headers = {}, signHeaders) {
    return Object.assign({
      'X-Ca-Timestamp': Date.now(),
      'X-Ca-Key': this.appKey,
      'X-Ca-Nonce': uuid.v4(),
      //'X-Ca-Stage': this.stage,
      'Accept': 'application/json',
      
    }, headers, signHeaders);
  }

  getSignedHeadersString(signHeaders, headers) {
    var list = [];
    for (var i = 0; i < signHeaders.length; i++) {
      var key = signHeaders[i];
      list.push(key + ':' + headers[key]);
    }

    return list.join('\n');
  }

  async request(method, url, opts, originData) {
    
    var signHeaders = opts.signHeaders;
    // 小写化，合并之后的headers
    var headers = this.buildHeaders(opts.headers, signHeaders);

    var requestContentType = headers['content-type'] || '';
    // if (method === 'POST' && !requestContentType.startsWith(form)) {
    //   headers['content-md5'] = this.md5(opts.data);
    // }

    var signHeaderKeys = this.getSignHeaderKeys(headers, signHeaders);
    headers['X-Ca-Signature-headers'] = signHeaderKeys.join(',');
    var signedHeadersStr = this.getSignedHeadersString(signHeaderKeys, headers);

    var parsedUrl = parse(url, true);
    var stringToSign = this.buildStringToSign(method, headers, signedHeadersStr, parsedUrl, originData);
    headers['x-ca-signature'] = this.sign(stringToSign);
    //headers['user-agent'] = ua;

   

    return headers;

    
  }
}

module.exports = Client;
