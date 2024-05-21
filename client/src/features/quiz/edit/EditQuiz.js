import { Outlet, useNavigate, useParams } from "react-router-dom";
import './Edit_Quiz.css'
import { useGatAllquizzesQuery, useUpdateQuizMutation } from "../quizzesApiSlice"
import { useEffect } from "react";
import AddQuestion from "../add/AddQuestion";
import QuestionList from "../list/QuestionList";
const EditQuiz = () => {
    const { id } = useParams()
    const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllquizzesQuery()
    const [updateQuiz, { isSuccess: isUpdateSuccess }] = useUpdateQuizMutation()

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
        updateQuiz({ ...quizObject, isActive: quizObject.isActive == 'on' ? true : false, questions: quiz.questions })
    }


    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const quiz = quizzesObject.data.find(q => q._id === id)
    if (!quiz) return <h1>{"Not found"}</h1>

    return (
        <div className="add-single-quiz-container">
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
                        <input
                            defaultValue={quiz.title}
                            type="text"
                            name="title"
                            placeholder="הכנס שם מבחן"
                        />
                        <input type="checkbox"
                            name="isActive"
                            defaultChecked={quiz.isActive}
                        ></input>
                        <button>עדכן</button>
                    </form>
                </div>
            </div>
            <div className="single-quiz-container">
                {/* <div className="single-quiz-info">
                    <div className="single-quiz-img-container">
                        <img src={quiz.image || "/noavatar.png"} />
                    </div>
                    {quiz.title}
                </div> */}
                {/* <QuestionList/> */}
                {/* <AddQuestion/> */}
            </div>
            <Outlet />
        </div>
    );
};

export default EditQuiz;
