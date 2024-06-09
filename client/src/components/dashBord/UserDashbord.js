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
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
const UserDashbord = () => {



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
                        <Chip sx={{marginRight:2}}
                                        variant="outlined"
                                        size="lg"
                                        startDecorator={< PersonIcon />}
                                        color={
                                            'success'
                                        }
                                    >
                                        Users
                                    </Chip>
                                    <Chip sx={{marginRight:2}}
                                        variant="soft"
                                        size="lg"
                                        startDecorator={< QuizIcon />}
                                        color={
                                            'danger'
                                        }
                                    >
                                        Quizzes
                                    </Chip>
                                    <Chip sx={{marginRight:2}}
                                        variant="soft"
                                        size="lg"
                                        startDecorator={< PeopleAltIcon />}
                                        color={
                                            'primary'
                                        }
                                    >
                                        User quizzes
                                    </Chip>
                            <Grid item xs={12} md={8} lg={9}>
                                
                                <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 300,
                                    }}
                                >
                                    <BarChart

                                        dataset={dataset}
                                        xAxis={[
                                            { scaleType: 'band', dataKey: 'month', },
                                        ]} series={[{ dataKey: 'avg', label: 'avg test', valueFormatter },
                                        { dataKey: 'amount', label: 'Amount ', valueFormatter }
                                        ]}
                                        colors={colors}
                                    //   layout="horizontal"
                                    // {...chartSetting}
                                    />

                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                variant='outlined'
                                    sx={{
                                        bgcolor:'#F7F8FA',
                                        p: 4,
                                        display: 'flex',
                                        gap: 3,
                                        flexDirection: 'column',
                                        height: 300,
                                    }}
                                >
                                    <Typography variant='h5'>Welcome back!</Typography>
                                    <Typography variant='body1'>Welcome back!
                                        dsfs dfsd df sdf  sdagfj asbdjcabhsd ajscbdg  
                                    </Typography>

                                   

                                </Paper>
                            </Grid>
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

export default UserDashbord