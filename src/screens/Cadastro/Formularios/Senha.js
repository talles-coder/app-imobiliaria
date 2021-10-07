import React from 'react';
import { ImageBackground, StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { addNewUserData, emailSignUp, uploadDocumentToFirebase, uploadImageToFirebase,deleteTemporaryToken } from '../../../database/Firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const fundo = "../../../../assets/fundo.png";

export default class Senha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senha: '',
      confirmacaoSenha: '',
      senhaVisivel: false,
      confirmarVisivel: false, 
    };

    this.handleSenhaChange = this.handleSenhaChange.bind(this);
    this.handleConfirmacaoSenhaChange = this.handleConfirmacaoSenhaChange.bind(this);
  }

  handleSenhaChange = (senha) => this.setState({ senha: senha ? senha.toString(): senha });
  handleConfirmacaoSenhaChange = (confirmacaoSenha) => this.setState({ confirmacaoSenha });

  createDataAndUserInDatabase = (data, email, password) => {
    setTimeout(() => {
      emailSignUp({ email, password }, (error, user) => {
        if (error && !user) return alert(error.message);

        const userData = data;

        addNewUserData({ email, userData }, (docRef, error) => {
          if (error && !docRef) return alert(error);
        });
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
    const { getState } = this.props;
    
    let data = getState(this.state);

    data.dashboard = {
      dataRegistros: new Date(),
      realizadasHoje: 0,
      ativasHoje: 0,
      expiramHoje: 0,
      jaExpiraramMes: 0,
      vendasHoje: 0,
      vendasNesteMes: 0,
      totalVendas: 0  
    }

    const email = data.identificacao.email;
    const imagem = data.imagem;
    const documento = data.doc;
    const codigo = data.codigo;
    const password = this.state.senha;
    const passwordConfirmation = this.state.confirmacaoSenha;
    
    //Validar se senha confere

    if (password !== passwordConfirmation) {
      Alert.alert('Senhas divergentes!');
      return;
    };

    //Validar se campos estão preenchidos

    if (!email || !password) return Alert.alert('Dados Incompletos!');

    // Fazer upload da imagem se ouver

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

    deleteTemporaryToken(codigo)

    this.createDataAndUserInDatabase(data, email, password);

    this.nextStep();
  };

  nextStep = () => {
    const { next } = this.props;

    next();
  };

  goBack = () => {
    const { back } = this.props;

    back();
  }

  // TODO - modificar tema do aplicativo
  // TODO - colocar telas de carregamento no login e no cadastro do loteamento  
  // TODO - limitar todos os inputs  
  // TODO - adcionar dowload de imagens - Feito
  // TODO - mudar botões de menu
  // TODO - mudar icones gestor e corretor, 
  

  render() {
    const { senhaVisivel, confirmarVisivel} = this.state
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>  
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Header titulo='Defina Sua Senha' funcao={this.goBack} />

              <ImagePicker permitirAdd={false} />

              <View>
                <View style={{flexDirection: 'row-reverse'}}>
                  <Input
                    isPassword={!senhaVisivel}
                    labelText='Senha'
                    onChangeText={this.handleSenhaChange}
                    value={this.state.senha}
                  />
                  <TouchableOpacity
                    onPressIn={()=>{this.setState({senhaVisivel: !this.state.senhaVisivel})}}
                    onPressOut={()=>{this.setState({senhaVisivel: !this.state.senhaVisivel})}}
                    style={{position: 'absolute', alignSelf: 'flex-end', padding: 8 , zIndex:10}}
                  >
                    <Icon
                      name='remove-red-eye'
                      size={24}
                      color="#333"
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row-reverse'}}>
                  <Input
                  isPassword={!confirmarVisivel}
                  labelText='Confirmar senha'
                  onChangeText={this.handleConfirmacaoSenhaChange}
                  value={this.state.confirmacaoSenha}
                />
                  <TouchableOpacity
                    onPressIn={()=>{this.setState({confirmarVisivel: !this.state.confirmarVisivel})}}
                    onPressOut={()=>{this.setState({confirmarVisivel: !this.state.confirmarVisivel})}}
                    style={{position: 'absolute', alignSelf: 'flex-end', padding: 8 , zIndex:10}}
                  >
                    <Icon
                      name='remove-red-eye'
                      size={24}
                      color="#333"
                    />
                  </TouchableOpacity>
                </View>

              </View>

              <Button titulo='CADASTRAR' funcao={this.handleSubmit} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView >
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
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "space-around",
    alignItems: "center"
  },
  containerDoisInputs: {
    flexDirection: 'row',
    width: wp('79.71%'),
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});