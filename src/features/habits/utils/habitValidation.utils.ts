import { z } from 'zod';

export const createHabitSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Habit name must be at least 2 characters long.')
    .max(40, 'Habit name must be shorter than 40 characters.'),
  type: z.enum(['habit', 'addiction']),
  targetPerWeek: z
    .number()
    .min(1, 'Target must be at least 1 time per week.')
    .max(7, 'Target cannot be higher than 7 times per week.'),
});

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;