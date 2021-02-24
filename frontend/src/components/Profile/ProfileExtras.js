const ProfileExtras = ({ website }) => {
  return (
    <div>
      <a className="text-blue-400 hover:text-blue-500" href={website}>
        {website}
      </a>
    </div>
  );
};

export default ProfileExtras;
