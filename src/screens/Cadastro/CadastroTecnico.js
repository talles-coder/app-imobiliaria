import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import colors from '../../styles/colors/index';
import AnimatedFormView from '../../components/Step'

import DadosIniciais from './Formularios/DadosIniciais';
import Endereco from './Formularios/Endereco';
import PerfilProfissional from './Formularios/PerfilProfissional';
import InformacoesAcademicas from './Formularios/InformacoesAcademicas';
import Conhecimentos from './Formularios/Conhecimentos';
import CadastroEfetuado from '../TransitionScreens/CadastroEfetuado';
import PrimeiroLoginTecnico from '../TransitionScreens/PrimeiroLoginTecnico';
import ContaBancaria from './Formularios/ContaBancaria';
import Agenda from './Formularios/Agenda';
import Servicos from './Formularios/Servicos';
import Senha from './Formularios/Senha';

export default class CadastroTecnico extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onNext = () => { };

  onBack = () => { };

  finish = () => this.props.navigation.navigate('Main');

  render() {
    const allStepsFormsTecnico = [
      { name: "step 1", component: DadosIniciais },
      { name: "step 2", component: Endereco },
      { name: "step 3", component: PerfilProfissional },
      { name: "step 4", component: InformacoesAcademicas },
      { name: "step 5", component: Conhecimentos },
      { name: "step 6", component: CadastroEfetuado },
      { name: "step 7", component: PrimeiroLoginTecnico },
      { name: "step 8", component: ContaBancaria },
      { name: "step 9", component: Agenda },
      { name: "step 10", component: Servicos },
      { name: "step 11", component: Senha },
    ];

    
    return (
      <View style={styles.container}>
        <AnimatedFormView
          steps={allStepsFormsTecnico}
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
