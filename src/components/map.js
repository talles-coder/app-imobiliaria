
import React from 'react';
import { Image, TextInput, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform,TouchableOpacity, Alert, Modal } from 'react-native';
import Input from './Input';
import MapView, {Marker} from 'react-native-maps';
import Geocode from "react-geocode";
import {Icon} from "react-native-elements"
import Button from "./Button"

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// API Key do google para a api Geocode

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        userLoc: true,
        descricao: "",
        latDelta: 0.0001,
        lonDelta: 0.0001,
        localInicial: {
            latitude: -23.63010,	
            longitude: -46.80103,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001
        },
        pesquisa: "",
        opaci: 0.7,
        validAddress: false,
        readyToSnap: true,
        modalVisible: false,

        
        mapSnapshotURI: "",
        address: {
            enderecoFormatado: "",
            numero:  "" ,
            endereco:  ""  ,
            bairro:  ""  ,
            cidade: ""  ,
            estado: ""  ,
            cep: ""  ,
        },
        changeCord: {
            latitude: -23.63010,	
            longitude: -46.80103,
        },
    };
    
    this.handleCodigoChange = this.handleCodigoChange.bind(this);
    }

    handleCodigoChange = (pesquisa) => this.setState({ pesquisa });

    componentDidMount(){
        Geocode.setApiKey("AIzaSyB4TVCzjqUXClgfCjpf6ZlGRmvQ4u8N7go")
    }

    componentDidUpdate(prevProps, PrevState){    
            if (this.mar.props.title !== PrevState.descricao && this.state.readyToSnap) {
                this.mar.showCallout()
            }
        }

    pesquisar = () => {
        this.setState({
            readyToSnap: false
        })
        this.findLocation()
        setTimeout(() => {
            this.map.setCamera({center: this.state.changeCord, zoom: 19},{duration:1000})
        }, 500);
        this.setState({
            readyToSnap: true
        })
    }

    findLocation = () => {
    if (this.state.pesquisa.length > 5) {
        Geocode.fromAddress(this.state.pesquisa, "AIzaSyB4TVCzjqUXClgfCjpf6ZlGRmvQ4u8N7go")
        .then((response)=>{
            this.setState({
                changeCord:{
                    latitude: response.results[0].geometry.location.lat,
                    longitude: response.results[0].geometry.location.lng
                }
            })
        })
        .catch((erro)=>{
            Alert.alert("O endereço não foi encontrado");
        })
    }else { 
            Alert.alert("O endereço esta muito curto");
        }
    }

  geocodeLatLng = () => {
    Geocode.fromLatLng(this.state.changeCord.latitude, this.state.changeCord.longitude, "AIzaSyB4TVCzjqUXClgfCjpf6ZlGRmvQ4u8N7go")
    .then((response) =>{ 
        const result = response.results[0]
        this.setState({
        address: {
            enderecoFormatado: result.formatted_address,
            numero:  result.address_components[0]?.long_name ,
            endereco:  result.address_components[1]?.long_name  ,
            bairro:  result.address_components[3]?.long_name  ,
            cidade: result.address_components[2]?.long_name  ,
            estado: result.address_components[4]?.long_name  ,
            cep: result.address_components[6]?.long_name  ,
        },
        descricao: result.formatted_address,
        validAddress: true 
        });
    })
    .catch((erro)=>{
        Alert.alert("Tente novamente: localização não encontrada")
    })
  }

  
  takeSnapshot = async() => {
    this.setState({
        readyToSnap: false,
        validAddress: false,  
    })
    this.mar.hideCallout();
    let cameraInicial = await this.map.getCamera()
    this.map.setCamera({zoom:17.5}) 
    setTimeout(async() => {
        const snapshot = await this.map.takeSnapshot({
            format: 'png',
            result: 'file'
        });
        this.setState({
            mapSnapshotURI: snapshot,
            fileName : 'mapSnap_' + new Date().valueOf() + Math.random() + '.png'
        })
        this.map.setCamera(cameraInicial)
        this.setState({
            readyToSnap: true,
            validAddress: false,    
        })
        if (this.state.readyToSnap) {this.mar.showCallout()}
        this.setState({modalVisible: true})
    }, 1000);
  }


  render() {
    const { 
      pesquisa,
      descricao,
      changeCord,
      localInicial,
      userLoc,
      opaci,
      validAddress,
      mapSnapshotURI,
      readyToSnap,
      modalVisible,
      latDelta,
      lonDelta,
      address
    } = this.state;
    const {
        height,
        width,
        Visiblesearch,
        placeHol,
        closer
    } = this.props
    return(
        <View style={{flex:1}} pointerEvents={readyToSnap ? "auto" : "none"}>
            
                <View style={{flex:1,
                        height: height ? parseInt(height): '100%',
                        width: width ? parseInt(width): '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                        }}>
                <MapView
                    minZoomLevel={15}
                    maxZoomLevel={20}
                    ref={ref => { this.map = ref }}
                    showsUserLocation={userLoc}
                    rotateEnabled={false}
                    initialRegion={localInicial}
                    showsPointsOfInterest={false}

                    onUserLocationChange={(e)=>{
                        this.setState({
                        localInicial: {
                            latitudeDelta: latDelta,
                            longitudeDelta: lonDelta,
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        },
                        userLoc: false
                        })
                        this.map.setCamera({center: localInicial, zoom: 17},{duration:1000})
                    }}
                    onRegionChange={(region)=>{
                        if (readyToSnap){
                            this.mar.hideCallout()
                            this.setState({
                            changeCord: region
                            });
                        }
                    }}
                    onRegionChangeComplete={async(region)=>{
                        
                        if (readyToSnap){if (region.longitudeDelta <= 0.0023){
                            await this.geocodeLatLng()
                            this.mar.showCallout()
                        } else {
                            this.setState({
                                validAddress: false,
                                descricao: "Dê zoom para selecionar o endereço",
                            });
                            this.mar.showCallout()
                        }}
                    }}
                    style={{
                        height: height ? parseInt(height): '100%',
                        width: width ? parseInt(width): '100%',
                        position:'absolute'
                    }}
                    >    
                    <Marker draggable
                        tracksViewChanges={false}
                        tracksInfoWindowChanges={false}
                        ref={ref => { this.mar = ref }}
                        title={descricao}
                        coordinate={changeCord}
                    />
                </MapView>
                    { Visiblesearch ?
                    <View style={[styles.search, {opacity: opaci}]}>            
                        <TextInput
                            style={styles.inputField}
                            placeholder={placeHol}
                            onChangeText={this.handleCodigoChange}
                            keyboardType='default'
                            underlineColorAndroid="transparent"
                            defaultValue={pesquisa}
                            value={pesquisa}
                            onFocus={() => {this.setState({opaci: 1})}}
                            onBlur={() => {
                                this.setState({opaci: 0.7},
                                this.pesquisar
                                )}}
                            blurOnSubmit
                            onEndEditing={Keyboard.dismiss}
                        />
                        <TouchableOpacity 
                            style={{
                                width: "14%",
                                height: '100%',
                                borderRadius: 3,
                                justifyContent: 'center',
                            }
                            }
                            onPress={this.pesquisar}
                            disabled={false}
                        >
                            <Icon
                                style={{ flexDirection:'row', justifyContent: 'flex-end'}}
                                name='search'
                                type='font-awesome'
                                size={25}
                                color="#000"
                            ></Icon>
                        </TouchableOpacity>   
                    </View>
                   :
                    null
                    }
            
                    { Visiblesearch ?
                    <View>
                        <Button titulo='Selecionar Endereço' funcao={this.takeSnapshot} hidden={!validAddress || !readyToSnap} />
                    </View>
                   :
                    null
                    }
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        this.setState({modalVisible: false});
                        }}
                    >
                        <View style={styles.addressResumo}>
                            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent:'space-around'  }}>
                                <View>
                                    <Text numberOfLines={1} style={[styles.titulo]}>Confirme o Endereço</Text>
                                </View>
                                <View style={{width:"100%", alignItems: 'center'}}>

                                    <View style={{height:150, width: "100%", backgroundColor: "#cdcdcd"}}>
                                        { mapSnapshotURI ?
                                        <Image
                                        style={styles.imgPerfil}
                                        resizeMethod="resize"
                                        resizeMode='cover'
                                        source={{ uri: mapSnapshotURI}}
                                        />
                                       :
                                        <Text>Erro: Não foi realizada a captura do mapa, tente novamente</Text>
                                        }
                                    </View>  

                                    <View style={[styles.searchFormatado]}>
                                        <Text numberOfLines={1}>numero: </Text>
                                        <TextInput
                                            style={[
                                                styles.inputFieldModal
                                            ]}
                                            onChangeText={(text)=>{this.setState({
                                                address: {
                                                    ...this.state.address,
                                                    numero: text
                                                }
                                            })}}
                                            defaultValue={this.state.address.numero}
                                            value={this.state.address.numero}
                                            blurOnSubmit
                                            numberOfLines={1}
                                            onEndEditing={Keyboard.dismiss}
                                        />
                                    </View>
                                    <View style={[styles.searchFormatado]}>
                                        <Text numberOfLines={1}>endereco: </Text>
                                        <TextInput
                                            style={[
                                                styles.inputFieldModal
                                            ]}
                                            onChangeText={(text)=>{this.setState({
                                                address: {
                                                    ...this.state.address,
                                                    endereco: text
                                                }
                                            })}}
                                            defaultValue={this.state.address.endereco}
                                            value={this.state.address.endereco}
                                            blurOnSubmit
                                            numberOfLines={1}
                                            onEndEditing={Keyboard.dismiss}
                                        />
                                    </View>
                                    <View style={[styles.searchFormatado]}>
                                        <Text numberOfLines={1}>bairro: </Text>
                                        <TextInput
                                            style={[
                                                styles.inputFieldModal
                                            ]}
                                            onChangeText={(text)=>{this.setState({
                                                address: {
                                                    ...this.state.address,
                                                    bairro: text
                                                }
                                            })}}
                                            defaultValue={this.state.address.bairro}
                                            value={this.state.address.bairro}
                                            blurOnSubmit
                                            numberOfLines={1}
                                            onEndEditing={Keyboard.dismiss}
                                        />
                                    </View>
                                    <View style={[styles.searchFormatado]}>
                                        <Text numberOfLines={1}>cidade: </Text>
                                        <TextInput
                                            style={[
                                                styles.inputFieldModal
                                            ]}
                                            onChangeText={(text)=>{this.setState({
                                                address: {
                                                    ...this.state.address,
                                                    cidade: text
                                                }
                                            })}}
                                            defaultValue={this.state.address.cidade}
                                            value={this.state.address.cidade}
                                            blurOnSubmit
                                            numberOfLines={1}
                                            onEndEditing={Keyboard.dismiss}
                                        />
                                    </View>
                                    <View style={[styles.searchFormatado]}>
                                        <Text numberOfLines={1}>estado: </Text>
                                        <TextInput
                                            style={[
                                                styles.inputFieldModal
                                            ]}
                                            onChangeText={(text)=>{this.setState({
                                                address: {
                                                    ...this.state.address,
                                                    estado: text
                                                }
                                            })}}
                                            defaultValue={this.state.address.estado}
                                            value={this.state.address.estado}
                                            blurOnSubmit
                                            numberOfLines={1}
                                            onEndEditing={Keyboard.dismiss}
                                        />
                                    </View>
                                    <View style={[styles.searchFormatado]}>
                                        <Text numberOfLines={1}>cep: </Text>
                                        <TextInput
                                            style={[
                                                styles.inputFieldModal
                                            ]}
                                            onChangeText={(text)=>{this.setState({
                                                address: {
                                                    ...this.state.address,
                                                    cep: text
                                                }
                                            })}}
                                            defaultValue={this.state.address.cep}
                                            value={this.state.address.cep}
                                            blurOnSubmit
                                            numberOfLines={1}
                                            onEndEditing={Keyboard.dismiss}
                                        />
                                    </View>
                                </View>

                                <View style={{width: "100%", alignItems: 'center'}}>
                                    <Button titulo='Alterar' funcao={() => {this.setState({modalVisible: false})}} hidden={false} />
                                    <Button titulo='Cadastrar' funcao={closer} hidden={false} />
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                </Modal>
                </View>
        </View>
    ) 
  }
}

const styles = StyleSheet.create({
search: {
    paddingHorizontal: "4%",
    flexDirection: 'row',
    backgroundColor: "#cdcdcd",
    height:45,
    width:'90%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center', 
    marginTop:10,
    borderRadius: 15,
},
searchFormatado: {
    paddingHorizontal: "4%",
    flexDirection: 'row',
    backgroundColor: "#cdcdcd",
    height:40,
    width:'90%',
    alignSelf: 'center',
    alignItems: "center",
    marginTop:10,
    borderRadius: 15,
},
  addressResumo:{ 
    justifyContent: 'space-around',
    backgroundColor: "#FFF", 
    width: '90%', 
    height: '95%', 
    alignSelf:"center", 
    marginTop: "5%",
    borderColor: "#cdcdcd",
    borderRadius: 15,
    borderWidth:3,
    alignItems: 'center' 
},
  inputField: {
    color: '#000',
    width: "80%"
},
  inputFieldModal: {
        color: '#000',
        maxWidth: "70%"
},
  imgPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderColor: "#cdcdcd",
    borderWidth:2
},
titulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
}
})