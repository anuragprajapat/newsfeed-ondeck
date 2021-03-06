import { ApolloServer, gql } from "apollo-server-micro";
import * as resolvers from "./resolvers";

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
    created_ts: String!
    updated_ts: String!
  }

  type NewsFeed {
    id: Int!
    fellowship: String!
    feed_type: String!
    image_url: String
    title: String
    body: String
    created_ts: String!
    updated_ts: String!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    announcement(id: Int!): Announcement!
    newsfeed(offset: Int!): [NewsFeed]
  }
`;

export const server = new ApolloServer({ typeDefs, resolvers });
