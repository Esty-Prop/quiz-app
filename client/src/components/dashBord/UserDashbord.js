import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Paper } from '@mui/material';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useParams, useSearchParams } from "react-router-dom"
import { useGetAllUserQuizByUserMutation } from "../../features/userQuiz/userQuizApiSlice"

import { useEffect } from "react";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import useAuth from "../../hooks/useAuth";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Search from "../../components/search/Search"
import CloseIcon from '@mui/icons-material/Close';
import CompletedQuizzes from '../../features/userQuiz/list/CompletedQuizzes';

// const SingleUserInfo = () => {
//     const { _id, username, firstName, lastName, email, roles } = useAuth()

//   const [getQuizzes, { data: UserQuizzesObject, isError, error, isLoading, isSuccess }] = useGetAllUserQuizByUserMutation()

//   const [searchParams] = useSearchParams()
//   const q = searchParams.get("q")

//   useEffect(() => {
//     console.log(_id);
//     if (_id) {
//       getQuizzes({ _id })

//     }
//   }, [_id])

//   if (!isSuccess) return <h4> Loading ...</h4>
//   console.log(UserQuizzesObject);
//   if (isError) return <h1>{JSON.stringify(error)}</h1>
//   const quizzes = UserQuizzesObject.data
//   console.log(quizzes);
//   const filteredData = !q ? [...quizzes] : quizzes.filter(quiz => quiz?.quiz?.title.indexOf(q) > -1)
//   const avg = Math.round(quizzes.reduce((acc, c) => acc + c.score, 0) / quizzes.length)
//   if (!quizzes) return <h1>{"Not found"}</h1>
//   return (
//     <div>
//       {<Avatar color='red' size="md">{firstName.charAt(0) + lastName.charAt(0)} </Avatar>}
//       <Typography sx={{ m: 2, bgcolor: '' }} level="h4">{username}</Typography>


//       <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//         <Chip variant="soft" startDecorator={<SportsScoreIcon />}>
//           {`avg score ${avg}`}
//         </Chip>
//         <Chip variant="soft" startDecorator={<CheckRoundedIcon />}>
//           {`${quizzes.length} quizzes compleated`}      </Chip>
//       </Box>
//       <Sheet
//         className="SearchAndFilters-mobile"
//         sx={{
//           display: { xs: 'flex' },
//           my: 2,
//           gap: 1,
//         }}
//       >
//         {/* <Link to={`/dash/quizzes/${id}/add`} className="quizzes-list-add-button">
//           add question
//         </Link> */}
//         <Search />

//       </Sheet>
//       <Sheet
//         sx={{
//           '--TableCell-height': '40px',
//           // the number is the amount of the header rows.
//           '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
//           maxHeight: 500,
//           overflow: 'auto',
//           background: (theme) =>
//             `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
//             linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
//             radial-gradient(
//               farthest-side at 50% 0,
//               rgba(0, 0, 0, 0.12),
//               rgba(0, 0, 0, 0)
//             ),
//             radial-gradient(
//                 farthest-side at 50% 100%,
//                 rgba(0, 0, 0, 0.12),
//                 rgba(0, 0, 0, 0)
//               )
//               0 100%`,
//           backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
//           backgroundRepeat: 'no-repeat',
//           backgroundAttachment: 'local, local, scroll, scroll',
//           backgroundPosition:
//             '0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%',
//           backgroundColor: 'background.surface',
//         }}

//       >
//         <Table
//           aria-label="simple table"
//         >
//           <thead >
//             <tr >
//               <th style={{ width: 140, padding: '12px 20px' }}>Name</th>
//               <th style={{ width: 140, padding: '12px 20x' }}>Score</th>
//               <th style={{ width: 240, padding: '12px 20x' }}>Answers</th>
//               <th style={{ width: 140 }}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.values(quizzes).map((quiz) => (
//               <tr key={quiz.id} style={{ backgroundColor: 'white' }}>

//                 <td>
//                   <Typography level="body-md">{quiz.quiz?.title}</Typography>
//                 </td>

//                 <td>
//                   {/* <Stack direction="row" spacing={1}>

//                 <Chip icon={<CloseIcon />} label="With Icon" />
// </Stack> */}
//                   <Chip
//                     variant="soft"
//                     size="md"
//                     sx={{
//                       mb: '2px',
//                       pa: '5px',
//                       minWidth: '100%',
//                       textAlign: "center"
//                     }}
//                     startDecorator={
//                       < EmojiEventsIcon />

//                     }
//                     color={
//                       {
//                         true: 'success',
//                       }[quiz.answers[0]?.isCorrect]
//                     }
//                   >
//                     <Typography level="body-sm">{'score ' + quiz.score}</Typography>
//                   </Chip>
//                 </td>
//                 <td>
//                   {quiz.answers.map((ans, index) => (
//                     <Chip
//                       variant="soft"
//                       size="md"
//                       sx={{
//                         mb: '2px',
//                         pa: '5px',
//                         minWidth: '100%',
//                         textAlign: "left"
//                       }}
//                       startDecorator={
//                         {
//                           true: <CheckRoundedIcon />,
//                           false: <CloseIcon />
//                         }[quiz.answers[index]?.isCorrect]
//                       }
//                       color={
//                         {
//                           true: 'primary',
//                         }[quiz.answers[index]?.isCorrect]
//                       }
//                     >
//                       <Typography level="body-xs">{ans.ques}</Typography>
//                       <Typography level="title-sm">{ans.answer}</Typography>

//                     </Chip>

//                   ))}
//                 </td>
//                 {/* <td>
//                   <Typography level="body-md">{quiz.CreatedAt}</Typography>
//                 </td> */}
//                 <td>

//                   {console.log(quiz.answers)}

//                 </td>

//                 {/* <td>
//                   <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

//                     <Button size="sm" variant="soft" color="danger" onClick={() => { deleteClick(quiz) }} >
//                       Delete
//                     </Button>
//                   </Box>
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Sheet>
//     </div>
//   )
// }


const UserDashbord = () => {

    const [getQuizzes, { data: UserQuizzesObject, isError, error, isLoading, isSuccess }] = useGetAllUserQuizByUserMutation()

    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const { _id, username, firstName, lastName, email, roles } = useAuth()

    // const chartSetting = {
    //     // yAxis={[{ min: -1.5, max: 1.5 }]},
    //     width: 600,
    //     height: 300,
    // };
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    const dataset = [
        {

            amount: 86,
            avg: 21,
            month: 'teast 1',
        },
        {

            amount: 78,
            avg: 28,
            month: 'Fev',
        },
        {

            amount: 106,
            avg: 41,

            month: 'Mar',
        },
        {

            amount: 92,
            avg: 73,
            month: 'Apr',
        },
        {
            amount: 92,
            avg: 99,
            month: 'May',
        },
        {

            amount: 103,
            avg: 100,
            month: 'June',
        },
        {

            amount: 105,
            avg: 90,
            month: 'July',
        },
        {

            amount: 106,
            avg: 25,
            month: 'Aug',
        },
        {

            amount: 95,
            avg: 88,
            month: 'Sept',
        },
        {

            amount: 97,
            avg: 55,
            month: 'Oct',
        },

    ];
    const valueFormatter = (value) => `${value} `;
    const colors = ['#6a1b9a', '#9c27b0'];
    useEffect(() => {
        console.log(_id);
        if (_id) {
            getQuizzes({ userId: _id })

        }
    }, [_id])

    if (!isSuccess) return <h4> Loading ...</h4>
    console.log(_id);
    console.log(UserQuizzesObject);
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const quizzes = UserQuizzesObject.data
    console.log(quizzes);
    const filteredData = !q ? [...quizzes] : quizzes.filter(quiz => quiz?.quiz?.title.indexOf(q) > -1)
    const avg = Math.round(quizzes.reduce((acc, c) => acc + c.score, 0) / quizzes.length)
    if (!quizzes) return <h1>{"Not found"}</h1>


    return (

        <Box
            component="main"
            sx={{
                // backgroundColor: (theme) =>
                //     theme.palette.mode === 'light'
                //         ? theme.palette.grey[100]
                //         : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
                <Grid container spacing={3} >
                  
                    <Grid item xs={12} md={12} lg={12}>
                       
                        <Paper
                            variant='outlined'
                            sx={{
                                bgcolor: '#F7F8FA',
                                p: 4,
                                display: 'flex',
                                gap: 3,
                                flexDirection: 'column',
                                height: 220,
                            }}
                        >
                            <Typography variant='h3'>Welcome to QuizWiz</Typography>
                            <Typography variant='body1'> {`${firstName}! Start exploring and challenging yourself with our exciting quizzes`}
                            </Typography>

                            <Grid>
                        <Chip sx={{ marginRight: 2 }}
                        variant="outlined"
                        size="lg"
                        startDecorator={< PersonIcon />}
                        color={
                            'success'
                        }
                    >
                        Users
                    </Chip>
                    <Chip sx={{ marginRight: 2 }}
                        variant="soft"
                        size="lg"
                        startDecorator={< QuizIcon />}
                        color={
                            'danger'
                        }
                    >
                        Quizzes
                    </Chip>
                    <Chip sx={{ marginRight: 2 }}
                        variant="soft"
                        size="lg"
                        startDecorator={< PeopleAltIcon />}
                        color={
                            'primary'
                        }
                    >
                        User quizzes
                    </Chip>
                        </Grid>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>

                        {/* <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                            }}
                        >


                        </Paper> */}
                    </Grid>
                    {/* Recent Deposits */}

                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <div>
                                {<Avatar color='red' size="md">{firstName.charAt(0) + lastName.charAt(0)} </Avatar>}
                                <Typography sx={{ m: 2, bgcolor: '' }} level="h4">{username}</Typography>


                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Chip variant="soft" startDecorator={<SportsScoreIcon />}>
                                        {`avg score ${avg}`}
                                    </Chip>
                                    <Chip variant="soft" startDecorator={<CheckRoundedIcon />}>
                                        {`${quizzes.length} quizzes compleated`}      </Chip>
                                </Box>
                                <Sheet
                                    className="SearchAndFilters-mobile"
                                    sx={{
                                        display: { xs: 'flex' },
                                        my: 2,
                                        gap: 1,
                                    }}
                                >
                                   
                                </Sheet>
                                <CompletedQuizzes/>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                {/* <Copyright sx={{ pt: 4 }} /> */}
            </Container>
        </Box>




    )
}

export default UserDashbord