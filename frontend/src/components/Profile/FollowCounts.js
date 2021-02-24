const FollowCounts = ({ follows, followers }) => {
  return (
    <div className="flex text-sm">
      <div className="mr-2">
        <span className="mr-1">{follows.length}</span>
        <span className="font-light">Following</span>
      </div>
      <div>
        <span className="mr-1">{followers.length}</span>
        <span className="font-light">Followers</span>
      </div>
    </div>
  );
};

export default FollowCounts;
