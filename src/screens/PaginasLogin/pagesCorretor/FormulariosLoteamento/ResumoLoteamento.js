import React from 'react';
import { ImageBackground, Image, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, Modal} from 'react-native';

import colors from '../../../../styles/colors/index';
import  {  v4  as  uuidv4 } from  'uuid' ;

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
const fundo = "../../../../../assets/fundo.png";

import PreviaQuadras from './PreviaQuadras'

import { uploadMapsSnapshotToFirebase, uploadPlantaToFirebase, addNewLoteamento } from '../../../../database/Firebase';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// const iconeCorretor = '../../../../../assets/Corretor.png';
// const Gestor = '../../../../../assets/Gestor.png'


export default class ResumoLoteamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,

      nomeLote: "",
      planta: {
        fileName: "",
        resultado: ""
      },
      csvObject: {
        name: "",
        uri: "",
        content: "",
        values: {
          totalQuadras: "" ,
          totalLotes: "" ,
        }
      },
      address: {
        descricao: "",
        mapSnapshotURI: ""
      },
    };
  }

  componentDidMount(){
    const { getState } = this.props;
    let data = getState(this.state);
    if (this.state.nomeLote !== data.nomeLote) {
      this.setState({
        nomeLote : data.nomeLote,
        csvObject : data.csvObject,
        address : data.address,
        planta : data.planta,
      })
    }
  }

  setModalVisible = (visible) => {
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
    let nome = this.state.nomeLote

    const blobPlanta = await this.uriToBlob(this.state.planta.resultado);

    const nomeImagem = 'planta_' + new Date() + '.jpg';

    await uploadPlantaToFirebase(blobPlanta, nomeImagem);

    const blobMaps = await this.uriToBlob(this.state.address.mapSnapshotURI);

    const nomeMaps = 'mapSnap_' + new Date() + '.png';

    await uploadMapsSnapshotToFirebase(blobMaps, nomeMaps);

    let dados = {
      nomeLote : this.state.nomeLote,
      csvObject : {
        name: this.state.csvObject.name,
        uri: this.state.csvObject.uri,
        content: {},
        totalQuadras : this.state.csvObject.values.totalQuadras,
        totalLotes :  this.state.csvObject.values.totalLotes,
        totalReservados: 0,
        totalVendidos: 0,
      },
      address : this.state.address,
      planta : this.state.planta,
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
    const {modalVisible} = this.state
    let nome = 'Cadastro de Loteamento'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo={nome} funcao={this.goBack} />

              <View style={styles.resumo}>
                <Text style={{textAlign: 'center', fontSize:18, fontWeight: 'bold' }}>Revise as informações por favor</Text>

                <Text style={{fontSize:14, fontWeight: 'bold'}}>O Loteamento Possui: </Text>
                <Text style={{textAlign: 'center'}}>
                {this.state.csvObject.values?.totalQuadras} quadras e {this.state.csvObject?.values?.totalLotes} lotes
                </Text>

                <Text style={{fontSize:14, fontWeight: 'bold'}}>Planta :</Text>
                
                <View style={{height:150, width: "90%", alignSelf: 'center'}}>
                  { this.state.planta?.resultado ?
                    <Image
                    style={styles.imgPerfil}
                    resizeMethod="resize"
                    resizeMode='cover'
                    source={{ uri: this.state.planta?.resultado}}
                    />
                  : <Text>Erro : Não foi realizada a captura do mapa, tente novamente</Text>}
                </View> 

                <Text style={{fontSize:14, fontWeight: 'bold'}}>Localização : </Text>
                <View style={{height:150, width: "90%", alignSelf: 'center'}}>
                  { this.state.address?.mapSnapshotURI ?
                    <Image
                    style={styles.imgPerfil}
                    resizeMethod="resize"
                    resizeMode='cover'
                    source={{ uri: this.state.address.mapSnapshotURI}}
                    />
                  : <Text>Erro : Não foi realizada a captura do mapa, tente novamente</Text>}
                </View>
                
                <View style={{alignSelf: 'center'}}>
                  <Button titulo='Pré-visualização' funcao={() => {this.setModalVisible(true)}} btStyle={{width:wp('45%'), height:hp("4.5%"), marginTop: 23, marginBottom: 17}}/>
                </View>
              </View>

              <Button titulo='CONTINUAR' funcao={this.handleSubmit} hidden={this.state.termoDeUso} />
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
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
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
    height: hp('75%'),
    width: wp('90%'),
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#888',
    marginBottom: hp('5%'),
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
    backgroundColor: colors.branco,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
  },
  imgBackground: {
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
});