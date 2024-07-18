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

    const valueFormatter = (value) => `${value} `;
    const colors = ['#E8EFFB', '#316AFF'];
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    let dataset = [...usersObject.data.quizzesData.slice(0, 10)]
    dataset = dataset.map((item)=>{
        return {...item,avg: Math.floor(item.avg)}
    })
    console.log(dataset);
    const chartParams = {

        slotProps: { legend: { hidden: true } },
        dataset,

    };

    return (

        <Box
            component="main"

        >

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
                                height: 150,
                                borderRadius: 5,

                            }}
                        >
                            <Typography variant='h5' fontFamily="Montserrat">{`Hello ${firstName}`}</Typography>

                            <Grid item xs={12} md={12} lg={12}>
                                <Chip sx={{ marginRight: 2 }}
                                    variant="outlined"
                                    size="lg"
                                    fontFamily="Montserrat"
                                    startDecorator={< PersonIcon />}
                                    color={
                                        'success'
                                    }
                                >
                                    {`${usersObject.data.userCnt} Users`}
                                </Chip>
                                <Chip sx={{ marginRight: 2 }}
                                    //variant="soft"
                                    size="lg"
                                    startDecorator={< QuizIcon />}
                                    color={
                                        'danger'
                                    }
                                >
                                    {`${usersObject.data.quizzesData.length} Quizzes`}
                                </Chip>
                                <Chip sx={{ marginRight: 2 }}
                                    //variant="soft"
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
                    <Grid item xs={12} md={12} lg={12}>

                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                                borderRadius: 5,
                            }}
                        >
                            <BarChart
                            
                                {...chartParams}
                                sx={{
                                    fontFamily: "Montserrat"
                                }}
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
                           
                            />

                        </Paper>
                    </Grid>
                  
                    <Grid item xs={12}>
                        <Paper sx={{ borderRadius: 5, p: 2, display: 'flex', flexDirection: 'column' }}>
                            <AllUserQuizList />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default AdminDash