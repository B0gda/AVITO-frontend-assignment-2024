import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const token: string | undefined = "API_Token";

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
const debouncedSearch = debounce(
  async (
    query: string,
    setResults: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    // console.log(query);
    try {
      if (query) {
        const response = await axios.get(
          "https://api.kinopoisk.dev/v1.4/movie/search",
          {
            headers: {
              "X-API-KEY": token,
            },
            params: {
              page: 1,
              limit: 10,
              query: query,
            },
          }
        );
        setResults(response.data.docs);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  },
  1000
);

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [searchValue, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const location = useLocation();
  const history = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [moviesPerPage, setMoviesPerPage] = useState<number>(10);
  const [year, setYear] = useState<string | null>(queryParams.get("year"));
  const [countries, setCountries] = useState<string[]>(
    queryParams.get("countries")?.split(",") ?? []
  );
  const [ageRating, setAgeRating] = useState<string[]>(
    queryParams.get("ageRating")?.split(",") ?? []
  );

  useEffect(() => {
    const hasReload = localStorage.getItem("hasReload");
    localStorage.setItem("hasReload", "two");
    if (hasReload === "null") {
      localStorage.setItem("hasReload", "one");
    } else if (hasReload === "one") {
      localStorage.setItem("hasReload", "two");
      const currentPageFromLocalStorage = localStorage.getItem("currentPage");
      const currentPageNew = parseInt(currentPageFromLocalStorage ?? "1");
      setCurrentPage(currentPageNew);

      const moviesPerPageFromLocalStorage =
        localStorage.getItem("moviesPerPage");
      const moviesPerPageNew = moviesPerPageFromLocalStorage
        ? parseInt(moviesPerPageFromLocalStorage)
        : 10;
      setMoviesPerPage(moviesPerPageNew);

      const yearFromLocalStorage = localStorage.getItem("year");
      setYear(yearFromLocalStorage || "");

      const countriesFromLocalStorage = localStorage.getItem("countries");
      setCountries(
        countriesFromLocalStorage ? JSON.parse(countriesFromLocalStorage) : []
      );

      const ageRatingFromLocalStorage = localStorage.getItem("ageRating");
      setAgeRating(
        ageRatingFromLocalStorage ? JSON.parse(ageRatingFromLocalStorage) : []
      );
    } else if (hasReload === "two") {
      localStorage.setItem("currentPage", currentPage.toString());
      localStorage.setItem("moviesPerPage", moviesPerPage.toString());
      localStorage.setItem("year", year || "");
      localStorage.setItem("countries", JSON.stringify(countries));
      localStorage.setItem("ageRating", JSON.stringify(ageRating));
    }
  }, [currentPage, moviesPerPage, year, countries, ageRating]);

  const handleMovieClick = (id: string) => {
    history(`/movie/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setIsLoadingSearch(false);
      return;
    } else {
      debouncedSearch(searchValue, setSearchResults, setIsLoadingSearch);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const currentPageLS = localStorage.getItem("currentPage");
      const moviesPerPageLS = localStorage.getItem("moviesPerPage");
      const yearLS = localStorage.getItem("year");
      const countriesLS = localStorage.getItem("countries");
      const ageRatingLS = localStorage.getItem("ageRating");
      const currentPageParam = currentPageLS
        ? parseInt(currentPageLS)
        : currentPage;
      const moviesPerPageParam = moviesPerPageLS
        ? parseInt(moviesPerPageLS)
        : moviesPerPage;
      const yearParam = yearLS || year;
      const countriesParam = countriesLS ? JSON.parse(countriesLS) : countries;
      const ageRatingParam = ageRatingLS ? JSON.parse(ageRatingLS) : ageRating;

      const countriesParamString = countriesParam.length
        ? countriesParam.join(",")
        : undefined;
      const ageRatingParamString = ageRatingParam.length
        ? ageRatingParam.join(",")
        : undefined;

      try {
        const response = await axios.get(
          "https://api.kinopoisk.dev/v1.4/movie",
          {
            headers: {
              "X-API-KEY": token,
            },
            params: {
              page: currentPageParam,
              limit: moviesPerPageParam,
              year: yearParam,
              "countries.name": countriesParamString,
              ageRating: ageRatingParamString,
            },
          }
        );

        setMovies(response.data.docs);
        const totalMovies = response.data.total;
        const calculatedTotalPages = Math.ceil(
          totalMovies / moviesPerPageParam
        );
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
        setShowContent(true);
      }
    };

    if (token) {
      fetchMovies();
    }
  }, [currentPage, moviesPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
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

  const applyFilters = async () => {
    setCurrentPage(1);
    setIsLoading(true);
    try {
      const countriesParam = countries.length ? countries.join(",") : undefined;
      const ageRatingParam = ageRating.length ? ageRating.join(",") : undefined;

      const response = await axios.get("https://api.kinopoisk.dev/v1.4/movie", {
        headers: {
          "X-API-KEY": token,
        },
        params: {
          page: currentPage,
          limit: moviesPerPage,
          year,
          "countries.name": countriesParam,
          ageRating: ageRatingParam,
        },
      });
      console.log(response.data.docs);
      setMovies(response.data.docs);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
      setShowContent(true);
    }
  };

  return (
    <Container
      className="mt-5 d-flex justify-content-center"
      style={showContent ? { opacity: 1, margin: "auto" } : { opacity: 0 }}
    >
      <h1 className="text-center mb-4">Список фильмов</h1>
      <div className="mb-3" style={{ width: "60%", margin: "auto" }}>
        <input
          className="form-control"
          type="text"
          placeholder="Поиск по названию фильма"
          onChange={handleSearchChange}
          style={{ height: "40px", width: "100%", marginBottom: "20px" }}
        />
      </div>
      {isLoadingSearch && (
        <p style={{ width: "60%", margin: "auto" }}>Идет поиск...</p>
      )}
      {searchResults.length > 0 && (
        <div
          className="mb-4"
          style={{
            backgroundColor: "#e9e9e9",
            width: "60%",
            margin: "auto",
            marginTop: "-40px",
          }}
        >
          <h3>Результаты поиска:</h3>
          <Row xs={1} md={2} className="g-4">
            {searchResults.map((movie) => (
              <div
                className="d-flex flex-column align-items-center"
                onClick={() => handleMovieClick(movie.id)}
                style={{ cursor: "pointer" }}
                key={movie.id}
              >
                <div className="border rounded p-3">
                  <p className="text-center fw-bold fs-4 mb-0">
                    Название: {movie.name} Дата выхода: {movie.year}
                  </p>
                </div>
              </div>
            ))}
          </Row>
        </div>
      )}
      <div
        className="d-flex justify-content-between mb-3"
        style={{
          width: "70%",
          margin: "auto",
          border: "1px solid black",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ marginRight: "20px", marginBottom: "5px" }}>
          Год:
          <select
            className="ms-2 form-select"
            onChange={(e) => setYear(e.target.value)}
            style={{ marginLeft: "5px", width: "70px", height: "32px" }}
          >
            {Array.from({ length: 55 }, (_, i) => 1970 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginRight: "20px", marginBottom: "5px" }}>
          Страны:
          <input
            className="ms-2 form-control"
            type="text"
            placeholder="США, Россия, Франция"
            onChange={(e) => setCountries(e.target.value.split(","))}
            style={{ marginLeft: "5px", width: "150px", height: "32px" }}
          />
        </div>
        <div style={{ marginRight: "20px", marginBottom: "5px" }}>
          Возрастной рейтинг:
          <input
            className="ms-2 form-control"
            type="text"
            placeholder="6, 12, 16-18"
            onChange={(e) => setAgeRating(e.target.value.split(","))}
            style={{ marginLeft: "5px", width: "80px", height: "32px" }}
          />
        </div>
        <button
          className="ms-2 btn btn-outline-primary"
          onClick={applyFilters}
          style={{ height: "32px" }}
        >
          Применить
        </button>
      </div>

      <div
        className="d-flex justify-content-between mb-3"
        style={{
          width: "70%",
          margin: "auto",
          border: "1px solid black",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div>
          Количество фильмов:
          <select
            className="ms-2"
            onChange={(e) => setMoviesPerPage(Number(e.target.value))}
            value={moviesPerPage}
            style={{ marginLeft: "5px", width: "100px", height: "32px" }}
          >
            {[6, 10, 20, 40].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>Доступно: {totalPages} страниц</div>
      </div>
      <Row xs={1} md={2} className="g-4" style={{ columnCount: 2 }}>
        {movies.map((movie) => (
          <Col
            key={movie.id}
            style={{
              marginBottom: "30px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <Card
              className="h-100 border"
              onClick={() => handleMovieClick(movie.id)}
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                cursor: "pointer",
                height: "100%",
              }}
            >
              <Card.Img
                variant="top"
                src={movie.poster.previewUrl}
                style={{
                  width: "35%",
                  marginBottom: "10px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Card.Body>
                <Card.Title
                  className="text-center fw-bold"
                  style={{
                    fontSize: "1.1rem",
                    fontFamily: "Arial, bold",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  {movie.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div
        className="mt-4 text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="outline-primary"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          style={{ height: "32px", textAlign: "center", marginRight: "20px" }}
        >
          Предыдущая страница
        </Button>
        <Button
          variant="outline-primary"
          className="ms-2"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          style={{ height: "32px", textAlign: "center", marginLeft: "20px" }}
        >
          Следующая страница
        </Button>
      </div>
    </Container>
  );
};

export default MovieList;
