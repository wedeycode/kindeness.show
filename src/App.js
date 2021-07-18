import React, { useState, useEffect } from "react";
import "./styles.css";

import gis from "g-i-s";

export default function App() {
  const [kindImageURL, setKindImageURL] = useState("");
  const [kindImagePos, setKindImagePos] = useState(0);

  useEffect(() => {
    updateKindImage();
  });

  const fetchKindImages = () => {
    return new Promise((resolve, reject) => {
      gis('kindness', (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }

  const updateKindImage = () => {
    fetchKindImages()
    .then(kindImages => {
      const duration = kindImagePos === 0 ? 0 : 5e3;
      setTimeout(() => {
        setKindImageURL(kindImages[kindImagePos].url);
        setKindImagePos(kindImagePos+1);
      }, duration);
    })
    .catch(err => {
      console.error(err);
    })
  }

  return (
    <div className="App">
      <img
        id="kind-image"
        src={kindImageURL}
        alt="A quote radiating kindness."
        height={1000}
        width={1000}
      />
    </div>
  );
}
