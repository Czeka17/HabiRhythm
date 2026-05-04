import { StyleSheet, View } from 'react-native';

import { AppText, Button } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface MoodRatingSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const RATINGS = Array.from({ length: 10 }, (_, index) => index + 1);

export const MoodRatingSelector = ({ value, onChange, disabled = false }: MoodRatingSelectorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="heading3">Rate your day</AppText>
        <AppText variant="heading3" color={colors.primary}>
          {value}/10
        </AppText>
      </View>

      <View style={styles.grid}>
        {RATINGS.map((rating) => (
          <Button
            key={rating}
            variant={value === rating ? 'primary' : 'secondary'}
            style={styles.ratingButton}
            onPress={() => onChange(rating)}
            disabled={disabled}
          >
            {rating}
          </Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  ratingButton: {
    width: 56,
    paddingHorizontal: 0,
  },
});