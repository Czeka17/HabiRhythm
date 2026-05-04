import { Pressable, StyleSheet } from 'react-native';

import { CalendarDay } from '@/features/calendar/types';
import { getCalendarDayColor } from '@/features/calendar/utils';
import { radius } from '@/shared/constants/radius';

interface DayDotProps {
  day: CalendarDay;
  onPress?: (day: CalendarDay) => void;
}

export const DayDot = ({ day, onPress }: DayDotProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${day.date}, ${day.status}`}
      onPress={() => onPress?.(day)}
      style={[
        styles.dot,
        {
          backgroundColor: getCalendarDayColor(day.status),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 28,
    height: 28,
    borderRadius: radius.md,
  },
});