import React, { Component } from 'react';
import { View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../styles/colors/index';

import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome"

export default class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.defaultValue,
    };
  }

  render() {
    const {
      largura,
      labelText,
      valor,
      inputValue,
      valorMudado,
      valoresDoSelect,
    } = this.props;

    return (
      <View>
        <RNPickerSelect
          style={{
            placeholder: {
              color: colors.branco,
              fontSize: hp('2.2%'),
              color: colors.branco,
              fontWeight: 'bold',
            },
            iconContainer: {
              color: colors.branco,
              paddingRight: 10
            },
            inputAndroid: {
              height: hp('3.95%'),
              color: colors.branco,
              textAlign: 'center',
              backgroundColor: colors.azulEscuro,
            },
            viewContainer: {
              marginTop: hp('3.5%'),
              borderBottomWidth: 1,
              padding: 10,
              borderBottomColor: colors.branco,
              borderRadius: 10,
              width: largura ? largura : wp('79.71%'),
              alignSelf: 'center',
              justifyContent: 'center'
            }
          }}
          placeholder={{
            label: labelText,
            value: valor,
          }}
          value={inputValue}
          onValueChange={valorMudado}
          items={valoresDoSelect}
          Icon={() => {
            return <Icon
              name='chevron-down'
              style={{
                fontSize: 16,
                color: colors.branco
              }}
            />;
          }}
        />

      </View>
    );
  }
};