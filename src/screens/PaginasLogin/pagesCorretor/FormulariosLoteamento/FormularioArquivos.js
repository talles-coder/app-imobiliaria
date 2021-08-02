import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import Map from '../../../../components/map';

import colors from '../../../../styles/colors/index';

import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
const fundo = "../../../../../assets/fundo.png";

import * as FileSystem from 'expo-file-system';
import * as ExpoImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import  {  v4  as  uuidv4 } from  'uuid' ;

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default class FormularioArquivos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      },
      modalVisible: false
    };

    this.handleNomeLoteamentoChange = this.handleNomeLoteamentoChange.bind(this);
  }
  
  handleNomeLoteamentoChange = (nomeLoteamento) => {
    this.setState({ nomeLote: nomeLoteamento })
  };

  componentDidMount(){
    const { getState } = this.props;
    let data = getState(this.state);
    this.setState({
      nomeLote: data.nomeLote,
      csvObject: data.csvObject,
      address: data.address,
      planta: data.planta,
    })
  }
  
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  
  closeMaps = () => {
    this.setState({
      address: this.map?.state,
      modalVisible: false
    })
  }
  
  pickImage = async () => {
    const { status } = await ExpoImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Desculpe, nós precisamos acessar a galeria para isso!');
    }

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      cropperCircleOverlay: false,
      quality: 0.7,
    });

    if (!result.cancelled) {
      let fileName = result.uri.split("/")
      fileName = fileName[fileName.length-1]
      const resultado = result.uri
      this.setState({
        planta: {
          fileName: fileName,
          resultado: resultado, 
        }
      })
    }
  };
  
  pickCSV = async() => {
    try {
      const responseDocument = await DocumentPicker.getDocumentAsync({type: 'text/comma-separated-values', copyToCacheDirectory: true, multiple: false})
      const responseFile = await FileSystem.readAsStringAsync(responseDocument.uri)
      var csvFormated = responseFile.toString().replace("﻿","")
      
      for (let index = 0; csvFormated.search("QUADRA ") != -1; index++) {
        csvFormated = csvFormated.replace("QUADRA ", "QUADRA_")
      } 
      var lotesTotal = 0   
      var result = [];
      var lines = csvFormated.split("\r\n")
      var headers= lines[0].split(";");
      for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(";");
        for(var j=0;j<headers.length;j++){
          if (currentline[j] !== "") {
            obj[headers[j]] = {
              lote: currentline[j],
              status: "disponivel",
              data: "",
              corretor: "",
              gestor: ""
            }
            lotesTotal++
          }
        }

        result.push(obj);
      }
      this.setState({
        csvObject: { 
          name: responseDocument.name,
          uri: responseDocument.uri,
          content: result,
          values: {
            totalQuadras: headers.length,
            totalLotes: lotesTotal ,
          }
        }
      })
    }
    catch (error) {
      console.log("Erro de arquivo CSV", error)
    }
  }

  nextStep = () => {
    const { next, saveState } = this.props;
    saveState(this.state);

    next();
  };

  openMenu = () => {
    console.log(this.props)
  }

  goBack = () => {
    const { finish } = this.props;

    this.setState({
        nomeLote: "",
        planta: {
          fileName: "",
          resultado: ""
        },
        csvObject: {
          name: "",
          uri: "",
        },
        address: {
          descricao: "",
        },
        modalVisible: false
    })

    finish();
  }

  render() {
    const { modalVisible, planta, nomeLote="" , csvObject, address } = this.state
    const titulo = 'Cadastro de Loteamentos'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo={titulo} funcao={this.goBack} />
              
            <View style={styles.preVisualizacao}>
                <View style={[styles.nomeLote]}>
                  <Input
                      withi={wp('73%')}
                      cor="#000"
                      inputType='default'
                      labelText='Nome do Loteamento'
                      onChangeText={this.handleNomeLoteamentoChange}
                      defaultValue={nomeLote}    
                      inputValue={nomeLote}
                      onBlur={()=>{if((nomeLote.trim().length) < 8){Alert.alert("Erro","O nome do loteamento está muito curto \nMinimo: 8 digitos");}}}
                    />
                </View>

                <View style={[styles.search, {opacity: planta?.fileName ? 1: 0 }]}>            
                  <Text numberOfLines={1}>Planta: {planta?.fileName}</Text>
                </View>
                <View style={[styles.search, {opacity: address?.descricao ? 1: 0 }]}>            
                  <Text numberOfLines={1}>Endereço: {address?.descricao}</Text>
                </View>
                <View style={[styles.search, {opacity: csvObject?.name ? 1: 0 }]}>
                  <Text numberOfLines={1}>csv: {csvObject?.name}</Text>
                </View>

                <View onTouchStart={()=>{
                  if((nomeLote.trim().length) < 8){
                    Alert.alert("Erro","o nome do loteamento é obrigatório");
                  }
                }}>
                  <Button titulo='Importar Planta do Loteamento' funcao={this.pickImage} btStyle={{marginBottom: -20}} hidden={(nomeLote.length) < 8}/>
                </View>

                <View onTouchStart={()=>{
                  if((nomeLote.trim().length) < 8){
                    Alert.alert("Erro","o nome do loteamento é obrigatório");
                  }
                }}>
                  <Button titulo='Localização do Loteamento' funcao={() => this.setModalVisible(true)} btStyle={{marginBottom: -20}} hidden={(nomeLote.length) < 8}/>
                </View>

                <View onTouchStart={()=>{
                  if((nomeLote.trim().length) < 8){
                    Alert.alert("Erro","o nome do loteamento é obrigatório");
                  }
                }}>
                  <Button titulo='Importar Arquivo CSV' funcao={this.pickCSV} btStyle={{marginBottom: 0}} hidden={(nomeLote.length) < 8}/>
                </View>
                  
              
                <View onTouchStart={()=>{
                  if(!csvObject?.name || !address?.descricao || !planta?.fileName || !nomeLote){
                    Alert.alert("Erro","Todas as informações são obrigatórias");
                  }
                }}>
                  <Button 
                    titulo='Prosseguir' funcao={this.nextStep} 
                    hidden={
                      !csvObject?.name || !address?.descricao || !planta?.fileName || !nomeLote
                    }
                  />
                </View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      this.setModalVisible(false);
                    }}
                    >
                    <View style={styles.maps}>
                      <Map
                        ref={ref => { this.map = ref }}
                        Visiblesearch={true}
                        placeHol={"Pesquisar"}
                        closer={this.closeMaps}
                        >
                      </Map>
                    </View>
                  </Modal>
                </View>
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
  maps: {
    height: '100%',
    backgroundColor: colors.branco,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
  },
  formulario: {
    marginBottom: hp('3.5%')
  },
  preVisualizacao: {
    height: hp('85%'),
    width: wp('90%'),
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontSize: hp('2.2%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "space-around",
    alignItems: "center"
  },
  search: {
    paddingHorizontal: "4%",
    flexDirection: 'row',
    backgroundColor: "#cdcdcd",
    height:40,
    width:'90%',
    alignSelf: 'center',
    alignItems: "center",
    marginTop:10,
    borderRadius: 15,
  },
  nomeLote: {
    paddingHorizontal: "4%",
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: "#cdcdcd",
    width:'90%',
    marginVertical:10,
    borderRadius: 15,
    height:70,
    paddingBottom:15
  },
  inputField: {
      color: '#000',
      width: "86%",
    },
    
  imgPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderColor: "#cdcdcd",
    borderWidth:2
},
});
