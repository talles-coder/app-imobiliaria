import React from 'react';
import { RefreshControl, ImageBackground, Modal, TextInput, FlatList, Image, ScrollView, StyleSheet, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';

const fundo = "../../../../../assets/fundo.png";
const maps_icon = "../../../../../assets/google-maps.png";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import VisualizarQuadras from './VisualizarQuadras'
import { Icon } from 'react-native-elements'

import { getPlantaFromFirebase, getScriptFromFirebase, alterarNotas } from '../../../../database/Firebase'
import * as ExpoImagePicker from 'expo-image-picker';
import { uploadScriptToFirebase, alterarScript } from '../../../../database/Firebase'

import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Global from '../../../../global/Global';
//TODO - Remover informações desnecessárias do banco de dados

export default class InformacoesLoteamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      modalVisible: false,
      modalImage: false,
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
          totalQuadras: "",
          totalLotes: "",
        }
      },
      address: {
        descricao: "",
        mapSnapshotURI: ""
      },
      index: "",
      imageURL: "",
      scriptURL: "",
      notas: "",
      imagemEscolhida: "",
    };
  }


  editando = () => {
    if (this.state.editing) {
      this.setState({ editing: false })
      const text = String(this.state.notas).trim()
      if (text) {
        alterarNotas(this.props.data.id, text)
      }
    } else {
      this.setState({
        editing: true
      })
    }
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log("erro storage: ", e)
    }
  }

  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        return value
      } else {
        return null
      }
    } catch (e) {
      console.log("erro storage: ", e)
    }
  }

  componentDidMount = async () => {
    this.setState({
      notas: this.props.data.notas
    })
    if (await this.getData(this.props.data.planta) !== null) {
      this.setState({
        imageURL: await this.getData(this.props.data.planta)
      })
    }
    if (await this.getData(this.props.data.planta) === null) {
      const imageURL = await getPlantaFromFirebase(this.props.data.planta)
      this.storeData(this.props.data.planta, imageURL)
      this.setState({
        imageURL: await this.getData(this.props.data.planta)
      })
    }
    if (this.props.data.script) {
      if (await this.getData(this.props.data.script) !== null) {
        this.setState({
          scriptURL: await this.getData(this.props.data.script)
        })
      }
      if (await this.getData(this.props.data.script) === null) {
        const scriptURL = await getScriptFromFirebase(this.props.data.script)
        this.storeData(this.props.data.script, scriptURL)
        this.setState({
          scriptURL: await this.getData(this.props.data.script)
        })
      }
    }
    this.props.atualizar()
  }

  handleNotasChange = (input) => {
    this.setState({ notas: input })
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

  pickScript = async () => {
    const { status } = await ExpoImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Desculpe, nós precisamos acessar a galeria para isso!');
    }

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      cropperCircleOverlay: false,
      quality: 1,
    });

    if (!result.cancelled) {
      let fileName = result.uri.split("/")
      fileName = fileName[fileName.length - 1]

      const blobScript = await this.uriToBlob(result.uri);

      await uploadScriptToFirebase(blobScript, fileName);

      alterarScript(this.props.data.id, fileName)

      this.componentDidMount
    }
  };

  setImageVisible = (visible, imagem) => {
    this.setState({
      modalImage: visible,
      imagemEscolhida: imagem
    });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible, modalImage, index, editing } = this.state
    const { data, back, updating, atualizar } = this.props
    let nome = 'Loteamento'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Header titulo={nome} funcao={back} icon={true} />

            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={updating}
                  onRefresh={this.componentDidMount}
                />
              }
              style={styles.scrollView}
            >
              <View style={styles.resumo}>
                <View style={{ flexDirection: "row" }}>
                  {this.state.imageURL
                    ?
                    <TouchableOpacity
                      onPress={() => { this.setImageVisible(true, this.state.imageURL) }}
                    >
                      <Image
                        style={styles.iconImagen}
                        source={{ uri: this.state.imageURL }}
                      />
                    </TouchableOpacity>
                    :
                    null
                  }
                  <View>
                    <Text style={[styles.loteName, { fontWeight: "bold", fontSize: 20 }]}>{this.props.data.nomeLote}</Text>
                    <Text style={styles.loteName}>{this.props.data.cadastrador}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 20 }}>
                  <View style={{ width: "80%", justifyContent: "space-between" }}>
                    <Text
                      numberOfLines={4}
                      selectable={true}
                    >
                      Endereço : {this.props.data.address.descricao}
                    </Text>
                  </View>


                  <View>
                    <TouchableOpacity
                      onPress={() => { Linking.openURL(`geo:${this.props.data.address.changeCord.latitude},${this.props.data.address.changeCord.longitude}?q=${this.props.data.address.descricao}`) }}
                    >
                      <Image
                        style={styles.iconMaps}
                        source={require(maps_icon)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: "100%", alignSelf: 'center' }}>
                  <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, alignSelf: "center"}}>Script:</Text>
                    {
                      Global.PROFILETYPE === "gestor"
                        ?
                        <Icon raised name='cloud-upload' size={wp("5%")} onPress={() => { this.pickScript() }} />
                        :
                        null
                    }
                  </View>

                  {this.state.scriptURL
                    ?
                    <TouchableOpacity
                      onPress={() => { this.setImageVisible(true, this.state.scriptURL) }}
                    >
                      <ImageBackground
                        source={{ uri: this.state.scriptURL }}
                        style={styles.preImgBack}
                        borderRadius={10}
                        blurRadius={1}
                      >
                        {/* <View style={{ width: "100%", alignSelf: "center", position: 'absolute', backgroundColor: "#000", opacity: 0.5, borderRadius: 10 }}> */}
                        {/* </View> */}
                        <Text
                          style={{ fontSize: hp('3%'), alignSelf: "center", color: "#000" }}
                        >
                          Visualizar
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                    :
                    Global.PROFILETYPE == "gestor"
                      ?
                      <TouchableOpacity
                        onPress={() => { this.pickScript() }}
                      >
                        <View style={{ minHeight: 40, borderRadius: 15, borderWidth: 2, borderColor: "#cdcdcd", justifyContent: "center" }}>
                          <Text style={{ textAlign: "center" }}>Clique aqui para carregar um script</Text>
                        </View>
                      </TouchableOpacity>
                      :
                      <View style={{ minHeight: 40, borderRadius: 15, borderWidth: 2, borderColor: "#cdcdcd", justifyContent: "center" }}>
                        <Text style={{ textAlign: "center" }}>Nenhum Script cadastrado</Text>
                      </View>
                  }
                </View>

                <View style={{ width: "100%", alignSelf: 'center' }}>
                  <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, alignSelf: "center" }}>Notas: </Text>
                    {
                      Global.PROFILETYPE === "gestor"
                        ?
                        <Icon reverse={editing} raised name={editing ? 'save' : 'edit'} size={wp("5%")} onPress={() => { this.editando() }} />
                        :
                        null
                    }
                  </View>
                  <View style={{ borderColor: "#cdcdcd", borderRadius: 15, borderWidth: 2, minHeight: 150, padding: 10 }}>
                    {
                      editing && Global.PROFILETYPE === "gestor"
                        ?
                        <TextInput
                          onBlur={() => { this.editando() }}
                          editable
                          multiline
                          numberOfLines={1}
                          onChangeText={this.handleNotasChange}
                          value={this.state.notas}
                        />
                        :
                        <Text
                          selectable={true}
                        >
                          {this.state.notas || "Não há nenhuma atualização para este loteamento."}
                        </Text>
                    }
                  </View>
                </View>

                <View style={{ alignSelf: 'center' }}>
                  <Button titulo='Gerenciar Lotes' funcao={() => { this.setModalVisible(true) }} btStyle={{ width: wp('45%'), height: hp("4.5%"), marginTop: 23 }} />
                </View>

              </View>
            </ScrollView>


            {this.state.imagemEscolhida
              ?
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalImage}
                onRequestClose={() => {
                  if (!updating) {
                    this.setImageVisible(false, "");
                  }
                }}
              >

                <ImageViewer
                  enableSwipeDown={true}
                  onSwipeDown={() => { this.setImageVisible(false, ""); }}
                  onClick={() => { this.setImageVisible(false, ""); }}
                  onDoubleClick={() => { this.setImageVisible(false, ""); }}
                  renderIndicator={() => { <View></View> }}
                  imageUrls={[{
                    freeWidth: true,
                    url: this.state.imagemEscolhida,
                    freeHeight: true,
                  }]}
                />
              </Modal>
              :
              null
            }

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
                <VisualizarQuadras
                  data={data}
                  back={
                    () => {
                      this.setModalVisible(false)
                      this.setState({
                        index: ""
                      })
                    }}
                  atualizar={atualizar}
                  updating={updating}
                />
              </View>
            </Modal>

          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  loteName: {
    marginLeft: 15,
    textAlignVertical: 'center'
  },
  resumo: {
    paddingTop: 20,
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#888',
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: 'space-around'
  },
  iconImagen: {
    borderWidth: 2,
    borderColor: "#266",
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: wp('100%')
  },
  iconMaps: {
    height: hp('6%'),
    width: hp('6%'),
  },
  maps: {
    height: '100%',
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
  },
  caixa: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    width: wp("90%"),
    height: hp("8%"),
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    borderWidth: 2
  },
  preImgBack: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
  },
});