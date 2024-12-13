import "./TitleCards.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGI4NWEzYjNkN2E0MjJhMWZkMGEyM2Y3NjZjOTljNyIsIm5iZiI6MTczMDg4MDA5MC45ODg5OTk4LCJzdWIiOiI2NzJiMjI1YTRiMzBlOTI5Y2Q2ZWQ5ZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tFmukGRD2PBEKnfJ0-Vv31pIL-Tu-gbqU7DsG7_G3f4",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt={card.name}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
