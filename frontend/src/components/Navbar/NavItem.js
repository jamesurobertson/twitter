const NavItem = ({ title, Icon }) => {
  return (
    <div className="flex items-center m-4 w-100 hover:bg-blue-500 hover:text-white rounded-md">
      <Icon className="mr-2" />
      {title}
    </div>
  );
};

export default NavItem;
