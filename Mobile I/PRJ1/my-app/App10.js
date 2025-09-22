import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      sexo: 'Masculino',
      limite: 750,
      casado: false,
    };
  }
 
abrirConta = () => {
  const mensagem =
    `Nome: ${this.state.nome}\nValor Limite: ${this.state.limite.toFixed(3)}\nSexo: ${this.state.sexo}\nEstado Civil: ${this.state.casado ? 'Casado' : 'Solteiro'}`;
  if (typeof window !== 'undefined') {
    window.alert('Conta Criada com Sucesso:\n' + mensagem);
  } else {
    Alert.alert('Conta Criada com Sucesso:', mensagem);
  }
};
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Informe seu nome"
          value={this.state.nome}
          onChangeText={nome => this.setState({ nome })}
        />
        <Text style={styles.label}>Informe seu Sexo:</Text>
        <Picker
          selectedValue={this.state.sexo}
          style={styles.picker}
          onValueChange={sexo => this.setState({ sexo })}
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
        </Picker>
        <Text style={styles.label}>Escolha seu Limite:</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={1500}
          step={1}
          minimumTrackTintColor="#2ecc71"
          maximumTrackTintColor="#2980b9"
          value={this.state.limite}
          onValueChange={limite => this.setState({ limite })}
        />
        <Text style={styles.limite}>{this.state.limite.toFixed(2)} R$</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>{this.state.casado ? 'Casado' : 'Solteiro'}</Text>
          <Switch
            value={this.state.casado}
            onValueChange={casado => this.setState({ casado })}
            thumbColor={this.state.casado ? '#2ecc71' : '#e74c3c'}
            trackColor={{ false: '#e74c3c', true: '#2ecc71' }}
          />
        </View>
        <Button
          title="ABRIR CONTA"
          color="#2980b9"
          onPress={this.abrirConta}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 15,
  },
  limite: {
    fontSize: 18,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
});