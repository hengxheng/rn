import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, IconButton, TextInput, FAB } from 'react-native-paper';
import Header from '../../components/Header';

function AddRecipe({ navigation }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function onSaveRecipe() {
    navigation.state.params.addRecipe({ title, content })
    navigation.goBack()
  }

  return (
    <>
      <Header titleText='Add recipe' />
      <IconButton
        icon='close'
        size={25}
        color='white'
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <TextInput
          label='Add Title Here'
          value={title}
          mode='outlined'
          onChangeText={setTitle}
          style={styles.title}
        />
        <TextInput
          label='Add Desciption Here'
          value={content}
          onChangeText={setContent}
          mode='flat'
          multiline={true}
          style={styles.text}
          scrollEnabled={true}
          returnKeyType='done'
          blurOnSubmit={true}
        />
        <FAB
          style={styles.fab}
          small
          icon='check'
          disabled={title == '' ? true : false}
          onPress={() => onSaveRecipe()}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 5,
    margin: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  text: {
    height: 300,
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0
  }
})

export default AddRecipe
