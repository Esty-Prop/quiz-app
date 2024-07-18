import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useAddAnswersMutation } from "../userQuizApiSlice"
import { useEffect, useState } from "react"
import { BadgeRoot, Button, CircularProgress } from '@mui/material';
import { Card, Typography } from '@mui/material';
import Confetti from 'react-dom-confetti';

import "./QuizFeedback.css"

const QuizFeedback = ({ values }) => {
  const [isExploding, setIsExploding] = useState(false);
  const [addAnswers, { data: UserQuizObject, isError, error, isSuccess, isLoading }] = useAddAnswersMutation();
  const { id } = useParams();
  let a = false;
  const config = {
    angle: 190,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 8000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "700px",
    colors: ["#000", "#f00"]
  };
  
  useEffect(() => {
    if (isSuccess) {
      console.log(UserQuizObject);
    }
  }, [isSuccess, UserQuizObject]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExploding(true);
    }, 1000); // Trigger explosion after 3 seconds

    return () => clearTimeout(timer); // Cleanup function to clear timeout if component unmounts
  }, []);

  useEffect(() => {
    if (id && !a) {
      a = true;
      console.log('add answers');
      addAnswers({ answers: values, userQuizId: id });
    }
  }, [id]);

  if (isLoading) return (
    <CircularProgress
      size={68}
      sx={{
        position: 'absolute',
        top: '40vh',
        left: '48vw',
        zIndex: 1,
      }}
    />
  );
  
  if (isError) return <h1>Error: {isError.message}</h1>;

  if (!UserQuizObject) return <h1>{"Not found"}</h1>;

  return (
    <div className="quiz-feedback">
            <Confetti active={isExploding} config={config} />

      <Typography fontFamily={"Montserrat"} variant="h2">{`${UserQuizObject.data.updateQuis.score}% score`}</Typography>
      <Link style={{color:"blue"}} to={'/dash/userQuizzes'}>exit</Link>
    </div>
  );
}

export default QuizFeedback;
