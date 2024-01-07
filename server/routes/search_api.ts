import express from "express";
import request from 'request';
const router = express.Router();
const converter = require('xml-js');

import 'dotenv/config'
const serviceKey : any = process.env.serviceKey; 

router.post('/', function(req, response){

    const url = 'http://www.culture.go.kr/openapi/rest/publicperformancedisplays/area';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${serviceKey}`; /* Service Key*/
    //queryParams += '&' + encodeURIComponent('ComMsgHeader') + '=' + encodeURIComponent(''); /* */
    //queryParams += '&' + encodeURIComponent('RequestTime') + '=' + encodeURIComponent('20100810:23003422'); /* */
    //queryParams += '&' + encodeURIComponent('CallBackURI') + '=' + encodeURIComponent(''); /* */
    //queryParams += '&' + encodeURIComponent('MsgBody') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('sido') + '=' + encodeURIComponent(req.body.sido ); /* */
    queryParams += '&' + encodeURIComponent('gugun') + '=' + encodeURIComponent(req.body.gugun); /* */
    queryParams += '&' + encodeURIComponent('from') + '=' + encodeURIComponent(req.body.from); /* */
    queryParams += '&' + encodeURIComponent('to') + '=' + encodeURIComponent(req.body.to); /* */
    queryParams += '&' + encodeURIComponent('place') + '=' + encodeURIComponent('1'); /* */
    //queryParams += '&' + encodeURIComponent('gpsxfrom') + '=' + encodeURIComponent('129.101'); /* */
    //queryParams += '&' + encodeURIComponent('gpsyfrom') + '=' + encodeURIComponent('35.142'); /* */
    //queryParams += '&' + encodeURIComponent('gpsxto') + '=' + encodeURIComponent('129.101'); /* */
    //queryParams += '&' + encodeURIComponent('gpsyto') + '=' + encodeURIComponent('35.142'); /* */
    queryParams += '&' + encodeURIComponent('cPage') + '=' + encodeURIComponent('1'); /* 현재페이지(필수) */
    queryParams += '&' + encodeURIComponent('rows') + '=' + encodeURIComponent('15'); /* 페이지당 ROW수 (필수) */
    queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(req.body.keyword); /* */
    //queryParams += '&' + encodeURIComponent('sortStdr') + '=' + encodeURIComponent('1'); /* */


    request({
        url: url + queryParams,
        method: 'GET'
        }, async function(error, res, body : any[]) {
            if(error) return console.log(error); 
            if(body){ 
            let xmlToJson = await converter.xml2json(body, {compact: true, spaces: 4});
    
            const data_json = (JSON.parse(xmlToJson));
            const result = data_json.response.msgBody.perforList;

                if(result){
                    //console.log(result)

                    if(result.length === undefined){ //object : 데이터 값이 하나인경우.
                        response.json([result]);
                    }else{
                        response.json(result);
                    }

                }else{
                  response.json(null);
                }
            }
        });     
        
});

module.exports = router;