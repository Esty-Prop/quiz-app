import Search from "../../../components/search/Search"
import { useGatAllUserquizzesQuery } from "../userQuizApiSlice"
import { Link, Navigate, useSearchParams, useNavigate } from "react-router-dom"
import * as React from 'react';
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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const CompletedQuizzes = () => {

  const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllUserquizzesQuery()
  const navigate = useNavigate();
  const navigateClick = (_id,i) => {
    if(i==0)
    navigate(`/dash/quizzes/${_id}`);
  else{
    navigate(`/dash/userQuizzes/view/${_id}`);

  }
  };


  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")

  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const filteredData = !q ? [...quizzesObject.data] : quizzesObject.data.filter(quiz => quiz.quiz?.title?.indexOf(q) > -1)

  return (

    <div>
      {/* <Typography color="primary" fontWeight={500} fontSize={30}>
        My quizzes
      </Typography>
      <Typography color="neutral" fontWeight={200} fontSize={12}>
        Quizzes you delta makefeed jarks if hello for you :)
      </Typography> */}
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex' },
          my: 2,
          gap: 1,
        }}
      >
        <Link to="/dash/quizzes/add" className="quizzes-list-add-button">New quiz <AddRoundedIcon /></Link>

        <Search placeholder="Search by name" />


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
          borderRadius:10
        }}
      >
        <Table
          // aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
        sx={{
          '--TableCell-headBackground': 'var(--bg)',
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
          '--TableCell-paddingY': '4px',
          '--TableCell-paddingX': '8px',
        }}
        >
          <thead  >
            <tr >
             
              <th style={{ width: 140, padding: '12px 6px' }}>Name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
              {/* <th style={{ width: 200, padding: '12px 6px' }}>details</th> */}
              <th style={{ width: 160 }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((quiz) => (
              <tr key={quiz.id}>
               
                <td>
                  <Typography level="body-xs">{quiz.quiz?.title}</Typography>
                </td>
                <td>
                    <Typography level="body-xs"> {quiz.createdAt?.toString().slice(0, 10)}</Typography>
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
                
                {/* <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        true: <CheckRoundedIcon />,
                        // false: <AutorenewRoundedIcon />,
                        false: <BlockIcon />,
                      }[quiz.isActive]
                    }
                    color={
                      {
                        true: 'success',
                        // false: 'neutral',
                        false: 'danger',
                      }[quiz.isActive]
                    }
                  >
                    {quiz.isActive ? 'Uploud' : 'Draft'}
                  </Chip>
                </td> */}
                {/* <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{quiz.questions?.length}</Avatar>
                    <div>
                      <Typography level="body-xs">activity 80</Typography>
                      <Typography level="body-xs">avg 60%</Typography>
                    </div>
                  </Box>
                </td> */}
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button size="sm" variant="outlined" color="primary" onClick={() => { navigateClick(quiz._id,1) }}>
                      View Answers
                    </Button>
                   
                    {/* <RowMenu /> */}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet></div>)
}


export default CompletedQuizzes


