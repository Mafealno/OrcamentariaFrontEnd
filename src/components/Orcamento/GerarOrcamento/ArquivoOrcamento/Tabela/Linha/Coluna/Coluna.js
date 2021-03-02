/* eslint-disable eqeqeq */
import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer';

function Coluna(props) {

    const styles = StyleSheet.create({
        coluna: {
            borderLeft: 1,
            borderStyle: 'solid',
            maxWidth: 395,
            paddingLeft: 5,
            paddingRight: 5,
      },
      centralizar_texto:{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
      },
      fonte: {
          fontSize: 11,
      }
    });
  
    return (
        <View style={[styles.coluna, styles.centralizar_texto, props.estilo]}>
            <Text style={[styles.fonte, props.estiloFonte]}>{props.children}</Text>
        </View>
    )
}

export default Coluna
