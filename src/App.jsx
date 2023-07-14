import { useState } from "react";
import useGeolocation from "./hooks/useGeolocation";

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const {
    isLoading,
    position: { lat, lng },
    error,
    getPosition,
  } = useGeolocation();

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div className=" prose my-10  text-lg mx-4 justify-center  gap-3 md:text-3xl  flex flex-col items-center">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="btn btn-outline btn-info"
      >
        Get my position
      </button>

      {isLoading && (
        <div className="flex flex-row">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
            className="link link-success  link-hover"
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>
        You requested position{" "}
        <span className="link-warning mx-2"> {countClicks}</span>
        times
      </p>
    </div>
  );
}
