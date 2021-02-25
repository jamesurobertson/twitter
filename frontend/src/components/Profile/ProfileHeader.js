import FollowCounts from "./FollowCounts";
import ProfileBio from "./ProfileBio";
import ProfileButtons from "./ProfileButons";
import ProfileExtras from "./ProfileExtras";
import ProfileNames from "./ProfileNames";

const ProfileHeader = ({ user }) => (
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
        firstName={user.firstName}
        lastName={user.lastName}
        username={user.username}
      />
      <ProfileBio bio={user.bio} />
      <ProfileExtras website={user.website} />
      <FollowCounts follows={user.follows} followers={user.followers} />
    </div>
  </div>
);

export default ProfileHeader;
