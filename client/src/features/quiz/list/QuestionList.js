import Search from "../../../components/search/Search"
import { useGatAllquizzesQuery, useDeleteQuestionMutation } from "../quizzesApiSlice"
import { Link, useParams } from "react-router-dom"

import './Quiz_List.css'
import EditQuestion from "../edit/EditQuestion"
const QuestionList = () => {
    const { id } = useParams()
    const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllquizzesQuery()
    const [deleteQuestion, { isSuccess: isDeleteSuccess }] = useDeleteQuestionMutation()
    const deleteClick = (ques) => {
        if (window.confirm("בטוח שברצונך למחוק את השאלה?")) {
            console.log(ques._id + "________________" + id);
            deleteQuestion({ _id: ques._id, quizId: id }); // Pass quizId directly
        }
    };

    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    console.log(id);
    const quiz = quizzesObject.data.find(q => q._id === id)
    if (!quiz) return <h1>{"Not found"}</h1>
    console.log(quizzesObject.data)
    console.log(quiz.questions)
    console.log(Object.values(quiz.questions))

    return (
        <div className="quizzes-list">
            <div className="quizzes-list-top">
                <Search placeholder="חיפוש לפי שם " />
                <Link to={`/dash/quizzes/${id}/add`} className="quizzes-list-add-button">
                    הוספת שאלה
                </Link>
            </div>
            <table className="quizzes-list-table">
                <thead>
                    <tr>
                        <td>שם השאלה</td>
                        <td>נוצר ב </td>
                        <td>אפשרות 1</td>
                        <td>אפשרות 2 </td>
                        <td>אפשרות 3 </td>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(quiz.questions).map(q => (
                        <tr key={q._id}>
                            <td>
                                <div className="quizzes-list-company">
                                    {q.title}
                                </div>
                            </td>
                            <td>
                                {q.createdAt?.toString().slice(0, 10)}
                            </td>
                            <td><div className={q.options[0]?.isCorrect?"correct":""}>{q.options[0]?.title}</div></td>
                            <td><div className={q.options[1]?.isCorrect?"correct":""}>{q.options[1]?.title}</div></td>
                            <td><div className={q.options[2]?.isCorrect?"correct":""}>{q.options[2]?.title}</div></td>
                            <td>
                                <div className="quizzes-list-buttons">
                                    {/* <Link to={`/dash/quizzes/${q._id}`} className="quizzes-list-button quizzes-list-view">
                                        צפייה
                                    </Link> */}
                                    <button onClick={() => { deleteClick(q) }} className="quizzes-list-button quizzes-list-delete">
                                        מחיקה
                                    </button>
                                </div>
                            </td>


                           
                            {/* <EditQuestion id={quiz.questions[0]?._id} quizId={id} /> */}

                        </tr>
                        

                    ))}
                </tbody>



            </table>
        </div>
    )
}

export default QuestionList