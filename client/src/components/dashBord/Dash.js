import AdminDash from "./AdminDash"
import UserDashbord from "./UserDashbord"
import useAuth from "../../hooks/useAuth";

const Dash = () => {
  const { username, firstName,lastName, roles,email } = useAuth()

  return (
    roles === "Admin" ?  <AdminDash/> : <UserDashbord/>

  )
}

export default Dash