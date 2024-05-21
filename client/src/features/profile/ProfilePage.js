import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Avatar from '@mui/material/Avatar';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
// import { useGetAllUsersQuery, useUpdateUserMutation } from "../usersApiSlice";
import { useEffect } from "react";
// import './ProfilePage.css'
const ProfilePage = () => {
  const {userId} = useParams()
  const { username, firstName,lastName, roles ,email} = useAuth()
//   const  {data: usersObject, isError, error, isLoading, isSuccess} = useGetAllUsersQuery()
//   const [updateUser, {isSuccess: isUpdateSuccess}] = useUpdateUserMutation()
//   const navigate = useNavigate()
//   useEffect(()=>{
//     if(isUpdateSuccess){
//       navigate("/dash/users")
//     }
//   }, [isUpdateSuccess])
  const formSubmit = (e) =>{
      e.preventDefault()
      const data = new FormData(e.target)
      const userObject =Object.fromEntries(data.entries())
    //  updateUser(userObject)

  } 


//   const user = {firstName:"esty",lastName:"porges",email:"ss",username:'dd'}
//   if(!user) return <h1>{ "Not found"}</h1>

 
    return (
      <div className="single-user-container">
        <div className="single-user-info">
        <div className="single-user-info-section"></div>
        <div className="single-user-img-container">
          <Avatar sx={{ border: 3, width: 80, height: 80, bgcolor: 'pink' }}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
        </div>
        <div className="single-user-info-name">
          <h3>{`${firstName} ${lastName}`} </h3>
          <div className="edit-icon"><CreateOutlinedIcon /></div>
        </div>

          <ul className="single-user-info-txt">
            <li> {username} </li>
            <li> {roles} </li>
            <li> {email} </li>
          </ul>
        </div>
        <div className="single-user-form-container">
          <form  onSubmit={formSubmit} className="single-user-form">
            <label> username</label>
            <input readOnly={true} type="text" name="username" defaultValue={username} />
            <label>name </label>
            <input type="text" name="firstName" placeholder="name " defaultValue={firstName} />
            <label>family </label>
            <input type="text" name="lastName" placeholder=" משפחה " defaultValue={lastName} />         
            <label>email</label>
            <input type="email" name="email" placeholder="email "  defaultValue={email} />
            <button>update user</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  
