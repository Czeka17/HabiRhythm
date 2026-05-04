import { StyleSheet, View } from 'react-native';

import { HabitType } from '@/features/habits/types';
import { AppText, Button } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface HabitTypeSelectorProps {
  value: HabitType;
  onChange: (value: HabitType) => void;
}

export const HabitTypeSelector = ({ value, onChange }: HabitTypeSelectorProps) => {
  return (
    <View style={styles.container}>
      <AppText variant="bodySmall" color={colors.textMuted}>
        Type
      </AppText>

      <View style={styles.options}>
        <Button
          variant={value === 'habit' ? 'primary' : 'secondary'}
          style={styles.option}
          onPress={() => onChange('habit')}
        >
          Habit
        </Button>

        <Button
          variant={value === 'addiction' ? 'primary' : 'secondary'}
          style={styles.option}
          onPress={() => onChange('addiction')}
        >
          Avoid
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  options: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  option: {
    flex: 1,
  },
});