import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
} from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import "./navbar.css"

const Navbar = () => {
    const { username, firstName, roles } = useAuth()

    return (
        <div className="navbar">
            <div className="navbar-menu">
                {/* <div className="navbar-search">
                    <MdSearch />
                    <input type="text" placeholder="Search..." className="navbar-input" />
                </div> */}
                <div className="navbar-icons">
                    <MdOutlineChat size={20} />
                    <MdNotifications size={20} />
                </div>

            </div>
            <div className="side-bar-user">
                <div className="side-bar-user-details">
                    <span className="side-car-user-username">{`Hi, ${firstName}`}</span>
                    {/* <span className="side-car-user-title">{roles}</span> */}
                </div>
                <img
                    // src={user.image || "/noavatar.png"}
                    src={"/noavatar.png"}
                    alt=""
                    width="30"
                    height="30"
                    className="side-bar-user-image"
                />

            </div>
            {/* <div className="navbar-title">
                Dashboard
            </div> */}
        </div>
    )
}

export default Navbar