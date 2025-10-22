import { SafeAreaView, Text, View, StyleSheet } from "react-native"
 
export default function App() {
  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Header App</Text>
      </View>
    )
  }
 
  const Boxes = () => {
    return (
      <View style={styles.boxContainer}>
        {[1, 2, 3, 4].map((box) => (
          <View key={box} style={styles.box}>
            <Text style={styles.inner}>Box {box}</Text>
          </View>
        ))}
      </View>
    )
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Boxes />
    </SafeAreaView>
  )
 
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: "15%",
    backgroundColor: '#8c8c8c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    width: '100%',
    height: "85%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  box: {
    width: '50%',
    height: '50%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inner: {
    flex: 1,
    backgroundColor: '#8c8c8c',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
 