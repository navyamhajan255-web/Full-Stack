import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './App.css'

const defaultPosts = [
  {
    id: '1',
    title: 'Instagram Post',
    start: '2026-08-15T10:00:00',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Product Launch',
    start: '2026-08-18T14:00:00',
    status: 'scheduled',
  },
  {
    id: '3',
    title: 'Weekly Update',
    start: '2026-08-21T11:30:00',
    status: 'scheduled',
  },
]

function App() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('schedulerPosts')

    if (saved) {
      try {
        const parsed = JSON.parse(saved)

        // Old posts ke liye default status
        return parsed.map((post) => ({
          ...post,
          status: post.status || 'scheduled',
        }))
      } catch {
        return defaultPosts
      }
    }

    return defaultPosts
  })

  const [showManagePosts, setShowManagePosts] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('2026-08-25')
  const [hour, setHour] = useState('10')
  const [minute, setMinute] = useState('00')
  const [ampm, setAmpm] = useState('AM')
  const [status, setStatus] = useState('scheduled')

  // Save posts
  useEffect(() => {
    localStorage.setItem('schedulerPosts', JSON.stringify(events))
  }, [events])

  // Convert 12-hour time to 24-hour time
  const convertTo24Hour = (hourValue, ampmValue) => {
    let h = Number(hourValue)

    if (ampmValue === 'AM' && h === 12) {
      h = 0
    }

    if (ampmValue === 'PM' && h !== 12) {
      h += 12
    }

    return String(h).padStart(2, '0')
  }

  // Dashboard counts
  const scheduledCount = events.filter(
    (post) => post.status === 'scheduled'
  ).length

  const draftCount = events.filter(
    (post) => post.status === 'draft'
  ).length

  const publishedCount = events.filter(
    (post) => post.status === 'published'
  ).length

  const totalCount = events.length

  // Add new post
  const handleAddPost = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Please enter a post title.')
      return
    }

    const convertedHour = convertTo24Hour(hour, ampm)

    const newPost = {
      id: Date.now().toString(),
      title: title.trim(),
      start: `${date}T${convertedHour}:${minute}:00`,
      status,
    }

    setEvents((current) => [...current, newPost])

    // Reset form
    setTitle('')
    setDate('2026-08-25')
    setHour('10')
    setMinute('00')
    setAmpm('AM')
    setStatus('scheduled')
    setShowModal(false)
    setShowManagePosts(true)
  }

  // Delete post
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post?'
    )

    if (!confirmDelete) return

    setEvents((current) =>
      current.filter((event) => event.id !== id)
    )
  }

  // Change status
  const handleStatusChange = (id, newStatus) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? {
              ...event,
              status: newStatus,
            }
          : event
      )
    )
  }

  // Drag and drop
  const handleEventDrop = (info) => {
    const newStart = info.event.start

    if (!newStart) return

    const year = newStart.getFullYear()
    const month = String(newStart.getMonth() + 1).padStart(2, '0')
    const day = String(newStart.getDate()).padStart(2, '0')
    const hours = String(newStart.getHours()).padStart(2, '0')
    const minutes = String(newStart.getMinutes()).padStart(2, '0')

    const updatedStart =
      `${year}-${month}-${day}T${hours}:${minutes}:00`

    setEvents((current) =>
      current.map((event) =>
        event.id === info.event.id
          ? {
              ...event,
              start: updatedStart,
            }
          : event
      )
    )
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)

    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  // Calendar events with status classes
  const calendarEvents = events.map((event) => ({
    ...event,
    classNames: [`status-${event.status || 'scheduled'}`],
  }))

  return (
    <div className="app">

      {/* HEADER */}
      <header className="hero">
        <div className="hero-content">
          <div>
            <span className="eyebrow">CONTENT MANAGEMENT</span>

            <h1>Post Scheduler</h1>

            <p>
              Plan, schedule and manage your posts in one place.
            </p>
          </div>

          <button
            className="add-post-btn"
            onClick={() => setShowModal(true)}
          >
            + Add New Post
          </button>
        </div>
      </header>

      {/* DASHBOARD STATS */}
      <section className="stats-grid">

        <div className="stat-card scheduled-card">
          <div className="stat-icon">📅</div>

          <div>
            <span className="stat-label">Scheduled Posts</span>
            <strong>{scheduledCount}</strong>
            <small>Ready to publish</small>
          </div>
        </div>

        <div className="stat-card draft-card">
          <div className="stat-icon">📝</div>

          <div>
            <span className="stat-label">Drafts</span>
            <strong>{draftCount}</strong>
            <small>Still in progress</small>
          </div>
        </div>

        <div className="stat-card published-card">
          <div className="stat-icon">✓</div>

          <div>
            <span className="stat-label">Published</span>
            <strong>{publishedCount}</strong>
            <small>Successfully published</small>
          </div>
        </div>

        <div className="stat-card total-card">
          <div className="stat-icon">📊</div>

          <div>
            <span className="stat-label">Total Posts</span>
            <strong>{totalCount}</strong>
            <small>All your posts</small>
          </div>
        </div>

      </section>

      {/* MANAGE POSTS */}
      <section className="manage-section">

        <div className="manage-header">

          <div>
            <span className="section-kicker">CONTENT</span>
            <h2>Manage Posts</h2>
          </div>

          <button
            className="manage-toggle"
            onClick={() =>
              setShowManagePosts(!showManagePosts)
            }
          >
            {showManagePosts ? 'Hide Posts' : 'Show Posts'}

            <span>
              {showManagePosts ? '▲' : '▼'}
            </span>
          </button>

        </div>

        {showManagePosts && (
          <div className="posts-list">

            {events.length === 0 ? (
              <div className="empty-posts">
                <div className="empty-icon">📝</div>

                <strong>No posts scheduled yet</strong>

                <span>
                  Click "Add New Post" to create your first post.
                </span>
              </div>
            ) : (
              events.map((post) => (
                <div className="post-card" key={post.id}>

                  <div className="post-info">

                    <div className="post-title-row">
                      <h3>{post.title}</h3>

                      <span
                        className={`status-badge ${post.status}`}
                      >
                        {post.status === 'scheduled' && 'Scheduled'}

                        {post.status === 'draft' && 'Draft'}

                        {post.status === 'published' &&
                          'Published'}
                      </span>
                    </div>

                    <p>
                      🕐 {formatDate(post.start)}
                    </p>

                  </div>

                  <div className="post-actions">

                    <select
                      className="status-select"
                      value={post.status || 'scheduled'}
                      onChange={(e) =>
                        handleStatusChange(
                          post.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="scheduled">
                        Scheduled
                      </option>

                      <option value="draft">
                        Draft
                      </option>

                      <option value="published">
                        Published
                      </option>
                    </select>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(post.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>
        )}

      </section>

      {/* INSTRUCTION */}
      <div className="instruction">
        <span>↔</span>
        Drag and drop a post on the calendar to reschedule it.
      </div>

      {/* CALENDAR */}
      <section className="calendar-section">

        <div className="calendar-heading">
          <div>
            <span className="section-kicker">SCHEDULE</span>
            <h2>Content Calendar</h2>
          </div>

          <div className="calendar-legend">

            <span>
              <i className="legend-dot scheduled"></i>
              Scheduled
            </span>

            <span>
              <i className="legend-dot draft"></i>
              Draft
            </span>

            <span>
              <i className="legend-dot published"></i>
              Published
            </span>

          </div>
        </div>

        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          initialDate="2026-08-15"
          editable={true}
          eventStartEditable={true}
          eventDurationEditable={false}
          events={calendarEvents}
          eventDrop={handleEventDrop}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right:
              'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
          }}
          eventClick={(info) => {
            const eventStatus =
              info.event.extendedProps.status

            alert(
              `Post: ${info.event.title}\nStatus: ${
                eventStatus || 'Scheduled'
              }\nDate: ${info.event.start.toLocaleString()}`
            )
          }}
        />

      </section>

      {/* ADD POST MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <span className="section-kicker">
                  NEW CONTENT
                </span>

                <h2>Add New Post</h2>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddPost}>

              <label>Post Title</label>

              <input
                type="text"
                placeholder="e.g. Instagram Post"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <label>Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

              <label>Time</label>

              <div className="time-row">

                <select
                  value={hour}
                  onChange={(e) =>
                    setHour(e.target.value)
                  }
                >
                  {Array.from(
                    { length: 12 },
                    (_, index) => {
                      const value = String(
                        index + 1
                      ).padStart(2, '0')

                      return (
                        <option
                          key={value}
                          value={value}
                        >
                          {value}
                        </option>
                      )
                    }
                  )}
                </select>

                <span>:</span>

                <select
                  value={minute}
                  onChange={(e) =>
                    setMinute(e.target.value)
                  }
                >
                  {Array.from(
                    { length: 60 },
                    (_, index) => {
                      const value = String(
                        index
                      ).padStart(2, '0')

                      return (
                        <option
                          key={value}
                          value={value}
                        >
                          {value}
                        </option>
                      )
                    }
                  )}
                </select>

                <select
                  value={ampm}
                  onChange={(e) =>
                    setAmpm(e.target.value)
                  }
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>

              </div>

              <label>Status</label>

              <select
                className="modal-status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="scheduled">
                  Scheduled
                </option>

                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>
              </select>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Add Post
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  )
}

export default App