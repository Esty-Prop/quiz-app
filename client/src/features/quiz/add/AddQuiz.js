import "./Add_Quiz.css"
import { useAddQuizMutation } from "../quizzesApiSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const AddQuiz = () => {
  const [addQuiz, { data, isError, error, isSuccess, isLoading }] = useAddQuizMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/quizzes")
    }
  }, [isSuccess, navigate])

  const formSubmit = (e) => {
    e.preventDefault()
        const data = new FormData(e.target)
        const quizObject = Object.fromEntries(data.entries()) 
        console.log(quizObject);      
        addQuiz( quizObject)
  }

  return (
    <div className="add-quiz-container">
      <form onSubmit={formSubmit} className="add-quiz-form">
        <input
          type="text"
          name="title"
          placeholder=" quiz title "
        />
        <button type="submit">new quiz</button>
      </form>
    </div>
  )
}

export default AddQuiz
