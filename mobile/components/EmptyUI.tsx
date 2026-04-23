import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type EmptyUIProps = {
  title: string;
  subtitle?: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconColor?: string;
  iconsize?: number;
  buttonlabel?: string;
  onButtonPress?: () => void;
};

function EmptyUI({
  title,
  subtitle,
  iconName = 'chatbubbles-outline',
  iconColor = '#6b6b70',
  iconsize = 64,
  buttonlabel,
  onButtonPress
}: EmptyUIProps) {
  return (
    <View className="flex-1 items-center justify-center py-20">
      {iconName && (
        <Ionicons name={iconName} size={iconsize} color={iconColor} />
      )}
      <Text className="text-muted-foreground text-lg mt-4">{title}</Text>
      {subtitle && <Text className="text-subtitle-foreground text-sm mt-1">{subtitle}</Text> }
      {buttonlabel && onButtonPress && (
        <Pressable onPress={onButtonPress} className="mt-6 px-6 py-3 bg-primary rounded-full">
          <Text className="text-surface-dark font font-semibold">{buttonlabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

export default EmptyUI;