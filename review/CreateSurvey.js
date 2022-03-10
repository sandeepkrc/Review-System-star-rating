import React from 'react';
import UserServices from './UserServices';
import Alert from 'react-s-alert';
import commonService from "../../../common/commonService";




const CreateSurvey = (props) => {
    const [questions, setQuestions] = React.useState("")
    const [survey,setSurvey] = React.useState(props.survey);
    const [data, setData] = React.useState([
        {
            options: "GOOD "
        }
    ])




    const Handleadd = () => { setData([...data, { options: "" }]) }
    const Handleremove = (index) => {
        const rows =  [...data];
        rows.splice(index, 1);
        setData(rows);
    }
    const questionHandler = (e) => { setQuestions(e.target.value) }

    const Changehandler = (e, index) => {
        const tempData = data;
        tempData[index][e.target.name] = e.target.value;
        setData(tempData)
    }
    const resetfield = () => {
        setData([{ options: "GOOD 😃" }]);
        setQuestions("");
        console.log("clear===", data)
        console.log("kh", questions)
    }

    const FormSubmit = (e) => {
        e.preventDefault();
        let obj ={
            'oraganization_id':props.orgid,
            "course_id":props.courseid,
            "question": questions,
            "option":data

        }
        let formData = commonService.encrypt(obj)
        UserServices.SurveyAdd(formData).then((res) => {
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
     setSurvey(false);


  
        // resetfield();
    }



    return (
        <div>
            <div className='container my-5'>
                <form onSubmit={FormSubmit}>
                    <label style={{ width: '100%' }}>
                    </label>
                    <h4>
                        <textarea
                            onChange={(e) => questionHandler(e)}
                            placeholder="Enter your Question here . . ."
                            style={{
                                border: "none",
                                borderBottom: "2px solid black",
                                width: '100%',
                            }}
                            required
                            value={questions}
                        />
                    </h4>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) =>
                                <tr key={index}>
                                    <td>
                                        <input
                                            className='form-control'
                                            defaultValue={item.options}
                                            onChange={(e) => { Changehandler(e, index) }}
                                            name="options"
                                        />
                                        
                                    </td>
                                    <td>
                                    {/* className="websitebtn-assessment"   className='btn btn-danger' */}
                                        {index ?( <>
                                         <button type="button" className="btn action-button-delete ml-2"  onClick={() => Handleremove(index) } ><i className='fas fa-trash-alt'></i></button>
                                         
                                        </>    ):null}
                                    </td>
                                    
                                   
                                </tr>


                                
                            )}

                            <tr>
                                <td>
                                    {/* <button className='btn btn-success' onClick={Handleadd}>Add</button> */}
                                    <button type="button" className="websitebtn-assessment"  onClick={Handleadd}><i className='fas fa-plus'></i>Add</button>
                                </td>
                            </tr>

                            <tr >
                                <td>
                                    {/* <button className='btn btn-primary' onClick={FormSubmit}>SUBMIT</button> */}
                                    <input type="submit" className="websitebtn-assessment" value="Submit" />
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </form>
                
            </div>


        </div>
    )
}

export default CreateSurvey;