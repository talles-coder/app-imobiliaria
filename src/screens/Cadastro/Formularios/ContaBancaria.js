import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class ContaBancaria extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titular: '',
      cpfContaBancaria: '',
      banco: '', // TODO - add select
      agencia: '',
      conta: ''
    };

    this.handleTitularChange = this.handleTitularChange.bind(this);
    this.handleCpfChange = this.handleCpfChange.bind(this);
    this.handleBancoChange = this.handleBancoChange.bind(this);
    this.handleAgenciaChange = this.handleAgenciaChange.bind(this);
    this.handleContaChange = this.handleContaChange.bind(this);

  }

  handleTitularChange = (titular) => this.setState({ titular });
  handleCpfChange = (cpfContaBancaria) => this.setState({ cpfContaBancaria });
  handleBancoChange = (banco) => this.setState({ banco });
  handleAgenciaChange = (agencia) => this.setState({ agencia });
  handleContaChange = (conta) => this.setState({ conta });

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
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Header titulo='Cadastre Sua Conta Bancária' funcao={this.goBack} />

            <ImagePicker permitirAdd={false} />

            <View>
              <Input
                labelText='Titular'
                onChangeText={this.handleTitularChange}
                value={this.state.titular}
              />

              <Input
                inputType='numeric'
                labelText='CPF'
                onChangeText={this.handleCpfChange}
                value={this.state.cpfContaBancaria}
              />

              <Input
                labelText='Banco'
                onChangeText={this.handleBancoChange}
                value={this.state.banco}
              />

              <Input
                inputType='numeric'
                labelText='Agência'
                onChangeText={this.handleAgenciaChange}
                value={this.state.agencia}
              />

              <Input
                inputType='numeric'
                labelText='Conta'
                onChangeText={this.handleContaChange}
                value={this.state.conta}
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
  containerDoisInputs: {
    flexDirection: 'row',
    width: wp('79.71%'),
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});
