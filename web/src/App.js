import React from 'react'
import './App.css'
import {
  useMutation,
  gql,
  useQuery
} from '@apollo/client';

import HomePage from './pages/homePage';
import LoginPage from './pages/LoginPage'

const DISCONNECT_USER = gql`
mutation ($user: String!) {
  disconnectUser(user: $user) 
}
`
const GET_USERS = gql`
query {
  users{
    name
  }
}
`
const CONNECT_USER = gql`
  mutation ($user: String!) {
      connectUser(user: $user)
  }
`

function App() {
  const [connectUser] = useMutation(CONNECT_USER)
  const [disconnectUser] = useMutation(DISCONNECT_USER)
  const { loading, error, data } = useQuery(GET_USERS, {
    pollInterval: 500,
  })

  const username = localStorage.getItem('user');

  if (loading) return null;
  if (error) return <h2>{`Error! ${error}`}</h2>;

  const usersData = data.users

  function handleDisconnect() {
    localStorage.removeItem('user');
    disconnectUser({
      variables: {
        user: username
      }
    })
    window.location.reload();
  }

  return (
    <div className="container">
      {username !== null ? <button className="logoutButton" onClick={handleDisconnect}>Logout</button> : null}
      <div className="usersContainer">
        <h1>Usuarios já conectados:</h1>
        {usersData.map((user) => (
          <h2 key={user.name} style={{
            color: user.name === username ? "#f05a5b" : "#FFF",
          }}>{user.name}</h2>
        ))}
      </div>
      <div className="content">
        {username !== null ? <HomePage user={username} /> : <LoginPage />}
      </div>
    </div>
  );
}

export default App;
