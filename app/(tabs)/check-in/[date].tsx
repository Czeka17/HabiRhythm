import { useLocalSearchParams } from 'expo-router';

import { DailyCheckInFormScreen } from '@/features/checkins/screens/DailyCheckInFormScreen';
import { ISODateString } from '@/shared/types';

export default function CheckInDateRoute() {
  const { date } = useLocalSearchParams<{ date: ISODateString }>();

  return <DailyCheckInFormScreen date={date} />;
}