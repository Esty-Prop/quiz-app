import { MdCheck } from "react-icons/md";
import { useAddQuestionMutation } from "../quizzesApiSlice"
import { useEffect } from "react"
import { useNavigate ,useParams} from "react-router-dom"
import './Add_Quiz.css'
const AddQuestion = () => {
    const { id } = useParams()
    const [addQuestion, { data, isError, error, isSuccess, isLoading }] = useAddQuestionMutation()
    const navigate = useNavigate()
  
    useEffect(() => {
      if (isSuccess) {
        navigate(`/dash/quizzes/${id}`)
      }
    }, [isSuccess, navigate])
    // const ques = 
    // {
    //     quizId: quizId,
    //     title:"questions 1111",
    //     options: [{title:"a",isCorrect:true},{title:"b"},{title:"c"}]
    // }
    const formSubmit = (e) => {
        e.preventDefault()
            const data = new FormData(e.target)
            const quizObject = Object.fromEntries(data.entries()) 
            console.log(quizObject);
            const ques =  {quizId: id,
            title:quizObject.title,
            options: [{title:quizObject.option1,isCorrect:false},{title:quizObject.option2,isCorrect:false},{title:quizObject.option3,isCorrect:false}]}

            ques.options[quizObject.isCorrect].isCorrect=true
                  console.log(ques);
            addQuestion(ques)
      }
    return (
        <div className="add-ques-container">    {/* <form onSubmit={formSubmit} className="single-que-form"> */}
            <form onSubmit={formSubmit} className="add-ques-form">

                {/* <input name="quizId" defaultValue={quizId} type="hidden" /> */}
                <input
                    type="text"
                    name="title"
                    placeholder="Enter question"
                    required={true}
                    /><br />
                <div className="add-ques-form-option">
                    <label className='question-lable'>#1 answer</label><br />
                    <input
                        type="text"
                        name="option1"
                        placeholder="Enter answer"
                        required={true}
                    />
                    <input
                        id='option1'
                        type="radio"
                        name="isCorrect"
                        value="0" // Set the value to "true"
                        defaultChecked // Set the defaultChecked attribute to make it checked by default
                        required

                    ></input>
                    <label className='radio-label' htmlFor='option1'><MdCheck/>תשובה נכונה</label>
                </div>
                <div className="add-ques-form-option">
                    <label className='question-lable'> #2 answer</label><br />
                    <input
                        type="text"
                        name="option2"
                        placeholder="Enter answer"
                        required={true}

                    />

                    <input
                        id='option2'
                        type="radio"
                        name="isCorrect"
                        value="1" // Set the value to "true"
                        required
                    ></input>
                    <label className='radio-label' htmlFor='option2'><MdCheck/>תשובה נכונה </label>
                </div>
                <div className="add-ques-form-option">
                    <label className='question-lable'> #3 answer</label><br />
                    <input
                        type="text"
                        name="option3"
                        placeholder="Enter answer"
                        required={true}
                    />

                    <input
                        id='option3'
                        type="radio"
                        name="isCorrect"
                                                value="2" // Set the value to "true"
                        required
                    ></input>
                    <label className='radio-label' htmlFor='option3'><MdCheck/>תשובה נכונה </label>
                </div>

                <button>Add new question</button>
            </form>
        </div>
    )
}

export default AddQuestion