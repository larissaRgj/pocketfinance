import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDadosFinanceiros } from './dados';

export default function Adicionar() {
  const router = useRouter();
  const { adicionarTransacao } = useDadosFinanceiros();

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('receita');
  const [categoria, setCategoria] = useState('Salário');
  const [dataInput, setDataInput] = useState('23/08/2026'); // Exemplo com o ano e mês atual

  const categoriasReceita = ['Salário', 'Freelance', 'Vendas', 'Investimentos', 'Outros'];
  const categoriasDespesa = ['Alimentação', 'Contas (Água/Luz)', 'Aluguel', 'Transporte', 'Lazer', 'Outros'];

  const categoriasAtivas = tipo === 'receita' ? categoriasReceita : categoriasDespesa;

  const handleSalvar = () => {
    if (!descricao || !valor) {
      Alert.alert('Erro', 'Preencha a descrição e o valor.');
      return;
    }

    const valorNum = parseFloat(valor.replace(',', '.')) || 0;
    if (valorNum <= 0) {
      Alert.alert('Erro', 'Insira um valor válido maior que zero.');
      return;
    }

    adicionarTransacao({
      descricao,
      valor: valorNum,
      tipo,
      categoria,
      data: dataInput || '23/08/2026',
    });

    Alert.alert('Sucesso', 'Movimentação cadastrada com sucesso!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.title}>Cadastro de Receitas / Despesas</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Escolha do Tipo */}
        <View style={styles.tipoContainer}>
          <TouchableOpacity 
            style={[styles.tipoBtn, tipo === 'receita' && styles.receitaAtiva]}
            onPress={() => { setTipo('receita'); setCategoria('Salário'); }}
          >
            <Ionicons name="arrow-down-outline" size={16} color={tipo === 'receita' ? '#fff' : '#16a34a'} style={{ marginRight: 6 }} />
            <Text style={[styles.tipoTexto, tipo === 'receita' && { color: '#fff' }]}>Receita</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tipoBtn, tipo === 'despesa' && styles.despesaAtiva]}
            onPress={() => { setTipo('despesa'); setCategoria('Alimentação'); }}
          >
            <Ionicons name="arrow-up-outline" size={16} color={tipo === 'despesa' ? '#fff' : '#dc2626'} style={{ marginRight: 6 }} />
            <Text style={[styles.tipoTexto, tipo === 'despesa' && { color: '#fff' }]}>Despesa</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Descrição</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: Salário mensal, Supermercado..."
          placeholderTextColor="#94a3b8"
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput 
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
        <TextInput 
          style={styles.input}
          placeholder="23/08/2026"
          placeholderTextColor="#94a3b8"
          value={dataInput}
          onChangeText={setDataInput}
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoriasGrid}>
          {categoriasAtivas.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catChip, categoria === cat && styles.catChipActive]}
              onPress={() => setCategoria(cat)}
            >
              <Text style={[styles.catText, categoria === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
          <Text style={styles.botaoSalvarTexto}>Salvar Movimentação</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 20, maxWidth: 480, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },

  tipoContainer: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 12, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  tipoBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  receitaAtiva: { backgroundColor: '#16a34a' },
  despesaAtiva: { backgroundColor: '#dc2626' },
  tipoTexto: { color: '#64748b', fontWeight: 'bold', fontSize: 14 },

  label: { color: '#64748b', fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#ffffff', color: '#0f172a', padding: 14, borderRadius: 12, fontSize: 15, marginBottom: 16, borderWidth: 1, borderColor: '#e2e8f0' },

  categoriasGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  catChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0' },
  catChipActive: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  catText: { color: '#64748b', fontSize: 13, fontWeight: '500' },
  catTextActive: { color: '#fff', fontWeight: 'bold' },

  botaoSalvar: { backgroundColor: '#4f46e5', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8 },
  botaoSalvarTexto: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});