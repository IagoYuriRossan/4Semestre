import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Texto from "../../../../components/Texto";

import Topo from "./Topo";
import Detalhes from "./Detalhes";
import Item from "./Item";
// Additional components and styles can be added below


export default function Cesta({ topo, detalhes, itens }) {
	return (
		<FlatList /* O flatlist serve para renderizar e fazer a rolar itens grandes em tela, como objetos vindos de APIs. */
        /* pode ser usado também o <ScrollView> para colocar scroll na tela */
			data={itens.lista}
			renderItem={Item}
			keyExtractor={({ nome }) => nome}
			ListHeaderComponent={() => (
				<>
					<Topo {...topo} />
					<View style={estilos.cesta}>
						<Detalhes {...detalhes} />
					</View>
				</>
			)}
		/>
	);
}

const estilos = StyleSheet.create({
	titulo: {
        colo:  '#464646',
        fontWeight: 'bold',
        marginTop: 32,
        marginBottom: 8,
        fontSize: 20,
        lineHeight  : 32,
    },
    cesta: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
});

