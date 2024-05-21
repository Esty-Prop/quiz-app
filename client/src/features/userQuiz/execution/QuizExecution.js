import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGatAllUserquizzesQuery } from "../userQuizApiSlice";
import { useGetAnsMutation } from "../../quiz/quizzesApiSlice";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { FormControlLabel, RadioGroup, Radio, Typography, Button, Paper, MobileStepper, Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import QuizFeedback from "./QuizFeedback";
import useAuth from "../../../hooks/useAuth";
import { CircularProgress, Card, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './QuizExecution.css'

const QuizExecution = () => {
    const { id } = useParams();
    const { firstName } = useAuth();
    const [values, setValues] = useState([]);
    const { data: UserQuizObject, isError, isLoading, isSuccess } = useGatAllUserquizzesQuery();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showCorrect, setShowCorrect] = useState(false);

    const handleOptionSelect = (option) => {
        if (option === ans[currentQuestionIndex]) {
            setScore(score + 1);
            setShowCorrect(true);
        }
        setSelectedOption(option);
        setValues([...values, option]);


    };

    const checkAnswer = () => {
        setSelectedOption('');
        // Move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowCorrect(false);
    };


    if (isLoading) return <CircularProgress
        size={68}
        sx={{
            position: 'absolute',
            top: '40vh',
            left: '48vw',
            zIndex: 1,
        }} />
    if (isError) return <h1>Error: {isError.message}</h1>;
    const userQuiz = UserQuizObject.data.find(q => q._id === id);

    if (!userQuiz) return <h1>{"Not found"}</h1>;
    const quiz = userQuiz.quiz
    const ans = quiz?.questions?.map(q => {
        const a = q.options.find(o => (o.isCorrect))
        console.log(a);
        return a.title
    })

    return (

        <div className="quiz">
            <div className="quiz-container">
<h3 className="quiz-name">                {quiz.title}
</h3>
                {currentQuestionIndex < quiz.questions.length ? (
                    <div className="question-container">
                        <h6 className="question-number">Question {currentQuestionIndex + 1}</h6>
                        <h3 className="question-txt">{`${quiz.questions[currentQuestionIndex].title}?`}</h3>
                        <div className="options-container">
                            <ul className="options-list">
                                {quiz?.questions[currentQuestionIndex]?.options.map((option, index) => (
                                    <li key={index} className="option-item">
                                        <label className={selectedOption === option.title ? (showCorrect ? "option-label correct" : "option-label notCorrect") : "option-label"}>
                                            <input
                                                type="radio"
                                                name="option"
                                                value={option.title}
                                                checked={selectedOption === option.title}
                                                onChange={() => handleOptionSelect(option.title)}
                                                disabled={selectedOption != ""}
                                            />
                                            {option.title}
                                            <div className="option-icons is-correct">
                                                <CheckIcon />
                                            </div>
                                            <div className="option-icons not-correct ">
                                                <CloseIcon />
                                            </div>
                                        </label>

                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="select-option">   <button className="check-btn" onClick={checkAnswer} disabled={selectedOption === ""}>Next <ArrowForwardIosIcon/></button>

                        </div>

                    </div>
                ) : (
                    <div className="quiz-completed">
                        <h2>Quiz Completed!</h2>
                        <p className="final-score">Your Score: {score} out of {quiz.questions.length}</p>
                        <QuizFeedback values={values} />
                    </div>
                )}
            </div>

        </div>
    );
};

export default QuizExecution;
