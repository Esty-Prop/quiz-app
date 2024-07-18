import Search from "../../../components/search/Search"
import { useGatAllquizzesQuery, useDeleteQuestionMutation } from "../quizzesApiSlice"
import { Link, useParams,useSearchParams } from "react-router-dom"
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

const QuestionList = () => {
  const { id } = useParams()
  const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllquizzesQuery()
  const [deleteQuestion, { isSuccess: isDeleteSuccess }] = useDeleteQuestionMutation()
  const deleteClick = (ques) => {
    if (window.confirm("Are you sure you want to delete the question?")) {
      deleteQuestion({ _id: ques._id, quizId: id }); // Pass quizId directly
    }
  };
  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")

  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const quiz = quizzesObject.data.find(q => q._id === id)
  const filteredData = !q ? [...quiz.questions] : quiz.questions.filter(quiz => quiz?.title?.indexOf(q) > -1)

  if (!quiz) return <h1>{"Not found"}</h1>


  return (
    <div className="quizzes-list">
      <div className="quizzes-list-top">

      </div>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex' },
          my: 2,
          gap: 1,
        }}
      >
        <Link to={`/dash/quizzes/${id}/add`} className="quizzes-list-add-button">
          add question
        </Link>
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
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
        >
          <thead >
            <tr>
              <th style={{ width: 140, padding: '12px 20px' }}>Name</th>
              <th style={{ width: 250, padding: '12px 20x' }}>Options</th>
              <th style={{ width: 140 }}></th>
            </tr>
          </thead>
          <tbody>
            {Object.values(filteredData).map((quiz) => (
              <tr key={quiz.id}>

                <td>
                  <Typography fontFamily="Montserrat" level="body-md">{quiz.title}</Typography>
                </td>

                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <div>
                      <Chip
                        variant="soft"
                        size="sm"
                        sx={{
                          mb:'2px',
                          minWidth: '100%',

                          textAlign: "left"
                        }}

                        startDecorator={
                          {
                            true: <CheckRoundedIcon />,
                          }[quiz.options[0]?.isCorrect]
                        }
                        color={
                          {
                            true: 'primary',
                          }[quiz.options[0]?.isCorrect]
                        }
                      >
                        {quiz.options[0]?.title}                  </Chip>
                      <Chip
                        variant="soft"
                        size="sm"
                        sx={{
                          mb:'2px',
                          minWidth: '100%',
                       
                          textAlign: "left"
                        }}
                        startDecorator={
                          {
                            true: <CheckRoundedIcon />,
                          }[quiz.options[1]?.isCorrect]
                        }
                        color={
                          {
                            true: 'primary',
                          }[quiz.options[1]?.isCorrect]
                        }
                      >
                        {quiz.options[1]?.title}
                      </Chip>
                      <Chip
                        variant="soft"
                        size="sm"
                        sx={{
                          mb:'2px',
                          minWidth: '100%',
                      
                          textAlign: "left"
                        }}
                        startDecorator={
                          {
                            true: <CheckRoundedIcon />,
                          }[quiz.options[2]?.isCorrect]
                        }
                        color={
                          {
                            true: 'primary',
                          }[quiz.options[2]?.isCorrect]
                        }
                      >
                        {quiz.options[2]?.title}
                      </Chip>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            
                    <Button size="sm" variant="soft" color="danger" onClick={() => { deleteClick(quiz) }} >
                      Delete
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

    </div>
  )
}

export default QuestionList