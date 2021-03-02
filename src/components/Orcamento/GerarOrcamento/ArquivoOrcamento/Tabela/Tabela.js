import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    tabela: {
        display: 'flex',
        flexDirection: 'column',
        border: 1,
        borderStyle: 'solid',
        width: '100%',
    }
});

function Tabela(props) {
    return (
        <View style={[styles.tabela, props.estilo]}>
            {props.children}                    
        </View>
    )
}

export default Tabela
