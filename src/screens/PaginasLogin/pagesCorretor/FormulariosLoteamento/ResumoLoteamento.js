import React from 'react';
import { ImageBackground, Image,TextInput , StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, Modal, ActivityIndicator, ScrollView} from 'react-native';

import colors from '../../../../styles/colors/index';
import  {  v4  as  uuidv4 } from  'uuid' ;

import Input from '../../../../components/Input';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
const fundo = "../../../../../assets/fundo.png";


import ImageViewer from 'react-native-image-zoom-viewer'
import PreviaQuadras from './PreviaQuadras'

import { uploadMapsSnapshotToFirebase, uploadPlantaToFirebase, uploadScriptToFirebase, addNewLoteamento } from '../../../../database/Firebase';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Global from '../../../../global/Global';

// const iconeCorretor = '../../../../../assets/Corretor.png';
// const Gestor = '../../../../../assets/Gestor.png'


export default class ResumoLoteamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      address: {
        address: {
          bairro: "",
          cep: "",
          cidade: "",
          endereco: "",
          enderecoFormatado: "",
          estado: "",
          numero: "",
        },
        changeCord: {
          latitude: "",
          longitude: "",
        },
        descricao: "",
        fileName: "",
        latDelta: "",
        localInicial: {
          latitude: "",
          latitudeDelta: "",
          longitude: "",
          longitudeDelta: "",
        },
        lonDelta: "",
        mapSnapshotURI: "",
        modalVisible: true,
        opaci: 0.7,
        pesquisa: "",
        readyToSnap: true,
        userLoc: true,
        validAddress: true,
      },
      csvObject:  {
        content:  [],
        name: "",
        uri: "",
        values: {
          totalLotes: 0,
          totalQuadras: 0,
        },
      },
      loading: false,
      modalVisible: false,
      notas: "",
      nomeLote: "",
      planta:{
        fileName: "",
        resultado: "",
      },
      script: {
        resultado: "",
        scriptName: "",
      },
      loading: false
    };
  }

  handleNotasChange = (input) => {
    this.setState({ notas: input })
  };

  componentDidMount(){
    this.setState({
      loading: true   
    })
    const { getState } = this.props;
    let data = getState(this.state);
    if (this.state.nomeLote !== data.nomeLote) {
      this.setState({
        nomeLote: data.nomeLote,
        csvObject: data.csvObject,
        address: data.address,
        planta: data.planta,
        script: data.script,
      })
    }
    this.setState({
      loading: false
    })
  }

  setModalVisible = (visible) => {
    console.log(this.state)
    this.setState({ modalVisible: visible });
  }

  uriToBlob = async (uri) => {
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };

      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  handleSubmit = async () => {
    this.setState({
      loading: true
    })
    let nome = this.state.nomeLote

    const blobPlanta = await this.uriToBlob(this.state.planta.resultado);

    await uploadPlantaToFirebase(blobPlanta, this.state.planta.fileName);

    const blobMaps = await this.uriToBlob(this.state.address.mapSnapshotURI);

    await uploadMapsSnapshotToFirebase(blobMaps, this.state.address.fileName);

    const blobScript = await this.uriToBlob(this.state.script.resultado);

    await uploadScriptToFirebase(blobScript, this.state.script.scriptName);

    let dados = {
      nomeLote: this.state.nomeLote,
      csvObject: {
        name: this.state.csvObject.name,
        content: {},
        totalQuadras: this.state.csvObject.values.totalQuadras,
        totalLotes:  this.state.csvObject.values.totalLotes,
        totalReservados: 0,
        totalVendidos: 0,
      },
      address: this.state.address,
      planta: this.state.planta.fileName,
      script: this.state.script.scriptName,
      notas: this.state.notas,
      cadastador: Global.NOME
    };
    
    this.state.csvObject.content.forEach((element, index) => {dados.csvObject.content[index] = element});
    addNewLoteamento( uuidv4() , dados);
    
    // Alert.alert('Cadastro efetuado com sucesso!');
    this.nextStep();
  };

  nextStep = () => {
    const { next, saveState } = this.props;
    saveState(this.state);

    next();
  };

  goBack = () => {
    const { back } = this.props;

    back();
  }

  render() {
    const {modalVisible, loading, notas=""} = this.state
    let nome = 'Revise as Informações'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        {
          !loading
          ?
            <View style={styles.container}>
              <View style={{marginVertical: hp('2%')}}>
                <Header titulo={nome} funcao={this.goBack} icon={true}/>
              </View>

              <ScrollView>
                <View style={styles.resumo}>
                  <Text style={{fontSize:14, fontWeight: 'bold'}}>Planta:</Text>
                  <View style={{height:150, width: "100%", alignSelf: 'center'}}>
                    { this.state.planta?.resultado ?
                      <Image
                      style={styles.imgPerfil}
                      resizeMethod="resize"
                      resizeMode='cover'
                      source={{ uri: this.state.planta?.resultado}}
                      />
                  : <Text>Erro: Não foi realizada a captura do mapa, tente novamente</Text>}
                  </View>

                  <Text style={{fontSize:14, fontWeight: 'bold'}}>Script:</Text>
                  <View style={{height:150, width: "100%", alignSelf: 'center'}}>
                    { this.state.script?.resultado
                      ?
                      <Image
                      style={styles.imgPerfil}
                      resizeMethod="resize"
                      resizeMode='cover'
                      source={{ uri: this.state.script?.resultado}}
                      />
                      : 
                      <Text>Erro: Não foi realizada a captura do mapa, tente novamente</Text>
                      }
                  </View>

                  <Text style={{fontSize:14, fontWeight: 'bold'}}>Localização: </Text>
                  <View style={{height:150, width: "100%", alignSelf: 'center', flexDirection: "row"}}>
                    <Text style={{alignSelf: 'flex-end',fontSize:14, width: "100%", position: "absolute", zIndex: 1, backgroundColor: "#cdcdcd", opacity: 0.8, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingStart: 10}}>{this.state.address.descricao}</Text>
                    { this.state.address?.mapSnapshotURI ?
                      <Image
                      style={styles.imgPerfil}
                      resizeMethod="resize"
                      resizeMode='cover'
                      source={{ uri: this.state.address.mapSnapshotURI}}
                      />
                  : <Text>Erro: Não foi realizada a captura do mapa, tente novamente</Text>}
                  </View>

                  <Text style={{fontSize:14, fontWeight: 'bold'}}>Notas:</Text>
                  <View style={{width: "100%", alignSelf: 'center',borderRadius: 15, borderColor: "#cdcdcd", borderWidth: 2}}>
                    <TextInput
                      editable
                      multiline
                      numberOfLines={1}
                      onChangeText={this.handleNotasChange}
                      value={notas}
                      style={{padding: 10}}
                    />
                  </View>
                   {/* TODO - Informar qtd de quadras */}
                  {/* <Text style={{fontSize:14, fontWeight: 'bold'}}>O Loteamento Possui: </Text>
                  <Text style={{textAlign: 'center'}}>
                  {this.state.csvObject.values.totalQuadras} quadras e {this.state.csvObject.values.totalLotes} lotes
                  </Text>  */}
                  <View style={{alignSelf: 'center'}}>
                    <Button titulo='Pré-visualização' funcao={() => {this.setModalVisible(true)}} btStyle={{width:wp('45%'), height:hp("4.5%"), marginTop: 23, marginBottom: 17}}/>
                  </View>
                </View>

                <Button titulo='CONTINUAR' funcao={this.handleSubmit} hidden={this.state.termoDeUso} btStyle={{alignSelf: "center", marginTop: 20}}/>

              </ScrollView>

              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible(false);
                  }}
                >
                  <View style={styles.maps}>
                    <PreviaQuadras
                      data={this.state}
                      back={() => {this.setModalVisible(false)}}
                    />
                  </View>
              </Modal>
            </View>
        :
          <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color="#5699d2"/>
          </View>
        }
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  resumo: {
    height: hp('100%'),
    width: wp('90%'),
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#888',
    paddingHorizontal: 20,
    justifyContent: 'space-around'
  },
  formulario: {
    marginBottom: hp('3.5%')
  },
  title: {
    fontSize: hp('2.2%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  maps: {
    height: '100%',
    backgroundColor: "#FFF",
    justifyContent: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "space-around",
    alignItems: "center"
  },
  imgPerfil: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    borderColor: "#999",
    borderWidth:2
},
});