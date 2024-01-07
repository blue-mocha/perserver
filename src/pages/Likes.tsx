
import React, {useEffect, useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {GET_LIKES, DELETE_LIKE} from '../apollo/Query/user_like';
import { Login_info } from '../utils/IsLogin';

function Likes(){
    //목록 리스트
    const {data} = useQuery(GET_LIKES); 
    const [Items, setItems] = useState<Array<object>>(data?.GetLikes); 

     useEffect(()=>
        setItems(data?.GetLikes),[data])//첫 렌더링, 삭제후 업데이트

     //console.log(data?.GetLikes)

    //목록삭제 
    const [DeleteLike] = useMutation(DELETE_LIKE);
    const Delete = async(e: React.MouseEvent<HTMLElement>) =>{

           DeleteLike({ 
           "variables": { 
              "userId" : `${Login_info()}`,
              "seq" : `${JSON.parse((e.target as HTMLInputElement).value).seq}`,
           },      
           refetchQueries : [{query : GET_LIKES}],
          });   
    }

    //이스케이프
    function unescapeHTML(escapedHTML : any) {
        return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    }
     
    return(
        <div style={{width : '100%'}}>
        <h2>즐겨찾기 목록</h2>
            
        <button onClick={()=>setItems(data.GetLikes)}>선택순</button>
        <button onClick={()=> setItems([...Items].sort(function(a : any , b : any){
                  return b.startDate - a.startDate; }))}>최근순</button>
        <button onClick={()=> setItems([...Items].sort(function(a : any , b : any){
                   return a.startDate - b.startDate; }))}>오래된순</button>   

        {!Items && <p>목록이 비어있습니다.</p>}
    
        {Items && Items.map((item : any, index : number)=>(
          <div>
          

          <table>
            <tbody>
                   
            <tr key={index}>

                <td width="6%">
                    <button type="button" onClick={Delete} value={JSON.stringify(item)}>삭제</button>
                </td>

                <td width="15%">
                    <img src ={item.thumbnail} style={{width : "100%"}}/>
                </td>

                <td width="80%">
                    <tr>
                        <td><b>{unescapeHTML(item.title)}</b>
                        
                        </td>
                    </tr>
                    <tr> <td>기간 : {item.startDate}~{item.endDate}</td></tr>
                    <tr> <td>장소 : {item.place}</td></tr>
                </td>

            </tr> 
            </tbody>
          </table>

          </div> 
        ))}
        
        </div>

    )
}

export default Likes;