import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
} from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import "./navbar.css"
import Chip from '@mui/joy/Chip';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import useAvatarColor from '../../hooks/useAvatarColor';
import Avatar from '@mui/joy/Avatar';
import { useEffect } from "react"

const Navbar = () => {
    const { username, firstName, roles } = useAuth()
    const AvatarColor=(name)=> {
        let bgcolor = useAvatarColor(name)
        return (bgcolor.sx.bgcolor.toString());
      }
    //   useEffect(() => {
    //     if (username) {
    //         let c = useAvatarColor(username).sx.bgcolor.toString()
    
    //     }
    //   }, [username])
  let c = AvatarColor((`${username} `))

    return (
        <div className="navbar">
            <div className="navbar-menu">
                {/* <div className="navbar-search">
                    <MdSearch />
                    <input type="text" placeholder="Search..." className="navbar-input" />
                </div> */}
                {/* <div className="navbar-icons">
                    <MdOutlineChat size={20} />
                    <MdNotifications size={20} />
                </div> */}

            </div>
           
            <div className="side-bar-user">
            <Chip
            variant="soft"
//   startDecorator={<Avatar />}
  endDecorator={<PermIdentityIcon />}
  
  sx={{
    p:1,
    pl:2,
    pr:2,
    "--Chip-minHeight": "52px",
    "--Chip-gap": "4px",
    "--Chip-decoratorChildHeight": "37px",
    bgcolor:`${c}1C`
  }}
>{`Hi, ${firstName}`}</Chip>
                
                {/* <img
                    // src={user.image || "/noavatar.png"}
                    src={"/noavatar.png"}
                    alt=""
                    width="30"
                    height="30"
                    className="side-bar-user-image"
                /> */}

            </div>
            {/* <div className="navbar-title">
                Dashboard
            </div> */}
        </div>
    )
}

export default Navbar