const request = require('request');
import 'dotenv/config'
const serviceKey : any = process.env.serviceKey; 
const converter = require('xml-js');
//const GraphQLJSON = require('graphql-type-json');
//const fetch = require("node-fetch");

const resolvers = {
  Query: {
    GetSearch : async(root : any, {input} : any)=> {     
      
    const url = 'http://www.culture.go.kr/openapi/rest/publicperformancedisplays/area';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${serviceKey}`; /* Service Key*/
    //queryParams += '&' + encodeURIComponent('ComMsgHeader') + '=' + encodeURIComponent(''); /* */
    //queryParams += '&' + encodeURIComponent('RequestTime') + '=' + encodeURIComponent('20100810:23003422'); /* */
    //queryParams += '&' + encodeURIComponent('CallBackURI') + '=' + encodeURIComponent(''); /* */
    //queryParams += '&' + encodeURIComponent('MsgBody') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('sido') + '=' + encodeURIComponent(input.sido); /* */
    queryParams += '&' + encodeURIComponent('gugun') + '=' + encodeURIComponent(input.gugun); /* */
    queryParams += '&' + encodeURIComponent('from') + '=' + encodeURIComponent(input.from); /* */
    queryParams += '&' + encodeURIComponent('to') + '=' + encodeURIComponent(input.to); /* */
    queryParams += '&' + encodeURIComponent('place') + '=' + encodeURIComponent('1'); /* */
    //queryParams += '&' + encodeURIComponent('gpsxfrom') + '=' + encodeURIComponent('129.101'); /* */
    //queryParams += '&' + encodeURIComponent('gpsyfrom') + '=' + encodeURIComponent('35.142'); /* */
    //queryParams += '&' + encodeURIComponent('gpsxto') + '=' + encodeURIComponent('129.101'); /* */
    //queryParams += '&' + encodeURIComponent('gpsyto') + '=' + encodeURIComponent('35.142'); /* */
    queryParams += '&' + encodeURIComponent('cPage') + '=' + encodeURIComponent('1'); /* 현재페이지(필수) */
    queryParams += '&' + encodeURIComponent('rows') + '=' + encodeURIComponent('15'); /* 페이지당 ROW수 (필수) */
    queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(input.keyword); /* */
    //queryParams += '&' + encodeURIComponent('sortStdr') + '=' + encodeURIComponent('1'); /* */
    

    //내부함수값 외부함수로 빼내기 (promise, resolve 활용)
    function getResult(url : any){
      return new Promise(resolve=>{
        request(url, async function(err: any, res : any , body : any){
          if(err) {return console.log(err)}
          if(res){ 
            let xmlToJson = await converter.xml2json(body, {compact: true, spaces: 4});
            const data_json = (JSON.parse(xmlToJson));
            const json = data_json.response.msgBody.perforList;
            resolve(json) //내보낼 value값. 
          }	
       });
      })
    }
    
    const result = await getResult(url + queryParams); //정의한 함수 불러오기.
    return result; 
    
    },
   }};
 
   export default resolvers;