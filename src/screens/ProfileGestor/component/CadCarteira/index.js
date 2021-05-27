import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../../../styles/colors';

export default function CadCarteira(props) {

    return (
        <View style={styles.container} >
            <Text style={styles.titulo}>Saldo Disponível</Text>
            <Text style={styles.StyleSaldo}> R$ {props.Saldo} </Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        height: heightPercentageToDP('15%'),
        width: '80%',
        backgroundColor: '#fff',
        margin: '3%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 18,
        marginBottom: 5,
        color: colors.cinza
    },
    StyleSaldo: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});