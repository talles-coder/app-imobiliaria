import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import colors from '../../styles/colors/index';
import AnimatedFormView from '../../components/Step'

import DadosIniciais from './Formularios/DadosIniciais';
import Senha from './Formularios/Senha';

export default class CadastroGestor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onNext = () => { };

  onBack = () => { };

  finish = () => this.props.navigation.navigate('Main');

  render() {
    const allStepsFormsGestor = [
      { name: "step 1", component: DadosIniciais },
      { name: "step 2", component: Senha },
    ];

    
    return (
      <View style={styles.container}>
        <AnimatedFormView
          steps={allStepsFormsGestor}
          onFinish={this.finish}
          onBack={this.onBack}
          onNext={this.onNext}
          comeInOnNext="bounceInUp"
          OutOnNext="bounceOutDown"
          comeInOnBack="bounceInDown"
          OutOnBack="bounceOutUp"
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
