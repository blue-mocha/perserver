import React, {useState} from 'react';
//import axios from 'axios'; 
import {useMutation, useLazyQuery} from "@apollo/client";
import {ADD_LIKE , GET_LIKES} from '../apollo/Query/user_like';
import { GET_SEARCH } from '../apollo/Query/search';
import CategoryChange from '../utils/guguns';
import { IsLogin } from '../utils/IsLogin';

interface search_types{
  sidos : string[],
  Data : Array<object>,
}

function Search<search_types>() {
  const URL = process.env.REACT_APP_SERVER_URL;
  const [GetSearch, {loading : loading_S, data : data_S, error : error_S}] = useLazyQuery(GET_SEARCH);
  const [AddLike, {data :data_like, error : error_L}] = useMutation(ADD_LIKE, { //좋아요 추가
          
    onError : (error) => {
        if(JSON.stringify(error)?.includes("dup key: { seq:")){
          alert('이미 선택한 항목입니다.')
        }else{ 
          alert('전송실패')
        }
    }
  }); 

  if(data_like){alert('즐겨찾기에 포함되었습니다.')}

  const [info, setInfo] = useState({
    sido : "",
    gugun: "",
    from : "",
    to : "",
    keyword : ""
  });



  const [Data, setData] = useState([]); //검색결과 
  const sidos = [
    '시/도선택','강원','경기','경남','경북','광주','대구','대전','부산',
    '서울','울산','인천','전남','전북','제주','충남','충북'];


  //검색정보 
    const {sido, gugun, from, to, keyword} = info; 
    const onChange = (e: any)=>{
      const { name, value }  = e.target;

     setInfo({
      ...info, 
      [name] : value
     })
  
    }

  //지역명_처리함수(: sido)
  function sido_name(){
    if(sido === "" || sido === "0"){
      return "";  
    }else{
      return sidos[Number(sido)];
    }
  }
  
  //(: gugun)
   function gugun_name(){
    if(sido === "" || sido === "0"){
      return "";  
    }else{
      return gugun;
    }
   }

  //검색실행 -----------------------------------*/
  const search_api = ()=>{

      if(from !== "" && to !== ""){

          GetSearch({
            "variables" : {
              "input": {
                "sido" : sido_name(),
                "gugun" : gugun_name(),
                "from" :  from.toLocaleString().replace(/\-/g, ""),
                "to" :  to.toLocaleString().replace(/\-/g, ""),
                "keyword" : keyword,
               }
            },
          })

      }else{
        alert('기간을 선택해주세요.');
      }
    };

  //좋아요버튼(Add_like)-----------------------------------*/
  const Like_Handeler = async(e: React.MouseEvent<HTMLElement>) =>{
    
    if(IsLogin() === true){
      let Item = await JSON.parse((e.target as HTMLInputElement).value); 
   
      AddLike({ 
       "variables": { 
        "input": {
          "seq" : `${Item.seq._text}`,
          "title" : `${Item.title._text}`, 
          "startDate" : `${Item.startDate._text}`,
          "endDate" : `${Item.endDate._text}`,
          "place" : `${Item.place._text}`,
          "thumbnail" : `${Item.thumbnail._text}`,
         }
       },      
        refetchQueries : [{query : GET_LIKES}],
      });   
      
    }else{
      alert('로그인이 필요한 서비스입니다.')
    }
  
  }
  
  //이스케이프
  function unescapeHTML(escapedHTML : any) {
    return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
   }
   

  return (
      <>
      <h2>공연전시검색</h2> 

       <table>
       <tbody>
        <tr>
          <td>
            지역선택 : <select name= "sido" onChange={onChange}>
            {sidos.map((sido, index) => (
                <option key={index} value={index}>{sido}</option>
              ))
            }
          </select>

          <select name="gugun" onChange={onChange}>
            {CategoryChange(Number(sido)).map((gugun, index) => (
                <option key={index} value={gugun}>{gugun}</option>
              ))
            }
          </select>

          </td> 
        </tr>

        <tr>
          <td>기간선택 : <input name="from" type="date" onChange={onChange}></input>
            <span>~</span>
            <input name="to" type="date" min={from} onChange={onChange}></input>
            <span>(필수선택)</span>
          </td> 
        </tr>

        <tr>
          <td>
            키워드 : <input name="keyword" type="text" onChange={onChange}/>
            <button onClick={search_api}>검색</button>
          </td>        
        </tr>
        </tbody>
       </table>       
   
      <div style={{width : '100%'}}>
          {loading_S && <p>loading...</p>}
          {!data_S && !loading_S && <p>검색결과가 없습니다.</p>} 
          {data_S && data_S.GetSearch === null && <p>검색결과가 없습니다.</p>} 
          {data_S && data_S.GetSearch !== null && data_S.GetSearch.map((item : any , index : number)=>(
            <div>
              <table>
               <tbody>
                  <tr key={index}>

                  <td width="20%">
                    <img src ={item.thumbnail._text} style={{width : "100%"}}/>
                  </td>
                  
                  <td width="80%">
                    <tr>
                      <td><b>{unescapeHTML(item.title._text)}</b>
                      </td>
                    </tr>
                    <tr><td>기간 : {item.startDate._text}~{item.endDate._text}</td></tr>
                  <tr><td>장소 : {item.place._text}</td></tr>
                  <tr><td> <button type="button" onClick={Like_Handeler} value={JSON.stringify(item)}>즐겨찾기</button></td></tr>
                  </td>

                  </tr> 
              </tbody>
            </table>
          </div> 
          ))}            
       
      </div>
    </>  
    );
}
  
export default Search;


  