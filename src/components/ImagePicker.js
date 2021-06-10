import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, ImageBackground, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../styles/colors/index';
import * as ExpoImagePicker from 'expo-image-picker';

let imagemSelecionada = undefined;

export default function ImagePicker(props) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ExpoImagePicker.requestCameraRollPermissionsAsync();

        if (status !== 'granted') {
          alert('Desculpe, nós precisamos acessar a galeria para isso!');
        }
      }
    })();

    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      cropperCircleOverlay: true,
      quality: 0.6,
    });

    if (!result.cancelled) {
      props.onChangeImage(result.uri);

      setImage(result.uri);

      imagemSelecionada = result.uri;
    }
  };

  const {
    permitirAdd
  } = props;

  return (
    <ImageBackground
      source={{
        uri: !image ? imagemSelecionada : image
      }}
      style={styles.container}
      borderRadius={100}>

      <View style={styles.circle}>
        <TouchableOpacity
          style={
            !permitirAdd
              ? styles.btnHidden
              : styles.btnAdicionar
          }
          onPress={pickImage}>
          <Image
            style={styles.imagemAdicao}
            source={require("../../assets/icons/adicao.png")} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: hp('5.5%'),
    // marginBottom: hp('1%'),
    height: hp('22%'),
    width: hp('18%'),
  },
  circle: {
    // marginTop: hp('5.5%'),
    // marginBottom: hp('1%'),
    height: hp('18%'),
    width: hp('18%'),
    borderRadius: wp('50%'),
    backgroundColor: colors.cinza,
    flexDirection: 'column-reverse',
    alignItems: 'flex-end'
  },
  titleImage: {
    height: hp('4%'),
    width: hp('18%'),
    flexDirection: 'column',
  },
  btnAdicionar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.azulVibrante,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnHidden: {
    display: 'none'
  },
  title: {
    fontSize: hp('2.2%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagemAdicao: {
    width: hp('2.6%'),
    height: hp('2.6%'),
  },
});
