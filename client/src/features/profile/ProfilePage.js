import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Avatar from '@mui/material/Avatar';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useEffect, useState } from "react";

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useStepContext } from "@mui/material";

import {  useUpdateUserByUserMutation } from "../users/usersApiSlice";

// import './ProfilePage.css'
const ProfilePage = () => {
  const { _id,username, firstName, lastName,email, roles } = useAuth()
  // const [fname,setfname]  = useState(firstName)
  // const [lname,setlname]  = useState(lastName)
  // const [_email,setemail]  = useState(email)
  
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserByUserMutation()


  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const userObject = Object.fromEntries(data.entries())
    console.log(email);
    updateUser({...userObject,_id})
  }
  // const saveProfil = (e) => {
  //   const userObject = {firstName:fname,lastName:lname}

  // }

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
        <form onSubmit={formSubmit} className="single-user-form">
          <label> username</label>
          <input readOnly={true} type="text" name="username" defaultValue={username} />
          <label>name </label>
          <input type="text" name="firstName" placeholder="name " defaultValue={firstName} />
          <label>family </label>
          <input type="text" name="lastName" placeholder=" משפחה " defaultValue={lastName} />
          <label>email</label>
          <input type="email" name="email" placeholder="email " defaultValue={email} />
          <button>update user</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

