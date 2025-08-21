import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, ScrollView} from 'react-native';
import imagem1 from './assets/pcgamer.png';
import imagem2 from './assets/pcgamer2.png';

class App extends Component{
  render(){
    const pcs = [
      {
        nome: 'PC Gamer High End',
        desc: 'PC para jogar jogos pesados com desempenho altíssimo. Ideal para quem busca o máximo em performance e gráficos.',
        imagem: imagem1
      },
      {
        nome: 'PC Gamer Intermediário',
        desc: 'Ótimo custo-benefício para jogos populares e produtividade. Perfeito para quem quer jogar bem sem gastar muito.',
        imagem: imagem2
      }
    ];

    return(
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Bem-vindo à Loja de PCs Gamers</Text>
        <Text style={styles.subtitulo}>Confira nossas melhores opções para você:</Text>
        {pcs.map((pc, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.nome}>{pc.nome}</Text>
            <Image source={pc.imagem} style={styles.imagem} />
            <Text style={styles.desc}>{pc.desc}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#E3F2FD',
    flex: 1
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D47A1',
    textAlign: 'center',
    letterSpacing: 1
  },
  subtitulo: {
    fontSize: 20,
    marginBottom: 24,
    color: '#1976D2',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4
  },
  nome: {
    fontSize: 24,
    color: '#1565C0',
    fontWeight: 'bold',
    marginBottom: 14,
    letterSpacing: 0.5,
    textShadowColor: '#BBDEFB',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  imagem: {
    width: 210,
    height: 210,
    marginBottom: 14,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#90CAF9',
    resizeMode: 'cover'
  },
  desc: {
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22
  }
});

