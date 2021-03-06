import { useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMore } from "react-icons/ai";
import { BsHash } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { selectSessionUser } from "../../store/sessionSlice";
import NavItem from "./NavItem";

const Navbar = () => {
  const user = useSelector(selectSessionUser);
  return (
    <div className="w-1/6 flex-col bg-white p-3 min-h-screen">
      <NavLink to="/home">
        <NavItem title="Home" Icon={AiOutlineHome} />
      </NavLink>
      <NavLink to="/explore">
        <NavItem title="Explore" Icon={BsHash} />
      </NavLink>
      <NavLink to="/notifications">
        <NavItem title="Notifcations" Icon={AiOutlineBell} />
      </NavLink>
      <NavLink to="/messages">
        <NavItem title="Messages" Icon={AiOutlineMail} />
      </NavLink>
      <NavLink to="/bookmarks">
        <NavItem title="Bookmarks" Icon={BsBookmark} />
      </NavLink>
      {user && (
        <NavLink to={`/profile/${user.id}`}>
          <NavItem title="Profile" Icon={AiOutlineUser} />
        </NavLink>
      )}
      <NavLink to="/more">
        <NavItem title="More" Icon={AiOutlineMore} />
      </NavLink>
    </div>
  );
};

export default Navbar;
