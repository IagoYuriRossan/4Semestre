import React from 'react';
import { StyleSheet, Image, View, Dimensions, FlatList } from 'react-native';

import Texto from '../../../../../my-app/components/Texto';

export default function Item({ item: { nome, imagem } }) {
    return (
        <View style={estilos.item}>
            <Image source={imagem} style={estilos.imagem} />
            <Texto style={estilos.nome}>{nome}</Texto>
        </View>
    );
}

const estilos = StyleSheet.create({
    item: {
        flexDirection: 'row',  //define o layout dos itens um ao lado do outro
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        paddingVertical: 16,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imagem: {
        width: 46,
        height: 46,
    },
    nome: {
        fontSize: 16,
        lineHeight: 26,
        color: '#464646',
        marginLeft: 11,
    },
});
