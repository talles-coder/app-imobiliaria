import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import colors from '../../../../styles/colors/index';
import { Modalize } from 'react-native-modalize';

import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
const fundo = "../../../../../assets/fundo.png";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// const iconeCorretor = '../../../../../assets/Corretor.png';
// const Gestor = '../../../../../assets/Gestor.png'


export default class ResumoLoteamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nomeLoteamento: '',
      file: '',
      modalize: false,
    };

    this.handleNomeChange = this.handleNomeChange.bind(this);
  }

  handleNomeChange = (nomeLoteamento) => this.setState({ nomeLoteamento });

  filepick = () => {
    
  }
  
  modal() {
    this.state.modalize = !this.state.modalize ;
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
    let nome = 'Cadastro de Loteamento'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo={nome} funcao={this.goBack} />

              <View style={styles.resumo}>
                <Text>Revise as informações por favor</Text>
                <Text>Planta :</Text>
                <Text >O Loteamento Possui: </Text>
                <Text style={{flex: 1, flexWrap: 'wrap'}}>
                7 quadras e 17 lotes, {"\n"}{"\n"}

                sendo : {"\n"}{"\n"}

                a Quadra A com 2 lotes; {"\n"}
                a Quadra B com 1 lote; {"\n"}
                a Quadra C com 2 lotes; {"\n"}
                a Quadra D com 5 lotes; {"\n"}
                a Quadra E com 4 lotes; {"\n"}
                a Quadra F com 1 lote; {"\n"}
                a Quadra G com 2 lotes;
                </Text>
                <Text >Localização : </Text>
                <Button titulo='Ver Detalhes' funcao={this.modal} hidden={this.state.termoDeUso} />
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
  containerModal: {
    justifyContent: "flex-end",
  },
  resumo: {
    height: hp('70%'),
    width: wp('90%'),
    backgroundColor: colors.branco,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#888',
    marginBottom: hp('5%'),
    padding: 30,
    justifyContent: 'space-around',
  },
  formulario: {
    marginBottom: hp('3.5%')
  },
  title: {
    fontSize: hp('2.2%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "space-around",
    alignItems: "center"
  },
});