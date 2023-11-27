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
          A multimodal model that analyzes images and generates captions for
          them
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
