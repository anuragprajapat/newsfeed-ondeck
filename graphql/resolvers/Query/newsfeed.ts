import { off } from "process";
import db, { NewsFeedRow } from "../../db";

type Args = {
  offset: number;
};

export default async function newsfeed(
  parent: unknown,
  { offset }: Args
): Promise<NewsFeedRow[]> {
  const newsfeed: NewsFeedRow[] = await db.getAll(
    `
    SELECT * FROM newsfeed ORDER BY updated_ts DESC LIMIT ?,50;
    `,
    [offset]
  );
  console.log(newsfeed);
  return newsfeed;
}
