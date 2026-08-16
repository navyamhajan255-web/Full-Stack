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
  },
  {
    id: '2',
    title: 'Product Launch',
    start: '2026-08-18T14:00:00',
  },
  {
    id: '3',
    title: 'Weekly Update',
    start: '2026-08-21T11:30:00',
  },
]

function App() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('schedulerPosts')

    if (saved) {
      return JSON.parse(saved)
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

  useEffect(() => {
    localStorage.setItem('schedulerPosts', JSON.stringify(events))
  }, [events])

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
    }

    setEvents((current) => [...current, newPost])

    setTitle('')
    setDate('2026-08-25')
    setHour('10')
    setMinute('00')
    setAmpm('AM')
    setShowModal(false)
    setShowManagePosts(true)
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post?'
    )

    if (!confirmDelete) return

    setEvents((current) =>
      current.filter((event) => event.id !== id)
    )
  }

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

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <div className="app">

      {/* HEADER */}
      <header className="hero">
        <h1>Post Scheduler</h1>

        <p>Plan, schedule and manage your posts.</p>

        <button
          className="add-post-btn"
          onClick={() => setShowModal(true)}
        >
          + Add New Post
        </button>
      </header>

      {/* MANAGE POSTS */}
      <section className="manage-section">

        <div className="manage-header">
          <h2>Manage Posts</h2>

          <div className="toggle-container">
            <span>
              {showManagePosts ? 'ON' : 'OFF'}
            </span>

            <label className="switch">
              <input
                type="checkbox"
                checked={showManagePosts}
                onChange={(e) =>
                  setShowManagePosts(e.target.checked)
                }
              />

              <span className="slider"></span>
            </label>
          </div>
        </div>

        {showManagePosts && (
          <div className="posts-list">

            {events.length === 0 ? (
              <div className="empty-posts">
                No posts scheduled yet.
              </div>
            ) : (
              events.map((post) => (
                <div className="post-card" key={post.id}>

                  <div className="post-info">
                    <h3>{post.title}</h3>

                    <p>
                      {formatDate(post.start)}
                    </p>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>

                </div>
              ))
            )}

          </div>
        )}
      </section>

      {/* INSTRUCTION */}
      <div className="instruction">
        Drag and drop a post to another date or time to reschedule it.
      </div>

      {/* CALENDAR */}
      <section className="calendar-section">

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
          events={events}
          eventDrop={handleEventDrop}
          height="auto"

          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}

          buttonText={{
            today: 'today',
            month: 'month',
            week: 'week',
            day: 'day',
          }}

          eventClick={(info) => {
            alert(
              `Selected post: ${info.event.title}\n${info.event.start.toLocaleString()}`
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

              <h2>Add New Post</h2>

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
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Time</label>

              <div className="time-row">

                <select
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                >
                  {Array.from(
                    { length: 12 },
                    (_, index) => {
                      const value = String(index + 1)
                        .padStart(2, '0')

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
                      const value = String(index)
                        .padStart(2, '0')

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

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
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