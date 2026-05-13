import { MissionDefinition } from '@/features/missions/types';

export const missionDefinitions: MissionDefinition[] = [
  {
    id: 'daily-attack-dragon',
    title: 'Attack the Dragon',
    description: 'Win one small battle today by completing an important action.',
    period: 'daily',
    xpReward: 50,
  },
  {
    id: 'daily-dodge-dragon-attacks',
    title: 'Dodge Dragon Attacks',
    description: 'Avoid one distraction that usually ruins your day.',
    period: 'daily',
    xpReward: 45,
  },
  {
    id: 'daily-sharpen-your-sword',
    title: 'Sharpen Your Sword',
    description: 'Spend time improving one skill today.',
    period: 'daily',
    xpReward: 40,
  },

  {
    id: 'weekly-slay-minion-horde',
    title: 'Slay the Minion Horde',
    description: 'Stay consistent across the week and build momentum.',
    period: 'weekly',
    xpReward: 200,
  },
  {
    id: 'weekly-guard-the-kingdom',
    title: 'Guard the Kingdom',
    description: 'Protect your week from bad habits and distractions.',
    period: 'weekly',
    xpReward: 220,
  },
  {
    id: 'weekly-train-like-a-knight',
    title: 'Train Like a Knight',
    description: 'Show up repeatedly this week and improve your rhythm.',
    period: 'weekly',
    xpReward: 180,
  },

  {
    id: 'monthly-defeat-the-ancient-dragon',
    title: 'Defeat the Ancient Dragon',
    description: 'Complete a long-term challenge and prove your discipline.',
    period: 'monthly',
    xpReward: 750,
  },
  {
    id: 'monthly-conquer-the-dark-lands',
    title: 'Conquer the Dark Lands',
    description: 'Stay consistent through the month and claim your progress.',
    period: 'monthly',
    xpReward: 700,
  },
  {
    id: 'monthly-become-the-legend',
    title: 'Become the Legend',
    description: 'Build a powerful month through repeated small wins.',
    period: 'monthly',
    xpReward: 800,
  },
];