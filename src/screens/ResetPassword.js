import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../components/Input";
import { forgotPassword } from "../database/Firebase";
import colors from "../styles/colors"
import Header from "../components/Header";

const fundo = "../../assets/fundo.png";

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange = (email) => this.setState({ email: email.trim() });

  handleForgotPassword = () => {
    const email = this.state.email;

    forgotPassword(email);
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
              <View style={{ justifyContent: "space-evenly", height: hp('100%'), width: wp('100%'), alignItems: "center", }}>

                <Header
                  titulo=''
                  funcao={() => this.props.navigation.navigate('Login')}
                />

                <Text style={styles.saudacao}>Confirme seu e-mail para realizar o reset de senha, por favor</Text>

                <Input
                  inputType='email-address'
                  labelText='E-mail'
                  onChangeText={this.handleEmailChange}
                  value={this.state.email}
                />

                <View style={{ alignItems: "center", marginTop: 40, marginBottom: 40 }}>
                  <TouchableOpacity onPress={this.handleForgotPassword} style={styles.botoes}>
                    <Text style={styles.txtbotao}>CONFIRMAR</Text>
                  </TouchableOpacity>
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
    fontSize: hp("3%"),
    margin: wp('5%'),
    textAlign: "center",
  },
});
