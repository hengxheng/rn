import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, FAB, List } from 'react-native-paper';
import Header from '../../components/Header';

function ListRecipe({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = recipe => {
    recipe.id = recipes.length + 1;
    setRecipes([...recipes, recipe]);
  }

  return (
    <>
      <Header titleText='Recipe' />
      <View style={styles.container}>
        {recipes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any recipe</Text>
          </View>
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <List.Item
                title={item.title}
                description={item.content}
                descriptionNumberOfLines={1}
                titleStyle={styles.listTitle}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
        <FAB
          style={styles.fab}
          small
          icon='plus'
          label='Add new recipe'
          onPress={() => navigation.navigate('AddRecipe', { addRecipe }) }
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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  }
})

export default ListRecipe