import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../../../components/Header';
import colors from '../../../styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function ScreenUm(props) {
  return (
    <View style={styles.container}>
      <Header funcao={() => props.navigation.navigate('Main')} />

      <View style={styles.interno}>
        <Text style={styles.titulo}>
          Conforto e Rapidez
        </Text>

        <Image source={require('../../../../assets/icons/rota.png')} width={105} height={105}></Image>

        <Text style={styles.paragrafo}>
          Solicite um técnico em TI no conforto de sua casa e sem dor de cabeça
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('CadastroCorretor')}>
          <Text style={styles.btnTransparente}>
            PULAR
          </Text>
        </TouchableOpacity>

        <Image style={styles.icon} source={require('../../../../assets/icons/telaUm.png')}></Image>


        {/* TODO - fix */}
        <TouchableOpacity onPress={() => props.navigation.navigate('ScreenDois')}>
          <Image source={require('../../../../assets/icons/seta-avancar.png')}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.azulEscuro,
    padding: 10
  },
  interno: {
    flex: 1,
    height: hp('38%'),
    marginRight: wp('10%'),
    marginLeft: wp('10%'),
    alignItems: "center",
    justifyContent: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titulo: {
    color: colors.branco,
    fontSize: wp('6%'),
    textAlign: "center",
    marginBottom: hp('8.96%')
  },
  paragrafo: {
    width: wp('88%'),
    color: colors.branco,
    fontSize: wp('4%'),
    textAlign: "center",
    marginTop: hp('8.96%'),
    lineHeight: 23
  },
  icon: {
    height: hp('1.2%'),
    width: hp('4.9%'),
    marginBottom: 20
  },
  btnTransparente: {
    fontSize: wp('3.5%'),
    backgroundColor: colors.azulVibrante,
    borderRadius: 5,
    color: colors.branco,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderWidth: 0
  },
})