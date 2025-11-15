import { View, Text, Image, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#0f172a]">
      <View className="relative h-80">
        <Image
          source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/69182fda1b8b8c653c1d3f2f_1763192996568_3c3d3b7b.webp' }}
          className="w-full h-full opacity-40"
        />
        <View className="absolute inset-0 items-center justify-center">
          <Text className="text-5xl font-serif text-[#d4af37] mb-4">Welcome</Text>
          <Text className="text-xl text-gray-300 text-center px-6">
            Exclusive membership for extraordinary individuals
          </Text>
        </View>
      </View>

      <View className="p-6 space-y-6">
        <Text className="text-3xl font-serif text-[#d4af37] text-center mb-4">Member Benefits</Text>
        {[
          { title: 'Exclusive Network', desc: 'Connect with industry leaders' },
          { title: 'Premium Events', desc: 'Invitation-only gatherings' },
          { title: 'Elite Access', desc: 'Unlock exclusive opportunities' },
        ].map((item, i) => (
          <View key={i} className="p-6 bg-white/5 rounded-2xl border border-[#d4af37]/20">
            <Text className="text-xl font-serif text-[#d4af37] mb-2">{item.title}</Text>
            <Text className="text-gray-400">{item.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
