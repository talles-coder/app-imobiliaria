import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';
import CheckBox from '../../../components/CheckBox';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default class DadosIniciais extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      termoDeUso: false,
      imagem: '',
      nome: '',
      email: '',
      celular: '',
      nascimento: '',
      cpf: '',
    };

    this.handleNomeChange = this.handleNomeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCelularChange = this.handleCelularChange.bind(this);
    this.handleNascimentoChange = this.handleNascimentoChange.bind(this);
    this.handleCPFChange = this.handleCPFChange.bind(this);
    this.handleTermoDeUsoChange = this.handleTermoDeUsoChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleNomeChange = (nome) => this.setState({ nome });
  handleEmailChange = (email) => this.setState({ email: email ? email.toString().trim() : email });
  handleCelularChange = (celular) => this.setState({ celular });
  handleNascimentoChange = (nascimento) => this.setState({ nascimento });
  handleCPFChange = (cpf) => this.setState({ cpf });
  handleImageChange = (imagem) => this.setState({ imagem });

  handleTermoDeUsoChange() {
    this.setState({ termoDeUso: !this.state.termoDeUso });
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
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Header titulo='Seus Dados' funcao={this.goBack} />

            <ImagePicker
              onChangeImage={this.handleImageChange}
              value={this.state.imagem}
              permitirAdd={true}
            />

            <View>
              <Input
                labelText='Nome'
                onChangeText={this.handleNomeChange}
                value={this.state.nome}
              />

              <Input
                inputType='numeric'
                labelText='CPF'
                onChangeText={this.handleCPFChange}
                value={this.state.cpf}
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

              <Input
                labelText='Nascimento'
                onChangeText={this.handleNascimentoChange}
                value={this.state.nascimento}
              />

              <CheckBox
                label="Li e concordo com os termos de uso"
                labelStyle={{ color: colors.branco, fontSize: 16 }}
                value={this.state.termoDeUso}
                onChange={this.handleTermoDeUsoChange}
              />

            </View>

            <Button titulo='CONTINUAR' funcao={this.nextStep} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.azulEscuro,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  formulario: {
    marginBottom: heightPercentageToDP('3.5%')
  }
});
