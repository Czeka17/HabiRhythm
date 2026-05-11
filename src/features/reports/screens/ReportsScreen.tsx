import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MonthlySummaryScreen } from '@/features/reports/screens/MonthlySummaryScreen';
import { WeeklySummaryScreen } from '@/features/reports/screens/WeeklySummaryScreen';
import { Button } from '@/shared/components';
import { spacing } from '@/shared/constants/spacing';

type ReportPeriod = 'weekly' | 'monthly';

export const ReportsScreen = () => {
  const [period, setPeriod] = useState<ReportPeriod>('weekly');

  return (
    <View style={styles.container}>
      <View style={styles.switcher}>
        <Button
          variant={period === 'weekly' ? 'primary' : 'secondary'}
          style={styles.switchButton}
          onPress={() => setPeriod('weekly')}
        >
          Weekly
        </Button>

        <Button
          variant={period === 'monthly' ? 'primary' : 'secondary'}
          style={styles.switchButton}
          onPress={() => setPeriod('monthly')}
        >
          Monthly
        </Button>
      </View>

      {period === 'weekly' ? <WeeklySummaryScreen /> : <MonthlySummaryScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switcher: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: 0,
  },
  switchButton: {
    flex: 1,
  },
});