import {Link} from 'react-router-dom';

function Movie({ movie }) {
  return (
    <div key={movie.id}>
      <img src={movie.medium_cover_image}></img>
      <h2>
        <Link to={`/movie/${movie.id}`}>
        {movie.title}
        </Link>
        </h2>
      <p>{movie.summary}</p>
      {(movie.hasOwnProperty("genres") ?
        <ul>
          {movie.genres.map((g) => (
            <li key={g}> {g} </li>
          ))}
        </ul> : null)}
    </div>
  )
};


export default Movie