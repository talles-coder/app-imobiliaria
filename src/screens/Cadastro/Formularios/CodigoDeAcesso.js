import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Alert } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
const fundo = "../../../../assets/fundo.png";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getUserCodigo } from '../../../database/Firebase';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class DadosIniciais extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tipo: '',
    };

    this.handleCodigoChange = this.handleCodigoChange.bind(this);
  }

  handleCodigoChange = (codigo) => this.setState({ codigo });

  nextStep = () => {
    if (this.state.codigo) {  
      getUserCodigo(this.state.codigo, (data, error) => {
        if (error && !data) return alert(error.message);

        let userCodigo = data.data()
        this.state.tipo = userCodigo.tipo
        
        if(userCodigo.tipo == 'gestor' || userCodigo.tipo == 'corretor') {
          const { next, saveState } = this.props;
          saveState(this.state);
          Alert.alert(`Você será cadastrado como : ${userCodigo.tipo[0].toUpperCase() + userCodigo.tipo.slice(1)}`, '', [
            {
              style: 'default'
            }])
          next();
        } 
      }
    )};
    }

  goBack = () => {
    const { finish } = this.props;

    finish();
  }

  render() {
    let nome = 'BEM VINDO'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo={nome} funcao={this.goBack} />

              <View>
                <Image style={styles.img} source={require('../../../../assets/usher.png')}></Image>
              </View>

              <View style={styles.textView}>
                <Text style={styles.text}>
                  Olá gestor(a), Para se cadastrar
                  você precisa do código de acesso que
                  o gestor criou para você.
                </Text>
              </View>

              <View>
                <Input
                  inputType='phone-pad'
                  labelText='Código :'
                  onChangeText={this.handleCodigoChange}
                  value={this.state.codigo}
                />
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
  formulario: {
    marginBottom: hp('3.5%')
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "space-around",
    alignItems: "center"
  },
  title: {
    fontSize: hp('2.2%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textView: {
    width: wp('90%')
  },
  text: { 
    fontSize: hp('3,3%'),
    color: colors.branco,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
