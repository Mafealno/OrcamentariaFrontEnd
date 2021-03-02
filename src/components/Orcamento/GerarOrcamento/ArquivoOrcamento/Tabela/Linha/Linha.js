import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer';

function Linha(props) {

    const styles = StyleSheet.create({
        linha: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'row',
            borderBottom: 1,
            borderStyle: 'solid',
        }
    });

    return (
        <View style={styles.linha}>
            {props.children}
        </View>
    )
}

export default Linha
