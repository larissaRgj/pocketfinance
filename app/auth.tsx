import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDadosFinanceiros } from './dados';

export default function AuthScreen() {
  const { fazerLogin, definirSaldoInicial } = useDadosFinanceiros();
  const [isRegistro, setIsRegistro] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');

  const handleSubmit = () => {
    if (!email || !senha || (isRegistro && !nome)) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (isRegistro) {
      const saldoNum = parseFloat(saldoInicial.replace(',', '.')) || 0;
      definirSaldoInicial(saldoNum);
      fazerLogin(nome, email);
    } else {
      const nomeExtraido = email.split('@')[0];
      const nomeFormatado = nomeExtraido.charAt(0).toUpperCase() + nomeExtraido.slice(1);
      fazerLogin(nomeFormatado, email);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoContainer}>
          <View style={styles.iconBox}>
            <Ionicons name="wallet" size={36} color="#10b981" />
          </View>
          <Text style={styles.appName}>PocketFinance</Text>
          <Text style={styles.tagline}>Sua liberdade financeira na palma da mão</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, !isRegistro && styles.tabActive]} 
            onPress={() => setIsRegistro(false)}
          >
            <Text style={[styles.tabText, !isRegistro && styles.tabTextActive]}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, isRegistro && styles.tabActive]} 
            onPress={() => setIsRegistro(true)}
          >
            <Text style={[styles.tabText, isRegistro && styles.tabTextActive]}>Criar Conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {isRegistro && (
            <>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput 
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#52525b"
                value={nome}
                onChangeText={setNome}
              />
            </>
          )}

          <Text style={styles.label}>E-mail</Text>
          <TextInput 
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#52525b"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput 
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#52525b"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          {isRegistro && (
            <>
              <Text style={styles.label}>Saldo Inicial em Caixa (R$)</Text>
              <TextInput 
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor="#52525b"
                keyboardType="numeric"
                value={saldoInicial}
                onChangeText={setSaldoInicial}
              />
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{isRegistro ? 'Concluir Cadastro' : 'Acessar Conta'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24, maxWidth: 420, width: '100%', alignSelf: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  iconBox: { width: 70, height: 70, borderRadius: 20, backgroundColor: 'rgba(16, 185, 129, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' },
  appName: { fontSize: 26, fontWeight: 'bold', color: '#fff', letterSpacing: 0.5 },
  tagline: { fontSize: 13, color: '#a1a1aa', marginTop: 4 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#18181b', borderRadius: 12, padding: 4, marginBottom: 24, borderWidth: 1, borderColor: '#27272a' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#27272a' },
  tabText: { color: '#a1a1aa', fontWeight: '600', fontSize: 14 },
  tabTextActive: { color: '#fff' },
  form: { width: '100%' },
  label: { color: '#a1a1aa', fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#18181b', color: '#fff', padding: 14, borderRadius: 12, fontSize: 15, marginBottom: 16, borderWidth: 1, borderColor: '#27272a' },
  button: { backgroundColor: '#10b981', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});