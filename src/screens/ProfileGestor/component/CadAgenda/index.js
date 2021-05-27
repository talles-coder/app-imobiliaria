import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../../../styles/colors';

export default function CadAgenda(props) {
    return (
        <View style={styles.container} >
            <Text style={styles.StyleAgenda}> {props.Agendado} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: heightPercentageToDP('15%'),
        width: '80%',
        margin: '3%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    StyleAgenda: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.branco
    }
});