const getPosterUrl = posterPath =>
  `https://image.tmdb.org/t/p/w500${posterPath}`;

export default {
  Query: {
    allMovies: async (parent, { pageNumber }, { models }) => {
      const response = await models.Movie.getAll(pageNumber);
      const { results } = await response.json();
      return results.map(data =>
        Object.assign(
          {},
          {
            poster: getPosterUrl(data.poster_path),
            voteAverage: data.vote_average,
            originalLanguage: data.original_language,
            originalTitle: data.original_title,
            tags: [{ id: 0, text: 'tag1' }, { id: 1, text: 'tag2' }]
          },
          data
        )
      );
    },
    getMovie: async (parent, { movieId }, { models }) => {
      const response = await models.Movie.getMovie(movieId);
      const {
        id,
        original_title,
        overview,
        poster_path
      } = await response.json();

      return {
        id,
        title: original_title,
        description: overview,
        poster: getPosterUrl(poster_path)
      };
    },
    searchMovie: async (parent, { query }, { models }) => {
      const response = await models.Movie.search(query);
      const { results } = await response.json();
      return results.map(({ title, id, poster_path }) => ({
        id,
        title,
        poster: getPosterUrl(poster_path)
      }));
    }
  }
};
