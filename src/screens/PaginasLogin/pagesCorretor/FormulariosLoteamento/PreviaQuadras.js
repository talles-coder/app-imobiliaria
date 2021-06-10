import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
const fundo = "../../../../../assets/fundo.png";

import { wp } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FilePickerManager from 'react-native-file-picker';



export default class PreviaQuadras extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nomeLoteamento: '',
      file: '',
    };

    this.handleNomeChange = this.handleNomeChange.bind(this);
  }

  handleNomeChange = (nomeLoteamento) => this.setState({ nomeLoteamento });

  filepick = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        this.setState({
          file: response
        });
      }
    });
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
    let nome = 'Cadastro Corretor'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo={nome} funcao={this.goBack} />

              <View>
                  <Text style={styles.title}>Foto de Perfil</Text> 

                  <ImagePicker
                    onChangeImage={this.handleImageChange}
                    value={this.state.imagem}
                    permitirAdd={true}
                  />
                </View>

              <View>
                <Input
                  labelText='Nome'
                  onChangeText={this.handleNomeChange}
                  value={this.state.nome}
                />

                <Input
                  inputType='email-address'
                  labelText='Email'
                  onChangeText={this.handleEmailChange}
                  value={this.state.email}
                />

                <Input
                  inputType='phone-pad'
                  labelText='Celular'
                  onChangeText={this.handleCelularChange}
                  value={this.state.celular}
                />

              </View>

              <Button titulo='CONTINUAR' funcao={this.nextStep} hidden={this.state.termoDeUso} />
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
    marginBottom: heightPercentageToDP('3.5%')
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