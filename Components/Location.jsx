import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Cities } from './MetroContext';
const Location = React.memo(({ onDataReceive}) => {
    const City=useContext(Cities);
    let arr;
    switch(City){
        case 'hyderabad':
            arr=['Ameerpet','SR Nagar','ECIL','Erragdda'];
            break;
        case 'delhi':
            arr=['Muneerabad','Park','Hotel','RedFort'];
            break;
        case 'chennai':
            arr=['Thoraipakkam','Medavakkam','Anna Nagar','tiruvanmayur'];
            break;
        default:
            arr=[];
            break;
    }
  useEffect(() => {
    onDataReceive(arr);
  }, [City]);

  return (
    <>
      
    </>
  );
});

export default Location;
