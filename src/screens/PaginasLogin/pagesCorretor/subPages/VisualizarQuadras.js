import React from 'react';
import { ImageBackground, Modal, FlatList, Image, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

const fundo = "../../../../../assets/fundo.png";


import ImageViewer from 'react-native-image-zoom-viewer'
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import PreviaLotes from './VisualizarLotes';

import { getPlantaFromFirebase } from '../../../../database/Firebase'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class VisualizarQuadras extends React.Component {
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
      index: "",
      imageURL: "",
      modalImage: false
    };
  }

  setImageVisible = (visible) => {
    this.setState({
       modalImage: visible
       });
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log("erro storage: ",e)
    }
  }

  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value
      } else {
        return null
      }
    } catch(e) {
      console.log("erro storage: ",e)
    }
  }

  componentDidMount = async () =>{
    if (await this.getData(this.props.data.planta) !== null){
      this.setState({
        imageURL : await this.getData(this.props.data.planta)
      })
    }
    if (await this.getData(this.props.data.planta) === null){
      const imageURL = await getPlantaFromFirebase(this.props.data.planta)
      this.storeData(this.props.data.planta, imageURL)
      this.setState({
        imageURL : await this.getData(this.props.data.planta)
      })
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {modalVisible, index, modalImage} = this.state
    const {data, back, updating, atualizar} = this.props
    let nome = 'Detalhes do Loteamento'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <View style={styles.container}>
          <Header titulo={nome} funcao={back} icon={true}/>

          <View style={{height: hp("23%"), width: wp("90%"), alignSelf: 'center'}}>
            { this.state.imageURL ?
              <TouchableOpacity
              onPress={()=>{this.setImageVisible(true)}}
              >
                <Image
                style={styles.imgPerfil}
                resizeMethod="resize"
                resizeMode='cover'
                source={{ uri: this.state.imageURL}}
                />
              </TouchableOpacity>
           : <Text>Erro: Não foi realizada a captura do mapa, tente novamente</Text>}
          </View> 
          

          <View style={{height:"65%", width: wp("90%"), alignSelf: 'center'}}>
            <FlatList
                data={Object.keys(data.csvObject.content[0]).sort()}
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
              if (!updating) {
              this.setModalVisible(false);
              }
            }}
          >
            <View style={styles.maps}>
              <PreviaLotes
                quadra={index}
                data={data}
                back={() => {this.setModalVisible(false)}}
                updating={updating}
                atualizar={atualizar}
                image={this.state.imageURL}
              />
            </View>
          </Modal>

          <Modal
              animationType="slide"
              transparent={true}
              visible={modalImage}
              onRequestClose={() => {
                if (!updating) {
                this.setImageVisible(false);
                }
              }}
            >
              
                <ImageViewer
                  enableSwipeDown={true}
                  onSwipeDown={() => {this.setImageVisible(false);}}
                  onClick={() => {this.setImageVisible(false);}}
                  onDoubleClick={() => {this.setImageVisible(false);}}
                  renderIndicator={()=>{<View></View>}}
                  imageUrls={[{
                    freeWidth: true,
                    url : this.state.imageURL,
                    freeHeight: true,
                  }]}
                />
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
    marginTop:10,
    marginBottom: 10,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'space-around'
  },
  maps: {
    height: '100%',
    backgroundColor: "#FFF",
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