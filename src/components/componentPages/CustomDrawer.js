import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { getImageFromFirebase, signout } from '../../database/Firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Global from "../../global/Global";

export default function CustomDrawer(props) {
  let nome = Global.NOME
  function handleSignOutButton() {
    Alert.alert('Você tem certeza que deseja sair?', '', [
      {
        text: "Cancelar",
        onPress: () => { },
        style: 'cancel'
      }, {
        text: "Sim",
        onPress: () => {
          Global.IMAGEURL = "https://reactnative.dev/img/tiny_logo.png"
          Global.NOME = ""
          Global.PROFILEIMAGE = ""
          Global.PROFILETYPE = ""
          Global.EMAIL = ""
          props.navigation.navigate('Login');
          signout();
        },
        style: 'default'
      }]
    )
  }

  function buscarImagemPerfil() {
    const imagem = Global.PROFILEIMAGE
    
    if (Global.IMAGEURL === "https://reactnative.dev/img/tiny_logo.png") {
      getImageFromFirebase(imagem)
        .then((res) => {Global.IMAGEURL = res})
        .catch((e)=>{console.log("ao carregar a imagem do perfil")})
    }

    return Global.IMAGEURL
  }

  // TODO - Separar gestor de corretor

  function formatarNome() {
    let tmp = nome.split(" ");
    if (tmp[1]) {nome = tmp[0]}

    return nome;
  }

  return (
    <View >
      <View style={styles.BoxUser}>
        <Image
          style={styles.imgPerfil}
          source={{ uri: buscarImagemPerfil() }}
        />
        <View style={{maxWidth:wp("43%")}}>
          <Text numberOfLines={1} style={styles.NameUser}>{formatarNome()}</Text>
        </View>
      </View>

      <View style={styles.BoxMid}>

        <DrawerItem
          icon={() => <Image style={{height: 30, width: 30}} source={require('../../../assets/assetsDrawer/dashboard.png')} />}
          label="Dashboard"
          onPress={() => props.navigation.navigate('Dashboard')}
          labelStyle={{marginLeft:-20, width:"200%"}}
        />
        <DrawerItem
          icon={() => <Image style={{height: 30, width: 30}} source={require('../../../assets/assetsDrawer/loteamentos.png')} />}
          label="Loteamentos"
          onPress={() => props.navigation.navigate('Loteamentos')}
          labelStyle={{marginLeft:-20, width:"200%"}}
        />
          {
            Global.PROFILETYPE === "gestor"
            ?
            <View>
            <DrawerItem
              icon={() => <Image style={{height: 30, width: 30}} source={require('../../../assets/assetsDrawer/cadastrarLoteamento.png')} />}
              label="Cadastrar Loteamento"
              onPress={() => props.navigation.navigate('CadastrarLoteamento')}
              labelStyle={{marginLeft:-20, width:"200%"}}
            />
            </View>
            :
            null  
          }
        <DrawerItem
          icon={() => <Image style={{height: 30, width: 30}} source={require('../../../assets/assetsDrawer/minhasReservas.png')} />}
          label="Minhas Reservas"
          onPress={() => props.navigation.navigate('MinhasReservas')}
          labelStyle={{marginLeft:-20, width:"200%"}}
        />
        <DrawerItem
          icon={() => <Image style={{height: 30, width: 30}} source={require('../../../assets/assetsDrawer/todasReservas.png')} />}
          label="Todas Reservas"
          onPress={() => props.navigation.navigate('TodasReservas')}
          labelStyle={{marginLeft:-20, width:"200%"}}
        />
        {
            Global.PROFILETYPE === "gestor"
            ?
            <View>
              <DrawerItem
                icon={() => <Image style={{height: 30, width: 30}} source={require('../../../assets/assetsDrawer/gerenciarCorretores.png')}/>}
                label="Gerenciar Corretores"
                onPress={() => props.navigation.navigate('GerenciarCorretores')}
                labelStyle={{marginLeft:-20, width:"200%"}}
              />
            </View>
            :
            null  
          }
        

      </View>

      <View style={styles.LastBox}>

        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={handleSignOutButton}>
          <Image source={require('../../../assets/assetsDrawer/exit.png')} style={{height: 30 , width: 30}} />
          <Text style={{ color: '#000', fontWeight: 'bold' , width: 30}}>Sair</Text>
        </TouchableOpacity>

      </View>


    </View>
  );

}

const styles = StyleSheet.create({
  BoxUser: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '9%',
    backgroundColor: '#475658',
    padding: 10,
  },
  imgPerfil: {
    width: hp('6.3%'),
    height: hp('6.3%'),
    borderRadius: hp('50%'),
  },
  BoxMid: {
    height: '80%'
  },
  LastBox: {
    height: '11%',
    flexDirection: 'row'
  },
  NameUser: {
    padding: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
})
