import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { getImageFromFirebase, signout } from '../../database/Firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Global from "../../global/Global";

export default function CustomDrawerCli(props) {
  function handleSignOutButton() {
    Alert.alert('Você tem certeza que deseja sair?', '', [
      {
        text: "Cancelar",
        onPress: () => { },
        style: 'cancel'
      }, {
        text: "Sim",
        onPress: () => {
          props.navigation.navigate('Login');
          signout();
        },
        style: 'default'
      }]
    )
  }

  function buscarImagemPerfil() {
    const imagem = Global.PROFILEIMAGE;

    if (imagem) {
      getImageFromFirebase(imagem, (url, error) => {
        if (error) console.log(error);
        Global.IMAGEURL = url;
      });
    }

    return Global.IMAGEURL
  }

  function formatarNome(nome) {
    let tmp = nome.split(" ");
    if (tmp[1]) {
      nome = tmp[0] + " " + tmp[1];
    }

    return nome;
  }

  return (
    <View >

      <View style={styles.BoxUser}>
        <Image
          style={styles.imgPerfil}
          source={{ uri: buscarImagemPerfil() }}
        />
        <Text style={styles.NameUser}>{formatarNome(Global.NOME)}</Text>
      </View>

      <View style={styles.BoxMid}>

        <DrawerItem
          icon={() => <Image source={require('../../../assets/assetsCorretor/profs.png')} />}
          label="Solicitações"
          onPress={() => props.navigation.navigate('Solicitaçoes')}
        />
        <DrawerItem
          icon={() => <Image source={require('../../../assets/assetsCorretor/mensagens.png')} />}
          label="Mensagens"
          onPress={() => props.navigation.navigate('Mensagens')}
        />
        <DrawerItem
          icon={() => <Image source={require('../../../assets/assetsCorretor/mais.png')} />}
          label="Notas Fiscais"
          onPress={() => props.navigation.navigate('Notas Fiscais')}
        />
        <DrawerItem
          icon={() => <Image source={require('../../../assets/assetsCorretor/carteira.png')} />}
          label="Carteira"
          onPress={() => props.navigation.navigate('Carteira')}
        />
        <DrawerItem
          icon={() => <Image source={require('../../../assets/assetsCorretor/calendario.png')} />}
          label="Agenda"
          onPress={() => props.navigation.navigate('Agenda')}
        />
        <DrawerItem
          icon={() => <Image source={require('../../../assets/assetsCorretor/computador.png')} />}
          label="Serviços"
          onPress={() => props.navigation.navigate('Serviços')}
        />


      </View>

      <View style={styles.LastBox}>

        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../assets/assetsCorretor/editar.png')} />
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Alternar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={handleSignOutButton}>
          <Image source={require('../../../assets/assetsCorretor/sair.png')} />
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Sair</Text>
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
    backgroundColor: '#0C1C41',
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
