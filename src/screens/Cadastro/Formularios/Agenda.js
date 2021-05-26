import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import colors from '../../../styles/colors/index';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';
import CheckBox from '../../../components/CheckBox';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Agencia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agendaSegunda: false,
      inicioSegunda: '',
      finalSegunda: '',

      agendaTerca: false,
      inicioTerca: '',
      finalTerca: '',

      agendaQuarta: false,
      inicioQuarta: '',
      finalQuarta: '',

      agendaQuinta: false,
      inicioQuinta: '',
      finalQuinta: '',

      agendaSexta: false,
      inicioSexta: '',
      finalSexta: '',

      agendaSabado: false,
      inicioSabado: '',
      finalSabado: '',

      agendaDomingo: false,
      inicioDomingo: '',
      finalDomingo: '',
    };

    this.handleAgendaSegundaChange = this.handleAgendaSegundaChange.bind(this);
    this.handleInicioSegundaChange = this.handleInicioSegundaChange.bind(this);
    this.handleFinalSegundaChange = this.handleFinalSegundaChange.bind(this);

    this.handleAgendaTercaChange = this.handleAgendaTercaChange.bind(this);
    this.handleInicioTercaChange = this.handleInicioTercaChange.bind(this);
    this.handleFinalTercaChange = this.handleFinalTercaChange.bind(this);

    this.handleAgendaQuartaChange = this.handleAgendaQuartaChange.bind(this);
    this.handleInicioQuartaChange = this.handleInicioQuartaChange.bind(this);
    this.handleFinalQuartaChange = this.handleFinalQuartaChange.bind(this);

    this.handleAgendaQuintaChange = this.handleAgendaQuintaChange.bind(this);
    this.handleInicioQuintaChange = this.handleInicioQuintaChange.bind(this);
    this.handleFinalQuintaChange = this.handleFinalQuintaChange.bind(this);

    this.handleAgendaSextaChange = this.handleAgendaSextaChange.bind(this);
    this.handleInicioSextaChange = this.handleInicioSextaChange.bind(this);
    this.handleFinalSextaChange = this.handleFinalSextaChange.bind(this);

    this.handleAgendaSabadoChange = this.handleAgendaSabadoChange.bind(this);
    this.handleInicioSabadoChange = this.handleInicioSabadoChange.bind(this);
    this.handleFinalSabadoChange = this.handleFinalSabadoChange.bind(this);

    this.handleAgendaDomingoChange = this.handleAgendaDomingoChange.bind(this);
    this.handleInicioDomingoChange = this.handleInicioDomingoChange.bind(this);
    this.handleFinalDomingoChange = this.handleFinalDomingoChange.bind(this);
  }

  handleAgendaSegundaChange = (agendaSegunda) => this.setState({ agendaSegunda });
  handleInicioSegundaChange = (inicioSegunda) => this.setState({ inicioSegunda });
  handleFinalSegundaChange = (finalSegunda) => this.setState({ finalSegunda });

  handleAgendaTercaChange = (agendaTerca) => this.setState({ agendaTerca });
  handleInicioTercaChange = (inicioTerca) => this.setState({ inicioTerca });
  handleFinalTercaChange = (finalTerca) => this.setState({ finalTerca });

  handleAgendaQuartaChange = (agendaQuarta) => this.setState({ agendaQuarta });
  handleInicioQuartaChange = (inicioQuarta) => this.setState({ inicioQuarta });
  handleFinalQuartaChange = (finalQuarta) => this.setState({ finalQuarta });

  handleAgendaQuintaChange = (agendaQuinta) => this.setState({ agendaQuinta });
  handleInicioQuintaChange = (inicioQuinta) => this.setState({ inicioQuinta });
  handleFinalQuintaChange = (finalQuinta) => this.setState({ finalQuinta });

  handleAgendaSextaChange = (agendaSexta) => this.setState({ agendaSexta });
  handleInicioSextaChange = (inicioSexta) => this.setState({ inicioSexta });
  handleFinalSextaChange = (finalSexta) => this.setState({ finalSexta });

  handleAgendaSabadoChange = (agendaSabado) => this.setState({ agendaSabado });
  handleInicioSabadoChange = (inicioSabado) => this.setState({ inicioSabado });
  handleFinalSabadoChange = (finalSabado) => this.setState({ finalSabado });

  handleAgendaDomingoChange = (agendaDomingo) => this.setState({ agendaDomingo });
  handleInicioDomingoChange = (inicioDomingo) => this.setState({ inicioDomingo });
  handleFinalDomingoChange = (finalDomingo) => this.setState({ finalDomingo });

  nextStep = () => {
    const { next, saveState } = this.props;
    saveState(this.state);

    next();
  };

  goBack = () => {
    const { back } = this.props;

    back();
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Header titulo='Cadastrar Agenda' funcao={this.goBack} />

            <ImagePicker permitirAdd={false} />

            <View style={styles.tabela}>
              <View style={styles.linhas}>
                <CheckBox
                  label="Segunda"
                  labelStyle={{ color: colors.branco, fontSize: 16 }}
                  value={this.state.agendaSegunda}
                  onChange={this.handleAgendaSegundaChange}
                  bordaBottom={1}
                  largura={wp('50%')}
                />

                <Input
                  withi={70}
                  labelText='Início'
                  onChangeText={this.handleInicioSegundaChange}
                  value={this.state.inicioSegunda}
                />

                <Input
                  withi={70}
                  labelText='Final'
                  onChangeText={this.handleFinalSegundaChange}
                  value={this.state.finalSegunda}
                />
              </View>

              <View style={styles.linhas}>
                <CheckBox
                  label="Terça"
                  labelStyle={{ color: colors.branco, fontSize: 16 }}
                  value={this.state.agendaTerca}
                  onChange={this.handleAgendaTercaChange}
                  bordaBottom={1}
                  largura={wp('50%')}
                />

                <Input
                  withi={70}
                  labelText='Início'
                  onChangeText={this.handleInicioTercaChange}
                  value={this.state.inicioTerca}
                />

                <Input
                  withi={70}
                  labelText='Final'
                  onChangeText={this.handleFinalTercaChange}
                  value={this.state.finalTerca}
                />
              </View>

              <View style={styles.linhas}>
                <CheckBox
                  label="Quarta"
                  labelStyle={{ color: colors.branco, fontSize: 16 }}
                  value={this.state.agendaQuarta}
                  onChange={this.handleAgendaQuartaChange}
                  bordaBottom={1}
                  largura={wp('50%')}
                />

                <Input
                  withi={70}
                  labelText='Início'
                  onChangeText={this.handleInicioQuartaChange}
                  value={this.state.inicioQuarta}
                />

                <Input
                  withi={70}
                  labelText='Final'
                  onChangeText={this.handleFinalQuartaChange}
                  value={this.state.finalQuarta}
                />
              </View>

              <View style={styles.linhas}>
                <CheckBox
                  label="Quinta"
                  labelStyle={{ color: colors.branco, fontSize: 16 }}
                  value={this.state.agendaQuinta}
                  onChange={this.handleAgendaQuintaChange}
                  bordaBottom={1}
                  largura={wp('50%')}
                />

                <Input
                  withi={70}
                  labelText='Início'
                  onChangeText={this.handleInicioQuintaChange}
                  value={this.state.inicioQuinta}
                />

                <Input
                  withi={70}
                  labelText='Final'
                  onChangeText={this.handleFinalQuintaChange}
                  value={this.state.finalQuinta}
                />
              </View>

              <View style={styles.linhas}>
                <CheckBox
                  label="Sexta"
                  labelStyle={{ color: colors.branco, fontSize: 16 }}
                  value={this.state.agendaSexta}
                  onChange={this.handleAgendaSextaChange}
                  bordaBottom={1}
                  largura={wp('50%')}
                />

                <Input
                  withi={70}
                  labelText='Início'
                  onChangeText={this.handleInicioSextaChange}
                  value={this.state.inicioSexta}
                />

                <Input
                  withi={70}
                  labelText='Final'
                  onChangeText={this.handleFinalSextaChange}
                  value={this.state.finalSexta}
                />
              </View>

              <View style={styles.linhas}>
                <CheckBox
                  label="Sábado"
                  labelStyle={{ color: colors.branco, fontSize: 16 }}
                  value={this.state.agendaSabado}
                  onChange={this.handleAgendaSabadoChange}
                  bordaBottom={1}
                  largura={wp('50%')}
                />

                <Input
                  withi={70}
                  labelText='Início'
                  onChangeText={this.handleInicioSabadoChange}
                  value={this.state.inicioSabado}
                />

                <Input
                  withi={70}
                  labelText='Final'
                  onChangeText={this.handleFinalSabadoChange}
                  value={this.state.finalSabado}
                />
              </View>

              <View style={styles.linhas}>
                <CheckBox
                  label="Domingo"
                  labelStyle={{ color: colors.branco, fontSize: 16 }}
                  value={this.state.agendaDomingo}
                  onChange={this.handleAgendaDomingoChange}
                  bordaBottom={1}
                  largura={wp('50%')}
                />

                <Input
                  withi={70}
                  labelText='Início'
                  onChangeText={this.handleInicioDomingoChange}
                  value={this.state.inicioDomingo}
                />

                <Input
                  withi={70}
                  labelText='Final'
                  onChangeText={this.handleFinalDomingoChange}
                  value={this.state.finalDomingo}
                />
              </View>
            </View>

            <Button titulo='CONTINUAR' funcao={this.nextStep} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.azulEscuro,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  containerDoisInputs: {
    flexDirection: 'row',
    width: wp('79.71%'),
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  linhas: {
    flexDirection: 'row',
  },
  tabela: {
    alignItems: 'center'
  }
});
