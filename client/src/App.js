import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import SiteLayout from './components/layout/site/SiteLayout';
import DashLayout from './components/layout/dash/DashLayout';
import QuizList from './features/quiz/list/QuizList';
import AddQuiz from './features/quiz/add/AddQuiz';
import SingleQuiz from './features/quiz/view/SingleQuiz';
import ProfilePage from './features/profile/ProfilePage';
import EditQuiz from './features/quiz/edit/EditQuiz';
import QuestionList from './features/quiz/list/QuestionList';
import AddQuestion from './features/quiz/add/AddQuestion';
import UsersList from './features/users/list/UsersList';
import SingleUser from './features/users/view/SingleUser';
import AddUser from './features/users/add/AddUser';
import LoginPage from './features/auth/login/LoginPage';
import QuizUser from './demo/QuizUser';
import React from 'react';
import { ConfigProvider, Button, Space, Input, Divider } from 'antd';
import RequireAuth from './features/auth/ReqireAuth';
import PersistsLogin from './features/auth/PersistsLogin';
import UserQuizList from './features/userQuiz/list/UserQuizList';
import QuizExecution from './features/userQuiz/execution/QuizExecution';
import UserDashbord from './components/dashBord/UserDashbord';
import SingleActiveQuiz from './features/userQuiz/singleQuiz/SingleActiveQuiz';
import RegisterPage from './features/auth/register/RegisterPage';
import SingleUserInfo from './features/users/view/SingleUserInfo';
import AllUserQuiz from './features/quiz/view/AllUserQuiz';
import CompletedQuizzes from './features/userQuiz/list/CompletedQuizzes';



function App() {
  return (
    //   <ConfigProvider
    //   theme={{
    //     token: {
    //       colorPrimary:'#00b96b',       
    //       algorithm: true, // Enable algorithm
    //       colorText:'white',
    //       fontFamily: "Noto Sans Hebrew", 
    //       colorTextDescription:"#00b96b"
    //     },
    //     components: {
    //       Steps: {


    //       },
    //       Button: {
    //         colorPrimary: '#00b96b',
    //         algorithm: true, // Enable algorithm
    //       },
    //       Input: {
    //         colorPrimary: '#eb2f96',
    //         algorithm: true, // Enable algorithm
    //       }

    //     },
    //   }}
    // >

    <Router>
      <Routes>
        <Route path='/' element={<SiteLayout />}>
          <Route index element={<h1>Site</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/demo' element={<QuizUser />} />
          <Route element={<PersistsLogin />}>
            <Route element={<RequireAuth allowRoles={["Admin", "User"]} />}>
              <Route path='/dash' element={<DashLayout />}>
                  <Route index element={<UserDashbord />} />
                <Route element={<RequireAuth allowRoles={["Admin"]} />}>
                  <Route path="users" element={<Outlet />}>
                    <Route index element={<UsersList />} />
                    <Route path="add" element={<AddUser />} />
                    <Route path="view/:userId" element={<SingleUserInfo/>} />
                    <Route path=":userId" element={<SingleUser />} />
                  </Route>
                </Route>
                <Route path='quizzes' element={<Outlet />}>
                  <Route index element={<QuizList />} />
                  <Route path='add' element={<AddQuiz />} />
                  <Route path='view/:quizId' element={<AllUserQuiz/>} />
                  <Route path=':id' element={<EditQuiz />} >
                    <Route index element={<QuestionList />} />
                    <Route path='add' element={<AddQuestion />} />
                    <Route path='edit' element={<h2>view</h2>} />
                  </Route>
                </Route>
                <Route path='userQuizzes' element={<Outlet />}>
                  <Route index element={<UserQuizList />} />
                  <Route path='completed' element={<CompletedQuizzes/>} />

                  <Route path=':id' element={<QuizExecution />} />
                  <Route path='view/:id' element={<SingleActiveQuiz />} />

                  {/* <Route path='add' element={<AddQuiz />} /> */}
                </Route>
                <Route path='profile' element={<ProfilePage/>} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router >
    // </ConfigProvider>

  );
}

export default App;
