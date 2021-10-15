import React from 'react';
import { ImageBackground, FlatList, Image, Alert,  StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Header from '../../../components/Header';

import Global from '../../../global/Global';
import Button from '../../../components/Button';

import {liberarReservaLote, venderLote} from '../../../database/Firebase'
import { dataFormatada, dataLimiteFormatada } from '../../../utils/Date'
import updateLoteamentos from "../../../services/Loteamentos";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const fundo = "../../../../assets/fundo.png";

export default class MinhasReservas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dados: [],
      updating: true,
      loteData: {},
      index: ""
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  // componentDidUpdate(){
  //   this.props.navigation.removeListener();
  // }

  // componentWillUnmount(){
  // }

  // TODO - limitar nome dos lotes para caber na View 

  componentDidMount = () => {
    
    this.setState({
      updating: true
    })
    updateLoteamentos("minhasReservas")
    .then((array)=>{
      this.setState({
        dados: array,
        updating: false
      })
    })
    .catch((error) => {console.log(error)})
  }

    cancelar = (id, index, quadra, idCorretor) => {
        liberarReservaLote(id, index, quadra, idCorretor)
        .then(this.componentDidMount)
        .catch((error)=> {console.log(error.toString())})
    }

    vender = (id , index , quadra , corretor, idCorretor) => {
        const usuario = corretor.length > 0 ? corretor: Global.NOME
        const idUsuario = idCorretor.length > 0 ? idCorretor: Global.EMAIL 
        venderLote(id , index , quadra , usuario, idUsuario , Global.NOME)
        .then(this.componentDidMount)
        .catch((error)=> {Alert.alert(error.toString())})
    }

  render(){
    const { dados, updating } = this.state

    const {data, atualizar} = this.props
    let titulo = "Minhas Reservas"

    return (
    <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <View style={styles.container} pointerEvents={updating ? 'none': 'auto'}>
          <Header titulo={titulo} funcao={()=> {this.props.navigation.openDrawer()}} />
            <View style={{height:"90%", width: wp("90%"), alignSelf: 'center'}}>
                {   dados.length === 0
                        ?
                        <View style={[styles.loteReservado, {height: hp("8%")}]}>
                            <Text style={[styles.titleStatus]}>Não há reservas por aqui</Text>
                        </View>
                       :
                        null
                    }
                <FlatList
                refreshing={updating}
                onRefresh={this.componentDidMount}
                data={dados}
                renderItem={({ item }) => {
                    return (
                    <View>
                        <View style={styles.loteReservado}>
                            <View>
                                <Text style={[styles.titleStatus]}>{item.nomeLote} - {item.quadra} - {item.lote}</Text>
                                <Text style={[styles.titleStatus, {fontSize:hp("1.8%"), fontWeight: "normal",  marginTop: 5}]}>{(item.endereco).split(', ')[2]}: {(item.endereco).split(',')[3]}</Text>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                                <Text style={[styles.titleData]}>Data da Reserva:{`\n`}{dataFormatada(new Date(item.data.seconds*1000))}</Text>
                                <Text style={[styles.titleData]}>Expira em:{`\n`}{dataLimiteFormatada(new Date(item.data.seconds*1000))}</Text>
                            </View>
                            <View style={{flexDirection: "row-reverse", justifyContent: 'space-between'}}>
                                <Button titulo='Cancelar' funcao={()=>{
                                    this.cancelar(item.id, item.index, item.quadra, item.corretor.email)
                                    this.setState({
                                        updating: true
                                    })
                                    }} btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%"), backgroundColor: "#D52206"}}
                                    />
                                {
                                    Global.PROFILETYPE === "gestor"
                                    ?
                                    <Button titulo='Vender' funcao={()=>{
                                        this.vender(item.id , item.index , item.quadra , item.corretor.nome, item.corretor.email , item.status)
                                        this.setState({
                                            updating: true
                                        })
                                        }} btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%"), backgroundColor: "#40B21E" }}
                                    />
                                   :
                                    null
                                }
                            </View>
                        </View>
                            {/* id={item.id}
                            index={item.index}
                            quadra={item.quadra}
                            lote={item.lote}
                            status={item.status}
                            data={item.data.seconds} 
                            corretor={item.corretor?.nome !== undefined ? item.corretor?.nome: Global.NOME}
                            idCorretor={item.corretor?.email !== undefined ? item.corretor?.email: Global.EMAIL}
                            gestor={item.gestor}
                            tipo={Global.PROFILETYPE}
                            atualizar={this.componentDidMount} */}
                    </View> 
                    );
                    }}
                keyExtractor={(item) => item.lote} 
            />
        </View> 
        </View> 

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp("1.7%"),
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      caixa:{
        flexDirection: 'row',
        backgroundColor:'white',
        borderRadius:15,
        width:wp("90%"),
        height:hp("8%"),
        marginTop:20,
        alignSelf:'center',
        alignItems:'center',
        borderWidth:0.7,
        justifyContent:'space-around'
      },
      formulario: {
        marginBottom: hp('3.5%')
      },
      title: {
        fontSize: hp('2.5%'),
        color: "#000",
        textAlign: 'center',
        textAlignVertical: 'bottom',
        fontWeight: 'bold',
        marginBottom: 10,
      },
      imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "space-around", 
        alignItems: "center"
      },
      imgPerfil: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        borderColor: "#999",
        borderWidth:2
    },
    loteReservado: {
        backgroundColor:'white',
        borderRadius:15,
        padding: hp("2.2%"),
        width:wp("90%"),
        height:hp("25%"),
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
