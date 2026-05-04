import { DayStatus } from '@/features/checkins/types';
import { ISODateString } from '@/shared/types';

export type CalendarDayStatus = DayStatus | 'empty';

export interface CalendarDay {
  date: ISODateString;
  status: CalendarDayStatus;
  score?: number;
}