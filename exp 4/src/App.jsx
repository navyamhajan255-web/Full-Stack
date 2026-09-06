import {
  Profiler,
  useCallback,
  useState,
} from 'react';

import CalendarView from './components/CalendarView';
import Sidebar from './components/Sidebar';
import Performance from './components/Performance';

import { PostProvider } from './context/PostContext';

import {
  setRenderMode,
  trackRender,
} from './renderTracker';

import './App.css';

function App() {
  const [darkMode, setDarkMode] =
    useState(false);

  const [optimized, setOptimized] =
    useState(true);

  const handleProfilerRender =
    useCallback((id) => {
      trackRender(id);
    }, []);

  const toggleOptimized =
    useCallback(() => {
      setOptimized((current) => {
        const next = !current;

        setRenderMode(
          next
            ? 'optimized'
            : 'normal'
        );

        return next;
      });
    }, []);

  return (
    <PostProvider>
      <div
        className={
          darkMode
            ? 'app-shell dark-theme'
            : 'app-shell'
        }
      >
        <header className="app-header">
          <div className="brand">
            <div className="brand-mark">
              ✦
            </div>

            <div>
              <p className="eyebrow">
                Content planning
              </p>

              <h1>
                Social Scheduler
              </h1>
            </div>
          </div>

          <div className="header-controls">
            <p className="header-tip">
              Drag posts to find better
              publishing windows.
            </p>

            <button
              className="theme-toggle"
              onClick={() =>
                setDarkMode(
                  (current) => !current
                )
              }
            >
              {darkMode
                ? '☀ Light'
                : '☾ Dark'}
            </button>
          </div>
        </header>

        <main className="app-main">
          <div className="main-calendar-area">

            <Performance
              optimized={optimized}
              onToggle={
                toggleOptimized
              }
            />

            <Profiler
              id="CalendarView"
              onRender={
                handleProfilerRender
              }
            >
              <CalendarView
                optimized={optimized}
              />
            </Profiler>

          </div>

          <Profiler
            id="Sidebar"
            onRender={
              handleProfilerRender
            }
          >
            <Sidebar
              renderMode={optimized}
            />
          </Profiler>
        </main>
      </div>
    </PostProvider>
  );
}

export default App;