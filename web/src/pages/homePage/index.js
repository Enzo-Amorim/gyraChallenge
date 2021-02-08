import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import './index.css';
import Messages from '../../components/Messages';

const ADD_MESSAGE = gql`
    mutation ($user: String!, $content: String!) {
        addMessage(user: $user, content: $content) 
    }
`;

function HomePage({user}) {
    const [message, setMessage] = useState('');
    const [addMessage] = useMutation(ADD_MESSAGE);

    function handleSubmit() {
        if(message !== ''){
        addMessage({
            variables: {
                user: user,
                content: message
            }
        })
        setMessage('')
        }else{
            alert('Digite algo!')
        }
    };
    return (
        <div className="all">
            <div>
                <Messages user={user} />
            </div>
            <div>
                <form htmlFor="message">
                    <input
                        id="message"
                        type="message"
                        placeholder="Digite sua mensagem"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    />

                    <button onClick={handleSubmit} className="btn" type="button">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default HomePage;
