import portrait from "../assets/portrait.png";
import "../styles/Base.css";

const Home = () => {
  return (
    <div className="content">
      <div className="text">
        <p className="heading"> 👋 Hi, thanks for stopping by!</p>
        <p>
          I'm a recent graduate from Cornell University's College of Computing
          and Information Science with a keen interest in full-stack software
          engineering, machine learning, and generative AI (of course!). I've
          been working on a lot of independent projects recently, and I built
          this website to showcase some of my favorites.
          <b> Feel free to head over to the projects page, and try them out!</b>
        </p>
      </div>
      <img src={portrait} className="portrait" alt="me" />
    </div>
  );
};

export default Home;
