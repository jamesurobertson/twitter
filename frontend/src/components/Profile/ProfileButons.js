import { useDispatch, useSelector } from "react-redux";
import { deleteFollow, postFollow } from "../../store/entitiesSlice";

const ProfileButtons = ({ user }) => {
  const sessionUserId = useSelector((state) => state.session.userId);
  const onSessionProfile = useSelector(
    (state) => user.id === state.session.userId
  );
  const dispatch = useDispatch();

  const followsUser = user.followers.includes(sessionUserId);

  const editProfile = () => {
    // TODO: Edit Profile Modal
    console.log("Open Edit Profile Modal");
  };

  const toggleFollow = () => {
    if (followsUser) {
      dispatch(deleteFollow(user.id));
    } else {
      dispatch(postFollow(user.id));
    }
  };
  return (
    <div className="text-right h-8 relative mb-5">
      <img
        className="absolute w-32 object-fit rounded-full -top-20 border-2 border-white"
        src={user.profileImageUrl}
        alt="profile"
      />
      <button
        className="border hover:bg-blue-200 rounded-full font-bold
      text-blue-400 p-2 mr-2 focus:outline-none"
      >
        ...
      </button>

      {onSessionProfile ? (
        <button
          className="border hover:bg-blue-200 rounded-full font-bold
      text-blue-400 p-2 focus:outline-none"
          onClick={editProfile}
        >
          Edit Profile
        </button>
      ) : (
        <button
          onClick={toggleFollow}
          className="border hover:bg-blue-200 rounded-full font-bold
      text-blue-400 p-2 focus:outline-none"
        >
          {followsUser ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default ProfileButtons;
