import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Paper } from '@mui/material';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { styled } from '@mui/material/styles';
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


const UserDashbord = () => {

    const [getQuizzes, { data: UserQuizzesObject, isError, error, isLoading, isSuccess }] = useGetAllUserQuizByUserMutation()

    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    const { _id, username, firstName, lastName, email, roles } = useAuth()

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));


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
               
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                mt:'-80px'
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{  mb: 1 }}>
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
                                borderRadius: 5,
                            }}
                        >
                            <Typography variant='h3' fontFamily="Montserrat">Welcome to QuizWiz</Typography>
                            <Typography variant='body1' fontFamily="Montserrat"> {`${firstName}! Start exploring and challenging yourself with our exciting quizzes`}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Chip color='success' variant="soft" startDecorator={<SportsScoreIcon />}>
                                        {`avg score ${avg}`}
                                    </Chip>
                                    <Chip color='primary'
                                    variant="soft" startDecorator={<CheckRoundedIcon />}>
                                        {`${quizzes.length} quizzes compleated`}      </Chip>
                                </Box>
                         

                        </Paper>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: 5, }}>
                            <div>

                               
                                <Sheet
                                    className="SearchAndFilters-mobile"
                                    sx={{
                                        display: { xs: 'flex' },
                                        my: 2,
                                        gap: 1,
                                                                        borderRadius: 5,

                                    }}
                                >
                                   
                                </Sheet>
                                <CompletedQuizzes/>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>




    )
}

export default UserDashbord