import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';

import colors from '../../../../styles/colors/index';

import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
const fundo = "../../../../../assets/fundo.png";

import ImagePicker from '../../../../components/ImagePicker';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default class FormularioArquivos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nomeLoteamento: '',
      file: '',
    };

    this.handleNomeChange = this.handleNomeChange.bind(this);
  }

  handleNomeChange = (nomeLoteamento) => this.setState({ nomeLoteamento });

  save = async() => {
    try {
      const response = await FileSystem.readAsStringAsync(this.state.file.uri)
      var csvFormated = response.toString().replace("﻿","")
      for (let index = 0; csvFormated.search("QUADRA ") != -1; index++) {
          csvFormated = csvFormated.replace("QUADRA ", "QUADRA_")
      }    
      var lines = csvFormated.split("\r\n")
      var result = [];
      var headers= lines[0].split(";");
      for(var i=1;i<lines.length;i++){
          var obj = {};
          var currentline=lines[i].split(";");
          for(var j=0;j<headers.length;j++){
              obj[headers[j]] = currentline[j];
          }
          result.push(obj);
      }
      this.state.csvObject = result
    }
    catch (error) {
      console.log("Error File : ", error)
    } 
  }





  nextStep = () => {
    const { next, saveState } = this.props;
    saveState(this.state);

    next();
  };

  goBack = () => {
    const { finish } = this.props;

    finish();
  }

  render() {
    let nome = 'Cadastro de Loteamentos'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo={nome} funcao={this.goBack} />

              <View>
                <Input
                  labelText='Nome'
                  onChangeText={this.handleNomeChange}
                  value={this.state.nome}
                />
              </View>

              <Button titulo='Importar Planta do Loteamento' funcao={this.ImagePicker} hidden={this.state.termoDeUso} />
              <Button titulo='Localização do Loteamento' funcao={this.LocalGoogleMaps} hidden={this.state.termoDeUso} />
              <Button titulo='Importar Arquivo CSV' funcao={this.save} hidden={this.state.termoDeUso} />

              <View style={styles.resumo}>
              
                <Text>Planta : planta.pdf</Text>
                <Text>Localização :  </Text>
                <Text>csv : alessandra.csv</Text>
                
                <Button titulo='Prosseguir' funcao={this.nextStep} hidden={this.state.termoDeUso} />
              
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
  formulario: {
    marginBottom: hp('3.5%')
  },
  resumo: {
    height: hp('40%'),
    width: wp('90%'),
    backgroundColor: colors.branco,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#888',
    marginBottom: hp('5%'),
    padding: 30,
    justifyContent: 'space-around',
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
});