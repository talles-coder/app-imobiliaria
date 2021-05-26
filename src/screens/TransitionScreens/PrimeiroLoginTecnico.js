import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import colors from '../../styles/colors/index';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class PrimeiroLoginTecnico extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  nextStep = () => {
    const { next, saveState } = this.props;
    saveState(this.state);

    next();
  };

  pickName = () => {
    const { getState } = this.props;

    const data = getState(this.state);

    const nome = data.nome;
    const nomeFormatado = nome?.split(' ').shift();

    return nomeFormatado;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>OLÁ {this.pickName()}</Text>

          <Image style={styles.imagem} source={require('../../../assets/icons/garoto.png')} />

          <Text style={styles.text}>
            Antes de começar a trabalhar adicione os dados complementares do seu perfil!
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.nextStep}>
            <Text style={styles.btnTransparente}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.azulEscuro,
    justifyContent: 'space-around'
  },
  titulo: {
    fontSize: hp('2.7%'),
    color: colors.branco,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('15%'),
    marginBottom: hp('10%'),
    marginRight: wp('6.9%'),
    marginLeft: wp('6.9%'),
    textTransform: 'uppercase'
  },
  imagem: {
    height: hp('18%'),
    width: hp('18%'),
    marginBottom: hp('10%'),
  },
  conteudo: {
    alignItems: 'center'
  },
  text: {
    fontSize: hp('2.7%'),
    color: colors.branco,
    textAlign: 'center',
    marginRight: wp('6.9%'),
    marginLeft: wp('6.9%'),
    marginBottom: wp('15%'),
  },
  footer: {
    alignItems: 'flex-end',
    marginRight: wp('6%')
  },
  btnTransparente: {
    fontSize: wp('3.8%'),
    fontWeight: 'bold',
    backgroundColor: colors.azulVibrante,
    borderRadius: 5,
    color: colors.branco,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
  }
});
