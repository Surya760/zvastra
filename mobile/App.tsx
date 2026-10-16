import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider, useStore } from './src/state/storeContext';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { TemplateSelectorScreen } from './src/screens/TemplateSelectorScreen';
import { ProductListScreen } from './src/screens/ProductListScreen';
import { ProductFormScreen } from './src/screens/ProductFormScreen';
import { StorePreviewScreen } from './src/screens/StorePreviewScreen';
import { InquiriesScreen } from './src/screens/InquiriesScreen';

type TabRoute = 'Dashboard' | 'Products' | 'Templates' | 'Inquiries' | 'Preview';

const MainNavigator: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabRoute>('Dashboard');
  const [currentScreen, setCurrentScreen] = useState<'Tabs' | 'ProductForm'>('Tabs');
  const { inquiries } = useStore();

  const navigation = {
    navigate: (route: string) => {
      if (route === 'ProductForm') {
        setCurrentScreen('ProductForm');
      } else if (['Dashboard', 'Products', 'Templates', 'Inquiries', 'Preview'].includes(route)) {
        setCurrentScreen('Tabs');
        setCurrentTab(route as TabRoute);
      }
    },
    goBack: () => {
      setCurrentScreen('Tabs');
    }
  };

  if (currentScreen === 'ProductForm') {
    return <ProductFormScreen navigation={navigation} />;
  }

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'Dashboard':
        return <DashboardScreen navigation={navigation} />;
      case 'Products':
        return <ProductListScreen navigation={navigation} />;
      case 'Templates':
        return <TemplateSelectorScreen navigation={navigation} />;
      case 'Inquiries':
        return <InquiriesScreen />;
      case 'Preview':
        return <StorePreviewScreen navigation={navigation} />;
      default:
        return <DashboardScreen navigation={navigation} />;
    }
  };

  const tabs: { route: TabRoute; label: string; icon: string; badge?: number }[] = [
    { route: 'Dashboard', label: 'Home', icon: '🏠' },
    { route: 'Products', label: 'Catalog', icon: '👗' },
    { route: 'Templates', label: 'Themes', icon: '🎨' },
    { route: 'Inquiries', label: 'Leads', icon: '💬', badge: inquiries.filter((i) => i.status === 'new').length },
    { route: 'Preview', label: 'Website', icon: '🌐' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.screenArea}>
        {renderActiveTab()}
      </View>

      {/* Modern Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.route;
          return (
            <TouchableOpacity
              key={tab.route}
              style={styles.tabItem}
              onPress={() => setCurrentTab(tab.route)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{tab.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <MainNavigator />
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  screenArea: { flex: 1 },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: 24,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconContainer: { position: 'relative' },
  tabIcon: { fontSize: 20 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center'
  },
  badgeText: { color: 'white', fontSize: 10, fontWeight: '800' },
  tabLabel: { fontSize: 11, color: '#64748B', marginTop: 3, fontWeight: '500' },
  tabLabelActive: { color: '#800020', fontWeight: '700' }
});
