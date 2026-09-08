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

function notify() {
  listeners.forEach((listener) => {
    listener();
  });
}

export function setRenderMode(mode) {
  activeMode =
    mode === 'optimized'
      ? 'optimized'
      : 'normal';

  snapshot = {
    mode: activeMode,
    ...statsByMode[activeMode],
  };

  notify();
}

export function resetRenderStats() {
  statsByMode = {
    ...statsByMode,
    [activeMode]: { ...initialStats },
  };

  snapshot = {
    mode: activeMode,
    ...statsByMode[activeMode],
  };

  notify();
}

export function trackRender(name) {
  if (!(name in initialStats)) {
    return;
  }

  statsByMode = {
    ...statsByMode,
    [activeMode]: {
      ...statsByMode[activeMode],
      [name]:
        statsByMode[activeMode][name] + 1,
    },
  };

  snapshot = {
    mode: activeMode,
    ...statsByMode[activeMode],
  };

  notify();
}