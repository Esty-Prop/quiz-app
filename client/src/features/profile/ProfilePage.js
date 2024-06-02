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


// import './ProfilePage.css'
const ProfilePage = () => {
  const { userId } = useParams()
  const { username, firstName, lastName, roles, email } = useAuth()
  const [fname,setfname]  = useState(firstName)
  const [lname,setlname]  = useState(lastName)
  const [_email,setemail]  = useState(email)


  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const userObject = Object.fromEntries(data.entries())
  }
  const saveProfil = (e) => {
    const userObject = {firstName:fname,lastName:lname}

  }

  return (
    <div className="single-user-container">
      <Box sx={{ flex: 1, width: '100%' }}>
        <Box
          sx={{
            position: 'sticky',
            top: { sm: -100, md: -110 },
            // bgcolor: 'background.body',
            zIndex: 9995,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="/dash"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="/dash/users"
                fontSize={12}
                fontWeight={500}
              >
                Users
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                My profile
              </Typography>
            </Breadcrumbs>
            <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
              My profile
            </Typography>
          </Box>
        </Box>
        <Stack
          spacing={4}
          sx={{
            display: 'flex',
            maxWidth: '800px',
            // mx: 'auto',
            // px: { xs: 2, md: 6 },
            // py: { xs: 2, md: 3 },
          }}
        >
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">{username}</Typography>
              <Typography level="body-sm">
{roles}              </Typography>
            </Box>
            <Divider />
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
            >
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={200}
                  sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                >
              <Avatar sx={{ border: 3, width: 80, height: 80, bgcolor: 'pink' }}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>

                  {/* <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  /> */}
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: 'background.body',
                    position: 'absolute',
                    zIndex: 2,
                    borderRadius: '50%',
                    left: 100,
                    top: 170,
                    boxShadow: 'sm',
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                  >
                    <Input size="sm" placeholder="First name" defaultValue={firstName} onChange={(e)=>{setfname(e.target.value)}}/>
                    <Input size="sm" placeholder="Last name" defaultValue={lastName} sx={{ flexGrow: 1 }} onChange={(e)=>{setlname(e.target.value)}} />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>

                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="sm"
                      type="email"
                      startDecorator={<EmailRoundedIcon />}
                      placeholder="email"
                      name="email"
                      defaultValue={email}
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                </Stack>
                {/* <div>
                <CountrySelector />
              </div> */}
                <div>
                  {/* <FormControl sx={{ display: { sm: 'contents' } }}>
                    <FormLabel>Timezone</FormLabel>
                    <Select
                      size="sm"
                      startDecorator={<AccessTimeFilledRoundedIcon />}
                      defaultValue="1"
                    >
                      <Option value="1">
                        Indochina Time (Bangkok){' '}
                        <Typography textColor="text.tertiary" ml={0.5}>
                          — GMT+07:00
                        </Typography>
                      </Option>
                      <Option value="2">
                        Indochina Time (Ho Chi Minh City){' '}
                        <Typography textColor="text.tertiary" ml={0.5}>
                          — GMT+07:00
                        </Typography>
                      </Option>
                    </Select>
                  </FormControl> */}
                </div>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
            >
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1}>
                  <AspectRatio
                    ratio="1"
                    maxHeight={108}
                    sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                      srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <IconButton
                    aria-label="upload new picture"
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    sx={{
                      bgcolor: 'background.body',
                      position: 'absolute',
                      zIndex: 2,
                      borderRadius: '50%',
                      left: 85,
                      top: 180,
                      boxShadow: 'sm',
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Stack>
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      display: {
                        sm: 'flex-column',
                        md: 'flex-row',
                      },
                      gap: 2,
                    }}
                  >
                    <Input size="sm" placeholder="First name" />
                    <Input size="sm" placeholder="Last name" />
                  </FormControl>
                </Stack>
              </Stack>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input size="sm" defaultValue="UI Developer" />
              </FormControl>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <Input
                  size="sm"
                  type="email"
                  startDecorator={<EmailRoundedIcon />}
                  placeholder="email"
                  defaultValue="siriwatk@test.com"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
              {/* <div>
              <CountrySelector />
            </div> */}
              <div>
                {/* <FormControl sx={{ display: { sm: 'contents' } }}>
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    size="sm"
                    startDecorator={<AccessTimeFilledRoundedIcon />}
                    defaultValue="1"
                  >
                    <Option value="1">
                      Indochina Time (Bangkok){' '}
                      <Typography textColor="text.tertiary" ml={0.5}>
                        — GMT+07:00
                      </Typography>
                    </Option>
                    <Option value="2">
                      Indochina Time (Ho Chi Minh City){' '}
                      <Typography textColor="text.tertiary" ml={0.5}>
                        — GMT+07:00
                      </Typography>
                    </Option>
                  </Select>
                </FormControl> */}
              </div>
            </Stack>
            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral">
                  Cancel
                </Button>
                <Button size="sm" variant="solid">
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>

          {/* <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Portfolio projects</Typography>
              <Typography level="body-sm">
                Share a few snippets of your work.
              </Typography>
            </Box>
            <Divider />
            <Stack spacing={2} sx={{ my: 1 }}>
              {/* <DropZone /> */}
              {/* <FileUpload
              icon={<InsertDriveFileRoundedIcon />}
              fileName="Tech design requirements.pdf"
              fileSize="200 kB"
              progress={100}
            /> */}
              {/* <FileUpload
              icon={<VideocamRoundedIcon />}
              fileName="Dashboard prototype recording.mp4"
              fileSize="16 MB"
              progress={40}
            /> 
            </Stack>
            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral">
                  Cancel
                </Button>
                <Button size="sm" variant="solid">
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card> */}
        </Stack>
      </Box>
      {/* <div className="single-user-info">
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
      </div> */}
    </div>
  );
};

export default ProfilePage;

