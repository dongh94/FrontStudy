import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState({})
  useEffect(() => {
    getMovie();

  }, [])
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json()
    setMovieInfo(json.data.movie)
    setLoading(false)
  }
  return (
    <div>
      {loading ? <h1>Loading</h1> : (
        <div>
          <div key={movieInfo.id}>
            <img src={movieInfo.medium_cover_image}></img>
            <h2> {movieInfo.title}  </h2>
            <p>{movieInfo.summary}</p>
            {(movieInfo.hasOwnProperty("genres") ?
              <ul>
                {movieInfo.genres.map((g) => (
                  <li key={g}> {g} </li>
                ))}
              </ul> : null)}
          </div>
        </div>
      )}
    </div>
  )
}
export default Detail;