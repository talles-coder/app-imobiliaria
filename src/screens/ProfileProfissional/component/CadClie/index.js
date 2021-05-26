import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../../../styles/colors';

export default function CadCli(props) {


    function filterDesc(desc) {
        if (desc.length < 60) {
            return desc;
        }

        return `${desc.substring(0, 55)}...`;
    }

    return (
        <View style={styles.container} >
            <View style={styles.Header}>
                <Image source={props.img} style={styles.CliImg} />

                <View style={styles.ColunaDescricao}>
                    <Text style={styles.StyleCli}> {props.NameCli} </Text>

                    <Text style={styles.StyleServi}> {props.Serviço} </Text>
                    <Text style={styles.StylePreço}> {filterDesc(props.Preço)} Reais</Text>
                    <Text style={styles.StyleStatus}> {props.Status}</Text>
                </View>

                <View style={styles.StyleAccess}>
                    <TouchableOpacity>
                        <View>
                            <Image source={require('../../assets/SetaRight.png')} style={styles.SetaEnt} />
                        </View>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'space-around',
    },
    ColunaDescricao: {
        width: widthPercentageToDP('55%'),
    },
    StyleCli: {
        fontSize: widthPercentageToDP('4.8%'),
        fontWeight: 'bold',
        width: widthPercentageToDP('55%'),
        marginBottom: heightPercentageToDP('0.8%')
    },
    StyleServi: {
        fontSize: widthPercentageToDP('3.5%'),
        marginBottom: heightPercentageToDP('0.4%'),
        opacity: 0.6,
        fontWeight: 'bold'
    },
    StylePreço: {
        fontSize: widthPercentageToDP('3.5%'),
        opacity: 0.5,
    },
    StyleStatus: {
        fontSize: widthPercentageToDP('3.5%'),
        fontWeight: 'bold'
    },
    CliImg: {
        resizeMode: 'contain',
        marginRight: widthPercentageToDP('2%')
    },
    StyleAccess: {
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },
});