import logo from '../assets/logo.png';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

import tomate from '../assets/frutas/tomate.jpg';
import brocolis from '../assets/frutas/brocolis.jpg';
import batata from '../assets/frutas/batata.jpg';
import pepino from '../assets/frutas/pepino.jpg';
import abobora from '../assets/frutas/abobora.jpg';

const cesta = {
    topo: {
        titulo: "Detalhe da cesta",
    },
    detalhes: {
        nome: "Cesta de Verduras",
        logoFazendo: logo,
        nomeFazenda: "Jenny Jack Farm",
        descricao: "Uma cesta com produtos selecionados cuidadosamente da fazenda direto para sua cozinha.",
        preco: "R$ 40,00",
        botao: "Comprar",
    },
    itens: {
        titulo: "Itens da cesta",
        lista: [
            {
                nome: "Tomate",
                imagem: tomate,
            },
            {
                nome: "Brocolis",
                imagem: brocolis,
            },
            {
                nome: "Batata",
                imagem: batata,
            },
            {
                nome: "Pepino",
                imagem: pepino,
            },
            {
                nome: "Abobora",
                imagem: abobora,
            },
        ]
    }
}

export default cesta;

