import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useAddAnswersMutation } from "../userQuizApiSlice"
import { useEffect } from "react"
import { BadgeRoot, CircularProgress } from '@mui/material';
import {  Card ,Typography} from '@mui/material';

const QuizFeedback = ({ values }) => {
  const [addAnswers, { data: UserQuizObject, isError, error, isSuccess, isLoading }] = useAddAnswersMutation()
  const { id } = useParams();
  let a = false;
  useEffect(() => {
    if (isSuccess) {
      console.log(UserQuizObject);
    }
  }, [isSuccess, UserQuizObject])
  useEffect(() => {
    if (id && !a) {
      a = true
      console.log('add answers');
      addAnswers({ answers: values, userQuizId: id })
    }
  }, [id])

  if (isLoading) return <CircularProgress
    size={68}
    sx={{
      position: 'absolute',
      top: '40vh',
      left: '48vw',
      zIndex: 1,
    }}
  />;
  if (isError) return <h1>Error: {isError.message}</h1>;
  // const quiz = quizzesObject.data.find(q => q._id === id);
  if (!UserQuizObject) return <h1>{"Not found"}</h1>;
  return (
    <div className="quiz-feedback">
      {/* <ul>
        {values.map((v) => (<li>{v}</li>))}
      </ul> */}
      
      <h1>{`${UserQuizObject.data.updateQuis.score}% score`}</h1>
      <Link to={'/dash/userQuizzes'}>exit</Link>
    </div>
  )
}

export default QuizFeedback