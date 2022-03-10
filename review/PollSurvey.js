import { PollOutlined, PollRounded, PollTwoTone } from '@material-ui/icons'
import React, { useState, useEffect } from 'react';
import commonService from "../../common/commonService";
import UserServices from "./StudyGroup/UserServices";
import Star from './StudyGroup/Star';
import Alert from "react-s-alert";









const PollSurvey = (props) => {
  const [osurvey, setOsurvey] = useState([]);
  const [ssurvey, setSsurvey] = useState([]);
  const [response, setResponse] = useState(" ");
  const [qid, setQid] = useState(0);
  // const [checked, setChecked] = useState(false);


  {/* <PollOutlined /> */ }
  {/* <PollTwoTone /> */ }
  {/* <PollRounded /> */ }

  // {props.currentUser}mmmmcourseid{props.courseid }


  function onValueChange(id, e) {
    setResponse(e.target.value);
    // alert(e.target.value)
    console.log("=========", e.target.value);
    console.log("=========", id);
    setQid(id);

  }





  const Showsurveydata = async () => {
    let obj = { "course_id": props.courseid }
    let formData = commonService.encrypt(obj);
    UserServices.surveyShow(formData).then(async (res) => {
      let response = commonService.decrypt(res.data)
      console.log("--------123---------------", response.getsurvey)
      console.log("---------1233--------------", response.starget)
      if (response.status === "success") {
        console.log("----question--------------", response.starget)
        let a = response.getsurvey;
        let b = response.starget;
        setOsurvey(a);
        setSsurvey(b);
      }
      else {
        Alert.warning("Some Error !")
      }

    }).catch((error) => {
      console.log("Error Message", error)
    })



  }
  const SubmitSurvey = (e) => {
    e.preventDefault();
    console.log("response ====", response);
    // write logic for submit option type
    let obj = {
      "user_id": props.currentUser,
      "question_id": qid,
      "feedback": response,
      "is_answer": true
    }

    //user_id
    // question_id
    // feedback 
    //is_answer
    // write logic for submit star
    //response
    //is_answer
    //qid_id
    // user_id



    let formData = commonService.encrypt(obj);
    UserServices.optionfeedback(formData).then(async (res) => {

      let response = commonService.decrypt(res.data)
      console.log("---------1233--------------", response)
      if (response.status === "success") {
        console.log("---------1233--------------", response)
        setResponse(" ");
        Alert.success("Response Submitted Successfully !")
        // setChecked(false);
        // document.getElementById('radiobtn').value =""
      }
      else {
        Alert.warning("Some Error !")
      }

    }).catch((error) => {
      console.log("Error Message", error)
    })
    // document.getElementById('radiobtn').value =""
    setResponse(" ");
  }




  useEffect(() => {
    Showsurveydata();
  }, [])



  return (
    <div className="col-sm-12">
      <div class="card mb-3 comment-card"></div>
      <div class="card mb-3 comment-card">
        <div class="card-header d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0">Survey form <PollRounded /></h6>
        </div>
        <div>

          {osurvey.map((cur) => {
            return (<>
              <form onSubmit={SubmitSurvey}>
                <p><b>Q. {cur.question}</b></p>
                {cur.option.map((o, j) => {
                  return (<>
                    <b>{j + 1}&nbsp;</b>
                    <label>
                      <input
                        id="radiobtn"
                        type="radio"
                        name="rating"
                        checked={(response == o.options) && (qid === cur.id)}
                        value={o.options}
                        onClick={(e) => onValueChange(cur.id, e)}
                      />
                      {o.options}
                    </label><br/>
                  </>);


                })}
                <input type="submit" value="Submit" />
                <input type="reset" value="Reset" />
              </form>

            </>)
          })}

          {ssurvey.map((cur) => {
            return (<>
              <p>Q.<b>{cur.question}{cur.id}{cur.response}</b></p>
              <br />
              <p>Maximum Rating --{cur.response} </p>
              <Star userid={props.currentUser} maxrating={cur.response} qid={cur.id} />

            </>)
          })}





        </div>
      </div>
    </div>
  )
}

export default PollSurvey;