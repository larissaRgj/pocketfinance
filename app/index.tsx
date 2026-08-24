import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDadosFinanceiros } from './dados';

export default function Login() {
  const router = useRouter();
  const { fazerLogin, definirSaldoInicial } = useDadosFinanceiros();
  const [isRegistro, setIsRegistro] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');

  const handleSubmit = () => {
    if (!email || !senha || (isRegistro && !nome)) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios para prosseguir.');
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

    router.replace('/painel');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerSection}>
          <View style={styles.logoBadge}>
            <Ionicons name="shield-checkmark" size={28} color="#4f46e5" />
          </View>
          <Text style={styles.appName}>PocketFinance</Text>
          <Text style={styles.tagline}>Inteligência e controle financeiro corporativo</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.switcher}>
            <TouchableOpacity 
              style={[styles.switchTab, !isRegistro && styles.switchTabActive]} 
              onPress={() => setIsRegistro(false)}
            >
              <Text style={[styles.switchText, !isRegistro && styles.switchTextActive]}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.switchTab, isRegistro && styles.switchTabActive]} 
              onPress={() => setIsRegistro(true)}
            >
              <Text style={[styles.switchText, isRegistro && styles.switchTextActive]}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          {isRegistro && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput 
                style={styles.input}
                placeholder="Ex: Carlos Eduardo"
                placeholderTextColor="#94a3b8"
                value={nome}
                onChangeText={setNome}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail Corporativo ou Pessoal</Text>
            <TextInput 
              style={styles.input}
              placeholder="seu.email@dominio.com"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha de Acesso</Text>
            <TextInput 
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          {isRegistro && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Patrimônio / Saldo Inicial (R$)</Text>
              <TextInput 
                style={styles.input}
                placeholder="0,00"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={saldoInicial}
                onChangeText={setSaldoInicial}
              />
            </View>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{isRegistro ? 'Finalizar Cadastro' : 'Acessar Painel'}</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24, maxWidth: 440, width: '100%', alignSelf: 'center' },
  headerSection: { alignItems: 'center', marginBottom: 32 },
  logoBadge: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#bfdbfe' },
  appName: { fontSize: 28, fontWeight: '800', color: '#0f172a', letterSpacing: -0.5 },
  tagline: { fontSize: 13, color: '#64748b', marginTop: 6, textAlign: 'center' },
  cardContainer: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 3 },
  switcher: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 12, padding: 4, marginBottom: 24 },
  switchTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 9 },
  switchTabActive: { backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  switchText: { color: '#64748b', fontWeight: '600', fontSize: 13 },
  switchTextActive: { color: '#0f172a', fontWeight: 'bold' },
  inputGroup: { marginBottom: 16 },
  label: { color: '#334155', fontSize: 12, marginBottom: 6, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { backgroundColor: '#f8fafc', color: '#0f172a', paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12, fontSize: 15, borderWidth: 1, borderColor: '#cbd5e1' },
  submitButton: { backgroundColor: '#4f46e5', paddingVertical: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});