import React from 'react';
import { StyleSheet,StatusBar, Text, View, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors/index";
// import Button from '../../components/Button';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titulo, funcao , icon} = this.props;

    return (
      <View style={styles.container}>
        <StatusBar hidden = {false} translucent = {false} />

        <TouchableOpacity style={styles.btnVoltar} onPress={funcao}>
          {
            icon
            ?
            <Icon
                name="chevron-left"
                style={{
                  fontSize: 24,
                  color: colors.branco
                  }}
            />
            :
            <Icon
                name="bars"
                style={{
                  fontSize: 24,
                  color: colors.branco
                  }}
            />
          }
        </TouchableOpacity>

        <Text style={styles.title} numberOfLines={1}>
          {titulo}
        </Text>
        <View style={{width:wp('12%')}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: hp('3.2%'),
    color: "#FFF",
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf:"center"
  },
  btnVoltar: {
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
