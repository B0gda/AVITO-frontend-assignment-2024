import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Container, Button } from "react-bootstrap";

interface Movie {
  fees: {
    world: {
      value: number;
      currency: string;
    };
    russia: {
      value: number;
      currency: string;
    };
    usa: {
      value: number;
      currency: string;
    };
  };
  status: null;
  externalId: {
    imdb: string;
    tmdb: number;
    kpHD: string;
  };
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: null;
  };
  votes: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  backdrop: {
    url: string;
    previewUrl: string;
  };
  movieLength: number;
  images: {
    postersCount: number;
    backdropsCount: number;
    framesCount: number;
  };
  productionCompanies: {
    name: string;
    url: string | null;
    previewUrl: string | null;
  }[];
  spokenLanguages: {
    name: string;
    nameEn: string;
  }[];
  id: number;
  type: string;
  name: string;
  description: string;
  distributors: {
    distributor: string;
    distributorRelease: string;
  };
  premiere: {
    world: string;
    russia: string;
    bluray: string;
    dvd: string;
  };
  slogan: string;
  year: number;
  budget: {
    value: number;
    currency: string;
  };
  poster: {
    url: string;
    previewUrl: string;
  };
  facts: {
    value: string;
    type: string;
    spoiler: boolean;
  }[];
  genres: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  seasonsInfo: any[];
  persons: {
    id: number;
    photo: string;
    name: string;
    enName: string;
    description: string;
    profession: string;
    enProfession: string;
  }[];
  lists: string[];
  typeNumber: number;
  alternativeName: string;
  enName: null;
  names: {
    name: string;
    language: string | null;
    type: string | null;
  }[];
  similarMovies: {
    id: number;
    name: string;
    enName: string | null;
    alternativeName: string;
    type: string;
    poster: {
      url: string;
      previewUrl: string;
    };
    year: number;
    rating: {
      kp: number;
      imdb: number;
      filmCritics: number;
      russianFilmCritics: number;
      await: null;
    };
  }[];
  updatedAt: string;
  imagesInfo: {
    framesCount: number;
  };
  sequelsAndPrequels: any[];
  ratingMpaa: string;
  shortDescription: string;
  technology: {
    hasImax: boolean;
    has3D: boolean;
  };
  ticketsOnSale: boolean;
  ageRating: number;
  logo: {
    url: string;
  };
  watchability: {
    items: {
      name: string;
      logo: {
        url: string;
      };
      url: string;
    }[];
  };
  top10: null;
  top250: number;
  audience: {
    count: number;
    country: string;
  }[];
  deletedAt: null;
  isSeries: boolean;
  seriesLength: null;
  totalSeriesLength: null;
  networks: null;
  videos: {
    trailers: {
      url: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}

const token: string | undefined = "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showAllActors, setShowAllActors] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  let actorsToShow: any[] = [];
  const handleNext = () => {
    if (
      movie &&
      movie.similarMovies &&
      currentSlide < movie.similarMovies.length - 1
    ) {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  const handleButtonClick = () => {
    localStorage.setItem("hasReload", "null");
  };

  if (movie && movie.persons) {
    actorsToShow = showAllActors ? movie.persons : movie.persons.slice(0, 10);
  }

  const toggleActors = () => {
    setShowAllActors(!showAllActors);
  };

  useEffect(() => {
    localStorage.setItem("onMoviePage", "true");
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.kinopoisk.dev/v1.4/movie/${id}`,
          {
            headers: {
              "X-API-KEY": token!,
            },
          }
        );
        console.log(JSON.stringify(response.data));
        setMovie({
          ...response.data,
          jsonString: JSON.stringify(response.data),
        });
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "10vh", marginTop: "25%", textAlign: "center" }}
      >
        <div className="text-center">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }
  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.11), rgba(0, 0, 0, 0.2))`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "20px",
          color: "#414141",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "20px" }}>
            <Card>
              <Card.Img
                variant="top"
                src={movie.poster.previewUrl}
                style={{ width: "100%", height: "auto" }}
              />
            </Card>
          </div>
          <div>
            <h1>{movie.name}</h1>
            <p>{movie.description}</p>
            <p>Рейтинг: {movie.rating.kp}</p>
            <p>Год выпуска: {movie.year}</p>
          </div>
        </div>

        <h2>Актёры</h2>

        {actorsToShow.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {actorsToShow.map((person) => (
              <div
                key={person.id}
                style={{
                  flexBasis: "20%",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <img
                  src={person.photo}
                  alt={person.name}
                  style={{
                    width: "22vh",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
                <p>{person.name}</p>
              </div>
            ))}
          </div>
        )}

        {movie && movie.persons && movie.persons.length > 10 && (
          <button onClick={toggleActors} style={{ height: "32px" }}>
            {showAllActors ? "Меньше актеров" : "Больше актеров"}
          </button>
        )}

        {movie && movie.seasonsInfo && movie.seasonsInfo.length > 0 && (
          <div>
            <h2>Сезоны</h2>
            <ul>
              {movie.seasonsInfo.map((season) => (
                <li key={season.number}>
                  Сезон {season.number}, серий: {season.episodesCount}
                </li>
              ))}
            </ul>
          </div>
        )}

        {movie && movie.similarMovies && movie.similarMovies.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <h2>Похожие фильмы</h2>
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              &lt;
            </button>

            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              &gt;
            </button>
            <div
              style={{
                display: "flex",
                transition: "transform 0.3s ease-in-out",
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {movie.similarMovies.map((similarMovie) => (
                <div
                  key={similarMovie.id}
                  style={{
                    flex: "0 0 auto",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p style={{ textAlign: "center" }}>{similarMovie.name}</p>
                  <Link to={`/movie/${similarMovie.id}`}>
                    <img
                      src={similarMovie.poster.previewUrl}
                      alt={similarMovie.name}
                      style={{
                        width: "50%",
                        marginBottom: "10px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link to="/" onClick={handleButtonClick}>
          <Button variant="secondary" style={{ height: "32px" }}>
            К списку фильмов
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default MoviePage;
