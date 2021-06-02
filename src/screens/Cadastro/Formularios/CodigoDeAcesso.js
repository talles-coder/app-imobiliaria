import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
const fundo = "../../../../assets/fundo.png";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class DadosIniciais extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      termoDeUso: false,
      imagem: '',
      nome: '',
      email: '',
      celular: '',
    };

    this.handleTermoDeUsoChange = this.handleTermoDeUsoChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleNomeChange = this.handleNomeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCelularChange = this.handleCelularChange.bind(this);
  }

  handleTermoDeUsoChange() {this.setState({ termoDeUso: !this.state.termoDeUso });}
  handleImageChange = (imagem) => this.setState({ imagem });
  handleNomeChange = (nome) => this.setState({ nome });
  handleEmailChange = (email) => this.setState({ email: email ? email.toString().trim() : email });
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
    let nome = 'BEM VINDO'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo={nome} funcao={this.goBack} />

              <View>
                <Image style={styles.img} source={require('../../../../assets/usher.png')}></Image>
              </View>

              <View style={styles.textView}>
                <Text style={styles.text}>
                  Olá gestor(a), Para se cadastrar
                  você precisa do código de acesso que
                  o gestor criou para você.
                </Text>
              </View>

              <View>
                <Input
                  inputType='phone-pad'
                  labelText='Código :'
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
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "space-around",
    alignItems: "center"
  },
  title: {
    fontSize: hp('2.2%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textView: {
    width: wp('90%')
  },
  text: { 
    fontSize: hp('3,3%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
