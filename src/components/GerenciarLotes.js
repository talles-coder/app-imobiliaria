import React from 'react';
import { ImageBackground, FlatList, Image, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';

import Button from './Button';
import Global from "./../global/Global"

import { reservarLote, liberarReservaLote, venderLote} from "../database/Firebase";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class GerenciarLotes extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
          tipo: Global.PROFILETYPE,
      };
    }

    reservar = () => {
        const usuario = Global.NOME
        reservarLote(this.props.id, this.props.index, this.props.quadra, usuario ).then(
            ()=>{this.props.atualizar()
            })
        .catch((error)=> {Alert.alert(error.toString())})
    }
    
    cancelar = () => {
        liberarReservaLote(this.props.id, this.props.index, this.props.quadra, this.props.corretor)
        .then(()=>{this.props.atualizar()})
        .catch((error)=> {Alert.alert(error.toString())})
    }

    vender = () => {
        venderLote(this.props.id , this.props.index , this.props.quadra , this.props.corretor.length ? this.props.corretor : Global.NOME , Global.NOME)
        .then(()=>{this.props.atualizar()})
        .catch((error)=> {Alert.alert(error.toString())})
    }
   
    render() {
        const {lote ,status ,data ,corretor ,gestor}  = this.props
        const {tipo} = this.state
        var date = new Date(data*1000);
        var dataFormatada = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).substr(-2) + ":" + ("0" + date.getMinutes()).substr(-2);
        date.setDate(date.getDate() + 2);
        var dataLimiteFormatada = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).substr(-2) + ":" + ("0" + date.getMinutes()).substr(-2);
        if (tipo == "gestor") { 
            if (status == "reservado") {
                return (
                    <View style={styles.loteReservado}>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <Text style={[styles.title]}>{lote}</Text>
                            <Button titulo='Cancelar' funcao={this.cancelar} btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%"), backgroundColor: "#D52206"}}/>
                            <Button titulo='Vender' funcao={this.vender} btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%"), backgroundColor: "#40B21E" }}/>
                        </View>
                        <View>
                            <Text style={[styles.titleStatus]}>Status : {status} por {corretor}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <Text style={[styles.titleData]}>Data da Reserva :{`\n`}{dataFormatada}</Text>
                            <Text style={[styles.titleData]}>Expira em :{`\n`}{dataLimiteFormatada}</Text>
                        </View>
                    </View>
                    )
            }
            if (status == "vendido") {
                return (
                    <View style={styles.loteReservado}>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <Text style={[styles.title]}>{lote}</Text>
                            <Button titulo='Reativar' funcao={this.cancelar} btStyle={{marginBottom: 0, width:wp("55%"), height:hp("5%"), backgroundColor: "#0C610F" }}/>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                        <View>
                            <Text style={[styles.titleStatus]}>Status : {status}</Text>
                            <Text style={[styles.titleStatus]}>Corretor(a) : {corretor}</Text>
                            <Text style={[styles.titleStatus]}>Gestor(a) : {gestor}</Text>
                        </View>
                            <Text style={[styles.titleData]}>Data da Venda :{`\n`}{dataFormatada}</Text>
                        </View>
                    </View>
                    )
            }
            if (status == "disponivel") {
                return (
                        <View style={styles.caixa}>
                            <Text style={[styles.title]}>{lote}</Text>
                            <Button titulo='Reservar' funcao={this.reservar} btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%")}}/>
                            <Button titulo='Vender' funcao={this.vender} btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%")}}/>    
                        </View>
                        )
            }
        } 
        if (tipo == "corretor") { 
            if (status == "reservado") {
                return (
                    <View style={styles.loteReservado}>
                        <View style={styles.caixaReserva}>
                            <Text style={[styles.title]}>{lote}</Text>
                            {
                                corretor == Global.NOME
                            ?
                                <Button titulo='Cancelar' funcao={this.cancelar} btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%"), backgroundColor: "#D52206"}}/>
                            :
                                null
                            }
                        </View>
                        <View>
                            <Text numberOfLines={1} style={[styles.titleStatus]}>Status : {status} por {corretor}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <Text style={[styles.titleData]}>Data da Reserva :{`\n`}{dataFormatada}</Text>
                            <Text style={[styles.titleData]}>Expira em :{`\n`}{dataLimiteFormatada}</Text>
                        </View>
                    </View>
                    )
            }
            if (status == "vendido") {
                return (
                    <View style={[styles.loteReservado, {height:hp("18%")}]}>
                        <View style={{flexDirection: "row", justifyContent: 'space-between', width: '100%' }}>
                            <Text style={[styles.title]}>{lote}</Text>
                            <Text style={[styles.titleStatus, {fontSize: 20,  width:wp("24%"), textAlign: 'center'}]}>{status}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: 'space-between', width: '100%', height: '55%'}}>
                            
                            <View style={{width: '57%', justifyContent: 'space-around'}}>
                                <Text numberOfLines={1} style={[styles.titleStatus]}>Corretor(a): {corretor}</Text>
                                <Text style={[styles.titleStatus]}>Gestor(a): {gestor}</Text>
                            </View>
                            <Text style={[styles.titleData, {}]}>Data da Venda :{`\n`}{dataFormatada}</Text>
                        </View>
                    </View>
                    )
            }
            if (status == "disponivel") {
                return (
                        <View style={styles.caixa}>
                            <Text style={[styles.title]}>{lote}</Text>
                            <Button 
                                titulo='Reservar'
                                funcao={this.reservar} 
                                btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%")}}
                            /> 
                        </View>
                        )
            }
        }
    }
  }

  const styles = StyleSheet.create({
    caixa:{
        paddingHorizontal: "5%",
      flexDirection: 'row',
      backgroundColor:'white',
      borderRadius:15,
      width:wp("90%"),
      height:hp("8%"),
      marginTop:10,
      marginBottom:10,
      alignSelf:'center',
      alignItems:'center',
      borderWidth:0.7,
      justifyContent:'space-between'
    },
    caixaReserva:{
        flexDirection: 'row',
        justifyContent:'space-between'
      },
    loteReservado: {
        backgroundColor:'white',
        borderRadius:15,
        padding: hp("2.2%"),
        width:wp("90%"),
        height:hp("20%"),
        marginTop:10,
        marginBottom:10,
        alignSelf:'center',
        borderWidth:0.7,
        justifyContent:'space-between'
    },
    title: {
        fontSize: hp('2.5%'),
        color: "#000",
        textAlign: 'center',
        textAlignVertical: 'bottom',
        fontWeight: 'bold',
        textAlignVertical: 'center',
      },
    titleStatus: {
        fontSize: hp('2.1%'),
        color: "#000",
        textAlignVertical: 'bottom',
        fontWeight: 'bold',
    },
    titleData: {
        fontSize: hp('2%'),
        color: "#000",
        textAlignVertical: 'center',
        fontWeight: 'bold',
    }
  });