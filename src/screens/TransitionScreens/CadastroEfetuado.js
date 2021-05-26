import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import colors from '../../styles/colors/index';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class CadastroEfetuado extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      const { next } = this.props;

      next();
    }, 3000)
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.titulo}>CADASTRO EFETUADO COM SUCESSO!</Text>

        <Image style={styles.imagem} source={require('../../../assets/icons/Bolinha-adicionar-foto.png')} />

        <Text style={styles.text}>
          Seu perfil está em
          análise e em 5 dias
          úteis receberá um
          e-mail de aprovação de
          cadastro
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.azulEscuro,
    alignItems: 'center',
  },
  titulo: {
    fontSize: hp('2.7%'),
    color: colors.branco,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('20%'),
    marginBottom: hp('10%'),
    marginRight: wp('6.9%'),
    marginLeft: wp('6.9%'),
  },
  imagem: {
    height: hp('19.7%'),
    width: hp('20%'),
    marginBottom: hp('10%')
  },
  text: {
    fontSize: hp('2.7%'),
    color: colors.branco,
    textAlign: 'center',
    marginRight: wp('6.9%'),
    marginLeft: wp('6.9%'),
  }
});
