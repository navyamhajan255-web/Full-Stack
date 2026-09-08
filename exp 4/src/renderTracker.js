const initialStats = {
  CalendarView: 0,
  Calendar: 0,
  Events: 0,
  PostModal: 0,
  Sidebar: 0,
};

let activeMode = 'optimized';

let statsByMode = {
  optimized: { ...initialStats },
  normal: { ...initialStats },
};

let snapshot = {
  mode: activeMode,
  ...statsByMode[activeMode],
};

const listeners = new Set();

export function subscribeRenderStats(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getRenderStats() {
  return snapshot;
}

export function setRenderMode(mode) {
  activeMode = mode === 'optimized'
    ? 'optimized'
    : 'normal';

  // Non-optimized mode should always display 0
  if (activeMode === 'normal') {
    snapshot = {
      mode: 'normal',
      ...initialStats,
    };
  } else {
    snapshot = {
      mode: 'optimized',
      ...statsByMode.optimized,
    };
  }

  listeners.forEach((listener) => {
    listener();
  });
}

export function trackRender(name) {
  // Do not count renders in non-optimized mode
  if (activeMode === 'normal') {
    return;
  }

  if (!(name in initialStats)) {
    return;
  }

  statsByMode = {
    ...statsByMode,
    optimized: {
      ...statsByMode.optimized,
      [name]: statsByMode.optimized[name] + 1,
    },
  };

  snapshot = {
    mode: 'optimized',
    ...statsByMode.optimized,
  };

  listeners.forEach((listener) => {
    listener();
  });
}