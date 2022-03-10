import React, { useState } from 'react';

import UserServices from './UserServices';
import Alert from 'react-s-alert';
import commonService from "../../../common/commonService";
// import "../App.css";

import { FaStar } from "react-icons/fa";
// import { hover } from '@testing-library/user-event/dist/hover';


const Star = (props) => {

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const max = props.maxrating;







// WOP

  const SubmitSurvey = (e) => {
    e.preventDefault();
    // console.log("response ====", response);
  //   // write logic for submit option type
    let obj = {
      "userid_id": props.userid,
      "qid_id": props.qid,
      "response": rating,
      "is_answer": true
    }
    let formData = commonService.encrypt(obj);
    UserServices.starsurveysubmit(formData).then(async (res) => {
      let response = commonService.decrypt(res.data)  
      if (response.status === "success") {
        Alert.success("Response Submitted Successfully !")
      }
      else {
        Alert.warning("Some Error !")
      }
    }).catch((error) => {
      console.log("Error Message", error)
    })
  setRating(null);
  }
  // WOP

  return (
    <div><h1>m{max}</h1>
    <form onSubmit={SubmitSurvey}>
      {[...Array(5)].map((star, i) => {
      const ratingValue = i + 1;
      return (<>

        <label>
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            style={ {display: "none"}}

            onClick={() => setRating(ratingValue)}
          />
          <FaStar
            color={ratingValue <= (hover || rating) ? "ffc107" : "#e4e5e9"}
            size={30}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
    
      </>);
      
    })}
    <input type="submit" />
    <input type="reset" onClick={() =>setRating(null)}/>
    </form>

      Star Rating in React js   {rating}
      <p>props=={props.userid}..maxx..{props.maxrating}=uid{props.qid}</p>
    </div>
  )
}

export default Star;