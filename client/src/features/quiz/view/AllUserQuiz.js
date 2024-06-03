import React from 'react'
import Search from "../../../components/search/Search"
import { useGetAllUserQuizByQuizMutation } from "../../userQuiz/userQuizApiSlice"
import { Link, useParams, useSearchParams } from "react-router-dom"
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import { green, pink } from '@mui/material/colors';

import Stack from '@mui/material/Stack';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import QuizIcon from '@mui/icons-material/Quiz';
import { useEffect } from "react";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import useAuth from "../../../hooks/useAuth";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PersonIcon from '@mui/icons-material/Person';
import useAvatarColor from '../../../hooks/useAvatarColor';

const AllUserQuiz = () => {
  const {  quizId } = useParams()
  const [getQuizzes, { data: UserQuizzesObject, isError, error, isLoading, isSuccess }] = useGetAllUserQuizByQuizMutation()

  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")
  const { _id, username, firstName, lastName, email, roles } = useAuth()
  let classNameHolder = ["avatar","orangeAvatar","purpleAvatar"]
                  
                  

  useEffect(() => {
    console.log(quizId);
    if (quizId) {
      getQuizzes({ quizId })

    }
  }, [quizId])
  const AvatarColor=(name)=> {
    return useAvatarColor(name)
  }
  
  if (!isSuccess) return <h4> Loading ...</h4>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const quizzes = UserQuizzesObject.data
  const filteredData = !q ? [...quizzes] : quizzes.filter(quiz => quiz?.quiz?.title.indexOf(q) > -1)
  const avg = Math.round(quizzes.reduce((acc, c) => acc + c.score, 0) / quizzes.length)
  if (!quizzes) return <h1>{"Not found"}</h1>
  return (
    <div>
      
      <Typography sx={{ m: 2, bgcolor: '' }} level="h2">{quizzes[0].quiz.title}</Typography>
      <Typography sx={{ m: 2, bgcolor: '' }} level="body-md">see all users that were takon the quiz </Typography>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Chip color='success' variant="soft" startDecorator={<SportsScoreIcon />}>
          {`avg score ${avg}`}
        </Chip>
        <Chip color='primary' variant="soft" startDecorator={<PersonIcon />}>
          {`${quizzes.length} users`}      </Chip>
      </Box>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex' },
          my: 2,
          gap: 1,
        }}
      >
        {/* <Link to={`/dash/quizzes/${id}/add`} className="quizzes-list-add-button">
          add question
        </Link> */}
        <Search />

      </Sheet>
      <Sheet
        sx={{
          '--TableCell-height': '40px',
          // the number is the amount of the header rows.
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          maxHeight: 500,
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
          aria-label="simple table"
        >
          <thead >
            <tr >
              <th style={{ width:240, padding: '12px 20px' }}>User</th>
              <th style={{ width: 140, padding: '12px 20x' }}>Score</th>
              <th style={{ width: 240, padding: '12px 20x' }}>Answers</th>
              <th style={{ width: 140 }}></th>
            </tr>
          </thead>
          <tbody>
            {Object.values(quizzes).map((quiz) => (
              <tr key={quiz.id} style={{ backgroundColor: 'white' }}>

                <td>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                 
                    <Avatar {...AvatarColor((`${quiz.user.username} `))}  size="sm" >{quiz.user.firstName?.charAt(0)+ quiz.user.lastName?.charAt(0)}</Avatar>
                    <div>
                      <Typography level="body-xs">{`${quiz.user.firstName} ${quiz.user.lastName}`}</Typography>
                      <Typography level="body-xs">{quiz.user.email}</Typography>
                    </div>
                  </Box>                </td>

                <td>
                  {/* <Stack direction="row" spacing={1}>

                <Chip icon={<CloseIcon />} label="With Icon" />
</Stack> */}
                  <Chip
                    variant="soft"
                    size="md"
                    sx={{
                      mb: '2px',
                      pa: '5px',
                      minWidth: '100%',
                      textAlign: "center"
                    }}
                    startDecorator={
                      {
                        true: < EmojiEventsIcon />,
                        false: <EmojiEventsIcon />
                      }[quiz.answers[0]?.isCorrect]
                    }
                    color={
                      {
                        true: 'success',
                      }[quiz.answers[0]?.isCorrect]
                    }
                  >
                    <Typography level="body-sm">{'score ' + quiz.score}</Typography>
                  </Chip>
                </td>
                <td>
                  {quiz.answers.map((ans, index) => (
                    <Chip
                      variant="soft"
                      size="md"
                      sx={{
                        mb: '2px',
                        pa: '5px',
                        minWidth: '100%',
                        textAlign: "left"
                      }}
                      startDecorator={
                        {
                          true: <CheckRoundedIcon />,
                          false: <CloseIcon />
                        }[quiz.answers[0]?.isCorrect]
                      }
                      color={
                        {
                          true: 'primary',
                        }[quiz.answers[0]?.isCorrect]
                      }
                    >
                      <Typography level="body-xs">{ans.ques}</Typography>
                      <Typography level="title-sm">{ans.answer}</Typography>

                    </Chip>

                  ))}
                </td>
                {/* <td>
                  <Typography level="body-md">{quiz.CreatedAt}</Typography>
                </td> */}
                <td>

                  {console.log(quiz.answers)}

                </td>

                {/* <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            
                    <Button size="sm" variant="soft" color="danger" onClick={() => { deleteClick(quiz) }} >
                      Delete
                    </Button>
                  </Box>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  )
}

export default AllUserQuiz
