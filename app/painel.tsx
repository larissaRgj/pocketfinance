import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDadosFinanceiros } from './dados';

export default function Painel() {
  const router = useRouter();
  const { usuario, saldoTotal, totalReceitas, totalDespesas, transacoes } = useDadosFinanceiros();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {usuario.nome || 'Investidor'}</Text>
            <Text style={styles.dateInfo}>Painel consolidado de ativos</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/perfil')}>
            <Ionicons name="person" size={18} color="#4f46e5" />
          </TouchableOpacity>
        </View>

        {/* Wealth Card */}
        <View style={styles.wealthCard}>
          <View style={styles.wealthHeader}>
            <Text style={styles.wealthLabel}>Patrimônio Líquido Disponível</Text>
            <Ionicons name="shield-checkmark-outline" size={18} color="#64748b" />
          </View>
          <Text style={styles.wealthValue}>
            R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>

          <View style={styles.analyticsRow}>
            <View style={styles.metricBox}>
              <View style={[styles.metricIcon, { backgroundColor: '#dcfce7' }]}>
                <Ionicons name="arrow-down" size={13} color="#15803d" />
              </View>
              <View>
                <Text style={styles.metricLabel}>Entradas</Text>
                <Text style={styles.incomeValue}>+ R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
              </View>
            </View>

            <View style={styles.metricBox}>
              <View style={[styles.metricIcon, { backgroundColor: '#fee2e2' }]}>
                <Ionicons name="arrow-up" size={13} color="#b91c1c" />
              </View>
              <View>
                <Text style={styles.metricLabel}>Saídas</Text>
                <Text style={styles.expenseValue}>- R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <TouchableOpacity style={styles.primaryAction} onPress={() => router.push('/adicionar')}>
          <Ionicons name="add-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.primaryActionText}>Adicionar Nova Transação</Text>
        </TouchableOpacity>

        {/* Transactions Feed */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fluxo Recente</Text>
          <TouchableOpacity onPress={() => router.push('/historico')}>
            <Text style={styles.seeAll}>Ver histórico completo</Text>
          </TouchableOpacity>
        </View>

        {transacoes.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="documents-outline" size={32} color="#94a3b8" />
            <Text style={styles.emptyTitle}>Nenhum registro encontrado</Text>
            <Text style={styles.emptySub}>Suas movimentações aparecerão aqui em tempo real.</Text>
          </View>
        ) : (
          transacoes.slice(0, 4).map((item) => (
            <View key={item.id} style={styles.transactionRow}>
              <View style={styles.transactionLeft}>
                <View style={[styles.typeIcon, { backgroundColor: item.tipo === 'receita' ? '#dcfce7' : '#fee2e2' }]}>
                  <Ionicons 
                    name={item.tipo === 'receita' ? 'arrow-down' : 'arrow-up'} 
                    size={15} 
                    color={item.tipo === 'receita' ? '#15803d' : '#b91c1c'} 
                  />
                </View>
                <View>
                  <Text style={styles.transactionDesc}>{item.descricao}</Text>
                  <Text style={styles.transactionMeta}>{item.categoria} • {item.data}</Text>
                </View>
              </View>
              <Text style={[styles.transactionAmount, { color: item.tipo === 'receita' ? '#15803d' : '#b91c1c' }]}>
                {item.tipo === 'receita' ? '+ ' : '- '} 
                R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          ))
        )}

      </ScrollView>

      {/* Dock Navigation */}
      <View style={styles.dockBar}>
        <TouchableOpacity style={styles.dockItem} onPress={() => router.push('/painel')}>
          <Ionicons name="home" size={20} color="#4f46e5" />
          <Text style={[styles.dockText, { color: '#4f46e5', fontWeight: '700' }]}>Painel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={() => router.push('/historico')}>
          <Ionicons name="document-text-outline" size={20} color="#64748b" />
          <Text style={styles.dockText}>Extrato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={() => router.push('/perfil')}>
          <Ionicons name="person-outline" size={20} color="#64748b" />
          <Text style={styles.dockText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 20, paddingBottom: 100, maxWidth: 500, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 12 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#0f172a', letterSpacing: -0.3 },
  dateInfo: { fontSize: 13, color: '#64748b', marginTop: 2 },
  profileBtn: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  
  wealthCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 16, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 10, elevation: 2 },
  wealthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  wealthLabel: { fontSize: 12, color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  wealthValue: { fontSize: 30, fontWeight: '800', color: '#0f172a', marginBottom: 20, letterSpacing: -0.5 },
  analyticsRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 16 },
  metricBox: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  metricIcon: { width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  metricLabel: { fontSize: 11, color: '#64748b', fontWeight: '500' },
  incomeValue: { fontSize: 13, fontWeight: '700', color: '#15803d' },
  expenseValue: { fontSize: 13, fontWeight: '700', color: '#b91c1c' },

  primaryAction: { backgroundColor: '#4f46e5', paddingVertical: 15, borderRadius: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 24, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  primaryActionText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  seeAll: { fontSize: 13, color: '#4f46e5', fontWeight: '600' },

  emptyState: { backgroundColor: '#ffffff', borderRadius: 16, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 12 },
  emptyTitle: { color: '#0f172a', fontSize: 14, fontWeight: '600', marginTop: 10 },
  emptySub: { color: '#64748b', fontSize: 12, textAlign: 'center', marginTop: 4 },

  transactionRow: { backgroundColor: '#ffffff', borderRadius: 14, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  transactionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  typeIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  transactionDesc: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  transactionMeta: { fontSize: 11, color: '#64748b', marginTop: 2 },
  transactionAmount: { fontSize: 14, fontWeight: '700' },

  dockBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#e2e8f0', elevation: 10 },
  dockItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  dockText: { fontSize: 11, color: '#64748b', marginTop: 4, fontWeight: '500' },
});