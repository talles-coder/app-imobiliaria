import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../components/Input";
import { emailSignIn, getUserData } from "../database/Firebase";
import colors from "../styles/colors"
import Global from "../global/Global";
import Header from "../components/Header";

const fundo = "../../assets/fundo.png";
const logo = "../../assets/logo.png";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange = (email) => this.setState({ email: email.trim() });
  handlePasswordChange = (password) => this.setState({ password });

  handleForgotPassword = () => this.props.navigation.navigate('ResetPassword')

  login = () => {
    this.setState({
      loading : true
    })
    const objLogin = {
      email: this.state.email,
      password: this.state.password
    };
    emailSignIn(objLogin, (error, user) => {
      if (error && !user) {
        this.setState({
          loading : false
        })
        return Alert.alert("Senha ou E-mail incorretos");
      }

      getUserData(objLogin.email, (data, error) => {
        if (error && !data) {
          this.setState({
            loading : false
          })
          return Alert.alert("Usuario não encontrado");
        }

        const userData = data.data();
        if (userData) {
          Global.EMAIL = userData.identificacao.email;
          Global.NOME = userData.identificacao.nome;
          Global.PROFILEIMAGE = userData.imagem;
          Global.PROFILETYPE = userData.tipo;

          this.setState({
            loading : false
          })
          this.props.navigation.navigate('Profile')  
        }
      });
    });

  }

  render() {
    const { loading } = this.state
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
          {
            !loading
            ?

              <KeyboardAvoidingView>
                <View style={{ justifyContent: "space-evenly", height: hp('100%'), width: wp('100%') , paddingTop: hp("3.5%")}}>

                  <Header
                    titulo=''
                    funcao={() => this.props.navigation.navigate('Main')}
                    icon={true}
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
                    <TouchableOpacity onPress={this.login} style={styles.botoes}>
                      <Text style={styles.txtbotao}>Login</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={this.handleForgotPassword}>
                      <Text style={{ textDecorationLine: "underline", color: "white", textAlign: "center", marginTop: 25 }}>
                        Esqueci minha senha
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </KeyboardAvoidingView>
            :
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
              <ActivityIndicator size="large" color="#5699d2"/>
            </View>
          }
        
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