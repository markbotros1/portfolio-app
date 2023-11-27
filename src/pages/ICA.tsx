import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import "../styles/Base.css";

const ICA = () => {
  const [caption, setCaption] = useState("");
  const handleCaptionGenerated = (caption: string) => {
    setCaption(caption);
  };

  return (
    <div className="content">
      <div className="text">
        <p className="heading">Image Captioning</p>
        <p>
          A multi-modal generative AI model that analyzes your images and
          generates captions for them! To find more information about this
          project (e.g., model architecture, implementation, training), you can
          view the project{" "}
          <a
            href="https://www.github.com/markbotros1/image-captioning"
            target="_blank"
          >
            on my Github
          </a>
        </p>
      </div>
      <div className="demo">
        <b>Give it a try:</b>
        <ImageUpload onCaptionGenerated={handleCaptionGenerated} />
        <textarea id="output" value={caption} placeholder="caption" readOnly />
      </div>
    </div>
  );
};

export default ICA;
