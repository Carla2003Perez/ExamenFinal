import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5"; // Para generar el hash
import { BrowserRouter as Router} from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";


function App() {
  const publicKey = '79bffe89a023981ee6517f01c2ce3d66';
  const privateKey = '4f34fb420a3b21228df3fae35a56b73147f4c381';
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});

  const fetchCharacters = async (url) => {
    try {
      const response = await axios.get(url);
      setCharacters(response.data.data.results);
      setInfo({
        next: response.data.data.next,
        prev: response.data.data.previous,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const url = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
    fetchCharacters(url);
  }, []);

  const handlePagination = (url) => {
    fetchCharacters(url);
    window.scrollTo(0, 0);
  };

  return (
    <Router>
      <Navbar />
      <div className="container py-5">
        <Characters characters={characters} handlePagination={handlePagination} info={info} />
      </div>
    </Router>
  );
}

export default App;
