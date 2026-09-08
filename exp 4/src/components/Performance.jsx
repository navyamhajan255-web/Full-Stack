import {
  memo,
  useSyncExternalStore,
} from 'react';

import {
  getRenderStats,
  resetRenderStats,
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

  const calendarViewRenders =
    renderStats.CalendarView || 0;

  const calendarRenders =
    renderStats.Calendar || 0;

  const eventRenders =
    renderStats.Events || 0;

  const postModalRenders =
    renderStats.PostModal || 0;

  const sidebarRenders =
    renderStats.Sidebar || 0;

  const totalRenders =
    calendarViewRenders +
    calendarRenders +
    eventRenders +
    postModalRenders +
    sidebarRenders;

  const handleReset = () => {
    resetRenderStats();
  };

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

        <div className="render-controls">
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

          <button
            type="button"
            className="render-reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
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
        Change the calendar, drag a post, open a post,
        or switch views to observe rendering activity.
      </p>
    </section>
  );
}

export default memo(Performance);