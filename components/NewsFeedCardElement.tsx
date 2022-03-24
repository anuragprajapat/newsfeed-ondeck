import newsfeed from "graphql/resolvers/Query/newsfeed";
import styled from "styled-components";

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

export default function NewsFeedCardElement({
  newsFeed,
  fellowship,
}: {
  newsFeed: NewsFeed;
  fellowship: string;
}) {
  console.log(newsFeed.fellowship, fellowship);
  if (
    newsFeed.fellowship.includes(fellowship) ||
    newsFeed.fellowship == "all" ||
    fellowship == newsFeed.title
  ) {
    return (
      <NewsFeedCard>
        <NewsCardLeftSegement>
          {newsFeed.image_url && <Avatar src={newsFeed.image_url} />}
        </NewsCardLeftSegement>
        <NewsCardRightSegement>
          <NewsCardTitle>
            {newsFeed.title == "founders"
              ? "Say Hi to new founder"
              : newsFeed.title == "writers"
              ? "Say Hi to new writer"
              : newsFeed.title == "angels"
              ? "Say Hi to new angel"
              : newsFeed.title}
          </NewsCardTitle>
          <NewsCardDescription>{newsFeed.body}</NewsCardDescription>
          <NewsCardTS>{newsFeed.updated_ts}</NewsCardTS>
        </NewsCardRightSegement>
      </NewsFeedCard>
    );
  } else {
    return null;
  }
}
const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 3rem;
  height: 3rem;
`;

const NewsFeedCard = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 0.5px solid #ccc;
`;

const NewsCardTitle = styled.div`
  font-weight: 600;
`;

const NewsCardLeftSegement = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const NewsCardRightSegement = styled.div`
  display: flex;
  flex: 9;
  flex-direction: column;
`;
const NewsCardDescription = styled.div``;

const NewsCardTS = styled.div`
  font-size: 10px;
  color: grey;
  margin-top: 0.5rem;
`;
