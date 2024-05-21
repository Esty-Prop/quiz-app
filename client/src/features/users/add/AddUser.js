import "./add-user.css"
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../usersApiSlice";
import { useEffect } from "react";

const AddUser = () => {
  const [addUser, {data, isError, error, isSuccess, isLoading}] = useAddUserMutation()

  const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
      navigate("/dash/users")
    }

  }, [isSuccess])
  const formSubmit = (e) =>{
    e.preventDefault()
      const data = new FormData(e.target)
      const userObject =Object.fromEntries(data.entries())
      console.log(userObject);
      addUser(userObject)
  }

  return (
    <div className="add-user-container">
      <form  onSubmit={formSubmit} className="add-user-form">
        <input type="text" placeholder="username" name="username" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="text" placeholder="firstName" name="firstName" required />
        <input type="text" placeholder="lastName" name="lastName" required />
        <input type="email" placeholder="email" name="email" required />
        {/* <select name="roles" id="roles">
          <option value="User">
            הרשאה
          </option>
          <option value="Admin">מנהל</option>
          <option value="User">משתמש</option>
        </select> */}
        {/* <select name="active" id="active">
          <option value={true}>
            פעיל
          </option>
          <option value={true}>כן</option>
          <option value={false}>לא</option>
        </select> */}
      
        <button type="submit">new user</button>
        {error&& error.data?.message}
      </form>
    </div>
  );
};

export default AddUser;
