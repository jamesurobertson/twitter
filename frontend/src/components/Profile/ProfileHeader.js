import FollowCounts from "./FollowCounts";
import ProfileBio from "./ProfileBio";
import ProfileButtons from "./ProfileButons";
import ProfileExtras from "./ProfileExtras";
import ProfileNames from "./ProfileNames";

const ProfileHeader = ({ user }) => {
  const {
    firstName,
    lastName,
    username,
    bio,
    follows,
    followers,
    website,
  } = user;

  return (
    <div>
      <div>
        <img
          className="w-full h-48 object-cover"
          src={user.bannerImageUrl}
          alt="banner-img"
        />
      </div>
      <div className="p-2">
        <ProfileButtons user={user} />
        <ProfileNames
          firstName={firstName}
          lastName={lastName}
          username={username}
        />
        <ProfileBio bio={bio} />
        <ProfileExtras website={website} />
        <FollowCounts follows={follows} followers={followers} />
      </div>
    </div>
  );
};

export default ProfileHeader;
