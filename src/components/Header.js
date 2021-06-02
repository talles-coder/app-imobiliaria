import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import colors from "../styles/colors/index";
// import Button from '../../components/Button';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titulo, funcao } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnVoltar} onPress={funcao}>
          <Image style={styles.imagem} source={require("../../assets/icons/btn-voltar.png")} />
        </TouchableOpacity>

        <Text style={styles.title}>
          {titulo}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    paddingTop: hp('2.2%'),
  },
  imagem: {
    width: wp('2.5%'),
    height: hp('2.3%'),
  },
  title: {
    fontSize: hp('2.2%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  btnVoltar: {
    position: 'absolute',
    width: wp('15%'),
    height: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3
  }
});
