import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import colors from '../../styles/colors/index';
import AnimatedFormView from '../../components/Step'

import CodigoDeAcesso from './Formularios/CodigoDeAcesso';
import DadosIniciais from './Formularios/DadosIniciais';
import Senha from './Formularios/Senha';
import MainTransition from './Formularios/MainTransition';

export default class CadastroCorretor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onNext = () => { };

  onBack = () => { };

  finish = () => this.props.navigation.navigate('Login');

  render() {
    const allStepsFormsCorretor = [
      { name: "step 1", component: CodigoDeAcesso },
      { name: "step 2", component: DadosIniciais },
      { name: "step 3", component: Senha },
      { name: "step 4", component: MainTransition },
    ];

    return (
      <View style={styles.container}>
        <AnimatedFormView
          steps={allStepsFormsCorretor}
          onFinish={this.finish}
          onBack={this.onBack}
          onNext={this.onNext}
        />

        <StatusBar
          style='light'
          backgroundColor={colors.azulEscuro}
          translucent={false}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.azulEscuro,
    // alignItems: 'center'
  }
});
