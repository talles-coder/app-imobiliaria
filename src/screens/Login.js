import React , {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../components/Input";
import { updateTemporaryToken, deleteTemporaryToken , crateTemporaryToken, emailSignIn, getUserData, getProfissionalData } from "../database/Firebase";
import colors from "../styles/colors"
import Global from "../global/Global";
import Header from "../components/Header";
import * as DocumentPicker from 'expo-document-picker';

const fundo = "../../assets/fundo.png";
const logo = "../../assets/logo.png";
const csv=require('csvtojson')

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      file: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  
  pick = async() => {
    try {
      const response = await DocumentPicker.getDocumentAsync({type: 'text/comma-separated-values', copyToCacheDirectory: false, multiple: false})
      this.state.file = response
    }
    catch (error) {
      console.log(error)
    }
  }
  
  save = () => {
    csv()
    .fromFile(this.state.file)
    .on('json',(jsonObj)=>{
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
    console.log(jsonObj)
    })
    .on('done',(error)=>{
    console.log('end')
  })
  }

  create = () => {
    crateTemporaryToken();
  }

  delete = () => {
    const send = this.state.email
    deleteTemporaryToken(send);
  }

  update = () => {
    const send = this.state.email
    const res = this.state.password
    updateTemporaryToken(send, res);
  }

  handleEmailChange = (email) => this.setState({ email: email.trim() });
  handlePasswordChange = (password) => this.setState({ password });

  handleForgotPassword = () => this.props.navigation.navigate('ResetPassword')

  handleNextButton = () => {
    const email = this.state.email;
    const password = this.state.password;

    emailSignIn({ email, password }, (error, user) => {
      if (error && !user) return alert(error.message);

      getUserData(email, (data, error) => {
        if (error && !data) return alert(error.message);

        const userData = data.data();

        if (userData) {
          Global.userData = userData;
          Global.EMAIL = email;
          Global.NOME = Global.userData.nome;
          Global.PROFILEIMAGE = Global.userData.imagem;

          this.props.navigation.navigate('ProfileCorretor');
        }
      });
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <ImageBackground
            style={{
              width: wp("100%"),
              height: hp("100%"),
              justifyContent: "center",
            }}
            source={require(fundo)}
          >

            <KeyboardAvoidingView>
              <View style={{ justifyContent: "space-evenly", height: hp('100%'), width: wp('100%') }}>

                <Header
                  titulo=''
                  funcao={() => this.props.navigation.navigate('Main')}
                />

                <Text style={styles.saudacao}>BEM VINDO</Text>

                <View style={styles.container2}>
                  <Input
                    inputType='email-address'
                    labelText='E-mail'
                    onChangeText={this.handleEmailChange}
                    value={this.state.email}
                  />

                  <Input
                    isPassword={true}
                    labelText='Senha'
                    onChangeText={this.handlePasswordChange}
                    value={this.state.password}
                  />
                </View>

                <View style={{ alignItems: "center", marginTop: 40, marginBottom: 40 }}>
                  <TouchableOpacity onPress={this.save} style={styles.botoes}>
                    <Text style={styles.txtbotao}>visualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={this.pick} style={styles.botoes}>
                    <Text style={styles.txtbotao}>file</Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity onPress={this.handleForgotPassword}>
                    <Text style={{ textDecorationLine: "underline", color: "white", textAlign: "center", marginTop: 25 }}>
                      Esqueci minha senha
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    marginTop: wp("30%"),
    padding: 10,
    alignItems: "center"
  },

  botoes: {
    backgroundColor: colors.azulVibrante,
    width: wp('61.6%'),
    height: hp('5.57%'),
    borderRadius: 10,
    marginTop: hp('3%'),
    justifyContent: 'center',
  },

  txtbotao: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
  },
  saudacao: {
    color: "#FFFFFF",
    fontSize: hp("6%"),
    textAlign: "center",
    marginTop: 150,
  },
});
