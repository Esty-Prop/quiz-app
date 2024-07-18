import { useNavigate, useParams } from "react-router-dom";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../usersApiSlice";
import Avatar from '@mui/material/Avatar';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

import "./single-user.css"
import { useEffect } from "react";
const SingleUser = () => {
  const { userId } = useParams()
  const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery()
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation()
  const navigate = useNavigate()
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/users")
    }
  }, [isUpdateSuccess])
  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const userObject = Object.fromEntries(data.entries())
    console.log(userObject)
    updateUser(userObject)

  }

  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const user = usersObject.data.find(u => u._id === userId)
  if (!user) return <h1>{"Not found"}</h1>


  return (
    <div className="single-user-container">
      <div className="single-user-info">
        <div className="single-user-info-section"></div>
        <div className="single-user-img-container">
          <Avatar sx={{ border: 3, width: 80, height: 80, bgcolor: 'pink' }}>{user.firstName.charAt(0) + user.lastName.charAt(0)}</Avatar>
        </div>
        <div className="single-user-info-name">
          <h3>{`${user.firstName} ${user.lastName}`} </h3>
          <div className="edit-icon"><CreateOutlinedIcon /></div>
        </div>
        {/* <ul className="single-user-info-txt">
            <li> {user.username} </li>
            <li> {user.roles} </li>
            <li> {user.email} </li>
          </ul> */}
      </div>
      <div className="single-user-form-container">
        <form onSubmit={formSubmit} className="single-user-form">
          <input name="_id" defaultValue={user._id} type="hidden" />
          <label> username</label>
          <input readOnly={true} type="text" name="username" defaultValue={user.username} />
  
          <label>name </label>
          <input type="text" name="firstName" placeholder="name " defaultValue={user.firstName} />
          <label>משפחה </label>
          <input type="text" name="lastName" placeholder=" משפחה " defaultValue={user.lastName} />
          <label>email</label>
          <input type="email" name="email" placeholder="email " defaultValue={user.email} />


          <label>roles</label>
          <select name="roles" id="roles">
            <option value="Admin" selected={user.roles === "Admin"}>admin</option>
            <option value="User" selected={user.roles === "User"}>user</option>
          </select>
          <label>active?</label>
          <select name="active" id="active">
            <option value={true} selected={user.active}>yes</option>
            <option value={false} selected={!user.active}>no</option>
          </select>
          <button>update user</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUser;
