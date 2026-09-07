import {
  memo,
  useSyncExternalStore,
} from 'react';

import {
  getRenderStats,
  subscribeRenderStats,
} from '../renderTracker';

function Performance({
  optimized,
  onToggle,
}) {
  const renderStats = useSyncExternalStore(
    subscribeRenderStats,
    getRenderStats,
    getRenderStats
  );

  // Show actual counts only in Optimized mode.
  // Non-optimized mode is displayed as 0.
  const calendarViewRenders = optimized
    ? renderStats.CalendarView || 0
    : 0;

  const calendarRenders = optimized
    ? renderStats.Calendar || 0
    : 0;

  const eventRenders = optimized
    ? renderStats.Events || 0
    : 0;

  const postModalRenders = optimized
    ? renderStats.PostModal || 0
    : 0;

  const sidebarRenders = optimized
    ? renderStats.Sidebar || 0
    : 0;

  const totalRenders =
    calendarViewRenders +
    calendarRenders +
    eventRenders +
    postModalRenders +
    sidebarRenders;

  return (
    <section className="react-performance-panel">
      <div className="react-performance-header">
        <div>
          <p className="react-performance-label">
            REACT RENDERING
          </p>

          <h2>
            {optimized
              ? 'Optimized'
              : 'Non-optimized'}
          </h2>
        </div>

        <button
          type="button"
          className={`render-mode-toggle ${
            optimized
              ? 'is-optimized'
              : 'is-normal'
          }`}
          onClick={onToggle}
          aria-pressed={optimized}
        >
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>

          <span>
            {optimized
              ? 'Optimized'
              : 'Non-optimized'}
          </span>
        </button>
      </div>

      <div className="render-stats-grid">
        <div className="render-stat-card">
          <strong>{calendarViewRenders}</strong>
          <span>CalendarView renders</span>
        </div>

        <div className="render-stat-card">
          <strong>{calendarRenders}</strong>
          <span>Calendar renders</span>
        </div>

        <div className="render-stat-card">
          <strong>{eventRenders}</strong>
          <span>Event renders</span>
        </div>

        <div className="render-stat-card">
          <strong>{postModalRenders}</strong>
          <span>Post modal renders</span>
        </div>
      </div>

      <div className="render-performance-footer">
        <span>
          Sidebar renders: {sidebarRenders}
        </span>

        <span>
          Total tracked renders: {totalRenders}
        </span>
      </div>

      <p className="render-performance-note">
        Optimized mode shows tracked render activity.
        Non-optimized mode displays zero for comparison.
      </p>
    </section>
  );
}

export default memo(Performance);