import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class CartaoDeCredito extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titular: '',
      numeroCartao: '',
      data: '',
      cvc: ''
    };

    this.handleTitularChange = this.handleTitularChange.bind(this);
    this.handleNumeroChange = this.handleNumeroChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleCVCChange = this.handleCVCChange.bind(this);
  }

  handleTitularChange = (titular) => this.setState({ titular });
  handleNumeroChange = (numeroCartao) => this.setState({ numeroCartao });
  handleDataChange = (data) => this.setState({ data });
  handleCVCChange = (cvc) => this.setState({ cvc });

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
            <Header titulo='Cadastre Seu Cartão' funcao={this.goBack} />

            <ImagePicker permitirAdd={false} />

            <View>
              <Input
                labelText='Titular'
                onChangeText={this.handleTitularChange}
                value={this.state.titular}
              />

              <Input
                inputType='numeric'
                labelText='Número'
                onChangeText={this.handleNumeroChange}
                value={this.state.numeroCartao}
              />

              <View style={styles.containerDoisInputs}>
                <Input
                  withi={wp('35%')}
                  labelText='Data'
                  onChangeText={this.handleDataChange}
                  value={this.state.data}
                />

                <Input
                  inputType='numeric'
                  withi={wp('35%')}
                  labelText='CVC'
                  onChangeText={this.handleCVCChange}
                  value={this.state.cvc}
                />
              </View>

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
