import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdPendingActions,
  MdOutlineSettings,
  MdHelpCenter,
  MdOutlineBusinessCenter,
  MdLogout,
} from "react-icons/md"
import * as React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import MenuLink from "./MenuLink";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { useLogoutMutation } from '../../features/auth/authApiSlice'
import './sidebar.css'
import QuizIcon from '@mui/icons-material/Quiz';
import useAuth from "../../hooks/useAuth";
import useAvatarColor from '../../hooks/useAvatarColor';

import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Sidebar = () => {
  const { username, firstName,lastName, roles,email } = useAuth()
  const [logout, { isSuccess }] = useLogoutMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate("/login")

    }
  }, [isSuccess])

  const navigateClick = (path) => {
    
    navigate(path)
  };

  const AvatarColor=(name)=> {
    let bgcolor = useAvatarColor(name)
    return (bgcolor.sx.bgcolor.toString());
  }
  const AdminMenuItems = 
     [
        {
          
          title: "Dashboard",
          path: "/dash",
          icon: <SpaceDashboardIcon />,
        },
        {
          title: "Profile",
          path: "/dash/profile",
          icon: <ManageAccountsIcon />,
        },
        {
          title: "Users",
          path: "/dash/users",
          icon: <GroupIcon />,
        },
        {
          title: "Quizzes",
          path: "/dash/quizzes",
          icon: <QuizIcon />,
        },
      ]
  const userMenuItems = 
    [
        {
          title: "Dashboard",
          path: "/dash",
          icon: <SpaceDashboardIcon />,
        },

        {
          title: "Todo",
          path: "/dash/userQuizzes",
          icon: <QuizIcon />,
        },
        {
          title: "Completed",
          path: "/dash/userQuizzes/completed",
          icon: <QuizIcon />,
        },
        {
          title: "Profile",
          path: "/dash/profile",
          icon: <ManageAccountsIcon />,
        },
      ]
    

  const menuItems = roles === "Admin" ? AdminMenuItems : userMenuItems
  const loguotClick = () => {
    logout()
  }
  let c = AvatarColor((`${username} `))
  console.log(c);

  
  return (<Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
       
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 30,
        height: '100dvh',
        width: {md:'250px',xs:'200px', lg:'250px' },
        top: 0,
        m:0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography   level="title-lg"  fontFamily="Montserrat">QuizWiz</Typography>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
             

        <List
          size="sm"
          sx={{
            gap: 2,
           
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
           <Divider />
          {menuItems.map(cat => (
          <ListItem key={cat.title}>
          
              <ListItemButton onClick={()=>{navigateClick(cat.path)}} sx={{pt:1,pb:1,}}>
                {cat.icon}
              <ListItemContent>
                <Typography level="title-sm" fontFamily="Montserrat">{cat.title}</Typography>
              </ListItemContent>
              {cat.title ==='Users' && <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>}
            </ListItemButton>
          </ListItem>
        ))}
        </List>
       
        <Card
          invertedColors
          variant="soft"
          color="warning"
          size="sm"
          sx={{ boxShadow: 'none' }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography level="title-sm">Overview</Typography>
            <IconButton size="sm">
              <HelpOutlineIcon />
            </IconButton>
          </Stack>
          <Typography level="body-xs" fontFamily="Montserrat">
            
          </Typography>
         
        </Card>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar sx={{bgcolor:c}}>{firstName.charAt(0)+lastName.charAt(0)}</Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm" fontFamily="Montserrat">{`${firstName} ${lastName}`}</Typography>
          <Typography level="body-xs" fontFamily="Montserrat">{email}</Typography>
        </Box>
        <IconButton onClick={loguotClick} size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>)
}

export default Sidebar