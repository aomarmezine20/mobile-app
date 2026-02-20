import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';

type Product = { id: string; name: string; price?: string };

export default function App() {
  const [baseUrl, setBaseUrl] = useState('http://192.168.11.183:3000');
  const [route, setRoute] = useState<'login' | 'home'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const tryLogin = async () => {
    setMessage('Logging in...');
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const txt = await res.text();
        setMessage(`Login failed: ${res.status} ${txt}`);
        return;
      }
      const data = await res.json();
      setToken(data.access_token || data.token || null);
      setMessage('Login successful');
      setRoute('home');
      fetchProducts(data.access_token || data.token || null);
    } catch (err: any) {
      setMessage(`Login error: ${err.message || String(err)}`);
    }
  };

  const fetchProducts = async (authToken?: string | null) => {
    setMessage('Loading products...');
    try {
      const headers: any = { Accept: 'application/json' };
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
      const res = await fetch(`${baseUrl}/products`, { headers });
      if (!res.ok) {
        const txt = await res.text();
        setMessage(`Products failed: ${res.status} ${txt}`);
        return;
      }
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
      setMessage('Products loaded');
    } catch (err: any) {
      setMessage(`Products error: ${err.message || String(err)}`);
    }
  };

  const continueAsGuest = () => {
    setRoute('home');
    fetchProducts(null);
  };

  if (route === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <Text style={styles.title}>Marketplace</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button title="Login" onPress={tryLogin} />
          <View style={{ height: 8 }} />
          <Button title="Continue as guest" onPress={continueAsGuest} />

          <Text style={styles.message}>{message}</Text>
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Home
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/icon.png')} style={styles.logoSmall} />
        <Text style={styles.title}>Marketplace</Text>
      </View>

      <View style={styles.contentList}>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.productName}>{item.name}</Text>
              {item.price ? <Text style={styles.productPrice}>{item.price}</Text> : null}
            </View>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No products to show</Text>}
        />
      </View>
      <View style={styles.footer}>
        <Button title="Reload products" onPress={() => fetchProducts(token)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, alignItems: 'stretch' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginVertical: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 12 },
  logoSmall: { width: 36, height: 36, marginRight: 8 },
  message: { marginTop: 12, color: '#666', textAlign: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  contentList: { flex: 1, paddingHorizontal: 12 },
  productItem: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  productName: { fontSize: 16, fontWeight: '600' },
  productPrice: { color: '#666' },
  footer: { padding: 12 },
});
