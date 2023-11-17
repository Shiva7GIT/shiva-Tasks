import React, { useState } from "react";
import Ticket from "./Ticket";
import Locationselect from "./Locationselect";
import Location from "./Location";
const Places=()=>{
  const [fromloc,setFromloc]=useState();
  const [toloc,setToloc]=useState();

  const [receivedArray, setReceivedArray] = useState([]);
  const handleDataReceive = (newArray) => {
    setReceivedArray(newArray);
  };

  const handleFromChange = ( value) => {
    setFromloc(value);
  };
  const handleToChange = ( value) => {
    setToloc(value);
  };
return(
    <>
    <Location onDataReceive={handleDataReceive} />

    <h3>From:</h3><Locationselect names={receivedArray}  onSelectionChange={handleFromChange} /><br></br>
    
    <h3>To:</h3> <Locationselect  names={receivedArray} onSelectionChange={handleToChange} /><br />

    <Ticket fromloc={fromloc} toloc={toloc}/>
   
    </>
)

}
export default Places;