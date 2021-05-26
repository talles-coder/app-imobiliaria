import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../../../styles/colors';

export default function CadPag(props) {
    return (
        <View style={styles.container} >
            <View style={styles.Header}>
                <Image source={props.img} style={styles.ProfImg} />

                <View style={styles.ColunaDescricao}>
                    <Text style={styles.StyleName}> {props.NameProf} </Text>
                    <Text style={[
                        styles.StyleDivida,
                        props.Divida === 'Pago'
                            ? {
                                color: colors.verde
                            }
                            : {
                                color: colors.vermelho
                            }
                    ]}> {(props.Divida)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: heightPercentageToDP('13%'),
        width: widthPercentageToDP('90%'),
        backgroundColor: colors.branco,
        margin: heightPercentageToDP('2%'),
        padding: 15,
        borderColor: '#9c9c9c',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center'
    },
    ColunaDescricao: {
        width: widthPercentageToDP('55%'),
    },
    Header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    StyleName: {
        fontSize: widthPercentageToDP('4.8%'),
        fontWeight: 'bold',
        width: widthPercentageToDP('55%'),
        marginBottom: heightPercentageToDP('0.8%')
    },
    StyleDivida: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    ProfImg: {
        resizeMode: 'contain',
        marginRight: widthPercentageToDP('2%')
    }
});