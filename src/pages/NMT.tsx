import { MouseEvent, useState } from "react";
import axios from "axios";
import "../styles/Base.css";

const NMT = () => {
  const apiURL =
    "https://bxzkos97kh.execute-api.us-east-1.amazonaws.com/Prod/compute";

  const [source, setSource] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!source) {
      setOutput("Give me something to translate!");
    } else {
      setOutput("");
      setLoading(true);
      let attempts = 0;
      while (1 === 1) {
        try {
          attempts++;
          if (attempts === 4) {
            setLoading(false);
            setOutput(
              "Encountered an issue while processing your request ): Check back soon!\nAnd send your text to mab583@cornell.edu for a translation!"
            );
            break;
          }
          const response = await axios.post(`${apiURL}`, source, {
            headers: {
              function: "translate",
            },
          });
          setOutput(response.data.output);
          setLoading(false);
          break;
        } catch (e: any) {
          if (!e.message.includes("504")) {
            setLoading(false);
            setOutput(
              "Encountered an issue while processing your request ): Check back soon!\nAnd send your text to mab583@cornell.edu for a translation!"
            );
            console.error("Text translation error: ", e.message);
            break;
          }
        }
      }
    }
  };

  const handleReset = () => {
    setSource("");
    setOutput("");
    setLoading(false);
  };

  return (
    <div className="content">
      <div className="text">
        <p className="heading">Neural Machine Translation</p>
        <p>
          A translation model that turns contemporary English into Old(e)
          English! To find more information about this project (e.g., model
          architecture, implementation, training), you can view the project{" "}
          <a
            href="https://www.github.com/markbotros1/neural-machine-translation"
            target="_blank"
          >
            on my Github
          </a>
        </p>
      </div>
      <div className="demo">
        <b>Give it a try:</b>
        <textarea
          id="input"
          maxLength={100}
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="max input length capped at 100 characters, since model was trained on a limited dataset"
        />

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
              <button className="btn btn-primary" onClick={handleTranslate}>
                Translate
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
            </>
          )}
        </div>

        <textarea
          id="output"
          value={output}
          placeholder="translation"
          readOnly
        />
      </div>
    </div>
  );
};

export default NMT;
