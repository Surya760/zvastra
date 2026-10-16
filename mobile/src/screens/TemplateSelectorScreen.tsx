import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useStore } from '../state/storeContext';
import { TemplateId } from '../types';

export const TemplateSelectorScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { templates, currentStore, selectTemplate, updateThemeConfig } = useStore();
  const [activeTab, setActiveTab] = useState<'browse' | 'customize'>('browse');

  // Customization state
  const [primaryColor, setPrimaryColor] = useState(currentStore?.themeConfig.primaryColor || '#800020');
  const [accentColor, setAccentColor] = useState(currentStore?.themeConfig.accentColor || '#D4AF37');
  const [tagline, setTagline] = useState(currentStore?.themeConfig.tagline || '');
  const [bio, setBio] = useState(currentStore?.themeConfig.bio || '');
  const [whatsapp, setWhatsapp] = useState(currentStore?.themeConfig.whatsappNumber || '');
  const [instagram, setInstagram] = useState(currentStore?.themeConfig.instagramHandle || '');

  const handleApplyTemplate = async (templateId: TemplateId) => {
    await selectTemplate(templateId);
    Alert.alert(
      'Template Applied!',
      `Your site "${currentStore.name}" is now using the ${templateId.replace('-', ' ')} theme.`,
      [{ text: 'View Store', onPress: () => navigation.navigate('Preview') }, { text: 'OK' }]
    );
  };

  const handleSaveBranding = async () => {
    await updateThemeConfig({
      primaryColor,
      accentColor,
      tagline,
      bio,
      whatsappNumber: whatsapp,
      instagramHandle: instagram
    });
    Alert.alert('Saved!', 'Your site branding and colors have been updated.');
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Website Design & Theme</Text>
        <Text style={styles.headerSub}>Choose how your boutique looks to customers</Text>

        {/* Tab Toggle */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'browse' && styles.tabBtnActive]}
            onPress={() => setActiveTab('browse')}
          >
            <Text style={[styles.tabText, activeTab === 'browse' && styles.tabTextActive]}>Templates</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'customize' && styles.tabBtnActive]}
            onPress={() => setActiveTab('customize')}
          >
            <Text style={[styles.tabText, activeTab === 'customize' && styles.tabTextActive]}>Branding & Colors</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'browse' ? (
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {templates.map((tpl) => {
            const isCurrent = currentStore?.templateId === tpl.id;
            return (
              <View key={tpl.id} style={[styles.tplCard, isCurrent && styles.tplCardActive]}>
                <Image source={{ uri: tpl.previewImageUrl }} style={styles.tplPreviewImg} />
                <View style={styles.tplContent}>
                  <View style={styles.tplHeaderRow}>
                    <Text style={styles.tplName}>{tpl.name}</Text>
                    {isCurrent && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentBadgeText}>CURRENT ACTIVE</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.tplTagline}>{tpl.tagline}</Text>
                  <Text style={styles.tplDesc}>{tpl.description}</Text>

                  <View style={styles.tagRow}>
                    {tpl.recommendedFor.map((tag, idx) => (
                      <View key={idx} style={styles.tagPill}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.tplActionRow}>
                    <TouchableOpacity
                      style={[styles.applyBtn, isCurrent && styles.applyBtnDisabled]}
                      onPress={() => handleApplyTemplate(tpl.id)}
                      disabled={isCurrent}
                    >
                      <Text style={[styles.applyBtnText, isCurrent && styles.applyBtnTextDisabled]}>
                        {isCurrent ? '✓ Active Template' : 'Apply This Template'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={{ height: 40 }} />
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.customCard}>
            <Text style={styles.customSectionTitle}>Theme Colors</Text>
            <Text style={styles.inputLabel}>Primary Brand Color (Hex)</Text>
            <View style={styles.colorInputRow}>
              <View style={[styles.colorSquare, { backgroundColor: primaryColor }]} />
              <TextInput style={[styles.input, { flex: 1 }]} value={primaryColor} onChangeText={setPrimaryColor} />
            </View>

            <Text style={styles.inputLabel}>Accent / Highlight Color</Text>
            <View style={styles.colorInputRow}>
              <View style={[styles.colorSquare, { backgroundColor: accentColor }]} />
              <TextInput style={[styles.input, { flex: 1 }]} value={accentColor} onChangeText={setAccentColor} />
            </View>

            <Text style={[styles.customSectionTitle, { marginTop: 20 }]}>Storefront Copy</Text>
            <Text style={styles.inputLabel}>Tagline / Header Headline</Text>
            <TextInput style={styles.input} value={tagline} onChangeText={setTagline} />

            <Text style={styles.inputLabel}>Store Bio / Story</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={3}
            />

            <Text style={[styles.customSectionTitle, { marginTop: 20 }]}>Customer Direct Contacts</Text>
            <Text style={styles.inputLabel}>WhatsApp Number (for direct customer inquiries)</Text>
            <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} placeholder="+919876543210" />

            <Text style={styles.inputLabel}>Instagram Handle</Text>
            <TextInput style={styles.input} value={instagram} onChangeText={setInstagram} placeholder="@brandname" />

            <TouchableOpacity style={styles.saveBrandingBtn} onPress={handleSaveBranding}>
              <Text style={styles.saveBrandingBtnText}>Save Storefront Branding</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  headerSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 10, padding: 4, marginTop: 14 },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabBtnActive: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, elevation: 2 },
  tabText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  tabTextActive: { color: '#0F172A', fontWeight: '700' },

  scrollContent: { padding: 16 },
  tplCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  tplCardActive: { borderColor: '#800020', borderWidth: 2 },
  tplPreviewImg: { width: '100%', height: 180, resizeMode: 'cover' },
  tplContent: { padding: 16 },
  tplHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tplName: { fontSize: 17, fontWeight: '700', color: '#0F172A', flex: 1 },
  currentBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  currentBadgeText: { color: '#166534', fontSize: 10, fontWeight: '800' },
  tplTagline: { fontSize: 13, fontWeight: '600', color: '#800020', marginTop: 4 },
  tplDesc: { fontSize: 12, color: '#64748B', marginTop: 6, lineHeight: 18 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 12 },
  tagPill: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 11, color: '#475569', fontWeight: '500' },
  tplActionRow: { marginTop: 6 },
  applyBtn: { backgroundColor: '#800020', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  applyBtnDisabled: { backgroundColor: '#F1F5F9' },
  applyBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  applyBtnTextDisabled: { color: '#166534', fontWeight: '700' },

  customCard: { backgroundColor: 'white', padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  customSectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#475569', marginTop: 8, marginBottom: 6 },
  colorInputRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  colorSquare: { width: 36, height: 36, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 10, fontSize: 14, color: '#0F172A' },
  saveBrandingBtn: { backgroundColor: '#800020', marginTop: 24, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  saveBrandingBtnText: { color: 'white', fontWeight: '700', fontSize: 15 }
});
