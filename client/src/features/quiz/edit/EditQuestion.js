import { Outlet, useNavigate, useParams, Link } from "react-router-dom";
import { useGatAllquizzesQuery, useUpdateQuestionMutation } from "../quizzesApiSlice"
import { useEffect } from "react";

const EditQuestion = ({ quizId, id }) => {
  // const { id } = useParams()
  const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllquizzesQuery()
  const [updateQues, { isSuccess: isUpdateSuccess }] = useUpdateQuestionMutation()

  const navigate = useNavigate()
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/quizzes")
    }
  }, [isUpdateSuccess])
  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const quizObject = Object.fromEntries(data.entries())
    updateQues({ ...quizObject, isActive: quizObject.isActive == 'on' ? true : false, questions: quiz.questions })
  }


  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const quiz = quizzesObject.data.find(q => q._id === quizId)
  const ques = quiz.options?.filter(q => q._id == id)
  if (!quiz) return <h1>{"Not found"}</h1>
  return (
    <div>
      {ques && ( // Check if ques is defined
        <>
          <form onSubmit={formSubmit} className="single-quiz-form">
            <td>
              <div className="quizzes-list-company">
                <input
                  defaultValue={quiz.title}
                  type="text"
                  name="title"
                  placeholder="הכנס שם מבחן"
                />
              </div>
            </td>
            <td>
              {ques.createdAt?.toString().slice(0, 10)}
            </td>
            <td>{ques.options[0]?.title}</td>
            <td>{ques.options[1]?.title}</td>
            <td>{ques.options[2]?.title}</td>
            <td>
              <div className="quizzes-list-buttons">
                <Link to={`/dash/quizzes/${ques._id}`} className="quizzes-list-button quizzes-list-view">
                  צפייה
                </Link>
              </div>
            </td>
          </form>
        </>
      )}
    </div>
  );
}

export default EditQuestion;
