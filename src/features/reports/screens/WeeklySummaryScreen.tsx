import { StyleSheet, View } from 'react-native';

import { useCheckIns } from '@/features/checkins/hooks';
import { useHabits } from '@/features/habits/hooks';
import {
  HabitProgressList,
  StatusBreakdownCard,
  SummaryMetricCard,
} from '@/features/reports/components';
import { calculateWeeklySummary } from '@/features/reports/utils';
import { AppText, Card, Screen, SectionHeader } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { getCurrentISODate } from '@/shared/utils';

export const WeeklySummaryScreen = () => {
  const { activeHabits } = useHabits();
  const { sortedCheckIns } = useCheckIns();

  const summary = calculateWeeklySummary({
    date: getCurrentISODate(),
    habits: activeHabits,
    checkIns: sortedCheckIns,
  });

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="Weekly summary"
          description={`${summary.weekStartDate} - ${summary.weekEndDate}`}
        />

        {summary.totalCheckIns === 0 ? (
          <Card>
            <AppText color={colors.textMuted}>
              No check-ins this week yet. Complete a daily check-in to generate your weekly
              summary.
            </AppText>
          </Card>
        ) : null}

        <View style={styles.metricsGrid}>
          <SummaryMetricCard
            label="Average mood"
            value={`${summary.averageMoodRating}/10`}
            description="Based on your check-ins"
          />

          <SummaryMetricCard
            label="Average score"
            value={`${summary.averageScore}/100`}
            description="Mood + habit progress"
          />
        </View>

        <View style={styles.metricsGrid}>
          <SummaryMetricCard
            label="Check-ins"
            value={summary.totalCheckIns}
            description="This week"
          />

          <SummaryMetricCard
            label="Best status"
            value={getBestStatusLabel(summary.daysByStatus)}
            description="Most common day type"
          />
        </View>

        <StatusBreakdownCard daysByStatus={summary.daysByStatus} />

        <HabitProgressList habitProgress={summary.habitProgress} />
      </View>
    </Screen>
  );
};

const getBestStatusLabel = (daysByStatus: Record<'great' | 'average' | 'bad', number>) => {
  const entries = Object.entries(daysByStatus).sort((a, b) => b[1] - a[1]);
  const [status, count] = entries[0];

  if (count === 0) {
    return '-';
  }

  const labels = {
    great: 'Great',
    average: 'Average',
    bad: 'Bad',
  } as const;

  return labels[status as keyof typeof labels];
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});