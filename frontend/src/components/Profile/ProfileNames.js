const ProfileNames = ({ firstName, lastName, username }) => {
  return (
    <div className="mb-2">
      <div className="font-bold ">{`${firstName} ${lastName}`}</div>
      <div className="font-sm font-light">@{username}</div>
    </div>
  );
};

export default ProfileNames;
