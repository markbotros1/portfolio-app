import translation from "../assets/translation.png";
import caption from "../assets/img-caption.png";
import construction from "../assets/construction.gif";
import { Link } from "react-router-dom";
import "../styles/Projects.css";

const Projects = () => {
  return (
    <div className="projects">
      <div className="row1">
        <div className="card">
          <img className="card-img" src={caption} alt="Image Captioning" />

          <div className="card-body">
            <h5 className="card-title">Image Captioning</h5>
            <p className="card-text">
              Generate captions for images of your choice
            </p>
            <Link to="/ica" className="btn btn-primary">
              View
            </Link>
          </div>
        </div>
        <div className="card">
          <img
            src={translation}
            className="card-img"
            alt="Neural Machine Translation"
          />

          <div className="card-body">
            <h5 className="card-title">Neural Machine Translation</h5>
            <p className="card-text">Translate from modern to Old(e) English</p>
            <Link to="/nmt" className="btn btn-primary">
              View
            </Link>
          </div>
        </div>
      </div>

      <div className="row2">
        <div className="card">
          <img className="card-img" src={construction} alt="Construction" />
          <div className="card-body">
            <h5 className="card-title">TBD</h5>
            <p className="card-text">Currently working on some gen AI apps</p>
            <Link to="/projects" className="btn btn-secondary">
              Coming Soon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
