import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../../styles/colors';

export default function CadPro(props) {
    function filterDesc(desc) {
        if (desc.length < 60) return desc;

        return `${desc.substring(0, 55)}...`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Image source={props.img} style={styles.imagemProfissional} />

                <View style={styles.ColunaDescricao}>
                    <Text style={styles.StyleName}> {props.NameProf} </Text>

                    <Text style={styles.StyleRamo}> {props.NameRamo} </Text>
                    <Text style={styles.StyleDesc}> {filterDesc(props.DescServico)} </Text>

                    <View style={styles.linhaDistancia}>
                        <Icon name='location-on' style={styles.StyleDist} />
                        <Text style={styles.StyleDist}> {props.Distancia}</Text>
                    </View>
                </View>

                <View style={styles.StyleAva}>
                    <Icon name='star' size={20} />
                    <Text> {props.Avali} </Text>
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
        height: heightPercentageToDP('22%'),
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
        justifyContent: 'space-around',
    },
    ColunaDescricao: {
        width: widthPercentageToDP('55%'),
    },
    linhaDistancia: {
        height: '33.3%',
        alignItems: 'center',
        flex: 0.6,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#b3b3b3',
        paddingTop: heightPercentageToDP('2%'),
        marginTop: heightPercentageToDP('2%')
    },
    StyleName: {
        fontSize: widthPercentageToDP('4.8%'),
        fontWeight: 'bold',
        width: widthPercentageToDP('55%'),
        marginBottom: heightPercentageToDP('0.8%')
    },
    StyleRamo: {
        fontSize: widthPercentageToDP('3.5%'),
        marginBottom: heightPercentageToDP('0.4%'),
        opacity: 0.6,
        fontWeight: 'bold'
    },
    StyleDesc: {
        fontSize: widthPercentageToDP('3%'),
        opacity: 0.5,
    },
    StyleDist: {
        fontSize: widthPercentageToDP('3%'),
        opacity: 0.5,
    },
    imagemProfissional: {
        resizeMode: 'contain',
        marginRight: widthPercentageToDP('2%')
    },
    StyleAva: {
        flexDirection: 'row',
        opacity: 0.6,
    },
    StyleAccess: {
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },
});