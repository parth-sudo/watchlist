import React from 'react'
import {View, StyleSheet, Text} from 'react-native';

function ShowDetailScreen({}) {
  return (
    <View style={styles.container}>
        <Text> Show Detail. </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    }
})

export default ShowDetailScreen

