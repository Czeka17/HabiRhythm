import { PropsWithChildren, Ref } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface ScreenProps extends PropsWithChildren {
  scrollable?: boolean;
  style?: ViewStyle;
  scrollRef?: Ref<ScrollView>;
}

export const Screen = ({ children, scrollable = false, style, scrollRef }: ScreenProps) => {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={[styles.scrollContent, style]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={[styles.safeArea, styles.content, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  scrollContent: {
    padding: spacing.md,
    flexGrow: 1,
  },
});