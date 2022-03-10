import React from 'react';
import UserServices from './UserServices';
import Alert from 'react-s-alert';
import commonService from "../../../common/commonService";




// starsurveycreate

const Createstarsurvey = (props) => {
    
    const [questions, setQuestions] = React.useState("")
    const [rating,setRating] = React.useState("")



    const question_handler = (e) => {   setQuestions(e.target.value); console.log("===================",e.target.value) }
    const rating_handler = (e) =>{
        console.log("==============",e.target.value)
        setRating(e.target.value)
    }

    const FormSubmit = (e) => {
        e.preventDefault();
    
        let obj ={
            "question": questions,
            "response":rating,
            "course_id":props.courseid
         
        }
        let formData = commonService.encrypt(obj)
        UserServices.starsurveycreate(formData).then((res) => {
            console.log("=-=-=-=-=-.",res)
          let response = commonService.decrypt(res.data)
           if (response.status === "success") {
             Alert.success("Survey Created Successfully !")
           }
           else {
             Alert.warning("Some Error !")
           }
    
        }).catch((error) => {
          console.log("Error Message", error)
        })
    }   
    
    return (
        <div>


            <form onSubmit={FormSubmit}>
                <label style={{ width: '100%' }}>
                </label>
                <h4>
                    <textarea
                        placeholder="Enter your Question here . . ."
                        style={{
                            border: "none",
                            borderBottom: "2px solid black",
                            width: '100%',
                        }}
                        onChange={(e) => {question_handler(e)}}
                        value={questions}
                    />
                </h4>
                <input
                    className='form-control'
                    placeholder="Maximum rating Visible "
                    name="options"
                    onChange={(e) => {rating_handler(e)}}
                    value={rating}
                 
                />
                <input type="submit" className='websitebtn-assessment' value="Submit" />
    

            </form>



        </div>
    )
}

export default Createstarsurvey