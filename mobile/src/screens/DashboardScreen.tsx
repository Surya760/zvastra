import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, Share } from 'react-native';
import { useStore } from '../state/storeContext';

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentStore, stores, setCurrentStore, createNewStore } = useStore();
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showNewStoreModal, setShowNewStoreModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreCategory, setNewStoreCategory] = useState('');

  const storeUrl = `https://${currentStore?.slug || 'store'}.zvastra.com`;

  const handleShareLink = async () => {
    try {
      await Share.share({
        message: `✨ Visit my official online boutique on Zvastra: ${storeUrl}\n\nBrowse handcrafted collections, watch video reels, and shop directly!`,
        url: storeUrl,
        title: currentStore.name
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleCreateStore = async () => {
    if (!newStoreName.trim()) {
      Alert.alert('Required', 'Please enter a store name');
      return;
    }
    const slug = newStoreName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    await createNewStore({
      name: newStoreName,
      slug,
      category: newStoreCategory || 'Boutique Fashion',
      templateId: 'classic-boutique'
    });
    setNewStoreName('');
    setNewStoreCategory('');
    setShowNewStoreModal(false);
    Alert.alert('Success!', `Your new store "${newStoreName}" has been created.`);
  };

  if (!currentStore) {
    return (
      <View style={styles.center}>
        <Text>Loading your stores...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header & Store Switcher */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.storeSelector} onPress={() => setShowStoreModal(true)}>
          <Image
            source={{ uri: currentStore.themeConfig.logoUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100' }}
            style={styles.storeLogo}
          />
          <View style={styles.storeInfo}>
            <Text style={styles.storeName} numberOfLines={1}>{currentStore.name}</Text>
            <Text style={styles.storeSlug}>🌐 {currentStore.slug}.zvastra.com ▼</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.previewBtn} onPress={() => navigation.navigate('Preview')}>
          <Text style={styles.previewBtnText}>Live View ↗</Text>
        </TouchableOpacity>
      </View>

      {/* Shareable Store URL Card */}
      <View style={styles.linkCard}>
        <View style={styles.linkCardHeader}>
          <Text style={styles.linkCardTitle}>Your Customer-Facing Website</Text>
          <View style={styles.activePill}><Text style={styles.activePillText}>LIVE</Text></View>
        </View>
        <Text style={styles.linkUrl}>{storeUrl}</Text>
        <View style={styles.linkActionRow}>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={handleShareLink}>
            <Text style={styles.actionBtnText}>📢 Share Website</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnSecondary} onPress={() => navigation.navigate('Preview')}>
            <Text style={styles.actionBtnTextDark}>👁️ Preview</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricVal}>{currentStore.stats.totalVisits.toLocaleString()}</Text>
          <Text style={styles.metricLabel}>Store Visits</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[styles.metricVal, { color: '#0D9488' }]}>{currentStore.stats.totalInquiries}</Text>
          <Text style={styles.metricLabel}>Leads / Inquiries</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[styles.metricVal, { color: '#7C3AED' }]}>{currentStore.stats.totalProducts}</Text>
          <Text style={styles.metricLabel}>Products</Text>
        </View>
      </View>

      {/* Active Template Banner */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Website Template</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Templates')}>
          <Text style={styles.seeAllText}>Change Template →</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.templateCard} onPress={() => navigation.navigate('Templates')}>
        <View style={styles.templateHeader}>
          <View>
            <Text style={styles.templateBadge}>ACTIVE DESIGN</Text>
            <Text style={styles.templateName}>{currentStore.templateId.replace('-', ' ').toUpperCase()}</Text>
          </View>
          <View style={[styles.colorBadge, { backgroundColor: currentStore.themeConfig.primaryColor }]} />
        </View>
        <Text style={styles.templateTagline}>{currentStore.themeConfig.tagline}</Text>
        <Text style={styles.templateBio} numberOfLines={2}>{currentStore.themeConfig.bio}</Text>
        <View style={styles.templateFooter}>
          <Text style={styles.templateCustomize}>Tap to customize branding, logo & colors →</Text>
        </View>
      </TouchableOpacity>

      {/* Quick Actions Grid */}
      <Text style={[styles.sectionTitle, { marginTop: 24, marginHorizontal: 16 }]}>Quick Management</Text>
      <View style={styles.quickGrid}>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Products')}>
          <Text style={styles.quickIcon}>👗</Text>
          <Text style={styles.quickTitle}>Product Catalog</Text>
          <Text style={styles.quickSub}>Upload photos, videos & prices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Inquiries')}>
          <Text style={styles.quickIcon}>💬</Text>
          <Text style={styles.quickTitle}>Customer Inquiries</Text>
          <Text style={styles.quickSub}>Reply on WhatsApp & close leads</Text>
        </TouchableOpacity>
      </View>

      {/* Store Switcher Modal */}
      <Modal visible={showStoreModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Your Zvastra Sites</Text>
              <TouchableOpacity onPress={() => setShowStoreModal(false)}>
                <Text style={styles.sheetClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {stores.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.storeOption, s.id === currentStore.id && styles.storeOptionActive]}
                onPress={() => {
                  setCurrentStore(s);
                  setShowStoreModal(false);
                }}
              >
                <View>
                  <Text style={styles.optionName}>{s.name}</Text>
                  <Text style={styles.optionSlug}>{s.slug}.zvastra.com • {s.templateId}</Text>
                </View>
                {s.id === currentStore.id && <Text style={styles.checkIcon}>✓</Text>}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.btnNewStore}
              onPress={() => {
                setShowStoreModal(false);
                setShowNewStoreModal(true);
              }}
            >
              <Text style={styles.btnNewStoreText}>+ Create Another Site</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Create Store Modal */}
      <Modal visible={showNewStoreModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.sheetTitle}>Launch New Website</Text>
            <Text style={styles.modalDesc}>Each site gets its own template, catalog, and sub-domain.</Text>

            <Text style={styles.inputLabel}>Store / Brand Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Royal Silk Studio"
              value={newStoreName}
              onChangeText={setNewStoreName}
            />

            <Text style={styles.inputLabel}>Category</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Sarees, Indo-Western, Jewellery"
              value={newStoreCategory}
              onChangeText={setNewStoreCategory}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowNewStoreModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createBtn} onPress={handleCreateStore}>
                <Text style={styles.createBtnText}>Create Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  storeSelector: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  storeLogo: { width: 44, height: 44, borderRadius: 22, marginRight: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  storeInfo: { flex: 1 },
  storeName: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  storeSlug: { fontSize: 12, color: '#64748B', marginTop: 2 },
  previewBtn: { backgroundColor: '#F1F5F9', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  previewBtnText: { fontSize: 13, fontWeight: '600', color: '#0F172A' },

  linkCard: {
    backgroundColor: '#800020',
    margin: 16,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#800020',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4
  },
  linkCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  linkCardTitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
  activePill: { backgroundColor: '#22C55E', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  activePillText: { color: 'white', fontSize: 10, fontWeight: '700' },
  linkUrl: { color: 'white', fontSize: 16, fontWeight: '700', marginVertical: 10 },
  linkActionRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  actionBtnPrimary: { flex: 1, backgroundColor: '#D4AF37', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  actionBtnSecondary: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  actionBtnText: { color: '#0F172A', fontWeight: '700', fontSize: 13 },
  actionBtnTextDark: { color: 'white', fontWeight: '600', fontSize: 13 },

  metricsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 16 },
  metricCard: { flex: 1, backgroundColor: 'white', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  metricVal: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  metricLabel: { fontSize: 11, color: '#64748B', marginTop: 4, fontWeight: '500' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 12, marginBottom: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  seeAllText: { fontSize: 13, color: '#800020', fontWeight: '600' },

  templateCard: { backgroundColor: 'white', marginHorizontal: 16, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  templateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  templateBadge: { fontSize: 10, fontWeight: '700', color: '#800020', letterSpacing: 0.5 },
  templateName: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginTop: 2 },
  colorBadge: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#E2E8F0' },
  templateTagline: { fontSize: 13, color: '#475569', fontWeight: '600', marginTop: 8 },
  templateBio: { fontSize: 12, color: '#64748B', marginTop: 4, lineHeight: 18 },
  templateFooter: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  templateCustomize: { fontSize: 12, color: '#800020', fontWeight: '600' },

  quickGrid: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginTop: 10 },
  quickCard: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  quickIcon: { fontSize: 26, marginBottom: 8 },
  quickTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  quickSub: { fontSize: 11, color: '#64748B', marginTop: 4 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  sheetClose: { fontSize: 18, color: '#64748B', padding: 4 },
  storeOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  storeOptionActive: { backgroundColor: '#F8FAFC', paddingHorizontal: 10, borderRadius: 8 },
  optionName: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  optionSlug: { fontSize: 12, color: '#64748B', marginTop: 2 },
  checkIcon: { fontSize: 16, color: '#800020', fontWeight: '700' },
  btnNewStore: { marginTop: 18, backgroundColor: '#F1F5F9', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  btnNewStoreText: { color: '#0F172A', fontWeight: '700', fontSize: 14 },

  modalCard: { backgroundColor: 'white', margin: 20, borderRadius: 16, padding: 20 },
  modalDesc: { fontSize: 13, color: '#64748B', marginTop: 4, marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#334155', marginBottom: 6 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 14 },
  modalBtnRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  cancelBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#F1F5F9', alignItems: 'center' },
  cancelBtnText: { color: '#475569', fontWeight: '600' },
  createBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#800020', alignItems: 'center' },
  createBtnText: { color: 'white', fontWeight: '700' }
});
