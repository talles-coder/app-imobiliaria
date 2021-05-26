import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../../../styles/colors';

export default function CadMensagens(props) {


    function filterDesc(mens) {
        if (mens.length < 43) {
            return mens;
        }

        return `${mens.substring(0, 38)}...`;
    }


    return (

        <View style={styles.container} >
            <View style={styles.Header}>
                <Image source={props.img} style={styles.ProfImg} />

                <View style={styles.ColunaDescricao}>
                    <Text style={styles.StyleName}> {props.NameProf} </Text>

                    <Text style={styles.StyleDesc}> {filterDesc(props.DescServico)}</Text>
                </View>
            </View>

            <View style={styles.StyleAccess}>
                <TouchableOpacity>
                    <Image source={require('../../assets/SetaRight.png')} style={styles.SetaEnt} />
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        height: heightPercentageToDP('15%'),
        width: widthPercentageToDP('90%'),
        backgroundColor: colors.branco,
        margin: heightPercentageToDP('2%'),
        padding: 15,
        borderColor: '#9c9c9c',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center'
    },
    Header: {
        flexDirection: 'row',
    },
    ColunaDescricao: {
        width: widthPercentageToDP('55%'),
    },
    StyleName: {
        fontSize: widthPercentageToDP('4.8%'),
        fontWeight: 'bold',
        width: widthPercentageToDP('55%'),
        marginBottom: heightPercentageToDP('0.8%')
    },
    StyleDesc: {
        fontSize: widthPercentageToDP('3%'),
        opacity: 0.5,
    },
    ProfImg: {
        resizeMode: 'contain',
        marginRight: widthPercentageToDP('2%')
    },
    StyleAccess: {
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    }
});