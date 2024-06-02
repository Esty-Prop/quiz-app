import { useNavigate, useParams } from "react-router-dom";
import { useGatAllUserquizzesQuery } from "../userQuizApiSlice"
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import EventNoteIcon from '@mui/icons-material/EventNote';
import './SingleActiveQuiz.css'
const SingleActiveQuiz = () => {
  const { id } = useParams()
  const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllUserquizzesQuery()

  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const quiz = quizzesObject.data.find(q => q._id === id)
  console.log(id);
  if (!quiz) return <h1>{"Not found"}</h1>
  return (
    <div>
      <h3 className="quizzes-title">quiz results</h3>
      <div className="quizzes-list">
        {/* <h2>Quizzes taken</h2> */}
       
        <div className="quizzes-list-top">
        <h3 className="quizzes-list-title">{quiz?.quiz?.title}</h3>
        <h4 className="quizzes-list-score"><CreditScoreIcon/>{`  score: ${quiz.score}`}</h4>
        <h4 className="quizzes-list-date"><EventNoteIcon/>{quiz.createdAt?.toString().slice(0, 10)}</h4>


        </div>
        <table className="quizzes-list-table">
          <thead>
            <tr>
              <td>question</td>
              <td>my answer</td>
              <td></td>

            </tr>
          </thead>
          <tbody>
            {Object.values(quiz?.answers).map(q => (
              <tr  key={q._id}>
                <td>
                  <div className="quizzes-list-company">
                    {q.ques}
                  </div>
                </td>
                {/* <td>
                  {q.createdAt?.toString().slice(0, 10)}
                </td> */}
                <td><div >{q.answer}</div></td>
                <td><div >{q.isCorrect ? <CheckIcon /> : <CloseIcon />}</div></td>

                <td>

                  <div className="quizzes-list-buttons">


                  </div>
                </td>



                {/* <EditQuestion id={quiz.questions[0]?._id} quizId={id} /> */}

              </tr>


            ))}
          </tbody>



        </table>
      </div>

    </div>
  )
}

export default SingleActiveQuiz