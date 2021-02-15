import Feed from "../Feed";
import Header from "../MainHeader";
import TweetInput from "./TweetInput";

const Home = () => (
  <div className="flex-col">
    <Header title="Home" />
    <div className="m-4">
      <TweetInput />
      <Feed />
    </div>
  </div>
);

export default Home;
