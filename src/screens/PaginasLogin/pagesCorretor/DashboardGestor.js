import React from 'react';
import { RefreshControl , FlatList, StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import updateGestorDashboard from '../../../services/Gestor'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Global from '../../../global/Global';

export default class DashboardGestor extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          data: {},
          atualizando: true
        };
    }

    componentDidMount = () => {
      this.setState({
        atualizando : true
      })
      updateGestorDashboard(Global.EMAIL)
      .then((dadosAtualizados)=>{
        console.log("testeeeeeeeeeeee", dadosAtualizados)
        this.setState({
          data : dadosAtualizados
        })
      })
      .catch((e)=>(console.log("falha ao atualizar os dados do Gestor")))
      .finally(()=>{
        this.setState({
          atualizando : false
        })
      })
    }

    render() {
      const { data, atualizando} = this.state
        return (

        <View style={styles.container}>
            <Header titulo="Dashboard Gestor" funcao={() => {this.props.navigation.openDrawer()}}></Header>
            <ScrollView 
            style={{marginTop:hp('2%'), marginBottom:hp('2%') }} 
            refreshControl={
              <RefreshControl
                refreshing={atualizando}
                onRefresh={this.componentDidMount}
              />
            }
            >
            <Text style={styles.titlebox}>Minhas Reservas</Text>    

            <View style={styles.mainBox}>
            
              <View style={styles.box}>
                <LinearGradient
                  colors={['#FFEE00', '#807700']}
                  style={styles.background}
                />
                <Text style={{width:90}}>Realizadas Hoje : </Text>
                <Image  source={require('../../../../assets/RealizadasHoje.png')}/>
                <Text style={styles.data}>{data?.realizadasHoje}</Text>
              </View>

              <View style={[styles.box, {backgroundColor:'#009900'}]}>
                <LinearGradient
                  colors={['#FFCC00', '#806600']}
                  style={styles.background}
                />
                <Text style={{width:90}}>Em andamento: </Text>
                <Image  source={require('../../../../assets/AtivasHoje.png')}/>
                <Text style={styles.data}>{data?.ativasHoje}</Text>
              </View>

              <View style={[styles.box, {backgroundColor:'#009900'}]}>
                <LinearGradient
                  colors={['#FF812D', '#804117']}
                  style={styles.background}
                />
                <Text style={{width:90}}>Expirarão Hoje : </Text>
                <Image  source={require('../../../../assets/VaoExpirar.png')}/>
                <Text style={styles.data}>{data?.expiramHoje}</Text>
              </View>

              <View style={[styles.box, {backgroundColor:'#009900'}]}>
                <LinearGradient
                  colors={['#FF3A3A', '#A82525']}
                  style={styles.background}
                />
                <Text style={{width:90}}>Canceladas este mês : </Text>
                <Image  source={require('../../../../assets/JaExpiraram.png')}/>
                <Text style={styles.data}>{data?.jaExpiraramMes}</Text>
              </View>

            </View>

            <Text style={styles.titlebox}>Todas as Reservas</Text>    

            <View style={styles.mainBox}>
            
              <View style={styles.box}>
                <LinearGradient
                  colors={['#FFEE00', '#807700']}
                  style={styles.background}
                />
                <Text style={{width:90}}>Realizadas Hoje : </Text>
                <Image  source={require('../../../../assets/RealizadasHoje.png')}/>
                <Text style={styles.data}>{data?.totalRealizadasHoje}</Text>
              </View>

              <View style={[styles.box, {backgroundColor:'#009900'}]}>
                <LinearGradient
                  colors={['#FFCC00', '#806600']}
                  style={styles.background}
                />
                <Text style={{width:90}}>Em andamento: </Text>
                <Image  source={require('../../../../assets/AtivasHoje.png')}/>
                <Text style={styles.data}>{data?.totalAtivasHoje}</Text>
              </View>

              <View style={[styles.boxLarger, {backgroundColor:'#009900'}]}>
                <LinearGradient
                  colors={['#FF812D', '#804117']}
                  style={styles.backgroundLarger}
                />
                <Text style={{width:'80%'}}>Expirarão Hoje : </Text>
                <Image  source={require('../../../../assets/VaoExpirar.png')}/>
                <Text style={styles.data}>{data?.totalExpiramHoje}</Text>
              </View>

            </View>

            <Text style={styles.titlebox}>Vendas</Text> 

            <View style={styles.mainBox}>
            
              <View style={styles.box}>
                <LinearGradient
                  colors={['#9BFF9B', '#4E804E']}
                  style={styles.background}
                />
                <Text style={{width:90}}>Realizadas Hoje : </Text>
                <Image  source={require('../../../../assets/VendasHoje.png')}/>
                <Text style={styles.data}>{data?.vendasHoje}</Text>
              </View>

              <View style={[styles.box, {backgroundColor:'#009900'}]}>
                <LinearGradient
                  colors={['#54FE54', '#2A7F2A']}
                  style={styles.background}
                />
                <Text style={{width:90}}>Neste Mês: </Text>
                <Image  source={require('../../../../assets/VendasMes.png')}/>
                <Text style={styles.data}>{data?.vendasNesteMes}</Text>
              </View>

              <View style={[styles.boxLarger, {backgroundColor:'#009900'}]}>
                <LinearGradient
                  colors={['#00FF00', '#008000']}
                  style={styles.backgroundLarger}
                />
                <Text style={{width:'80%'}}>Total já realizadas : </Text>
                <Image  source={require('../../../../assets/TotalVendas.png')}/>
                <Text style={styles.data}>{data?.totalVendas}</Text>
              </View>

            </View>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:'#0C1C41',
  },
  data: {
    fontSize: hp('5.5%'),
    fontWeight: "bold",
    paddingLeft: 15,  
    paddingRight: 15,  
  },
  mainBox:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  box:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 15,
    height: hp('14%'),
    width: wp('40%'),
    margin: 5,
    justifyContent: "center"
  },
  boxLarger: {
    justifyContent: "center",
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 15,
    height: hp('14%'),
    width: wp('82%'),
    margin: 5,
  },
  background: {
    borderRadius: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: hp('14%'),
    width: wp('40%'),
  },
  backgroundLarger: {
    borderRadius: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: hp('14%'),
    width: wp('82%'),
  },
  titlebox:{
    margin: 15 ,
    marginLeft: 35, 
    textAlign: "left",
    fontSize: 28,
    color:"#fff",
    fontWeight: 'bold'
  },
});