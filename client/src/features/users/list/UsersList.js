import React, { useEffect } from 'react'
import Search from '../../../components/search/Search';
import { Link, useSearchParams } from 'react-router-dom';
import "./users-list.css"
import { useGetAllUsersQuery, useDeleteUserMutation } from '../usersApiSlice';

const UsersList = () => {
  const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery()
  const [deleteUser, { isSuccess: isDeleteSuccess }] = useDeleteUserMutation()
  const deleteClick = (user) => {
    if (window.confirm("בטוח שברצונך למחוק את החברה?")) {
      deleteUser({ _id: user._id })
    }

  }

  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")

  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const filteredData = !q ? [...usersObject.data] : usersObject.data.filter(user => user?.firstName?.indexOf(q) > -1 || user?.lastName?.indexOf(q) > -1)
  return (
    <div className="users-list">
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