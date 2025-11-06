import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CadastroScreen = () => {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const handleCadastro = async () => {
		try {
			const response = await axios.post('http://192.168.56.1:3000/api/cadastro', {
				nome,
				email,
				senha,
			});
			console.log(response.data);
            setEmail('');   
            setSenha('');
            setNome('');
		} catch (error) {
				console.error('Erro ao enviar dados:', error);
			}
		};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Cadastro de</Text>
			<TextInput
				placeholder="Nome"
				value={nome}
				onChangeText={setNome}
				style={styles.input}
			/>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
				style={styles.input}
			/>
			<TextInput
				placeholder="Senha"
				value={senha}
				onChangeText={setSenha}
				secureTextEntry
				style={styles.input}
			/>
			<Button title="Cadastrar" onPress={handleCadastro} color="#6200ee"/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
        justifyContent: 'center',
		padding: 20,
		backgroundColor: '#f9f9f9',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 20,
        textAlign: 'center',
        color: '#333',
	},
	input: {
		height: 40,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 16,
        backgroundColor: '#ffffff',
	},
});

export default CadastroScreen;