import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import colors from '../../../styles/colors/index';
import AnimatedFormView from '../../../components/Step'

import FormularioArquivos from './FormulariosLoteamento/FormularioArquivos';
import ResumoLoteamento from './FormulariosLoteamento/ResumoLoteamento';
import ConclusaoCadastro from './FormulariosLoteamento/ConclusaoCadastro';


export default class CadastrarLoteamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  onNext = () => { };

  onBack = () => this.props.navigation.openDrawer();

  finish = () => this.props.navigation.navigate('Loteamentos');

  // alterar limite do nome do lo
  render() {
    const StepsFormsLoteamento = [
      { name: "step 1", component: FormularioArquivos },
      { name: "step 2", component: ResumoLoteamento },
      { name: "step 3", component: ConclusaoCadastro },
    ];

    
    return (
      <View style={styles.container}>
        <AnimatedFormView
          steps={StepsFormsLoteamento}
          onFinish={this.finish}
          onBack={this.onBack}
          onNext={this.onNext}
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
