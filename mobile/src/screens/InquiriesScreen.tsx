import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { useStore } from '../state/storeContext';
import { Inquiry } from '../types';

export const InquiriesScreen: React.FC = () => {
  const { inquiries, currentStore } = useStore();

  const handleReplyWhatsApp = (inquiry: Inquiry) => {
    const cleanPhone = inquiry.customerPhone.replace(/[^0-9]/g, '');
    const text = `Hi ${inquiry.customerName}, thank you for reaching out to ${currentStore.name}! Regarding your inquiry about "${inquiry.productTitle || 'our collection'}": `;
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`);
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderItem = ({ item }: { item: Inquiry }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.customerPhone}>{item.customerPhone}</Text>
        </View>
        <View style={[styles.statusBadge, item.status === 'new' ? styles.statusNew : styles.statusContacted]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      {item.productTitle && (
        <View style={styles.productPill}>
          <Text style={styles.productPillLabel}>Interested In:</Text>
          <Text style={styles.productPillTitle} numberOfLines={1}>{item.productTitle}</Text>
        </View>
      )}

      <Text style={styles.message}>"{item.message}"</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnWhatsApp} onPress={() => handleReplyWhatsApp(item)}>
          <Text style={styles.btnWhatsAppText}>💬 Reply on WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCall} onPress={() => handleCall(item.customerPhone)}>
          <Text style={styles.btnCallText}>📞 Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer Inquiries & Leads</Text>
        <Text style={styles.headerSub}>Manage buyers reaching out from your website</Text>
      </View>

      {inquiries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📬</Text>
          <Text style={styles.emptyTitle}>No inquiries yet</Text>
          <Text style={styles.emptyDesc}>When shoppers click "Inquire" on your website, their leads will appear here instantly.</Text>
        </View>
      ) : (
        <FlatList
          data={inquiries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: 'white',
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  headerSub: { fontSize: 13, color: '#64748B', marginTop: 2 },

  listContent: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  customerName: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  customerPhone: { fontSize: 13, color: '#64748B', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusNew: { backgroundColor: '#FEF3C7' },
  statusContacted: { backgroundColor: '#DCFCE7' },
  statusText: { fontSize: 10, fontWeight: '800', color: '#92400E' },

  productPill: { backgroundColor: '#F1F5F9', borderRadius: 8, padding: 8, marginTop: 10 },
  productPillLabel: { fontSize: 10, color: '#64748B', fontWeight: '700', textTransform: 'uppercase' },
  productPillTitle: { fontSize: 12, color: '#0F172A', fontWeight: '600', marginTop: 2 },

  message: { fontSize: 13, color: '#334155', fontStyle: 'italic', marginVertical: 10, lineHeight: 18 },

  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  btnWhatsApp: { flex: 1, backgroundColor: '#25D366', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnWhatsAppText: { color: 'white', fontWeight: '700', fontSize: 13 },
  btnCall: { backgroundColor: '#F1F5F9', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  btnCallText: { color: '#0F172A', fontWeight: '600', fontSize: 13 },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyIcon: { fontSize: 44, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  emptyDesc: { fontSize: 13, color: '#64748B', textAlign: 'center', marginTop: 6, lineHeight: 18 }
});
