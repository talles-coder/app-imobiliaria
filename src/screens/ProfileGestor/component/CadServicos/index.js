import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export default function CadServicos(props) {

  return (

    <View style={styles.container} >
      <Text style={styles.text}>Você não possui serviços</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.branco,
    fontWeight: 'bold',
    fontSize: 20
  }
});