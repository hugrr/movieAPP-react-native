import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {
  getNewsMovieApi,
  getAllGenresApi,
  getGenreMoviesApi,
} from '../api/movie';
import {Title} from 'react-native-paper';
import {map} from 'lodash';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';

export default function Home(props) {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genresList, setGeresList] = useState(null);
  const [genresSelected, setGenresSelected] = useState();
  const [genreMovies, setGenreMovies] = useState(null);

  console.log(genreMovies);

  useEffect(() => {
    getNewsMovieApi().then(response => {
      setNewMovies(response.results);
    });
  }, []);
  /*
  la peticion a la api pude ser asincrona o con .then()
    useEffect(async () => {
    const data = await getNewsMovieApi();
    setNewMovies(data);
  }, []);
*/

  useEffect(() => {
    getAllGenresApi().then(response => {
      setGeresList(response.genres);
    });
  }, []);

  useEffect(() => {
    getGenreMoviesApi(genresSelected).then(response => {
      setGenreMovies(response.results);
    });
  }, [genresSelected]);

  const onChangeGenre = newGenreId => {
    setGenresSelected(newGenreId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas películas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}

      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Peliculas por genero</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}>
          {map(genresList, genre => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                {color: genre.id !== genresSelected ? '#8697a5' : '#fff'},
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>

        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 5,
    marginBottom: 70,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  genreList: {
    marginTop: 3,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
