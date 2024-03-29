import React from 'react';
import { ImageBackground, Modal, FlatList, Image, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
const fundo = "../../../../../assets/fundo.png";

import PreviaLotes from './PreviaLotes';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class PreviaQuadras extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      nomeLote: "",
      planta: {
        fileName: "",
        resultado: ""
      },
      csvObject: {
        name: "",
        uri: "",
        content: "",
        values: {
          totalQuadras: "" ,
          totalLotes: "" ,
        }
      },
      address: {
        descricao: "",
        mapSnapshotURI: ""
      },
      index: ""
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {modalVisible, index} = this.state
    const {data, back} = this.props
    let nome = 'Detalhes do Loteame'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <View style={styles.container}>
          <Header titulo={nome} funcao={back} icon={true}/>

          <View style={{height: hp("23%"), width: wp("90%"), alignSelf: 'center'}}>
            { data.planta.resultado ?
              <Image
              style={styles.imgPerfil}
              resizeMethod="resize"
              resizeMode='cover'
              source={{ uri: data.planta.resultado}}
              />
           : <Text>Erro: Não foi realizada a captura do mapa, tente novamente</Text>}
          </View> 
          

          <View style={{height:"65%", width: wp("90%"), alignSelf: 'center'}}>
            <FlatList
                data={Object.keys(data.csvObject.content[0])}
                renderItem={({ item }) => {
                  
                  return (
                    <View>
                          <View style={styles.caixa}>
                            <Text style={[styles.title]}>{item.replace("_"," ")}</Text>
                            <Button titulo='Visualizar Lotes' funcao={() => {
                              this.setState({index: item},
                              this.setModalVisible(true)
                              )}} btStyle={{marginBottom: 0, width:wp("47%"), height:hp("5%")}}/>
                          </View>
                      </View> 
                    );
                  }}  
                  keyExtractor={item => item}
                  />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
          >
            <View style={styles.maps}>
              <PreviaLotes
                quadra={index}
                data={data}
                back={() => {this.setModalVisible(false)}}
              />
            </View>
          </Modal>

        </View>
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  caixa:{
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius:15,
    width:wp("90%"),
    height:hp("8%"),
    marginTop:20,
    alignSelf:'center',
    alignItems:'center',
    borderWidth:0,
    justifyContent:'space-around'
  },
  maps: {
    height: '100%',
    backgroundColor: "#FFF",
    borderWidth: 0,
    borderColor: '#888',
    justifyContent: 'center',
  },
  formulario: {
    marginBottom: hp('3.5%')
  },
  title: {
    fontSize: hp('2.2%'),
    color: "#000",
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  imgBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "space-around", 
    alignItems: "center"
  },
  imgPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderColor: "#999",
    borderWidth:2
},
});