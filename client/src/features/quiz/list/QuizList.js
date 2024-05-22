// import Search from "../../../components/search/Search"
// import { useGatAllquizzesQuery,useDeleteQuizMutation } from "../quizzesApiSlice"
// import { Link,useSearchParams } from "react-router-dom"

// import './Quiz_List.css'
// const QuizList = () => {
//     const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllquizzesQuery()
//        const [deleteQuiz,{isSuccess: isDeleteSuccess}] = useDeleteQuizMutation()
//     const deleteClick = (quiz) =>{
//         if(window.confirm ("בטוח שברצונך למחוק את המבחן?")){
//             deleteQuiz({_id: quiz._id})
//         }
//     }

//   const [searchParams] = useSearchParams()
//   const q = searchParams.get("q")

//     if (isLoading) return <h1> Loading ...</h1>
//     if (isError) return <h1>{JSON.stringify(error)}</h1>
//     const filteredData = !q?[...quizzesObject.data] : quizzesObject.data.filter(quiz=>quiz?.title?.indexOf(q)> -1)

//     return (
//         <div className="quizzes-list">
//             <div className="quizzes-list-top">
//                 <Search placeholder="Search by name" />
//                 <Link to="/dash/quizzes/add" className="quizzes-list-add-button">Add quiz</Link>
//             </div>
//             <table className="quizzes-list-table">
//                 <thead>
//                     <tr>
//                         <td>Name </td>
//                         <td> CreatedAt</td>
//                         <td>Status</td>
//                         {/* <td>מחבר </td> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredData?.map(quiz => (
//                         <tr key={quiz._id}>
//                             <td>
//                                 <div className="quizzes-list-company">
//                                     {/* <img
//                                         // src={quiz.image || "/noavatar.png"}
//                                         src={"/noavatar.png"}

//                                         alt=""
//                                         width={40}
//                                         height={40}
//                                         className="quizzes-list-company-image" /> */}
//                                     {quiz.title}
//                                 </div>
//                             </td>
//                             <td>
//                                 {quiz.createdAt?.toString().slice(0, 10)}
//                             </td>
//                             <td>
//                                 {quiz.isActive ? "uploud" : "private"}
//                             </td>
//                             <td>
//                                 {/* {quiz.active? "פעיל " : "לא פעיל"} */}
//                                 {/* {quiz.user.firstName} */}
//                                 {quiz.isActive}

//                             </td>
//                             <td>

//                                 <div className="quizzes-list-buttons">

//                                     {/* {quiz.title} */}
//                                     {/* {quiz.questions[0]?.title}
// {quiz.questions[0]?.options[0]?.title }
// {quiz.questions[0]?.title} */}


//                                     <Link to={`/dash/quizzes/${quiz._id}`} className="quizzes-list-button quizzes-list-view">
//                                         edit
//                                     </Link>
//                                     <button onClick={()=>{deleteClick(quiz)}}  className="quizzes-list-button quizzes-list-delete">
//                                 delete
//                             </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default QuizList
import Search from "../../../components/search/Search"
import { useGatAllquizzesQuery,useDeleteQuizMutation } from "../quizzesApiSlice"
import { Link,Navigate,useSearchParams,useNavigate } from "react-router-dom"

import './Quiz_List.css'












import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
// import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
const QuizList = () => {

    const rows = [
        {
          id: 'INV-1234',
          date: 'Feb 3, 2023',
          status: 'Refunded',
          customer: {
            initial: 'O',
            name: 'Olivia Ryhe',
            email: 'olivia@email.com',
          },
        },
        {
          id: 'INV-1233',
          date: 'Feb 3, 2023',
          status: 'Paid',
          customer: {
            initial: 'S',
            name: 'Steve Hampton',
            email: 'steve.hamp@email.com',
          },
        },
        {
          id: 'INV-1232',
          date: 'Feb 3, 2023',
          status: 'Refunded',
          customer: {
            initial: 'C',
            name: 'Ciaran Murray',
            email: 'ciaran.murray@email.com',
          },
        },
        {
          id: 'INV-1231',
          date: 'Feb 3, 2023',
          status: 'Refunded',
          customer: {
            initial: 'M',
            name: 'Maria Macdonald',
            email: 'maria.mc@email.com',
          },
        },
        {
          id: 'INV-1230',
          date: 'Feb 3, 2023',
          status: 'Cancelled',
          customer: {
            initial: 'C',
            name: 'Charles Fulton',
            email: 'fulton@email.com',
          },
        },
        {
          id: 'INV-1229',
          date: 'Feb 3, 2023',
          status: 'Cancelled',
          customer: {
            initial: 'J',
            name: 'Jay Hooper',
            email: 'hooper@email.com',
          },
        },
        {
          id: 'INV-1228',
          date: 'Feb 3, 2023',
          status: 'Refunded',
          customer: {
            initial: 'K',
            name: 'Krystal Stevens',
            email: 'k.stevens@email.com',
          },
        },
        {
          id: 'INV-1227',
          date: 'Feb 3, 2023',
          status: 'Paid',
          customer: {
            initial: 'S',
            name: 'Sachin Flynn',
            email: 's.flyn@email.com',
          },
        },
        {
          id: 'INV-1226',
          date: 'Feb 3, 2023',
          status: 'Cancelled',
          customer: {
            initial: 'B',
            name: 'Bradley Rosales',
            email: 'brad123@email.com',
          },
        },
        {
          id: 'INV-1225',
          date: 'Feb 3, 2023',
          status: 'Paid',
          customer: {
            initial: 'O',
            name: 'Olivia Ryhe',
            email: 'olivia@email.com',
          },
        },
        {
          id: 'INV-1224',
          date: 'Feb 3, 2023',
          status: 'Cancelled',
          customer: {
            initial: 'S',
            name: 'Steve Hampton',
            email: 'steve.hamp@email.com',
          },
        },
        {
          id: 'INV-1223',
          date: 'Feb 3, 2023',
          status: 'Paid',
          customer: {
            initial: 'C',
            name: 'Ciaran Murray',
            email: 'ciaran.murray@email.com',
          },
        },
        {
          id: 'INV-1221',
          date: 'Feb 3, 2023',
          status: 'Refunded',
          customer: {
            initial: 'M',
            name: 'Maria Macdonald',
            email: 'maria.mc@email.com',
          },
        },
        {
          id: 'INV-1220',
          date: 'Feb 3, 2023',
          status: 'Paid',
          customer: {
            initial: 'C',
            name: 'Charles Fulton',
            email: 'fulton@email.com',
          },
        },
        {
          id: 'INV-1219',
          date: 'Feb 3, 2023',
          status: 'Cancelled',
          customer: {
            initial: 'J',
            name: 'Jay Hooper',
            email: 'hooper@email.com',
          },
        },
        {
          id: 'INV-1218',
          date: 'Feb 3, 2023',
          status: 'Cancelled',
          customer: {
            initial: 'K',
            name: 'Krystal Stevens',
            email: 'k.stevens@email.com',
          },
        },
        {
          id: 'INV-1217',
          date: 'Feb 3, 2023',
          status: 'Paid',
          customer: {
            initial: 'S',
            name: 'Sachin Flynn',
            email: 's.flyn@email.com',
          },
        },
        {
          id: 'INV-1216',
          date: 'Feb 3, 2023',
          status: 'Cancelled',
          customer: {
            initial: 'B',
            name: 'Bradley Rosales',
            email: 'brad123@email.com',
          },
        },
      ];
      
    const { data: quizzesObject, isError, error, isLoading, isSuccess } = useGatAllquizzesQuery()
       const [deleteQuiz,{isSuccess: isDeleteSuccess}] = useDeleteQuizMutation()
  const navigate = useNavigate();
  const navigateClick = (_id) => {
    // e.preventDefault();
    navigate(`/dash/quizzes/${_id}`);
  };
    const deleteClick = (quiz) =>{
        if(window.confirm ("בטוח שברצונך למחוק את המבחן?")){
            deleteQuiz({_id: quiz._id})
        }
    }



  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")

    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const filteredData = !q?[...quizzesObject.data] : quizzesObject.data.filter(quiz=>quiz?.title?.indexOf(q)> -1)

    return (

        // <div className="quizzes-list">
        <div> 
          <Typography  color="primary" fontWeight={500} fontSize={30}>
                Quizzes
              </Typography>
              <Typography color="neutral" fontWeight={200} fontSize={12}>
                Quizzes you delta makefeed jarks if hello for you :) 
              </Typography>
    <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex' },
          my: 2,
          gap: 1,
        }}
      >
                        <Link to="/dash/quizzes/add" className="quizzes-list-add-button">New quiz <AddRoundedIcon/></Link>

      <Search placeholder="Search by name" />

        {/* <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          // onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton> */}

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
          // sx={{
          //   '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
          //   '--Table-headerUnderlineThickness': '1px',
          //   '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
          //   '--TableCell-paddingY': '4px',
          //   '--TableCell-paddingX': '8px',
          // }}
        >
          <thead style={{backgroundColor: 'red'}}>
            <tr>
                {/* <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
              <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th> */}
              {/*<th style={{ width: 120, padding: '12px 6px' }}>
                 <Link
                  underline="none"
                  color="primary"
                  component="button"
                //   onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                    //   transform:
                    //     order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Invoice
                </Link> 
              </th>*/}
              <th style={{ width: 140, padding: '12px 6px' }}>Name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 200, padding: '12px 6px' }}>details</th>
              <th style={{ width: 250 }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((quiz) => (
              <tr key={quiz.id}>
                 {/*<td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    // checked={selected.includes(row.id)}
                    // color={selected.includes(row.id) ? 'primary' : undefined}
                    // onChange={(event) => {
                    //   setSelected((ids) =>
                    //     event.target.checked
                    //       ? ids.concat(row.id)
                    //       : ids.filter((itemId) => itemId !== row.id),
                    //   );
                    // }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  /> 
                </td>*/}
                <td>
                  <Typography level="body-xs">{quiz.title}</Typography>
                </td>
                <td>
                  <Typography level="body-xs"> {quiz.createdAt?.toString().slice(0, 10)}</Typography>
                </td>
                <td>
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
                    {quiz.isActive?'Uploud':'Draft'}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{quiz.questions.length}</Avatar>
                    <div>
                      <Typography level="body-xs">activity 80</Typography>
                      <Typography level="body-xs">avg 60%</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Button size="sm" variant="outlined" color="primary" onClick={()=>{navigateClick(quiz._id)}}>
                      View
                    </Button>
                  <Button size="sm" variant="plain" color="neutral" onClick={()=>{navigateClick(quiz._id)}}>
                      Edit
                    </Button>
                    <Button size="sm" variant="soft" color="danger" onClick={()=>{deleteClick(quiz)}} >
                      Delete
                    </Button>
                    {/* <RowMenu /> */}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet></div>)
           {/*   <div className="quizzes-list-top">
                <Search placeholder="Search by name" />
                <Link to="/dash/quizzes/add" className="quizzes-list-add-button">Add quiz</Link>
            </div>
           <table className="quizzes-list-table">
                <thead>
                    <tr>
                        <td>Name </td>
                        <td> CreatedAt</td>
                        <td>Status</td>
                        {/* <td>מחבר </td> }
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(quiz => (
                        <tr key={quiz._id}>
                            <td>
                                <div className="quizzes-list-company">
                                    {/* <img
                                        // src={quiz.image || "/noavatar.png"}
                                        src={"/noavatar.png"}

                                        alt=""
                                        width={40}
                                        height={40}
                                        className="quizzes-list-company-image" /> }
                                    {quiz.title}
                                </div>
                            </td>
                            <td>
                                {quiz.createdAt?.toString().slice(0, 10)}
                            </td>
                            <td>
                                {quiz.isActive ? "uploud" : "private"}
                            </td>
                            <td>
                                {/* {quiz.active? "פעיל " : "לא פעיל"} */}
                                /* {quiz.user.firstName} }
                                {quiz.isActive}

                            </td>
                            <td>

                                <div className="quizzes-list-buttons">

                                    {/* {quiz.title} */}
                                    {/* {quiz.questions[0]?.title}
{quiz.questions[0]?.options[0]?.title }
{quiz.questions[0]?.title} }


                                    <Link to={`/dash/quizzes/${quiz._id}`} className="quizzes-list-button quizzes-list-view">
                                        edit
                                    </Link>
                                    <button onClick={()=>{deleteClick(quiz)}}  className="quizzes-list-button quizzes-list-delete">
                                delete
                            </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        // </div> */}
    


export default QuizList