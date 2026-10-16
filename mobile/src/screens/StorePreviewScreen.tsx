import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Share, Linking } from 'react-native';
import { useStore } from '../state/storeContext';

export const StorePreviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentStore, products } = useStore();
  const theme = currentStore.themeConfig;
  const storeUrl = `https://${currentStore.slug}.zvastra.com`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${currentStore.name}: ${storeUrl}`,
        url: storeUrl
      });
    } catch (e) {
      console.log('Share error', e);
    }
  };

  const openWhatsApp = (msg: string) => {
    const cleanPhone = theme.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `whatsapp://send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`);
        }
      })
      .catch(() => {
        Linking.openURL(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`);
      });
  };

  return (
    <View style={styles.container}>
      {/* Mock Browser Header */}
      <View style={styles.browserBar}>
        <View style={styles.urlPill}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.urlText} numberOfLines={1}>{currentStore.slug}.zvastra.com</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={styles.shareBtnText}>Share ↗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={[styles.pageContent, { backgroundColor: theme.backgroundColor }]} showsVerticalScrollIndicator={false}>
        {/* Store Brand Header */}
        <View style={styles.storeHeader}>
          <View style={styles.brandGroup}>
            {theme.logoUrl && (
              <Image source={{ uri: theme.logoUrl }} style={[styles.storeLogo, { borderColor: theme.accentColor }]} />
            )}
            <View>
              <Text style={[styles.storeTitle, { color: theme.primaryColor }]}>{currentStore.name}</Text>
              <Text style={styles.storeCategory}>{currentStore.category}</Text>
            </View>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: theme.bannerUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' }}
            style={styles.heroImg}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTagline}>{theme.tagline || currentStore.name}</Text>
            <Text style={styles.heroBio}>{theme.bio}</Text>
            <View style={styles.heroPillsRow}>
              <TouchableOpacity
                style={[styles.heroPill, { backgroundColor: '#25D366' }]}
                onPress={() => openWhatsApp(`Hi ${currentStore.name}! I am browsing your site.`)}
              >
                <Text style={styles.heroPillText}>💬 WhatsApp Shop</Text>
              </TouchableOpacity>
              {theme.instagramHandle && (
                <View style={[styles.heroPill, { backgroundColor: '#E1306C' }]}>
                  <Text style={styles.heroPillText}>📸 {theme.instagramHandle}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Catalog Section */}
        <View style={styles.catalogContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.primaryColor }]}>Featured Collections</Text>
            <Text style={styles.sectionSub}>Tap to inquire directly with the seller</Text>
          </View>

          <View style={styles.grid}>
            {products.map((p) => {
              const primaryMedia = p.media[0];
              const isVideo = primaryMedia?.type === 'video';
              return (
                <View key={p.id} style={styles.productCard}>
                  <View style={styles.mediaWrap}>
                    <Image
                      source={{ uri: primaryMedia?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400' }}
                      style={styles.productImg}
                    />
                    {isVideo && (
                      <View style={styles.videoBadge}>
                        <Text style={styles.videoBadgeText}>▶ REEL DEMO</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.productInfo}>
                    <Text style={styles.cardCategory}>{p.category}</Text>
                    <Text style={styles.cardTitle} numberOfLines={2}>{p.title}</Text>
                    <View style={styles.priceRow}>
                      <Text style={[styles.cardPrice, { color: theme.primaryColor }]}>₹{p.price.toLocaleString('en-IN')}</Text>
                      {p.compareAtPrice && (
                        <Text style={styles.cardComparePrice}>₹{p.compareAtPrice.toLocaleString('en-IN')}</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={[styles.inquireBtn, { backgroundColor: '#25D366' }]}
                      onPress={() => openWhatsApp(p.whatsappMessage || `Hi, inquiring about ${p.title}`)}
                    >
                      <Text style={styles.inquireBtnText}>Chat & Buy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>Powered by Zvastra Platform</Text>
          <Text style={styles.footerTemplate}>Template: {currentStore.templateId.replace('-', ' ').toUpperCase()}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  browserBar: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  urlPill: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  lockIcon: { fontSize: 12 },
  urlText: { color: '#E2E8F0', fontSize: 13, fontWeight: '600' },
  shareBtn: { paddingVertical: 6, paddingHorizontal: 10 },
  shareBtnText: { color: '#D4AF37', fontWeight: '700', fontSize: 13 },

  pageContent: { flex: 1 },
  storeHeader: { padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  brandGroup: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  storeLogo: { width: 44, height: 44, borderRadius: 22, borderWidth: 2 },
  storeTitle: { fontSize: 16, fontWeight: '800' },
  storeCategory: { fontSize: 12, color: '#64748B', marginTop: 1 },

  heroSection: { height: 230, position: 'relative' },
  heroImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heroTagline: { color: 'white', fontSize: 20, fontWeight: '800', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.4)', textShadowRadius: 4 },
  heroBio: { color: 'rgba(255,255,255,0.9)', fontSize: 12, textAlign: 'center', marginTop: 6, lineHeight: 18, maxWidth: 300 },
  heroPillsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  heroPill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  heroPillText: { color: 'white', fontSize: 12, fontWeight: '700' },

  catalogContainer: { padding: 16 },
  sectionHeader: { marginBottom: 16, alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  sectionSub: { fontSize: 12, color: '#64748B', marginTop: 2 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 6
  },
  mediaWrap: { width: '100%', height: 160, position: 'relative' },
  productImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  videoBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  videoBadgeText: { color: '#F43F5E', fontSize: 9, fontWeight: '800' },

  productInfo: { padding: 10 },
  cardCategory: { fontSize: 10, color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' },
  cardTitle: { fontSize: 12, fontWeight: '700', color: '#0F172A', marginTop: 2, height: 32 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 4 },
  cardPrice: { fontSize: 14, fontWeight: '800' },
  cardComparePrice: { fontSize: 11, color: '#94A3B8', textDecorationLine: 'line-through' },
  inquireBtn: { marginTop: 10, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  inquireBtnText: { color: 'white', fontSize: 11, fontWeight: '700' },

  footer: { padding: 24, alignItems: 'center', backgroundColor: '#0F172A', marginTop: 30 },
  footerBrand: { color: '#94A3B8', fontSize: 12, fontWeight: '600' },
  footerTemplate: { color: '#64748B', fontSize: 10, marginTop: 4 }
});
