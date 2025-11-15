import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#d4af37',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#d4af37',
        },
        headerStyle: {
          backgroundColor: '#0f172a',
        },
        headerTintColor: '#d4af37',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Club Mitos',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
        }}
      />
    </Tabs>
  );
}
