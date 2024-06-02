import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material"
import { useGatAllActivequizzesQuery } from "../../quiz/quizzesApiSlice"
import { useAddUserQuizMutation, useGetAllUserQuizByUserMutation } from "../userQuizApiSlice";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; import './ActiveQuizList.css'
const ActiveQuizList = () => {
    const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllActivequizzesQuery()
    const [addUserQuiz, { data: newUserQuizObject, isSuccess: isAddUserQuizSuccess }] = useAddUserQuizMutation();
    const [getQuizzesByUser, { data: UserQuizzesObject, isSuccess: isGetAllUserQuizSuccess, isLoading: isLoadingUser, isError: isErrorUser }] = useGetAllUserQuizByUserMutation();

    // const [quizId,setQuizId] = useState(null)
    const { _id } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        if (isAddUserQuizSuccess) {
            console.log(newUserQuizObject);
            navigate(`/dash/userQuizzes/${newUserQuizObject.data.userQuiz._id}`)
        }
    }, [isAddUserQuizSuccess])
    useEffect(() => {
        if (_id) {
            getQuizzesByUser({ userId: _id })
        }
    }, [_id])
    const startQuiz = (id) => {
        addUserQuiz({ quiz: id, user: _id });
    }
    if (isLoading || isLoadingUser) return <h1> Loading ...</h1>
    if (isError || isErrorUser) return <h1>lllll</h1>
    return (
        <div className="active-quizzes-list">
            <div className="quiz-todo">
            <h3 className="quiz-title">quiz completed</h3>
                {quizzesObject.data?.map(quiz => {
                    if (!UserQuizzesObject?.data.find(e => (e.quiz?._id === quiz?._id))) {
                        return <div className="active-quizzes-item">
                            <h3> {quiz.title}</h3>
                            <button className="btn-start-quiz" onClick={() => { startQuiz(quiz._id) }} >start Quiz</button>
                        </div>
                    }

                })}
            </div>

            <div className="quiz-completed">
            <h3 className="quiz-title">quiz completed</h3>

                {UserQuizzesObject?.data.map(quiz => (<div className="active-quizzes-item-completed">
                    <div className="quiz-title">
                        <QuizOutlinedIcon />

                        <h3> {`${quiz?.quiz?.title}`}</h3>
                    </div>
                    <div className="quiz-score">
                        <EmojiEventsOutlinedIcon />
                        {`${quiz?.score}`}
                    </div>
                    <div className="quiz-view">
                        <Link to={`/dash/userQuizzes/view/${quiz._id}`} className=" complate-quizzes-list-view">
                            <RemoveRedEyeIcon />                                    </Link>

                    </div>

                </div>))}
            </div>
        </div>
    )
}

export default ActiveQuizList