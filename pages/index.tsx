import Head from "next/head";
import Layout from "components/Layout";
import styled from "styled-components";
import NewsFeedCardElement from "components/NewsFeedCardElement";
import db, { UserRow, ProjectRow, AnnouncementRow } from "../graphql/db";
// import { useQuery, gql } from "@apollo/client";
import { useQuery, gql } from "@apollo/react-hooks";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

const NEWSFEED_QUERY = gql`
  query newsfeed($offset: Int!) {
    newsfeed(offset: $offset) {
      id
      fellowship
      feed_type
      image_url
      title
      body
      created_ts
      updated_ts
    }
  }
`;

type QueryData = {
  newsfeed: NewsFeed;
};

type QueryVars = {
  offset: number;
};

export type NewsFeed = {
  id: number;
  fellowship: string;
  feed_type: string;
  image_url: string;
  title: string;
  body: string;
  created_ts: Date;
  updated_ts: Date;
};

export default function Home() {
  const [fellowship, setFellowship] = useState("0");
  const [off, setOff] = useState(0);

  const { data, error, loading, refetch } = useQuery(
    gql`
      query newsfeed($offset: Int!) {
        newsfeed(offset: $offset) {
          id
          fellowship
          feed_type
          image_url
          title
          body
          created_ts
          updated_ts
        }
      }
    `,
    {
      variables: { offset: off },
    }
  );

  // useEffect(() => {
  //   refetch({ variables: { offset: off } });
  // }, [off]);

  let newsfeed = data ? data.newsfeed : [];

  console.log(newsfeed);

  const renderNewsCards = (newsFeeds) => {
    if (newsFeeds)
      return newsFeeds.map((news) => (
        <NewsFeedCardElement
          newsFeed={news}
          key={news.id}
          fellowship={fellowship}
        />
      ));
    else return null;
  };

  console.log(off);

  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <FellowshipDropDown
        value={fellowship}
        onChange={(e) => {
          setFellowship(e.target.value);
        }}
      >
        <option value="0" selected disabled hidden>
          Select Fellowship
        </option>
        <option value="founders">OnDeck Founder</option>
        <option value="angels">OnDeck Angel</option>
        <option value="writers">OnDeck Writer</option>
      </FellowshipDropDown>
      <NewsFeedList>
        {fellowship != "0" && newsfeed && renderNewsCards(newsfeed)}
      </NewsFeedList>
    </Layout>
  );
}

const FellowshipDropDown = styled.select`
  width: 20rem;
  background-color: #eee;
  padding: 0.5rem;
  border-radius: 1rem;
`;

const NewsFeedList = styled.div`
  border-left: 0.5px solid #ccc;
  border-right: 0.5px solid #ccc;
  width: 50rem;
  height: 60rem;
  overflow: scroll;
`;
