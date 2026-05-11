import { StyleSheet, View } from 'react-native';

import { useCheckIns } from '@/features/checkins/hooks';
import { useHabits } from '@/features/habits/hooks';
import {
  HabitProgressList,
  StatusBreakdownCard,
  SummaryBarChart,
  SummaryMetricCard,
} from '@/features/reports/components';
import { calculateMonthlySummary } from '@/features/reports/utils';
import { AppText, Card, Screen, SectionHeader } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { getCurrentISODate } from '@/shared/utils';

export const MonthlySummaryScreen = () => {
  const { activeHabits } = useHabits();
  const { sortedCheckIns } = useCheckIns();

  const summary = calculateMonthlySummary({
    date: getCurrentISODate(),
    habits: activeHabits,
    checkIns: sortedCheckIns,
  });

  const maxStatusCount = Math.max(...Object.values(summary.daysByStatus), 1);

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader title="Monthly summary" description={summary.month} />

        {summary.totalCheckIns === 0 ? (
          <Card>
            <AppText color={colors.textMuted}>
              No check-ins this month yet. Complete daily check-ins to generate your monthly
              summary.
            </AppText>
          </Card>
        ) : null}

        <View style={styles.metricsGrid}>
          <SummaryMetricCard
            label="Average mood"
            value={`${summary.averageMoodRating}/10`}
            description="This month"
          />

          <SummaryMetricCard
            label="Average score"
            value={`${summary.averageScore}/100`}
            description="This month"
          />
        </View>

        <View style={styles.metricsGrid}>
          <SummaryMetricCard label="Check-ins" value={summary.totalCheckIns} description="This month" />

          <SummaryMetricCard
            label="Best day"
            value={summary.bestDay ?? '-'}
            description={summary.worstDay ? `Worst: ${summary.worstDay}` : 'No data yet'}
          />
        </View>

        <SummaryBarChart
          title="Monthly day chart"
          items={[
            {
              label: 'Great days',
              value: summary.daysByStatus.great,
              maxValue: maxStatusCount,
            },
            {
              label: 'Average days',
              value: summary.daysByStatus.average,
              maxValue: maxStatusCount,
            },
            {
              label: 'Bad days',
              value: summary.daysByStatus.bad,
              maxValue: maxStatusCount,
            },
          ]}
        />

        <StatusBreakdownCard daysByStatus={summary.daysByStatus} />

        <HabitProgressList habitProgress={summary.habitProgress} />
      </View>
    </Screen>
  );
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