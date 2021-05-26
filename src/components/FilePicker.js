import React, { useState } from 'react';
import * as ExpoDocsPicker from 'expo-document-picker';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../styles/colors';

export default function FilePicker(props) {
  const [doc, setDoc] = useState(null);
  const [label, setLabel] = useState('Anexar Certificados e Diplomas')

  const pickDoc = async () => {
    let result = await ExpoDocsPicker.getDocumentAsync({
      multiple: false,
      copyToCacheDirectory: true,
      type: '*/*'
    });

    if (!result.cancelled) {
      props.onChangeDoc(result.uri);

      setDoc(result.uri);
      setLabel(result.name);
    }
  }

  return (
    <TouchableOpacity onPress={pickDoc}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {label}
        </Text>

        <Icon
          name='paperclip'
          style={{
            fontSize: 16,
            marginTop: 5,
            color: colors.branco,
          }}
        />

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderColor: colors.branco,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    width: wp('79.71%')
  },
  text: {
    fontSize: hp('2.0%'),
    color: colors.branco,
    textAlign: 'center',
  }
});