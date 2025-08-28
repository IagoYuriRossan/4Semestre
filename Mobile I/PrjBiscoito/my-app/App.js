import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textofrase: "",
      img: require("./assets/biscoitoFechado.png"),
    };

    // Bind para manter o "this"
    this.quebraBiscoito = this.quebraBiscoito.bind(this);
    this.novoBiscoito = this.novoBiscoito.bind(this);

    // frases vira propriedade da classe
    this.frases = [
      "A vida trará coisas boas se tiver paciência.",
      "Seja a mudança que você deseja ver no mundo.",
      "O sucesso está no detalhe.",
      "Grandes conquistas exigem grandes esforços.",
      "Sorte é o que acontece quando a preparação encontra a oportunidade.",
      "O melhor está por vir.",
      "A persistência realiza o impossível.",
    ];
  }

  quebraBiscoito() {
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length);
    this.setState({
      textofrase: '"' + this.frases[numeroAleatorio] + '"',
      img: require("./assets/biscoitoAberto.png"),
    });
  }

  novoBiscoito() {
    this.setState({
      textofrase: "",
      img: require("./assets/biscoitoFechado.png"),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.img} style={styles.img} />

        {this.state.textofrase !== "" && (
          <Text style={styles.textoFrase}>{this.state.textofrase}</Text>
        )}

        <TouchableOpacity style={styles.botao} onPress={this.quebraBiscoito}>
          <view style={styles.btnArea}>
            <Text style={styles.btnTexto}>Quebrar Biscoito</Text>
          </view>
          
        </TouchableOpacity>

        {this.state.textofrase !== "" && (
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: "#888" }]}
            onPress={this.novoBiscoito}
          >
            <Text style={styles.btnTexto}>Novo Biscoito</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    padding: 20,
  },
  img: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textoFrase: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    color: "#333",
  },
  botao: {
    backgroundColor: "#F57C00",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    cursor: "pointer", // só afeta no web
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
