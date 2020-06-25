import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {getNewsMovieApi} from '../api/movie';
import {Title} from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';

export default function Home() {
  const [newMovies, setNewMovies] = useState(null);

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
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas películas</Title>
          <CarouselVertical data={newMovies} />
        </View>
      )}
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
});
