import React from 'react'
import { useSubscription, gql } from '@apollo/client';

const GET_MESSAGES = gql`
    subscription {
        messages {
        id
        user
        content
    }
    }
`;

function Messages({ user }) {
    const { data } = useSubscription(GET_MESSAGES);
    if(!data) {
        return null;
    }

    return (
        <div>
        {data.messages.map(({user: messageSender, content }) => (
            <div style={{
                display: 'flex',
                justifyContent: user === messageSender ? 'flex-end' : 'flex-start',
                paddingBottom: "2em",
            }}>
                <div style={{
                    background: user === messageSender ? "#f05a5b" : "#FFF",
                    color: user === messageSender ? "#FFF" : "#f05a5b",
                    fontSize: '1.2em',
                    padding: '0.5em',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '60%'
                }}>
                    <label style={{
                        color: user === messageSender ? "#FFF" : "#f05a5b",
                        paddingBottom: '0.6em',
                    }}><strong>{user === messageSender ? user : messageSender}</strong></label>
                    {content}
                </div>
            </div>
        ))}
        </div>
    )
}

export default Messages
