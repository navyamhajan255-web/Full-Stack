export const PLATFORM_COLORS = {
  Instagram: '#E1306C',
  Facebook: '#1877F2',
  Twitter: '#1DA1F2',
  LinkedIn: '#0A66C2',
  YouTube: '#FF0000',
};

const makeDate = (daysFromNow, hour, minute = 0) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date;
};

export const seedPosts = [
  {
    id: 'post-1',
    title: 'Product launch teaser',
    platform: 'Instagram',
    status: 'scheduled',
    start: makeDate(1, 10, 0),
    end: makeDate(1, 10, 30),
    preferredStart: makeDate(1, 10, 0),
    color: PLATFORM_COLORS.Instagram,
    notes: 'Short teaser introducing the upcoming product.',
  },
  {
    id: 'post-2',
    title: 'Behind the scenes',
    platform: 'Facebook',
    status: 'draft',
    start: makeDate(2, 14, 0),
    end: makeDate(2, 14, 30),
    preferredStart: makeDate(2, 14, 0),
    color: PLATFORM_COLORS.Facebook,
    notes: 'Show the team preparing the launch.',
  },
  {
    id: 'post-3',
    title: 'Weekly industry tip',
    platform: 'LinkedIn',
    status: 'scheduled',
    start: makeDate(3, 9, 0),
    end: makeDate(3, 9, 30),
    preferredStart: makeDate(3, 9, 0),
    color: PLATFORM_COLORS.LinkedIn,
    notes: 'Educational post for the professional audience.',
  },
  {
    id: 'post-4',
    title: 'Community question',
    platform: 'Twitter',
    status: 'published',
    start: makeDate(-1, 18, 0),
    end: makeDate(-1, 18, 30),
    preferredStart: makeDate(-1, 18, 0),
    color: PLATFORM_COLORS.Twitter,
    notes: 'Ask followers what they want to see next.',
  },
  {
    id: 'post-5',
    title: 'New video announcement',
    platform: 'YouTube',
    status: 'scheduled',
    start: makeDate(5, 17, 0),
    end: makeDate(5, 17, 30),
    preferredStart: makeDate(5, 17, 0),
    color: PLATFORM_COLORS.YouTube,
    notes: 'Announce the latest video.',
  },
];