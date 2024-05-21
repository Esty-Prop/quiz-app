// import Search from "../../../components/search/Search"
// import { useGatAllquizzesQuery,useDeleteQuizMutation } from "../quizzesApiSlice"
// import { Link,useSearchParams } from "react-router-dom"

// import './Quiz_List.css'
// const QuizList = () => {
//     const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllquizzesQuery()
//        const [deleteQuiz,{isSuccess: isDeleteSuccess}] = useDeleteQuizMutation()
//     const deleteClick = (quiz) =>{
//         if(window.confirm ("בטוח שברצונך למחוק את המבחן?")){
//             deleteQuiz({_id: quiz._id})
//         }
//     }

//   const [searchParams] = useSearchParams()
//   const q = searchParams.get("q")

//     if (isLoading) return <h1> Loading ...</h1>
//     if (isError) return <h1>{JSON.stringify(error)}</h1>
//     const filteredData = !q?[...quizzesObject.data] : quizzesObject.data.filter(quiz=>quiz?.title?.indexOf(q)> -1)

//     return (
//         <div className="quizzes-list">
//             <div className="quizzes-list-top">
//                 <Search placeholder="Search by name" />
//                 <Link to="/dash/quizzes/add" className="quizzes-list-add-button">Add quiz</Link>
//             </div>
//             <table className="quizzes-list-table">
//                 <thead>
//                     <tr>
//                         <td>Name </td>
//                         <td> CreatedAt</td>
//                         <td>Status</td>
//                         {/* <td>מחבר </td> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredData?.map(quiz => (
//                         <tr key={quiz._id}>
//                             <td>
//                                 <div className="quizzes-list-company">
//                                     {/* <img
//                                         // src={quiz.image || "/noavatar.png"}
//                                         src={"/noavatar.png"}

//                                         alt=""
//                                         width={40}
//                                         height={40}
//                                         className="quizzes-list-company-image" /> */}
//                                     {quiz.title}
//                                 </div>
//                             </td>
//                             <td>
//                                 {quiz.createdAt?.toString().slice(0, 10)}
//                             </td>
//                             <td>
//                                 {quiz.isActive ? "uploud" : "private"}
//                             </td>
//                             <td>
//                                 {/* {quiz.active? "פעיל " : "לא פעיל"} */}
//                                 {/* {quiz.user.firstName} */}
//                                 {quiz.isActive}

//                             </td>
//                             <td>

//                                 <div className="quizzes-list-buttons">

//                                     {/* {quiz.title} */}
//                                     {/* {quiz.questions[0]?.title}
// {quiz.questions[0]?.options[0]?.title }
// {quiz.questions[0]?.title} */}


//                                     <Link to={`/dash/quizzes/${quiz._id}`} className="quizzes-list-button quizzes-list-view">
//                                         edit
//                                     </Link>
//                                     <button onClick={()=>{deleteClick(quiz)}}  className="quizzes-list-button quizzes-list-delete">
//                                 delete
//                             </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default QuizList
import Search from "../../../components/search/Search"
import { useGatAllquizzesQuery,useDeleteQuizMutation } from "../quizzesApiSlice"
import { Link,useSearchParams } from "react-router-dom"

import './Quiz_List.css'
const QuizList = () => {
    const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllquizzesQuery()
       const [deleteQuiz,{isSuccess: isDeleteSuccess}] = useDeleteQuizMutation()
    const deleteClick = (quiz) =>{
        if(window.confirm ("בטוח שברצונך למחוק את המבחן?")){
            deleteQuiz({_id: quiz._id})
        }
    }

  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")

    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const filteredData = !q?[...quizzesObject.data] : quizzesObject.data.filter(quiz=>quiz?.title?.indexOf(q)> -1)

    return (
        <div className="quizzes-list">
            <div className="quizzes-list-top">
                <Search placeholder="Search by name" />
                <Link to="/dash/quizzes/add" className="quizzes-list-add-button">Add quiz</Link>
            </div>
            <table className="quizzes-list-table">
                <thead>
                    <tr>
                        <td>Name </td>
                        <td> CreatedAt</td>
                        <td>Status</td>
                        {/* <td>מחבר </td> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(quiz => (
                        <tr key={quiz._id}>
                            <td>
                                <div className="quizzes-list-company">
                                    {/* <img
                                        // src={quiz.image || "/noavatar.png"}
                                        src={"/noavatar.png"}

                                        alt=""
                                        width={40}
                                        height={40}
                                        className="quizzes-list-company-image" /> */}
                                    {quiz.title}
                                </div>
                            </td>
                            <td>
                                {quiz.createdAt?.toString().slice(0, 10)}
                            </td>
                            <td>
                                {quiz.isActive ? "uploud" : "private"}
                            </td>
                            <td>
                                {/* {quiz.active? "פעיל " : "לא פעיל"} */}
                                {/* {quiz.user.firstName} */}
                                {quiz.isActive}

                            </td>
                            <td>

                                <div className="quizzes-list-buttons">

                                    {/* {quiz.title} */}
                                    {/* {quiz.questions[0]?.title}
{quiz.questions[0]?.options[0]?.title }
{quiz.questions[0]?.title} */}


                                    <Link to={`/dash/quizzes/${quiz._id}`} className="quizzes-list-button quizzes-list-view">
                                        edit
                                    </Link>
                                    <button onClick={()=>{deleteClick(quiz)}}  className="quizzes-list-button quizzes-list-delete">
                                delete
                            </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default QuizList