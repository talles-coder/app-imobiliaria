import React, { useState } from 'react';
import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/FontAwesome"
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../styles/colors';


export default function CheckBox(props) {
  const [checkState, setCheckState] = useState(false)


  function handleChange() {
    let { onChange } = props;
    (checkState) ? setCheckState(false) : setCheckState(true);

    if (onChange) return onChange();
  }

  return (
    <View style={[
      styles.WrapperCheckBox,
      {
        width: props.largura ? props.largura : ('79.71%'),
        borderBottomWidth: props.bordaBottom ? props.bordaBottom : 0,
        borderBottomColor: colors.branco,
        paddingBottom: props.bordaBottom ? 5 : 0
      }]}>

      <TouchableOpacity onPress={handleChange} style={[
        styles.CheckBox,
      ]}>

        {
          props.value
            ? <Icon
              name="check"
              style={{
                fontSize: 16,
                color: colors.branco
              }}
            />
            : null
        }

      </TouchableOpacity>

      <Text style={[styles.LabelCheck, props.labelStyle]}>
        {props.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  CheckBox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.branco
  },
  WrapperCheckBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp('3.5%'),
  },
  LabelCheck: {
    color: '#fff',
    marginLeft: 10
  }
})

CheckBox.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  onChange: PropTypes.func,
  // value: PropTypes.boolean,
}