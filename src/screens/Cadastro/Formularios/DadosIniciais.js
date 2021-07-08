import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';
const fundo = "../../../../assets/fundo.png";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class DadosIniciais extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagem: '',
      identificacao: {
        nome: '',
        email: '',
      },
      celular: '',
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleNomeChange = this.handleNomeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCelularChange = this.handleCelularChange.bind(this);
  }

  handleImageChange = (imagem) => this.setState({ imagem });
  handleNomeChange = (name) => this.setState(
    { identificacao: {
      ...this.state.identificacao,
      nome : name
    } }
    );
  handleEmailChange = (email) => this.setState(
    { identificacao: {
      ...this.state.identificacao,
      email: email ? email.toString().trim().toLowerCase() : email
    } });
  handleCelularChange = (celular) => this.setState({ celular });

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
    let titulo = 'Cadastro Corretor'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo={titulo} funcao={this.goBack} />

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
                  value={this.state.identificacao.nome}
                />

                <Input
                  inputType='email-address'
                  labelText='Email'
                  onChangeText={this.handleEmailChange}
                  value={this.state.identificacao.email}
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
    marginBottom: hp('3.5%')
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
