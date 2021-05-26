import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class PerfilProfissional extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profissao: '',
      apresentacao: '',
      profissional: true
    };

    this.handleProfissaoChange = this.handleProfissaoChange.bind(this);
    this.handleApresentacaoChange = this.handleApresentacaoChange.bind(this);
  }

  handleProfissaoChange = (profissao) => this.setState({ profissao });
  handleApresentacaoChange = (apresentacao) => this.setState({ apresentacao });

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
            <Header titulo='Perfil Profissional' funcao={this.goBack} />

            <ImagePicker permitirAdd={false} />

            <View>
              <Input
                labelText='Profissão'
                onChangeText={this.handleProfissaoChange}
                value={this.state.profissao}
              />

              <Input
                altura={hp('10%')}
                labelText='Escreva uma breve apresentação :)'
                multiline={true}
                numberOfLines={7}
                onChangeText={this.handleApresentacaoChange}
                value={this.state.apresentacao}
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
  }
});
