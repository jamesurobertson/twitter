import { schema } from "normalizr";

const follow = new schema.Entity(
  "follows",
  {},
  { idAttribute: (follow) => follow.userFollowedId }
);
const follower = new schema.Entity(
  "followers",
  {},
  {
    idAttribute: (follower) => follower.userId,
  }
);
const like = new schema.Entity("likes", {});
const tweet = new schema.Entity("tweets", { like });
const user = new schema.Entity("users", {
  follows: [follow],
  followers: [follower],
  Tweets: [tweet],
});

export const schemas = { follow, follower, like, tweet, user };
