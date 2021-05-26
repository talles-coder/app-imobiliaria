import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Conhecimentos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      conhecimento: '',
      tempoDeExperiencia: '',
    };

    this.handleConhecimentoChange = this.handleConhecimentoChange.bind(this);
    this.handleTempoDeExperienciaChange = this.handleTempoDeExperienciaChange.bind(this);
  }

  handleConhecimentoChange = (conhecimento) => this.setState({ conhecimento });
  handleTempoDeExperienciaChange = (tempoDeExperiencia) => this.setState({ tempoDeExperiencia });

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
            <Header titulo='Conhecimentos' funcao={this.goBack} />

            <ImagePicker permitirAdd={false} />

            <View>
              <Input
                labelText='Conhecimento'
                onChangeText={this.handleConhecimentoChange}
                value={this.state.conhecimento}
              />

              <Input
                labelText='Tempo de Experiência'
                onChangeText={this.handleTempoDeExperienciaChange}
                value={this.state.tempoDeExperiencia}
              />

            </View>

            {/* TODO - adicionar conhecimento -> gerar novo form */}

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
