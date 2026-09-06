function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function getTimeScore(date) {
  const hour = date.getHours();
  const day = date.getDay();

  let score = 50;

  if (day === 0 || day === 6) {
    score -= 10;
  } else {
    score += 10;
  }

  if (hour >= 9 && hour <= 11) {
    score += 25;
  } else if (hour >= 12 && hour <= 14) {
    score += 10;
  } else if (hour >= 17 && hour <= 19) {
    score += 20;
  } else if (hour >= 20 || hour < 7) {
    score -= 20;
  }

  return clamp(score);
}

function getSpacingScore(post, proposedStart, posts) {
  const start = new Date(proposedStart).getTime();

  const nearby = posts
    .filter((item) => item.id !== post.id)
    .map((item) => Math.abs(new Date(item.start).getTime() - start))
    .filter((distance) => distance < 24 * 60 * 60 * 1000);

  if (!nearby.length) {
    return 100;
  }

  const closest = Math.min(...nearby);

  if (closest < 30 * 60 * 1000) {
    return 20;
  }

  if (closest < 60 * 60 * 1000) {
    return 45;
  }

  if (closest < 2 * 60 * 60 * 1000) {
    return 70;
  }

  return 95;
}

function getDayScore(date) {
  const day = date.getDay();

  if (day === 0 || day === 6) {
    return 65;
  }

  return 95;
}

export function getSchedulingInsight(
  post,
  proposedStart,
  posts = [],
  proposedEnd
) {
  const scheduledAt = new Date(proposedStart);
  const preferredStart = post.preferredStart
    ? new Date(post.preferredStart)
    : new Date(post.start);

  const timeScore = getTimeScore(scheduledAt);
  const spacingScore = getSpacingScore(
    post,
    scheduledAt,
    posts
  );
  const dayScore = getDayScore(scheduledAt);

  const preferredDistance = Math.abs(
    scheduledAt.getTime() - preferredStart.getTime()
  );

  const preferenceScore =
    preferredDistance <= 30 * 60 * 1000
      ? 100
      : preferredDistance <= 2 * 60 * 60 * 1000
        ? 90
        : preferredDistance <= 6 * 60 * 60 * 1000
          ? 75
          : 60;

  const preference = Math.round(
    timeScore * 0.35 +
    spacingScore * 0.25 +
    dayScore * 0.2 +
    preferenceScore * 0.2
  );

  let score;
  let label;
  let message;

  if (preference >= 80) {
    score = 'great';
    label = 'Great publishing window';
    message =
      'This time lines up well with your preferred schedule and has good spacing.';
  } else if (preference >= 60) {
    score = 'fair';
    label = 'Workable publishing window';
    message =
      'This slot can work, although another time may give you a stronger schedule.';
  } else {
    score = 'poor';
    label = 'Needs attention';
    message =
      'This slot is less preferable because of timing, spacing, or your preferred window.';
  }

  const alternative = new Date(scheduledAt);
  alternative.setHours(10, 0, 0, 0);

  if (
    alternative.getDay() === 0 ||
    alternative.getDay() === 6
  ) {
    alternative.setDate(
      alternative.getDate() +
        (alternative.getDay() === 6 ? 2 : 1)
    );
  }

  return {
    id: post.id,
    preference,
    score,
    label,
    message,
    scheduledAt,
    alternative: alternative.toLocaleString([], {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }),
    factors: [
      {
        label: 'Time window',
        value: timeScore,
      },
      {
        label: 'Post spacing',
        value: spacingScore,
      },
      {
        label: 'Day quality',
        value: dayScore,
      },
      {
        label: 'Preferred time',
        value: preferenceScore,
      },
    ],
  };
}