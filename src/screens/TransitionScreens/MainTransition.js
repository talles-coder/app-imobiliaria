import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class MainTransition extends React.Component {
  componentDidMount() {
    setTimeout(() => { this.props.navigation.navigate('Main') }, 2000)
  }

  // TODO - adicionar animações
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: wp('100%'), height: hp('100%'), justifyContent: "space-around", alignItems: "center" }}
          source={require('../../../assets/fundo.png')}>

          <Image style={styles.img} source={require('../../../assets/logo.png')}></Image>
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
    marginTop: wp('30%'),
    height: hp('20%'),
    width: hp('40%')
  },
});