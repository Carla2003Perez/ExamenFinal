import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  const publicKey = '79bffe89a023981ee6517f01c2ce3d66';
  const privateKey = '4f34fb420a3b21228df3fae35a56b73147f4c381';
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);

  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCharacters = async (url) => {
    try {
      const response = await axios.get(url);
      setCharacters(response.data.data.results);
      setInfo({
        total: response.data.data.total,
        count: response.data.data.count,
        offset: response.data.data.offset,
        limit: response.data.data.limit,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&apikey=${publicKey}&hash=${hash}&ts=${ts}`;
    fetchCharacters(url);
  };

  useEffect(() => {
    const url = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
    fetchCharacters(url);
  }, []);

  const handlePagination = (newOffset) => {
    const url = `https://gateway.marvel.com/v1/public/characters?offset=${newOffset}&apikey=${publicKey}&hash=${hash}&ts=${ts}`;
    fetchCharacters(url);
    window.scrollTo(0, 0);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <div className="container py-5">
        <Routes>
          <Route path="/" element={<Characters characters={characters} handlePagination={handlePagination} info={info} />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
