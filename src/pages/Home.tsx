import portrait from "../assets/portrait.png";
import "../styles/Base.css";

const Home = () => {
  return (
    <div className="content">
      <div className="text">
        <p className="heading"> 👋 Hi, thanks for stopping by!</p>
        <p>
          I'm a current Data Scientist and recent(ish) graduate of Cornell
          University's College of Computing and Information Science with a
          passion for data science, machine learning, generative AI (of
          course!). I've been working on a lot of independent projects recently,
          and I built this website to showcase some of my favorites.
          <b> Feel free to head over to the projects page, and try them out!</b>
        </p>
      </div>
      <img src={portrait} className="portrait" alt="me" />
    </div>
  );
};

export default Home;
