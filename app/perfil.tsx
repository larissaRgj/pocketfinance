import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDadosFinanceiros } from './dados';

export default function Perfil() {
  const router = useRouter();
  const { usuario, saldoInicial, definirSaldoInicial, atualizarPerfil, fazerLogout } = useDadosFinanceiros();

  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [novoSaldo, setNovoSaldo] = useState(String(saldoInicial || 0));

  const handleSalvarPerfil = () => {
    atualizarPerfil(nome, email);
    const saldoNum = parseFloat(novoSaldo.replace(',', '.')) || 0;
    definirSaldoInicial(saldoNum);
    Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Meu Perfil ⚙️</Text>
          <View style={{ width: 40 }} />
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput 
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
          placeholderTextColor="#52525b"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          placeholderTextColor="#52525b"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Saldo Inicial da Conta (R$)</Text>
        <TextInput 
          style={styles.input}
          value={novoSaldo}
          onChangeText={setNovoSaldo}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#52525b"
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvarPerfil}>
          <Text style={styles.botaoSalvarTexto}>Atualizar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLogout} onPress={fazerLogout}>
          <Ionicons name="log-out-outline" size={18} color="#f43f5e" style={{ marginRight: 8 }} />
          <Text style={styles.botaoLogoutTexto}>Encerrar Sessão</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  scroll: { padding: 20, paddingBottom: 40, maxWidth: 480, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#18181b', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#27272a' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  
  label: { color: '#a1a1aa', fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#18181b', color: '#fff', padding: 14, borderRadius: 12, fontSize: 15, marginBottom: 16, borderWidth: 1, borderColor: '#27272a' },
  
  botaoSalvar: { backgroundColor: '#10b981', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  botaoSalvarTexto: { color: '#fff', fontSize: 15, fontWeight: 'bold' },

  botaoLogout: { backgroundColor: 'rgba(244, 63, 94, 0.1)', borderWidth: 1, borderColor: 'rgba(244, 63, 94, 0.3)', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 15, flexDirection: 'row', justifyContent: 'center' },
  botaoLogoutTexto: { color: '#f43f5e', fontSize: 15, fontWeight: 'bold' },
});