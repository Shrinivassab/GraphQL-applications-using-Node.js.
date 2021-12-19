import { GraphQLServer } from "graphql-yoga";

// Demo user Data
const users = [{
   id: '1',
   name: 'Shrini',
   email: 'shrini@gmail.com',
   age: 29,

}, {
    id: '2',
    name: 'Vass',
    email: 'vass@gmail.com',
    age: 25
}, {
    id: '3',
    name: 'karnan',
    email: 'karnan@gmail.com',
    age: 25
}];

// Demo post data
const posts = [{
    id: "1",
    title: "English",
    body: "English class",
    published: true,
    author: "1"
},{
    id: "2",
    title: "Tamil",
    body: "Tamil class",
    published: true,
    author: "1"
},{
    id: "3",
    title: "Math",
    body: "Math class",
    published: false,
    author: "2"
}];

const comments = [{
    id: '1',
    text: "Nice book"
},{
    id: '2',
    text: "Good book"
},{
    id: '3',
    text: "Nice book for frontend"
},{
    id: '4',
    text: "Nice book for backend"
}];
// Type definition (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int,
        posts: [Post!]!
    }
    
    type Comment {
        id: ID!
        text: String!
    }
`

// Resolver
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        me() {
            return {
                id: '123123123',
                name: 'Shrini',
                email: 'shri@gmail.com',
                age: 34
            }
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }

            return posts.filter((post) => {
               return (post.title.includes(args.query) || post.body.includes(args.query));
            });
        },
        comments(parent, args, ctx, info) {
            return comments;
        }
    },
    Post: {
        author(parents, args, ctx, info) {
            return users.find((user) => {
               return user.id === parents.author
            });
        }
    },
    User: {
        posts(parents, args, ctx, info) {

        }
    }
}

// Declare the server
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up');
})
