import * as React from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Paper } from '@mui/material';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chip from '@mui/joy/Chip';
import Stack from '@mui/material/Stack';

import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AllUserQuizList from '../../features/userQuiz/list/AllUserQuizList';
import { useGatAdminOverviewQuery } from '../../features/userQuiz/userQuizApiSlice';
import useAuth from "../../hooks/useAuth";

const AdminDash = () => {
    const { username, firstName, roles } = useAuth()

    const { data: usersObject, isError, error, isLoading, isSuccess } = useGatAdminOverviewQuery()
    // const chartSetting = {
    //     // yAxis={[{ min: -1.5, max: 1.5 }]},
    //     width: 600,
    //     height: 300,
    // };
    // const ListItem = styled('li')(({ theme }) => ({
    //     margin: theme.spacing(0.05),
    // }));

    // const dataset = [
    //     {

    //         amount: 86,
    //         avg: 21,
    //         month: 'teast 1',
    //     },
    //     {

    //         amount: 78,
    //         avg: 28,
    //         month: 'Fev',
    //     },
    //     {

    //         amount: 106,
    //         avg: 41,

    //         month: 'Mar',
    //     },
    //     {

    //         amount: 92,
    //         avg: 73,
    //         month: 'Apr',
    //     },
    //     {
    //         amount: 92,
    //         avg: 99,
    //         month: 'May',
    //     },
    //     {

    //         amount: 103,
    //         avg: 100,
    //         month: 'June',
    //     },
    //     {

    //         amount: 105,
    //         avg: 90,
    //         month: 'July',
    //     },
    //     {

    //         amount: 106,
    //         avg: 25,
    //         month: 'Aug',
    //     },
    //     {

    //         amount: 95,
    //         avg: 88,
    //         month: 'Sept',
    //     },
    //     {

    //         amount: 97,
    //         avg: 55,
    //         month: 'Oct',
    //     },

    // ];
    const valueFormatter = (value) => `${value} `;
    const colors = ['#E8EFFB', '#316AFF'];
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const dataset = [...usersObject.data.quizzesData.slice(0, 10)]
    console.log(dataset);
    const chartParams = {
        // yAxis: [
        //     {
        //         label: 'avg all users',
        //     },
        // ],
        // series: [
        //     {
        //         label: 'avg',
        //         dataKey: 'avg',

        //     },
        //     {
        //         label: 'cnt',
        //         dataKey: 'cnt',

        //     },
        // ],
        slotProps: { legend: { hidden: true } },
        dataset,
        // width: 600,
        // height: 400,
        // sx: {
        //     [`.${axisClasses.left} .${axisClasses.label}`]: {
        //         transform: 'translate(-20px, 0)',
        //     },
        // },

    };

    return (

        <Box
            component="main"

        >
            {/* <Toolbar /> */}

            <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>

                <Grid container spacing={3} >
                   
                    <Grid item xs={6} md={6} lg={6}>
                        
                        <Paper
                            variant='outlined'
                            sx={{
                                bgcolor: '#F7F8FA',
                                p: 4,
                                display: 'flex',
                                gap: 3,
                                flexDirection: 'column',
                                height:300,
                            }}
                        >
                              <Typography variant='h5'>{`Hello ${firstName}`}</Typography>
                            {/* <Typography variant='body1'>Welcome back!
                                dsfs dfsd df sdf  sdagfj asbdjcabhsd ajscbdg
                            </Typography> */}

                             <Grid item xs={12} md={12} lg={12}>
                             <Chip sx={{ marginRight: 2 }}
                        variant="outlined"
                        size="lg"
                        startDecorator={< PersonIcon />}
                        color={
                            'success'
                        }
                    >
                        {`${usersObject.data.userCnt} Users`}
                    </Chip>
                    <Chip sx={{ marginRight: 2 }}
                        variant="soft"
                        size="lg"
                        startDecorator={< QuizIcon />}
                        color={
                            'danger'
                        }
                    >
                        {`${usersObject.data.quizzesData.length} Quizzes`}
                    </Chip>
                    <Chip sx={{ marginRight: 2 }}
                        variant="soft"
                        size="lg"
                        startDecorator={< PeopleAltIcon />}
                        color={
                            'primary'
                        }
                    >
                        {`${usersObject.data.userQuizzesCnt} User Quizzes`}
                    </Chip>
                  </Grid>  
                 
                          


                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>

                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                            }}
                        >
                            <BarChart
                                // xAxis={[
                                //     {
                                //         scaleType: 'band',
                                //         dataKey: '_id',
                                //         valueFormatter: (_id, context) =>
                                //             context.location === 'tick'
                                //                 ? 'quiz'
                                //                 : `quiz: ${dataset.find((d) => d._id === _id)?.title}`,
                                //     },
                                // ]}
                                {...chartParams}

                                dataset={dataset}
                                xAxis={[
                                    {
                                        scaleType: 'band', dataKey: 'title', valueFormatter: (title, context) =>
                                            context.location === 'tick'
                                                ?
                                                title.substring(0, 8)
                                                : `${dataset.find((d) => d.title === title)?.title} `,
                                    },
                                ]} series={[{ dataKey: 'avg', label: 'Avg', valueFormatter },
                                { dataKey: 'cnt', label: 'Users ', valueFormatter }
                                ]}

                                colors={colors}
                            // tooltip={{ trigger: 'item' }}
                            //   layout="horizontal"
                            // {...chartSetting}
                            />

                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}

                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <AllUserQuizList />
                        </Paper>
                    </Grid>
                </Grid>
                {/* <Copyright sx={{ pt: 4 }} /> */}
            </Container>
        </Box>




    )
}

export default AdminDash