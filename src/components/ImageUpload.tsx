import { useState, useRef, DragEvent, ChangeEvent, MouseEvent } from "react";
import Compressor from "compressorjs";
import axios from "axios";
import "../styles/ImageUpload.css";

interface ImageCaptionProps {
  onCaptionGenerated: (caption: string) => void;
}

const ImageUpload: React.FC<ImageCaptionProps> = ({ onCaptionGenerated }) => {
  const apiURL =
    "https://vzxzwxiz4f.execute-api.us-east-1.amazonaws.com/Prod/compute";

  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<string>();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: DragEvent) => {
    const target = event.target as HTMLInputElement;
    target.classList.add("dragover");
  };

  const handleDragLeave = (event: DragEvent) => {
    const target = event.target as HTMLInputElement;
    target.classList.remove("dragover");
  };

  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    setImage(event.dataTransfer.files[0]);
    setFile(URL.createObjectURL(event.dataTransfer.files[0]));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCancel = () => {
    setFile("");
    setImage(null);
    onCaptionGenerated("");
    setLoading(false);
  };

  const handleGenerate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onCaptionGenerated("");
    setLoading(true);

    new Compressor(image!, {
      quality: 0.6,
      success: async (compressed) => {
        const formData = new FormData();
        formData.append("image", compressed, image!.name);
        let attempts = 0;
        while (1 === 1) {
          try {
            attempts++;
            if (attempts === 4) {
              setLoading(false);
              onCaptionGenerated(
                "Encountered an issue while processing your request ): Check back soon!\nAnd send your image to mab583@cornell.edu for a caption!"
              );
              break;
            }
            const response = await axios.post(`${apiURL}`, formData, {
              headers: {
                function: "caption",
                "Content-Type": "multipart/form-data",
              },
            });
            onCaptionGenerated(response.data.output);
            setLoading(false);
            break;
          } catch (e: any) {
            if (!e.message.includes("504")) {
              setLoading(false);
              onCaptionGenerated(
                "Encountered an issue while processing your request ): Check back soon!\nAnd send your image to mab583@cornell.edu for a caption!"
              );
              console.error("Caption generation error: ", e.message);
              break;
            }
          }
        }
      },
      error: (e) => {
        setLoading(false);
        console.error("Image compression error:", e.message);
      },
    });
  };

  if (image)
    return (
      <div className="input">
        <img id="image" src={file} />
        <div className="input-buttons">
          {loading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span id="loading" role="status">
                Loading...
              </span>
            </button>
          ) : (
            <>
              <button className="btn btn-primary" onClick={handleGenerate}>
                Generate Caption
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    );

  return (
    <>
      <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <p>Drag & Drop or Select Files</p>
        <p>(.jpeg, .jpg, png, .tiff)</p>
        <div id="upload-img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-cloud-arrow-up-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
          </svg>
        </div>
        <input
          type="file"
          onChange={handleInput}
          hidden
          ref={inputRef}
          accept="image/png, image/jpeg, image/tiff"
        />
        <a
          className="btn btn-secondary"
          onClick={() => inputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          Select Files
        </a>
      </div>
    </>
  );
};

export default ImageUpload;
