import {NavLink} from "react-router-dom"
const MenuLink = ({item}) => {
  return (
   <NavLink to={item.path} className="side-bar-menu-link">
    {item.icon}
    {item.title}
   </NavLink>
  )
}

export default MenuLink