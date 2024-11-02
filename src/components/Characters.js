import React from "react";
import { Link } from "react-router-dom"; // Para la navegación

const Characters = ({ characters, handlePagination, info }) => {
  return (
    <>
      <div className="row">
        {characters.map((character) => (
          <div className="col-md-4" key={character.id}>
            <div className="card mb-4">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                className="card-img-top"
                alt={character.name}
              />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <Link to={`/character/${character.id}`} className="btn btn-primary">
                  Más Información
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          {info.prev && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePagination(info.prev)}>Previous</button>
            </li>
          )}
          {info.next && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePagination(info.next)}>Next</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Characters;
