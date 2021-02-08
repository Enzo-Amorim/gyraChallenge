import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

import './index.css'

const CONNECT_USER = gql`
    mutation ($user: String!) {
        connectUser(user: $user)
    }
`


function LoginPage() {
    const [connectUser] = useMutation(CONNECT_USER)
    const [user, setUser] = useState('')

    function handleSubmit() {
        localStorage.setItem('user', user)
        connectUser({
            variables: {
                user: user,
            }
        })
    }
    return (
        <div>
            <h2 className="loginTitle">Faça o Login</h2>
            <label><strong>Nome*</strong></label>
            <form htmlFor="user" onSubmit={handleSubmit}>
                <input
                    id="user"
                    type="user"
                    placeholder="Digite seu nome de usuario"
                    value={user}
                    onChange={event => setUser(event.target.value)}
                />

                <button className="btn" type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default LoginPage
