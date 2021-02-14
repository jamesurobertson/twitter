import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

const Home = () => (
  <div className="container flex justify-around min-h-screen bg-blue-500">
    <Navbar />
    <Feed />
  </div>
);

export default Home;
