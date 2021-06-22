import React from 'react';
import { Text, StyleSheet, View, ImageBackground, Image } from 'react-native';
import Button from '../../../../components/Button';
import colors from '../../../../styles/colors/index';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class ConclusaoCadastro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senha: '',
      confirmacaoSenha: '',
    };
  }

  finish = () => {
    const { finish } = this.props;

    finish();
  }

  // TODO - adicionar animações
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: wp('100%'), height: hp('100%'), justifyContent: "space-around", alignItems: "center" }}
          source={require('../../../../../assets/fundo.png')}>

          <View style={styles.textView}>
            
            <Text style={styles.text}>
              Cadastro de Loteamento efetuado com sucesso!
            </Text>
            
            <Image style={styles.img} source={require('../../../../../assets/Bolinha-foto.png')}></Image>
            
            <Text style={styles.text}>
              Vá para "Loteamentos" para ver seus lotes.
            </Text>

          </View>


          <Button titulo='Login' funcao={this.finish} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    alignSelf: "center",
    marginTop: hp('0%'),
    height: wp('40%'),
    width: wp('40.5%')
  },
  textView: {
    marginTop: hp('10%'),
    height: hp('60%'),
    width: wp('90%'),
    justifyContent: 'space-around',
  },
  text: { 
    fontSize: hp('3,3%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});