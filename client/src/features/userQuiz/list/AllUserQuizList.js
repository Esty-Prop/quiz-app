import React, { useEffect } from 'react'
import Search from '../../../components/search/Search';
import { Link, useSearchParams,useNavigate } from 'react-router-dom';
import { useGatAllUserquizzesQuery  } from '../userQuizApiSlice';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import useAvatarColor from '../../../hooks/useAvatarColor';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const AllUserQuizList = () => {

    const { data: usersObject, isError, error, isLoading, isSuccess } = useGatAllUserquizzesQuery()
    
    const navigate = useNavigate();
  
    const navigateClick = (_id,i) => {
      if(i==0)
      navigate(`/dash/users/${_id}`);
    else{
      navigate(`/dash/userQuizzes/view/${_id}`);
  
    }
    };
    const AvatarColor=(name)=> {
      return useAvatarColor(name)
    }
    
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
  
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const filteredData = !q ? [...usersObject.data] : usersObject.data.filter(quiz => quiz.user?.firstName?.indexOf(q) > -1 || quiz.user?.lastName?.indexOf(q) > -1|| quiz.quiz?.title?.indexOf(q) > -1)
  
    return (
      <div className="users-list">
        <div>
        <Typography color="primary" fontWeight={500} fontSize={30}>
          Users quizzes
        </Typography>
        <Typography color="neutral" fontWeight={200} fontSize={12}>
          see and manage all uey users
        </Typography>
        <Sheet
          className="SearchAndFilters-mobile"
          sx={{
            display: { xs: 'flex' },
            my: 2,
            gap: 1,
          }}
        >
          <Link to="/dash/quizzes/add" className="quizzes-list-add-button">New Quiz <AddRoundedIcon /></Link>
  
          <Search placeholder="Search by name or Username" />
  
         
        </Sheet>
        <Sheet
          sx={{
            '--TableCell-height': '40px',
            // the number is the amount of the header rows.
            '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
            height: 500,
            overflow: 'auto',
            background: (theme) =>
              `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
              linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
              radial-gradient(
                farthest-side at 50% 0,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              ),
              radial-gradient(
                  farthest-side at 50% 100%,
                  rgba(0, 0, 0, 0.12),
                  rgba(0, 0, 0, 0)
                )
                0 100%`,
            backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'local, local, scroll, scroll',
            backgroundPosition:
              '0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%',
            backgroundColor: 'background.surface',
          }}
  
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow

          >
            <thead style={{ backgroundColor: 'red' }}>
              <tr>
                <th style={{ width: 100, padding: '12px 6px' }}>Username</th>
                <th style={{ width: 100, padding: '12px 6px' }}>Score</th>
                <th style={{ width: 100, padding: '12px 6px' }}>Quiz</th>

                <th style={{ width: 200, padding: '12px 6px' }}>User</th>
                <th style={{ width: 120, padding: '12px 6px' }}>Date</th>
                <th style={{ width: 120 }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((quiz) => (
                <tr key={quiz.id}>
            
                  <td>
                    <Typography level="body-xs">{quiz.user.username}</Typography>
                  </td>
                 
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={< EmojiEventsIcon/>}
                      color={
                     'success'
                      }
                    >
                      {quiz.score}
                    </Chip>
                  </td>
                  <td>
                    <Typography level="body-xs"> {quiz.quiz?.title}</Typography>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Avatar  {...AvatarColor((`${quiz.user.username} `))} size="sm">{quiz.user.firstName.charAt(0)+ quiz.user.lastName.charAt(0)}</Avatar>
                      <div>
                        <Typography level="body-xs">{`${quiz.user.firstName} ${quiz.user.lastName}`}</Typography>
                        <Typography level="body-xs">{quiz.user.email}</Typography>
                      </div>
                    </Box>
                  </td>
                  <td>
                    <Typography level="body-xs"> {quiz.createdAt?.toString().slice(0, 10)}</Typography>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Button size="sm" variant="outlined" color="primary" onClick={() => { navigateClick(quiz._id,1) }}>
                        view answers
                      </Button>
                      {/* <Button size="sm" variant="plain" color="neutral" onClick={() => { navigateClick(quiz._id,0) }}>
                        Edit
                      </Button> */}
                     
                      
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet></div>

      </div>
    );
  
}

export default AllUserQuizList