import { useEffect, useState } from "react";

const Room = (props) => {
    const[rooms,setRooms]=useState([])
    useEffect(() => {
        const header = "Bearer " + sessionStorage.getItem("accessToken");
        fetch(`http://localhost:8081/api/room/location/${props.locationId}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: header,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            setRooms(data)
          })
          .catch((error) => {
            console.log(error)
          });
      }, [props.locationId]);
      
    return ( <>
    <select
          className="drop-select"
          name="select"
          id="select"
          value={props.roomId}
            onChange={(e) => props.setRoomId(e.target.value)}
        >
        <option value={props.roomId} selected disabled hidden>
            Select a Room
          </option>
        
          {rooms &&
            rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
        </select>
    </> );
}
 
export default Room;