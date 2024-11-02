import React, { useEffect, useState } from "react";
import axios from "axios";

const CharacterDetail = ({ match }) => {
  const [character, setCharacter] = useState({});
  const characterId = match.params.id; // Obtiene el ID del personaje

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=79bffe89a023981ee6517f01c2ce3d66`);
      setCharacter(response.data.data.results[0]);
    };
    fetchCharacter();
  }, [characterId]);

  return (
    <div className="container">
      <h1>{character.name}</h1>
      {character.description && <p>{character.description}</p>}
      <img
        src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
        alt={character.name}
      />
    </div>
  );
};

export default CharacterDetail;
