const { useHistory } = require("react-router-dom");

const Mention = (props) => {
  const history = useHistory();
  return (
    <span
      className={`${props.className}`}
      onClick={(e) => history.push(`/profile/${props.mention.user.id}`)}
    >
      {props.children}
    </span>
  );
};

export default Mention;
