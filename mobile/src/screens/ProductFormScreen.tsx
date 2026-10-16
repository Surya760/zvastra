import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useStore } from '../state/storeContext';
import { ProductMedia } from '../types';

export const ProductFormScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { addProduct, currentStore } = useStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Ethnic Wear');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [stock, setStock] = useState('10');
  const [mediaList, setMediaList] = useState<ProductMedia[]>([
    {
      id: 'm-1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      title: 'Main Photo'
    }
  ]);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M', 'L']);
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'Free Size'];

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleAddMedia = () => {
    if (!newMediaUrl.trim()) {
      Alert.alert('Required', 'Please enter an image or video URL');
      return;
    }
    const newMedia: ProductMedia = {
      id: `m-${Date.now()}`,
      type: newMediaType,
      url: newMediaUrl.trim(),
      title: newMediaType === 'video' ? 'Product Video Reel' : 'Photo'
    };
    setMediaList([...mediaList, newMedia]);
    setNewMediaUrl('');
  };

  const handleRemoveMedia = (id: string) => {
    setMediaList(mediaList.filter((m) => m.id !== id));
  };

  const handleSave = async () => {
    if (!title.trim() || !price.trim()) {
      Alert.alert('Missing Fields', 'Please provide a title and price.');
      return;
    }

    await addProduct({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      price: parseFloat(price) || 0,
      compareAtPrice: comparePrice ? parseFloat(comparePrice) : undefined,
      stockQuantity: parseInt(stock, 10) || 0,
      isFeatured: true,
      media: mediaList,
      variants: {
        sizes: selectedSizes,
        colors: ['Multi', 'Custom']
      },
      whatsappMessage: `Hi ${currentStore?.name}! I am interested in ${title.trim()} (₹${price}).`
    });

    Alert.alert('Success!', 'Product published to your store catalog.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Product</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Media Upload Section */}
        <Text style={styles.sectionTitle}>Product Photos & Video Reels</Text>
        <Text style={styles.sectionSubtitle}>Add high-resolution photos and demo videos showing fabric flow and details.</Text>

        {/* Media Previews Row */}
        <ScrollView horizontal style={styles.mediaRow} showsHorizontalScrollIndicator={false}>
          {mediaList.map((m) => (
            <View key={m.id} style={styles.mediaPreviewCard}>
              <Image source={{ uri: m.url }} style={styles.mediaImg} />
              <View style={styles.mediaTypePill}>
                <Text style={styles.mediaTypePillText}>{m.type === 'video' ? '▶ VIDEO' : '📷 PHOTO'}</Text>
              </View>
              <TouchableOpacity style={styles.removeMediaBtn} onPress={() => handleRemoveMedia(m.id)}>
                <Text style={styles.removeMediaText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Add Media Inputs */}
        <View style={styles.addMediaBox}>
          <View style={styles.mediaTypeToggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, newMediaType === 'image' && styles.toggleBtnActive]}
              onPress={() => setNewMediaType('image')}
            >
              <Text style={[styles.toggleText, newMediaType === 'image' && styles.toggleTextActive]}>📷 Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, newMediaType === 'video' && styles.toggleBtnActive]}
              onPress={() => setNewMediaType('video')}
            >
              <Text style={[styles.toggleText, newMediaType === 'video' && styles.toggleTextActive]}>🎥 Video Reel</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder={newMediaType === 'video' ? 'Enter video MP4 URL or CDN link' : 'Enter image URL'}
            value={newMediaUrl}
            onChangeText={setNewMediaUrl}
          />
          <TouchableOpacity style={styles.attachBtn} onPress={handleAddMedia}>
            <Text style={styles.attachBtnText}>+ Add {newMediaType === 'video' ? 'Video' : 'Photo'}</Text>
          </TouchableOpacity>
        </View>

        {/* Product Details Form */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Product Information</Text>

        <Text style={styles.label}>Product Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Royal Maroon Velvet Bridal Lehenga"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Lehengas, Sarees, Jewellery"
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Price (₹) *</Text>
            <TextInput
              style={styles.input}
              placeholder="45000"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Compare Price (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="55000"
              keyboardType="numeric"
              value={comparePrice}
              onChangeText={setComparePrice}
            />
          </View>
        </View>

        <Text style={styles.label}>Stock Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="10"
          keyboardType="numeric"
          value={stock}
          onChangeText={setStock}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 90 }]}
          placeholder="Describe fabric, embroidery, craftsmanship, styling tips..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Variants Selection */}
        <Text style={[styles.label, { marginTop: 8 }]}>Available Sizes</Text>
        <View style={styles.sizePillsRow}>
          {availableSizes.map((s) => {
            const isSelected = selectedSizes.includes(s);
            return (
              <TouchableOpacity
                key={s}
                style={[styles.sizePill, isSelected && styles.sizePillActive]}
                onPress={() => toggleSize(s)}
              >
                <Text style={[styles.sizePillText, isSelected && styles.sizePillTextActive]}>{s}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.publishBtn} onPress={handleSave}>
          <Text style={styles.publishBtnText}>Publish to Website</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
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
  backBtn: { padding: 4 },
  backBtnText: { color: '#64748B', fontSize: 15, fontWeight: '600' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  saveBtn: { backgroundColor: '#800020', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
  saveBtnText: { color: 'white', fontWeight: '700', fontSize: 13 },

  content: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  sectionSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2, marginBottom: 12 },

  mediaRow: { flexDirection: 'row', marginBottom: 14 },
  mediaPreviewCard: { width: 100, height: 120, borderRadius: 10, marginRight: 10, position: 'relative', overflow: 'hidden' },
  mediaImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  mediaTypePill: { position: 'absolute', bottom: 4, left: 4, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  mediaTypePillText: { color: 'white', fontSize: 9, fontWeight: '700' },
  removeMediaBtn: { position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.6)', width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  removeMediaText: { color: 'white', fontSize: 12, fontWeight: '700' },

  addMediaBox: { backgroundColor: 'white', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  mediaTypeToggle: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  toggleBtn: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: 6, backgroundColor: '#F1F5F9' },
  toggleBtnActive: { backgroundColor: '#800020' },
  toggleText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  toggleTextActive: { color: 'white' },
  attachBtn: { backgroundColor: '#F1F5F9', marginTop: 8, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  attachBtnText: { color: '#0F172A', fontWeight: '700', fontSize: 12 },

  label: { fontSize: 13, fontWeight: '700', color: '#334155', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, fontSize: 14, color: '#0F172A' },
  row: { flexDirection: 'row', gap: 12 },

  sizePillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  sizePill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', backgroundColor: 'white' },
  sizePillActive: { backgroundColor: '#800020', borderColor: '#800020' },
  sizePillText: { fontSize: 13, fontWeight: '600', color: '#475569' },
  sizePillTextActive: { color: 'white' },

  publishBtn: { backgroundColor: '#800020', marginTop: 24, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  publishBtnText: { color: 'white', fontWeight: '700', fontSize: 15 }
});
