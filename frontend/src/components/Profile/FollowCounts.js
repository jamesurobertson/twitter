const FollowCounts = ({ follows, followers }) => {
  return (
    <div>
      <div>{follows.length} Following</div>
      <div>{followers.length} Followers</div>
    </div>
  );
};

export default FollowCounts;
