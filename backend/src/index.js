const { ApolloServer, gql, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Message = require('./models/Message');
const { subscribe } = require('graphql');

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.6u86t.mongodb.net/<database>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log('Database connected!')
})

let users = []
const subscribers = []
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
    Query: {
        messages: async () => Message.find(),
        users: () => users
    },
    Mutation: {
        addMessage: async (_, { user, content }) => {
            const count = await Message.countDocuments() + 1;
            const id = count;
            await Message.create({
                id,
                user,
                content
            });
            subscribers.forEach((fn) => fn());
            return id;
        },
        connectUser: (_, { user }) => {
            users.push({
                name: user
            })
            return user
        },
        disconnectUser: (_, { user }) => {
            function filterByID(obj) {
                if (obj.name !== user) {
                    return true;
                } else {
                    return false;
                }
            }

            const newUsers = users.filter(filterByID)
            users = newUsers
            return user
        }
    },
    Subscription: {
        messages: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                onMessagesUpdates(async () => {
                    const messages = await Message.find()
                    pubsub.publish(channel, { messages })
                })
                setTimeout(async () => {
                    const messages = await Message.find()
                    pubsub.publish(channel, { messages })
                }, 0)
                return pubsub.asyncIterator(channel);
            }
        },
    }
};

const pubsub = new PubSub();
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ), resolvers, context: { pubsub }
});

// The `listen` method launches a web server.
server.listen('1401').then(({ url }) => {
    console.log(` 🚀  Server ready at ${url} `);
});
