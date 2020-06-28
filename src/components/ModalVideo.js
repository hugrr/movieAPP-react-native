import React, {useState, useEffect} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Modal, IconButton, Title} from 'react-native-paper';
import {WebView} from 'react-native-webview';

import {getVideoMovieApi} from '../api/movie';

import YouTube from 'react-native-youtube';

export default function ModalVideo(props) {
  const {show, setShow, idMovie} = props;
  const [video, setVideo] = useState(null);

  console.log(video);
  useEffect(() => {
    getVideoMovieApi(idMovie).then(response => {
      console.log(response);
      let idVideo = null;
      response.results.forEach(video => {
        if (video.site === 'YouTube' && !idVideo) {
          idVideo = video.key;
        }
      });
      setVideo(idVideo);
    });
  }, []);

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS === 'ios' ? (
        <YouTube videoId={video} style={styles.video} />
      ) : (
        <WebView
          style={{width: 420}}
          source={{
            uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0`,
          }}
        />
      )}
      <IconButton
        icon="close"
        onPress={() => setShow(false)}
        style={styles.close}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '100%',
    alignItems: 'center',
  },
  close: {
    backgroundColor: '#1ea1f2',
    width: 50,
    height: 50,
    position: 'absolute',
    borderRadius: 100,
    bottom: 50,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
