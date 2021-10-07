import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, Image, Button, onPress, TextInput, Clipboard, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CreateTemporaryToken} from '../../../../database/Firebase'
import Header from '../../../../components/Header';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export default class CriarUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      type: false,
      tipo: "gestor",
      code: ""
    };
  }

  onPress = () => {
    this.setState({
      type: !this.state.type 
    });
    this.state.type ? this.state.tipo = "gestor": this.state.tipo = "corretor"
  };
  
  CreateUser = () => {
    this.setState({ 
      code: CreateTemporaryToken(this.state.tipo)
    });
  }

  textCopy = () => {
    Clipboard.setString(String(this.state.code))
    ToastAndroid.show("O Código foi copiado", 1500)
  }

  render() {
    const { type, code } = this.state;
    const {back} = this.props
    return (

      <ImageBackground style={{flex: 1}} source={require('../../../../../assets/backmage.png')}>
    
      <Header titulo="Novo Usuário" funcao={back} icon={true}></Header>
        
        <View>
          <Text style={styles.descricao} >{`Criar um novo usuário:

    1° Selecione o tipo de perfil do novo Usuário
    2° Clique em "gerar o código."
    3° Envie o código por WhatsApp ou outro meio para a pessoa que deseja cadastrar.
    4° A pessoa deve utilizar este código para realizar seu cadastro. 

    Observações: O código de acesso só cria um usuário.
    Para deletar algum usuário utilize o menu "corretores"`}</Text>
        </View>

          <Text style={styles.title}>Tipo de Usuário</Text>
          <View style={styles.selectUser}>

            <TouchableOpacity style={type  ? styles.button: styles.buttonPress} onPress={this.onPress} disabled={!type}>
              <Image  source={require('../../../../../assets/Gestor.png')}/>
              <Text style={styles.TextUser}>Gestor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={type  ? styles.buttonPress: styles.button} onPress={this.onPress} disabled={type}>
              <Image  source={require('../../../../../assets/Corretor.png')}/>
              <Text style={styles.TextUser}>Corretor</Text>
              </TouchableOpacity>

          </View>

          <TouchableOpacity onPress={this.CreateUser}>
          <Text style={styles.botaogerar}>
            Gerar Código
          </Text>
          </TouchableOpacity>

          <View style={{alignSelf:'center',opacity: code ? 1: 0,borderBottomWidth: 1,borderColor:'white', paddingTop: hp('2%')}}>

            <Text style={styles.codigoacesso} selectable={true}>Código de Acesso</Text>

            <TouchableOpacity style={styles.code} onPress={this.textCopy}>
              <TextInput value={' '+String(code)+' '} editable={false} style={styles.codigo}>
              </TextInput>
              <Icon name="content-copy" size={35} color="black" />
            </TouchableOpacity>
            
          </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    width: '100%',
  },
  selectUser: {
    justifyContent:'space-around',
    flexDirection:'row',
    width: '90%',
    margin: '5%'
  },
  title:{
    fontSize: wp('5.5%'),
    color:"white",
    fontWeight: 'bold',
    alignSelf: "center"
  },
  code: {
    flexDirection:'row',
    justifyContent: 'center',
    alignSelf:'center',
    alignItems:'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    width: "40%",
    borderRadius: 10,
    borderColor: "#555",
    borderWidth: 2,
  },
  buttonPress: {
    alignItems: "center",
    backgroundColor: "#00DDFF",
    padding: 10,
    height: '100%',
    width: "40%",
    borderRadius: 10,
    borderColor: "#555",
    borderWidth: 2,
  },
  TextUser: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  descricao:{
    fontSize: hp('2%'),
    color:'white',
    alignSelf:'center',
    width:'85%',
    paddingTop:10,
    paddingBottom:20,
    fontFamily: "serif"
  },
  codigo:{
    fontSize:wp('8%'),
    color:'white',
    alignSelf:'center',
    fontWeight:'bold',
    marginRight: 8,
  },
  codigoacesso:{
    fontSize:20,
    color:'white',
    alignSelf:'center',
    fontWeight:'bold'
  },
  botaogerar:{
    color:'white',
    fontWeight:'bold',
    padding:10,
    fontSize: wp('6%'),
    backgroundColor:'#063BD5',
    alignItems:'center',
    borderRadius:12,
    alignSelf:'center',
    textAlign: 'center'
  }
});
