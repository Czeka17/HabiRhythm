import { z } from 'zod';

export const createHabitSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Habit name must be at least 2 characters long.')
      .max(40, 'Habit name must be shorter than 40 characters.'),
    type: z.enum(['habit', 'addiction']),
    targetPerWeek: z.number().optional(),
  })
  .superRefine((values, context) => {
    if (values.type !== 'habit') {
      return;
    }

    if (!values.targetPerWeek) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['targetPerWeek'],
        message: 'Weekly target is required for habits.',
      });

      return;
    }

    if (values.targetPerWeek < 1 || values.targetPerWeek > 7) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['targetPerWeek'],
        message: 'Target must be between 1 and 7 times per week.',
      });
    }
  });

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;