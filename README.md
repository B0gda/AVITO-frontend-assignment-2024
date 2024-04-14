# Поиск информации по фильмама и сералам через API "***Кинопоиска***"

# Описание проекта
Разработан фронтенд приложения для быстрого поиска информации по фильмам и сериалам с платформы «***Кинопоиска***». 

### Содержание
* [Реализованные функции](#title1)
* [Стэк технологий](#title2)
* [Запуск проекта](#title3)
* [Примеры запросов](#title4)
* [Проблемы и их решения](#title5)


---
## <a id="title1">Реализованные функции</a>
Приложение состоит из двух компонентов: 
1. Страница со списком фильмов,сериалов.
2. Страница с подробной информацией о фильме.

Страница со списком всех фильмов содержит функционал:
* Отображжение списка фильмов и сериалов в табличном виде.
* Наличие пагинации.
* Выбор количества фильмов для показа на странице (по умолчанию 10).
* Отфильтрованная выдача (по году, стране и возрастному рейтингу).
* Реализован поиск по названию фильма.
Страница с отдельным фильмом содержит функционал:
* Отображение информации о фильме или сериале:
    * Название фильма/сериала.
    * Описание.
    * Рейтинг.
* Отображение списка актёров (с пагинацией, если их больше 10).
* Отображение списка сезонов и серий (с пагинацией, если они подразумеваются).
* Реализован вывод списка фильмов, похожих на текущий, в виде «карусели». По каждому элементу можно кликнуть и открыть его страницу.
* В случае, если какой-то из списков пустой (список отзывов, актёров, сезонов), реализовано скрытие раздела.
* Реализована кнопка «назад», которая ведет на выдачу. Фильтры и номер страницы при этом сохраняются.

---
  
## <a id="title2">Стэк технологий</a>
* Фронтенд фреймворк: *React*, версия 18.
* Библиотека компонент: *react-bootstrap*.
* Сборщик: *Webpack*.
* *Node.js: 18*.
* Пакетный менеджер: *npm*.

### Дополнительные особенности:

* Реализован адаптивный интерфейс: с приложением удобно работать как с мобильного экрана, так и с десктопа.
* Роутинг выполнен с использованием *React Router v6*.
* При переходах по ссылкам страница не перезагружается (*SPA*, без *next.js*).
* Использование ***TypeScript***.
* Проект доступен по ссылке http://localhost:7070.

---

## <a id="title3">Запуск проекта</a>
Для запуска проекта используйте команду `npm run start`.
Также дополнительно внутри компонент, необходимо добавить TOKEN для работы API. В директории ` src/client/components ` необходимо в компоненты ` MovieList.tsx ` и ` MoviePage.tsx ` вставить ваш токен в строке:
> const token: string | undefined = "API_Token";

---
## <a id="title4">Примеры запросов</a>

### 1. Запрос на получение списка фильмов по заданным фильтрам:

Пример кода

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
        );`

Результат (Сокращенный):
> {
    "docs": [
        {
            "status": null,
            "rating": {
                "kp": 8.823,
                "imdb": 8.5,
                "filmCritics": 6.8,
                "russianFilmCritics": 100,
                "await": null
            },
            "votes": {
                "kp": 2006683,
                "imdb": 923505,
                "filmCritics": 129,
                "russianFilmCritics": 12,
                "await": 15
            },
            "backdrop": {
                "url": "https://image.openmoviedb.com/tmdb-images/original/bGksau9GGu0uJ8DJQ8DYc9JW5LM.jpg",
                "previewUrl": "https://image.openmoviedb.com/tmdb-images/w500/bGksau9GGu0uJ8DJQ8DYc9JW5LM.jpg"
            },
            "movieLength": 112,
            "id": 535341,
            "type": "movie",
            "name": "1+1",
            "description": "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.",
            "year": 2011,
            "poster": {
                "url": "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig",
                "previewUrl": "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/x1000"
            },
            "genres": [
                {
                    "name": "драма"
                },
                {
                    "name": "комедия"
                },
                {
                    "name": "биография"
                }
            ],
            "countries": [
                {
                    "name": "Франция"
                }
            ],
            "typeNumber": 1,
            "alternativeName": "Intouchables",
            "enName": null,
            "names": [
                {
                    "name": "1+1"
                },
                {
                    "name": "Intouchables"
                },
                {
                    "name": "不可触碰",
                    "language": "CN",
                    "type": null
                },
                {
                    "name": "最佳拍档",
                    "language": "CN",
                    "type": null
                },
                {
                    "name": "无法触碰",
                    "language": "CN",
                    "type": null
                },
                {
                    "name": "Untouchable",
                    "language": "GB",
                    "type": null
                },
                {
                    "name": "不可触摸",
                    "language": "CN",
                    "type": null
                },
                {
                    "name": "Неприкасаемые",
                    "language": "RU",
                    "type": "Literal"
                },
                {
                    "name": "1+1 [Intouchables]",
                    "language": "RU",
                    "type": null
                },
                {
                    "name": "Saikyô no futari",
                    "language": "JP",
                    "type": null
                },
                {
                    "name": "Amigos",
                    "language": "CL",
                    "type": null
                },
                {
                    "name": "Mehubarim la'hayim",
                    "language": "IL",
                    "type": "Hebrew title"
                },
                {
                    "name": "Amigos para siempre",
                    "language": "VE",
                    "type": null
                },
                {
                    "name": "Prijatelja",
                    "language": "SI",
                    "type": null
                },
                {
                    "name": "En oväntad vänskap",
                    "language": "SE",
                    "type": null
                },
                {
                    "name": "Intocáveis",
                    "language": "BR",
                    "type": null
                },

### 2. Запрос на получение списка фильмов по запросу из поисковой панели:

Пример кода

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
        );`

Результат (сокращенный):
> [
    {
        "id": 426280,
        "name": "Сезон побед",
        "alternativeName": "The Winning Season",
        "enName": "",
        "type": "movie",
        "year": 2009,
        "description": "В фильме рассказывается история неудачника, который тренирует женскую баскетбольную команду.",
        "shortDescription": "Мойщик посуды тренирует женскую баскетбольную команду в школе. Комедия с прекрасной игрой Сэма Рокуэлла",
        "movieLength": 119,
        "isSeries": false,
        "ticketsOnSale": false,
        "totalSeriesLength": null,
        "seriesLength": null,
        "ratingMpaa": "pg13",
        "ageRating": 18,
        "top10": null,
        "top250": null,
        "typeNumber": 1,
        "status": null,
        "names": [
            {
                "name": "Сезон побед"
            },
            {
                "name": "The Winning Season"
            },
            {
                "name": "Um Por Todas e Todas Por Um",
                "language": "BR",
                "type": null
            }
        ],
        "externalId": {
            "imdb": "tt1293842",
            "tmdb": 44750,
            "kpHD": "48b42f6f5ef05bb7887e1875a7c1bb37"
        },
        "logo": {
            "url": null
        },
        "poster": {
            "url": "https://image.openmoviedb.com/kinopoisk-images/1599028/a97e72fc-fcc5-4469-b1fc-292e1e7b91d6/orig",
            "previewUrl": "https://image.openmoviedb.com/kinopoisk-images/1599028/a97e72fc-fcc5-4469-b1fc-292e1e7b91d6/x1000"
        },
        "backdrop": {
            "url": "https://image.openmoviedb.com/tmdb-images/original/b47poONymwpPNqWMMr4b2G6GyXj.jpg",
            "previewUrl": "https://image.openmoviedb.com/tmdb-images/w500/b47poONymwpPNqWMMr4b2G6GyXj.jpg"
        },
        "rating": {
            "kp": 6.717,
            "imdb": 6.6,
            "filmCritics": 5.2,
            "russianFilmCritics": 0,
            "await": null
        },
        "votes": {
            "kp": 2948,
            "imdb": 7115,
            "filmCritics": 23,
            "russianFilmCritics": 0,
            "await": 46
        },
        "genres": [
            {
                "name": "комедия"
            },
            {
                "name": "спорт"
            }
        ],
        "countries": [
            {
                "name": "США"
            }
        ],

### 3. Запрос на получение всех сведений конкретного фильма:

Пример кода

     const response = await axios.get(
          `https://api.kinopoisk.dev/v1.4/movie/${id}`,
          {
            headers: {
              "X-API-KEY": token!,
            },
          }
        );`

Результат (сокращенный):
> {"fees":{"world":{"value":476684675,"currency":"$"},"usa":{"value":285761243,"currency":"$"}},"status":null,"externalId":{"imdb":"tt0099785","tmdb":771,"kpHD":"4ed0391f9e10d314aa0a7de2ea07bf55"},"rating":{"kp":8.277,"imdb":7.7,"filmCritics":5.9,"russianFilmCritics":0,"await":null},"votes":{"kp":1172008,"imdb":649657,"filmCritics":116,"russianFilmCritics":0,"await":0},"backdrop":{"url":"https://image.openmoviedb.com/tmdb-images/original/6uLhSLXzB1ooJ3522ydrBZ2Hh0W.jpg","previewUrl":"https://image.openmoviedb.com/tmdb-images/w500/6uLhSLXzB1ooJ3522ydrBZ2Hh0W.jpg"},"movieLength":103,"images":{"postersCount":67,"backdropsCount":19,"framesCount":30},"productionCompanies":[{"name":"Hughes Entertainment","url":null,"previewUrl":null},{"name":"20th Century Fox","url":"https://www.themoviedb.org/t/p/original/qZCc1lty5FzX30aOCVRBLzaVmcp.png","previewUrl":"https://www.themoviedb.org/t/p/w500/qZCc1lty5FzX30aOCVRBLzaVmcp.png"}],"spokenLanguages":[{"name":"English","nameEn":"English"}],

---

## <a id="title5">Проблемы и их решения</a>
##### ***Проблема 1***:
Установленный *React-Bootstrap* стили частично перестали работать.
##### ***Решение***:
> Вручную через style={{}} дописаны стили.

##### ***Проблема 2***:
При анализе JSON файлов, которые возвращает сервер на запрос конкретного фильма, не было обнаружено ни в одном фильме наличия постеров или отзывов.

##### ***Решение***:
> Данные разделы не смогли быть реализованы. Фильмы, где присутствовали секции(Сезоны, Похожие) - реализован показ секций или их отсутствие, если в теле JSON не было информации.

##### ***Проблема 3***:
Не удалось наладить запуск проекта через команду `TOKEN=<Your_Token> npm run start`, так как *Webpack* отказывался сохранять token в файле `.env`.

##### ***Решение***:
> При запуске проекта удалось добиться работы проекта, вложив токен напрямую в переменные окружения компонент, где он используется.

---
