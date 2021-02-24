import FollowCounts from "./FollowCounts";
import ProfileBio from "./ProfileBio";
import ProfileButtons from "./ProfileButons";
import ProfileExtras from "./ProfileExtras";
import ProfileNames from "./ProfileNames";

const ProfileHeader = ({ user }) => {
  const { firstName, lastName, username, bio, follows, followers } = user;
  return (
    <div>
      <div>
        <img src={user.bannerImageUrl} alt="banner-img" />
      </div>
      <div className="p-2">
        <ProfileButtons />
        <ProfileNames
          firstName={firstName}
          lastName={lastName}
          username={username}
        />
        <ProfileBio bio={bio} />
        <ProfileExtras />
        <FollowCounts follows={follows} followers={followers} />
      </div>
    </div>
  );
};

export default ProfileHeader;
