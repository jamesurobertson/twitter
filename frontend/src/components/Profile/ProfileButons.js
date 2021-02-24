const ProfileButtons = () => {
  return (
    <div className="text-right h-8">
      {" "}
      <button
        className="border hover:bg-blue-200 rounded-full font-bold
      text-blue-400 p-2 mr-2"
      >
        {" "}
        ...
      </button>
      <button
        className="border hover:bg-blue-200 rounded-full font-bold
      text-blue-400 p-2"
      >
        Follow{" "}
      </button>
    </div>
  );
};

export default ProfileButtons;
