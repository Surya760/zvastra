import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useStore } from '../state/storeContext';
import { Product } from '../types';

export const ProductListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { products, deleteProduct, currentStore } = useStore();

  const handleDelete = (product: Product) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to remove "${product.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteProduct(product.id) }
      ]
    );
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const primaryMedia = item.media[0];
    const isVideo = primaryMedia?.type === 'video';
    const hasMultipleMedia = item.media.length > 1;

    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: primaryMedia?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400' }}
            style={styles.productThumb}
          />
          {isVideo && (
            <View style={styles.videoBadge}>
              <Text style={styles.videoBadgeText}>▶ REEL</Text>
            </View>
          )}
          {hasMultipleMedia && (
            <View style={styles.mediaCountBadge}>
              <Text style={styles.mediaCountText}>{item.media.length} items</Text>
            </View>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
            {item.compareAtPrice && (
              <Text style={styles.comparePrice}>₹{item.compareAtPrice.toLocaleString('en-IN')}</Text>
            )}
          </View>
          <View style={styles.stockRow}>
            <Text style={styles.stockText}>Stock: {item.stockQuantity} units</Text>
            <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteBtn}>
              <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Product Catalog</Text>
          <Text style={styles.headerSub}>{currentStore?.name} • {products.length} products</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('ProductForm')}>
          <Text style={styles.addBtnText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>👗</Text>
          <Text style={styles.emptyTitle}>No products added yet</Text>
          <Text style={styles.emptyDesc}>Upload your first ethnic dress, saree, or jewellery piece with photos and video reels!</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('ProductForm')}>
            <Text style={styles.emptyBtnText}>+ Add Your First Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  headerSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  addBtn: { backgroundColor: '#800020', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  addBtnText: { color: 'white', fontWeight: '700', fontSize: 13 },

  listContent: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    flexDirection: 'row',
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  imageContainer: { width: 105, height: 130, position: 'relative' },
  productThumb: { width: '100%', height: '100%', resizeMode: 'cover' },
  videoBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  videoBadgeText: { color: '#F43F5E', fontSize: 9, fontWeight: '800' },
  mediaCountBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  mediaCountText: { color: 'white', fontSize: 9, fontWeight: '600' },

  details: { flex: 1, padding: 12, justifyContent: 'space-between' },
  category: { fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' },
  title: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 },
  price: { fontSize: 16, fontWeight: '800', color: '#800020' },
  comparePrice: { fontSize: 12, color: '#94A3B8', textDecorationLine: 'line-through' },
  stockRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  stockText: { fontSize: 11, color: '#64748B' },
  deleteBtn: { padding: 4 },
  deleteBtnText: { fontSize: 11, color: '#EF4444', fontWeight: '600' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  emptyDesc: { fontSize: 13, color: '#64748B', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  emptyBtn: { backgroundColor: '#800020', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, marginTop: 20 },
  emptyBtnText: { color: 'white', fontWeight: '700', fontSize: 14 }
});
