import { useState } from "react";

const AddSeatPopUp = ({onHandleAdd, onHandleCancel}) =>{
    const [name, setName] = useState("");

    return(
        <>
            <h3>Add new seat</h3>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            <button onClick={()=>{onHandleAdd(name)}}>Add</button>
            <button onClick={()=>{onHandleCancel()}}>Cancel</button>
        </>
    );
}

export default AddSeatPopUp;