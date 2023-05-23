import { useEffect, useState } from "react";
import BaseUrl from "../Api/Baseurl";
const Notification = ({setFlag}) => {
    const[notification,setNotification]=useState([])
    useEffect(()=>{
        const email=sessionStorage.getItem("email")
        const token=sessionStorage.getItem("accessToken")
        fetch(`http://localhost:8081/api/notification/email/aman.ranjan@accolitedigital.com`,{
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res)=>{
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
          }).then((data)=>{
            if(data){
                setFlag(true)
            }
            setNotification(data)
          })
    },[])
    
    return ( <>
    <div className="notification-cards">
        {
            notification && notification.map((n)=>
            
            <div className="notification-card"><p>{n.message}</p></div>
            )
        }
                       
                        
                      </div></> );
}
 
export default Notification;