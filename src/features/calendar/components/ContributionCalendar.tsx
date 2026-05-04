import { StyleSheet, View } from 'react-native';

import { DayDot } from '@/features/calendar/components/DayDot';
import { CalendarDay } from '@/features/calendar/types';
import { AppText, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface ContributionCalendarProps {
  days: CalendarDay[];
  onDayPress?: (day: CalendarDay) => void;
}

const DAYS_IN_WEEK = 7;
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const ContributionCalendar = ({ days, onDayPress }: ContributionCalendarProps) => {
  const weeks = days.reduce<CalendarDay[][]>((acc, day, index) => {
    const weekIndex = Math.floor(index / DAYS_IN_WEEK);

    if (!acc[weekIndex]) {
      acc[weekIndex] = [];
    }

    acc[weekIndex].push(day);

    return acc;
  }, []);

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="heading3" align="center">
            Day rhythm
          </AppText>

          <AppText variant="bodySmall" color={colors.textMuted} align="center">
            Last 4 weeks
          </AppText>
        </View>

        <View style={styles.calendarWrapper}>
          <View style={styles.weekdayHeader}>
            {WEEKDAY_LABELS.map((label) => (
              <View key={label} style={styles.weekdayCell}>
                <AppText
                  variant="caption"
                  color={colors.textMuted}
                  align="center"
                  numberOfLines={1}
                >
                  {label}
                </AppText>
              </View>
            ))}
          </View>

          <View style={styles.grid}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekRow}>
                {week.map((day) => (
                  <DayDot key={day.date} day={day} onPress={onDayPress} />
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.legend}>
          <LegendItem label="No data" statusColor={colors.border} />
          <LegendItem label="Bad" statusColor={colors.danger} />
          <LegendItem label="Average" statusColor={colors.warning} />
          <LegendItem label="Great" statusColor={colors.success} />
        </View>
      </View>
    </Card>
  );
};

interface LegendItemProps {
  label: string;
  statusColor: string;
}

const LegendItem = ({ label, statusColor }: LegendItemProps) => {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: statusColor }]} />
      <AppText variant="caption" color={colors.textMuted}>
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    alignItems: 'center',
  },
  header: {
    gap: spacing.xs,
    alignItems: 'center',
  },
  calendarWrapper: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  weekdayCell: {
    width: 28,
    alignItems: 'center',
  },
  grid: {
    gap: spacing.sm,
    alignItems: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
});