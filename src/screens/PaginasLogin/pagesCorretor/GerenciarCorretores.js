import React from 'react';
import { ImageBackground, FlatList, Image, Alert,  StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity , Modal} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Header from '../../../components/Header';

import Global from '../../../global/Global';
import Button from '../../../components/Button';

import {liberarReservaLote, venderLote} from '../../../database/Firebase'
import { dataFormatada, dataLimiteFormatada } from '../../../utils/Date'
import updateCorretores, {excluir, alterarTipo} from "../../../services/ListarCorretores";

import CriarUsuario from './subPages/CriarUsuario';
import DetalhesUsuario from './subPages/DetalhesUsuario';

import { getImageFromFirebase } from '../../../database/Firebase';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { any, object } from 'prop-types';

const fundo = "../../../../assets/fundo.png";

export default class GerenciarCorretores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teste : [],
      modalDetalhes: false,
      modalCriarUsuario: false,
      dados: [],
      updating: true,
      loteData: {},
      index: "",
      selectId: false,
      selectUser: {}
    };
  }
  
  // TODO - limitar nome dos lotes para caber na View 

  componentDidMount = () => {
    this.setState({
      updating: true
    })
    updateCorretores()
      .then((array)=>{
        this.setState({
          dados: array,
          updating: false
        })
      })
      .catch((error) => {console.log(error)})
  }

  setDetalhesVisible = (visible) => {
    this.setState({ modalDetalhes: visible });
  }

  setCriarUsuario = (visible) => {
    this.setState({ modalCriarUsuario: visible });
  }
  
  excluirUsuario = (idUsuario) =>{
    excluir(idUsuario).then(
      this.componentDidMount
    )
  }

  alterarPerfil(idUsuario, tipoUsuario){
    if (tipoUsuario === "gestor") {
      alterarTipo(idUsuario, "corretor").then(
        this.componentDidMount
      )
    } else {
      alterarTipo(idUsuario, "gestor").then(
        this.componentDidMount
      )
    }
  }

  buscarImagemPerfil = () => {    
    getImageFromFirebase("photo42.2552577756843.jpg").then((res)=>{
      this.state.teste.push(res)
    })
  }

  render(){
    const { dados, updating, selectId, selectUser ,modalCriarUsuario, modalDetalhes} = this.state

    // const {touchable} = this.state
    const {data, atualizar} = this.props
    let titulo = "Gerenciar Corretores"
    return (
    <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <View style={styles.container} pointerEvents={updating ? 'none': 'auto'}>
          <Header titulo={titulo} funcao={()=> {this.props.navigation.openDrawer()}} />
            <View style={{height:"90%", width: wp("90%"), alignSelf: 'center', flexDirection: "column-reverse"}}>
                <FlatList
                refreshing={updating}
                onRefresh={this.componentDidMount}
                data={dados}
                renderItem={({ item }) => {
                    return (
                    <View>
                        <View style={[styles.caixa, {height: item.identificacao.email === selectId ? hp("33%"): hp("12%")}]}>
                            <View style={{flexDirection: "row"}}>
                                <Image
                                    style={styles.imgPerfil}
                                    source={{ uri: item.URLImagem}}
                                />
                                <View style={{width: "60%", marginLeft: 10}}>
                                  <Text numberOfLines={1} style={[styles.nome]}>{item.identificacao.nome}</Text>
                                  <Text numberOfLines={1} style={[styles.titleStatus]}>Perfil: {item.tipo}</Text>
                                </View>
                                <View style={{width: "20%"}}>
                                    <TouchableOpacity onPress={()=>{
                                      if (item.identificacao.email !== selectId) {
                                        this.setState({
                                          selectId: item.identificacao.email
                                        })
                                      } else {
                                        this.setState({
                                          selectId: ""
                                        })
                                      }
                                    }}>
                                      <Icon
                                        name={item.identificacao.email === selectId ? 'angle-up': 'angle-down'}
                                        type='font-awesome'
                                        size={40}
                                        color='#000'
                                      />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            { item.identificacao.email === selectId
                              ?
                              <View style={{alignSelf: "center", justifyContent: "space-evenly", height: "80%" }}>
                                <Button 
                                    titulo={item.tipo === "gestor" ? 'Tornar Corretor': 'Tornar Gestor'} 
                                    funcao={()=>{
                                      this.alterarPerfil(item.identificacao.email, item.tipo)
                                      this.setState({updating: true})
                                    }} 
                                    btStyle={[styles.btn ,{backgroundColor: "#4FBF1F"}]}
                                    />
                                <Button 
                                    titulo='Excluir usuário' 
                                    funcao={()=>{
                                      this.excluirUsuario(item.identificacao.email)
                                    }} 
                                    btStyle={[styles.btn ,{backgroundColor: "#D52206"}]}
                                    />
                                <Button
                                    titulo='Detalhes' 
                                    funcao={()=>{
                                      this.setState({
                                        selectUser: {
                                          id: item.identificacao.email,
                                          nome: item.identificacao.nome,
                                          foto: item.URLImagem,
                                          celular: item.celular
                                        }
                                      })
                                      this.setDetalhesVisible(true)
                                    }} 
                                    btStyle={[styles.btn ,{backgroundColor: "#1406D5"}]}
                                    />
                            </View>
                           : 
                            null  
                          }
                        </View>
                            
                    </View> 
                    );
                  }}
                keyExtractor={(item) => item.identificacao.email} 
            />
            <View style={styles.plus}>
              <TouchableOpacity onPress={()=>{
                this.setCriarUsuario(true)
              }}>
                <Icon
                  name='plus'
                  type='font-awesome'
                  size={40}
                  color='#FFF'
                />
              </TouchableOpacity>
            </View>
            
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalDetalhes}
                  onRequestClose={() => {
                    this.setDetalhesVisible(false);
                  }}
                >
                  <DetalhesUsuario
                    dados={selectUser}
                    back={()=>{this.setDetalhesVisible(false)}}
                  />
            </Modal>

            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalCriarUsuario}
                  onRequestClose={() => {
                    this.setCriarUsuario(false);
                  }}
                >
                  <CriarUsuario
                    back={()=>{this.setCriarUsuario(false)}}
                  />
            </Modal>
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
    plus: {
      width: hp("8%"), 
      height: hp("8%"), 
      position: 'absolute',
      alignSelf: "flex-end",
      backgroundColor: "#063BD5",
      borderRadius: hp("50%"),
      marginBottom: hp("5%"),
      justifyContent: "center",
    },
      imgPerfil: {
          width: hp('8%'),
          height: hp('8%'),
          borderRadius: hp('50%'),
          borderWidth: 1,
          borderColor: "#000"
      },
      imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "space-around", 
        alignItems: "center"
      },
      btn:{
        marginBottom: 0, 
        width:wp("70%"), 
        height:hp("5%"),
      },
    caixa: {
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
    nome: {
        fontSize: hp('2.7%'),
        color: "#000",
        textAlignVertical: 'bottom',
        fontWeight: 'bold',
    },
    titleStatus: {
        fontSize: hp('2.1%'),
        color: "#000",
        textAlignVertical: 'bottom',
        fontWeight: 'bold',
    },
});
