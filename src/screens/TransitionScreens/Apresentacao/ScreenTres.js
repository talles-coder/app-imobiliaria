import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../../../components/Header';
import colors from '../../../styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function ScreenTres(props) {
  return (
    <View style={styles.container}>
      <Header funcao={() => props.navigation.navigate('ScreenDois')} />

      <View style={styles.interno}>
        <Text style={styles.titulo}>
          Melhor Custo-benefício
        </Text>

        <Image source={require('../../../../assets/icons/cofrinho.png')}></Image>

        <Text style={styles.paragrafo}>
          Escolha o técnico que pode solucionar seu problema e que também atenda a seu orçamento.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('CadastroCliente')}>
          <Text style={styles.btnTransparente}>
            CADASTRAR
          </Text>
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
    alignItems: "center",
    justifyContent: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: wp('3%'),
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
  btnTransparente: {
    fontSize: wp('3.8%'),
    backgroundColor: colors.azulVibrante,
    borderRadius: 5,
    color: colors.branco,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
})