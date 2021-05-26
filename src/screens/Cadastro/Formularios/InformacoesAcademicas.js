import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';

import colors from '../../../styles/colors/index';

import { Modalize } from 'react-native-modalize';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ImagePicker from '../../../components/ImagePicker';
import Button from '../../../components/Button';
import SelectWithBorder from '../../../components/Select/SelectWithBorder';
import FilePicker from '../../../components/FilePicker';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class InformacoesAcademicas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nivelDeEscolaridade: '',
      instituicao: '',
      curso: '',
      inicio: '',
      termino: '',
      doc: '',
      // modalVisible: false,
      diplomas: [],
    };

    this.handleNivelDeEscolaridadeChange = this.handleNivelDeEscolaridadeChange.bind(this);
    this.handleInstituicaoChange = this.handleInstituicaoChange.bind(this);
    this.handleCursoChange = this.handleCursoChange.bind(this);
    this.handleInicioChange = this.handleInicioChange.bind(this);
    this.handleTerminoChange = this.handleTerminoChange.bind(this);
    this.handleDocChange = this.handleDocChange.bind(this);
  }

  handleNivelDeEscolaridadeChange = (nivelDeEscolaridade) => this.setState({ nivelDeEscolaridade });
  handleInstituicaoChange = (instituicao) => this.setState({ instituicao });
  handleCursoChange = (curso) => this.setState({ curso });
  handleInicioChange = (inicio) => this.setState({ inicio });
  handleTerminoChange = (termino) => this.setState({ termino });
  handleDocChange = (doc) => this.setState({ doc });

  // setModalVisible = (visible) => {
  //   this.setState({ modalVisible: visible });
  // }

  nextStep = () => {
    const { next, saveState } = this.props;
    saveState(this.state);

    next();
  };

  goBack = () => {
    const { back } = this.props;

    back();
  }

  // addCurso = () => {
  //   const key = {
  //     nivelDeEscolaridade: this.state.nivelDeEscolaridade,
  //     instituicao: this.state.instituicao,
  //     curso: this.state.curso,
  //     inicio: this.state.inicio,
  //     termino: this.state.termino,
  //     docs: this.state.docs
  //   }

  //   this.setState({ diplomas: [...this.state.diplomas, key] })
  // }

  // console = () => {
  //   console.log("------------------------------------------------------")
  //   console.log(this.state.diplomas)
  // }

  render() {
    // const { modalVisible } = this.state;
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Header titulo='Informações Acadêmicas' funcao={this.goBack} />

            <ImagePicker permitirAdd={false} />

            {/* <Button titulo='Adcionar Curso' funcao={() => this.setModalVisible(true)} /> */}

            {/* <Modal
              visible={modalVisible}
            > */}

            <View>
              <SelectWithBorder
                labelText={'Selecione o nível de escolaridade...'}
                valor={this.state.nivelDeEscolaridade}
                valorMudado={this.handleNivelDeEscolaridadeChange}
                valoresDoSelect={[
                  { label: 'Ensino Fundamental Incompleto', value: 'ensinoFundamentalIncompleto' },
                  { label: 'Ensino Fundamental Completo', value: 'ensinoFundamentalCompleto' },
                  { label: 'Ensino Médio Incompleto', value: 'ensinoMedioIncompleto' },
                  { label: 'Ensino Médio Completo', value: 'ensinoMedioCompleto' },
                  { label: 'Ensino Superior Incompleto', value: 'ensinoSuperiorIncompleto' },
                  { label: 'Ensino Superior Completo', value: 'ensinoSuperiorCompleto' },
                ]}
              />

              <Input
                labelText='Instituição'
                onChangeText={this.handleInstituicaoChange}
                value={this.state.instituicao}
              />

              <Input
                labelText='Curso'
                onChangeText={this.handleCursoChange}
                value={this.state.curso}
              />

              <View style={styles.containerDoisInputs}>
                <Input
                  withi={wp('38%')}
                  labelText='Início'
                  onChangeText={this.handleInicioChange}
                  value={this.state.inicio}
                />
                <Input
                  withi={wp('38%')}
                  labelText='Término'
                  onChangeText={this.handleTerminoChange}
                  value={this.state.termino}
                />
              </View>

              {/* <Button titulo='VOLTAR' funcao={() => this.setModalVisible(false)} />
              <Button titulo='ADD CURSO' funcao={() => this.addCurso()} />
              <Button titulo='CONSOLE' funcao={() => this.console()} /> */}
            </View>

            <FilePicker
              onChangeDoc={this.handleDocChange}
              value={this.state.doc}
            />
            {/* </Modal> */}


            {/* TODO - adicionar cursos -> gerar novo form */}

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
});
