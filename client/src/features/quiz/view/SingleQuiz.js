import { useNavigate, useParams } from "react-router-dom";
import './Single_Quiz.css'
import {useGatAllquizzesQuery , useUpdateQuizMutation} from "../quizzesApiSlice"
import { useEffect } from "react";
const SingleQuiz = () => {
  const {id} = useParams()
  const  {data: quizzesObject, isError, error, isLoading, isSuccess} = useGatAllquizzesQuery()
  const [updateQuiz, {isSuccess: isUpdateSuccess}] = useUpdateQuizMutation()
  const navigate = useNavigate()
  useEffect(()=>{
    if(isUpdateSuccess){
      navigate("/dash/quizzes")
    }
  }, [isUpdateSuccess])
  const formSubmit = (e) =>{
      e.preventDefault()
      const data = new FormData(e.target)
      const quizObject =Object.fromEntries(data.entries())
      updateQuiz(quizObject)

  } 


  if(isLoading) return <h1> Loading ...</h1>
  if(isError) return <h1>{ JSON.stringify( error)}</h1>
  const quiz = quizzesObject.data.find(q => q._id === id)
  console.log(id);
  if(!quiz) return <h1>{ "Not found"}</h1>

  return (
    <div className="add-qus-container">
    <div className="single-quiz-container">
      <div className="single-quiz-info">
        <div className="single-quiz-img-container">
          <img src={quiz.image || "/noavatar.png"} />
        </div>
        {quiz.title}
      </div>
      <div className="single-comapny-form-container">
        <form onSubmit={formSubmit} className="single-quiz-form">
          <input name="_id" defaultValue={quiz._id} type="hidden" />
          <label>שם מבחן</label>
          <input
            defaultValue={quiz.name}
            type="text"
            name="name"
            placeholder="הכנס שם מבחן"
          />
          <label>סוג המבחן</label>
          <label>פעיל </label>
          <select name="active" id="active">
            <option selected={!quiz.active} value={false}>
              לא פעיל{" "}
            </option>
            <option selected={quiz.active} value={true}>
              פעיל{" "}
            </option>
          </select>
          <button>עדכן</button>
        </form>
      </div>
      
      </div>
      <button>add questions</button>
    </div>
  );
};

export default SingleQuiz;
