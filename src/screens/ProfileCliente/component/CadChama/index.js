import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../../../styles/colors';

export default function CadMsg(props) {
    function filterDesc(desc) {
        if (desc.length < 40) {
            return desc;
        }
        return `${desc.substring(0, 35)}...`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Image source={props.img} style={styles.ImagemProfissional} />

                <View style={styles.ColunaDescricao}>
                    <Text style={styles.StyleName}> {props.NameProf}</Text>

                    <Text style={styles.StyleRamo}> {props.NameRamo}</Text>
                    <Text style={styles.StyleDesc}> {filterDesc(props.DescServico)}</Text>

                    <Text style={styles.StyleStatus}> {props.Status}</Text>
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
        height: heightPercentageToDP('18%'),
        width: widthPercentageToDP('90%'),
        backgroundColor: colors.branco,
        margin: heightPercentageToDP('2%'),
        padding: 15,
        borderColor: '#9c9c9c',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'space-around'
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
    StyleStatus: {
        fontSize: widthPercentageToDP('3%'),
        marginTop: heightPercentageToDP('2%'),
        opacity: 0.5,
        fontWeight: 'bold'
    },
    ImagemProfissional: {
        resizeMode: 'contain',
        marginRight: widthPercentageToDP('2%')
    },
    StyleAccess: {
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    }
});