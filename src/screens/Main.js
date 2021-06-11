import React, { useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, StatusBar } from 'react-native';

import { Modalize } from 'react-native-modalize';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../styles/colors/index';

const fundo = '../../assets/fundo.png';
const logo = '../../assets/logo.png';
const iconeCorretor = '../../assets/icons/Corretor.png';
const Gestor = '../../assets/icons/Gestor.png'

export default function Main(props) {
  const modalizeRef = useRef(null);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>

        <Image style={styles.img} source={require(logo)}></Image>

        <View>
          <TouchableOpacity style={styles.botoes} onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.txtbotao}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate('CadastroGestor')} style={styles.botoes}>
            <Text style={styles.txtbotao}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <StatusBar
        style='light'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  botoes: {
    backgroundColor: colors.azulVibrante,
    width: wp('61.6%'),
    height: hp('5.57%'),
    borderRadius: 10,
    marginTop: hp('3%'),
    justifyContent: 'center',
  },
  txtbotao: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
  },
  imgBackground: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: "space-around",
    alignItems: "center"
  },
  img: {
    alignSelf: "center",
    marginTop: wp('30%'),
    height: hp('20%'),
    width: hp('40%')
  },
  // modal
  containerModal: {
    justifyContent: "flex-end",
  },
  textModal: {
    fontSize: wp('4%'),
    color: colors.azulVibrante,
    fontWeight: 'bold'
  },
  btnModal: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  divisoriaModal: {
    margin: wp('2.5%'),
    width: wp('95%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.azulOpaco,
  },
  imgPerfisModal: {
    marginLeft: 30,
    marginRight: 35,
    height: hp('10%'),
    width: hp('10%'),
  }
});