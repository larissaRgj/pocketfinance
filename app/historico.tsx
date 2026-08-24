import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDadosFinanceiros } from './dados';

export default function Historico() {
  const router = useRouter();
  const { transacoes, excluirTransacao } = useDadosFinanceiros();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Extrato Completo</Text>
          <View style={{ width: 40 }} />
        </View>

        {transacoes.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="document-text-outline" size={40} color="#52525b" />
            <Text style={styles.emptyText}>Nenhuma movimentação registrada.</Text>
          </View>
        ) : (
          transacoes.map((item) => (
            <View key={item.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <View style={[styles.iconType, { backgroundColor: item.tipo === 'receita' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)' }]}>
                  <Ionicons 
                    name={item.tipo === 'receita' ? 'arrow-down-outline' : 'arrow-up-outline'} 
                    size={16} 
                    color={item.tipo === 'receita' ? '#10b981' : '#f43f5e'} 
                  />
                </View>
                <View>
                  <Text style={styles.transactionDesc}>{item.descricao}</Text>
                  <Text style={styles.transactionDate}>{item.categoria} • {item.data}</Text>
                </View>
              </View>

              <View style={styles.rightSide}>
                <Text style={[styles.transactionValue, { color: item.tipo === 'receita' ? '#10b981' : '#f43f5e' }]}>
                  {item.tipo === 'receita' ? '+ ' : '- '} 
                  R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <TouchableOpacity onPress={() => excluirTransacao(item.id)} style={styles.deleteBtn}>
                  <Ionicons name="trash-outline" size={16} color="#f43f5e" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  scroll: { padding: 20, paddingBottom: 40, maxWidth: 500, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#18181b', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#27272a' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },

  emptyCard: { backgroundColor: '#121214', borderRadius: 16, padding: 40, alignItems: 'center', borderWidth: 1, borderColor: '#27272a', marginTop: 40 },
  emptyText: { color: '#71717a', fontSize: 14, marginTop: 10 },

  transactionCard: { backgroundColor: '#121214', borderRadius: 14, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#27272a' },
  transactionInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconType: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  transactionDesc: { fontSize: 14, fontWeight: '600', color: '#fff' },
  transactionDate: { fontSize: 11, color: '#71717a', marginTop: 2 },
  
  rightSide: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  transactionValue: { fontSize: 14, fontWeight: 'bold' },
  deleteBtn: { padding: 6, backgroundColor: 'rgba(244, 63, 94, 0.1)', borderRadius: 8 },
});