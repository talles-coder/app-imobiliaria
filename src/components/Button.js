import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from '../styles/colors/index';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { titulo, funcao, hidden=false, btStyle } = this.props;

    return (
      <View style={[styles.wrapper]}>
        <TouchableOpacity 
          style={[hidden ? styles.buttonHidden: styles.button, btStyle ]} 
          onPress={funcao}
          disabled={hidden}
        >
          <Text style={styles.text}>
            {titulo}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  wrapper: {
    bottom: 0
  },
  button: {
    backgroundColor: "#063BD5",
    width: wp('61.6%'),
    height: hp('5.57%'),
    marginBottom: hp('3.5%'),
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonHidden: {
    backgroundColor: colors.cinza,
    width: wp('61.6%'),
    height: hp('5.57%'),
    borderRadius: 10,
    justifyContent: 'center'
  },
  text: {
    fontSize: hp('2.2%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});