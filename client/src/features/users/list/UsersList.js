import React, { useEffect } from 'react'
import Search from '../../../components/search/Search';
import { Link, useSearchParams,useNavigate } from 'react-router-dom';
import "./users-list.css"
import { useGetAllUsersQuery, useDeleteUserMutation } from '../usersApiSlice';
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

const UsersList = () => {
  const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery()
  const [deleteUser, { isSuccess: isDeleteSuccess }] = useDeleteUserMutation()
  const deleteClick = (user) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      deleteUser({ _id: user._id })
    }

  }
  const navigate = useNavigate();

  const navigateClick = (_id) => {
    navigate(`/dash/users/${_id}`);
  };
  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")

  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const filteredData = !q ? [...usersObject.data] : usersObject.data.filter(user => user?.firstName?.indexOf(q) > -1 || user?.lastName?.indexOf(q) > -1|| user?.username?.indexOf(q) > -1)
  return (
    <div className="users-list">
      <div>
      <Typography color="primary" fontWeight={500} fontSize={30}>
        Users
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
        <Link to="/dash/users/add" className="quizzes-list-add-button">New User <AddRoundedIcon /></Link>

        <Search placeholder="Search by name or Username" />

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
          <thead style={{ backgroundColor: 'red' }}>
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
              <th style={{ width: 100, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 260, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 120, padding: '12px 6px' }}>details</th>
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
                  <Typography level="body-xs">{quiz.username}</Typography>
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
                      }[quiz.roles]
                    }
                    color={
                      {
                        User: 'success',
                        Admin: 'primary',
                      }[quiz.roles]
                    }
                  >
                    {quiz.roles}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{quiz.firstName.charAt(0)+ quiz.lastName.charAt(0)}</Avatar>
                    <div>
                      <Typography level="body-xs">{`${quiz.firstName} ${quiz.lastName}`}</Typography>
                      <Typography level="body-xs">{quiz.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Typography level="body-xs"> {quiz.createdAt?.toString().slice(0, 10)}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button size="sm" variant="outlined" color="primary" onClick={() => { navigateClick(quiz._id) }}>
                      View
                    </Button>
                    <Button size="sm" variant="plain" color="neutral" onClick={() => { navigateClick(quiz._id) }}>
                      Edit
                    </Button>
                    <Button size="sm" variant="soft" color="danger" onClick={() => { deleteClick(quiz) }} >
                      Delete
                    </Button>
                    {/* <RowMenu /> */}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet></div>
      <div className="users-list-top">
        <Search placeholder="Search for a user..." />
        <Link className="users-list-add-button" to="/dash/users/add">add user</Link>
      </div>
      <table className="users-list-table">
        <thead>
          <tr>
            <td>name</td>
            <td>username </td>
            <td>email</td>
            <td>createdAt</td>
            <td>roles</td>
            {/* <td>פעיל</td> */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id} className="users-list-item" >
              <td>
                <div className="users-list-user">
                  {`${user.firstName} ${user.lastName}`}
                </div>
              </td>
              <td>{user.username}</td>

              <td>{user.email}</td>

              <td>{user.createdAt?.toString().slice(0, 10)}</td>
              <td>{user.roles === "Admin" ? "מנהל" : "משתמש"}</td>
              {/* <td>{user.active ? "כן" : "לא"}</td> */}
              <td>
                <div className="users-list-buttons">
                  <Link className='users-list-button users-list-view' to={`/dash/users/${user._id}`}>
                    view                  </Link>
                  <button onClick={() => deleteClick(user)} className="users-list-button users-list-delete">
                    delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList