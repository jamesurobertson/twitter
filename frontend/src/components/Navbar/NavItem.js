const NavItem = ({ title, Icon }) => {
  return (
    <div className="flex items-center m-4 p-1 w-100 font-bold hover:bg-blue-50 hover:text-blue-500 rounded-full">
      <Icon className="mx-2 text-2xl" />
      {title}
    </div>
  );
};

export default NavItem;
