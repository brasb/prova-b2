import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import TelaLogin from './components/TelaLogin';

// or any files within the Snack
import AssetExample from './components/TelaLogin';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TelaLogin/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 8,
  },
});
