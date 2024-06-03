import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdPendingActions,
  MdOutlineSettings,
  MdHelpCenter,
  MdOutlineBusinessCenter,
  MdLogout,
} from "react-icons/md"
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

const Sidebar = () => {
  const { username, firstName,lastName, roles } = useAuth()
  const [logout, { isSuccess }] = useLogoutMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate("/login")

    }
  }, [isSuccess])
  const AvatarColor=(name)=> {
    let bgcolor = useAvatarColor(name)
    return (bgcolor.sx.bgcolor.toString());
  }
  const AdminMenuItems = [
    {
      // title: "דפים",
      list: [
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
      ],
    },
    {
      // title: "משתמש",
      list: [
        // {
        //   title: "הגדרות",
        //   path: "/dash/settings",
        //   icon: <MdOutlineSettings />,
        // },
        // {
        //   title: "עזרה",
        //   path: "/dash/help",
        //   icon: <MdHelpCenter />,
        // },
      ],
    },
  ];
  const userMenuItems = [
    {
      // title: "דפים",
      list: [
        {
          title: "Dashboard",
          path: "/dash",
          icon: <SpaceDashboardIcon />,
        },
        {
          title: "Quizzes",
          path: "/dash/userQuizzes",
          icon: <QuizIcon />,
        },
      ],
    },
    {
      // title: "משתמש",
      list: [
        // {
        //   title: "הגדרות",
        //   path: "/dash/settings",
        //   icon: <MdOutlineSettings />,
        // },
        // {
        //   title: "עזרה",
        //   path: "/dash/help",
        //   icon: <MdHelpCenter />,
        // },
        {
          title: "Profile",
          path: "/dash/profile",
          icon: <ManageAccountsIcon />,
        },
      ],
    },
  ];

  const menuItems = roles === "Admin" ? AdminMenuItems : userMenuItems

  const loguotClick = () => {
    logout()
  }
  let c = AvatarColor((`${username} `))
  console.log(c);
  return (
    <div className="side-bar">
      <Avatar  sx={{m:3, width: 80, height: 80 ,bgcolor:c}}>{firstName.charAt(0)+lastName.charAt(0)}</Avatar>
      
      <ul className="side-bar-menu-list">
        {menuItems.map(cat => (
          <li key={cat.title}>
            <span className="side-bar-menu-cat">{cat.title}</span>
            {cat.list.map(item => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button onClick={loguotClick} className="side-bar-logout">
        <LogoutIcon />
        Logout      </button>
    </div>
  )
}

export default Sidebar