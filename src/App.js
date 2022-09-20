import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";

function App() {
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  let [searchTerm, setSearchTerm] = useState("");
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState([]);

  const API_URL = "https://itunes.apple.com/search?term=";

  useEffect(() => {
    if (searchTerm) {
      document.title = `${searchTerm} Music`;
      const fetchData = async () => {
        const response = await fetch(API_URL + searchTerm);
        const resData = await response.json();
        if (resData.results.length > 0) {
          setData(resData.results);
        } else {
          setMessage("Not Found");
        }
      };
      fetchData();
    }
  }, [searchTerm, API_URL]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    term = toTitleCase(term);
    setSearchTerm(term);
    // return <Redirect to="/" />;
  };

  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Fragment>
                <SearchBar handleSearch={handleSearch} />
                <Gallery data={data} />
              </React.Fragment>
            }
          />
          <Route path="/album/:id" element={<AlbumView term={searchTerm} />} />
          <Route
            path="/artist/:id"
            element={<ArtistView term={searchTerm} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
