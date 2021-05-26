import React from 'react';
import { StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { addNewProfissionalData, addNewUserData, emailSignUp, uploadDocumentToFirebase, uploadImageToFirebase } from '../../../database/Firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Senha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senha: '',
      confirmacaoSenha: '',
    };

    this.handleSenhaChange = this.handleSenhaChange.bind(this);
    this.handleConfirmacaoSenhaChange = this.handleConfirmacaoSenhaChange.bind(this);
  }

  handleSenhaChange = (senha) => this.setState({ senha: senha ? senha.toString() : senha });
  handleConfirmacaoSenhaChange = (confirmacaoSenha) => this.setState({ confirmacaoSenha });

  createDataAndUserInDatabase = (data, email, password) => {
    setTimeout(() => {
      emailSignUp({ email, password }, (error, user) => {
        if (error && !user) return alert(error.message);

        const userData = data;

        if (userData.profissional) {
          addNewProfissionalData({ email, userData }, (docRef, error) => {
            if (error && !docRef) return alert(error);
          });
        } else {
          addNewUserData({ email, userData }, (docRef, error) => {
            if (error && !docRef) return alert(error);
          });
        }
      });
    }, 2000);
  };

  uriToBlob = async (uri) => {
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };

      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  handleSubmit = async () => {
    const { getState, finish } = this.props;

    let data = getState(this.state);

    const email = data.email;
    const imagem = data.imagem;
    const documento = data.doc;

    const password = this.state.senha;
    const passwordConfirmation = this.state.confirmacaoSenha;

    if (password !== passwordConfirmation) {
      Alert.alert('Senhas divergentes!');
      return;
    };

    if (!email || !password) return Alert.alert('Dados Incompletos!');

    if (imagem) {
      const uri = imagem;
      const blob = await this.uriToBlob(uri);

      const nomeImagem = 'photo' + Math.random() * 286 + '.jpg';
      data.imagem = nomeImagem;

      await uploadImageToFirebase(blob, nomeImagem);
    }

    if (documento) {
      const uri = documento;
      const blob = await this.uriToBlob(uri);

      const nomeDocumento = 'doc' + Math.random() * 286 + '.pdf';
      data.doc = nomeDocumento;

      await uploadDocumentToFirebase(blob, nomeDocumento);
    }

    this.createDataAndUserInDatabase(data, email, password);

    Alert.alert('Cadastro efetuado com sucesso!');

    finish();
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
            <Header titulo='Defina Sua Senha' funcao={this.goBack} />

            <ImagePicker permitirAdd={false} />

            <View>

              <Input
                isPassword={true}
                labelText='Senha'
                onChangeText={this.handleSenhaChange}
                value={this.state.senha}
              />

              <Input
                isPassword={true}
                labelText='Confirmar senha'
                onChangeText={this.handleConfirmacaoSenhaChange}
                value={this.state.confirmacaoSenha}
              />

            </View>

            <Button titulo='CADASTRAR' funcao={this.handleSubmit} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView >
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
