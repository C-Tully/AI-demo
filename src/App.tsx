import React, { useState } from "react";

import "./App.css";

type RawDataResponse = {
  reply: string;
};

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = async () => {
    setIsLoading(true);
    // useEffect(); Might need to use useEffect to prevent loop
    await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
      }),
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Network response error");

        return resp.json() as Promise<RawDataResponse>;
      })
      .then((data) => {
        setResponse(data.reply);
      })
      .catch((error) => {
        console.error("Error:: ", error);
        setResponse("Error: Unable to get an answer. Sorry, try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    return (
      <div className="">
        <h1 className=""> AI Demo project</h1>
        <textarea
          className="border p-2 w-full mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something"
        />
        <button
          className="bg-grey-200 text-white px-4 py-2 rounded"
          onClick={handleInput}
        >
          {isLoading ? "Thinking..." : "Ask away"}
        </button>
        {response && <p className="mt-4 border p3 bg-gray-50">{response}</p>}
      </div>
    );
  };
}

export default App;
