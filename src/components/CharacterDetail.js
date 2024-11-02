import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import md5 from "md5";

const CharacterDetail = () => {
  const { id } = useParams();
  const publicKey = '79bffe89a023981ee6517f01c2ce3d66';
  const privateKey = '4f34fb420a3b21228df3fae35a56b73147f4c381';
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${publicKey}&hash=${hash}&ts=${ts}`);
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{character.name}</h2>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="img-fluid mb-4"
      />
      <p>{character.description || "No description available."}</p>
      <h5>More Information:</h5>
      <ul>
        {character.comics.items.length > 0 && (
          <li><strong>Comics:</strong> {character.comics.items.map(comic => comic.name).join(", ")}</li>
        )}
        {character.series.items.length > 0 && (
          <li><strong>Series:</strong> {character.series.items.map(series => series.name).join(", ")}</li>
        )}
        {character.stories.items.length > 0 && (
          <li><strong>Stories:</strong> {character.stories.items.map(story => story.name).join(", ")}</li>
        )}
      </ul>
    </div>
  );
};

export default CharacterDetail;
