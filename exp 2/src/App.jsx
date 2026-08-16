import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addPost,
  deletePost,
  updatePost,
} from "./store/postsSlice";

import {
  addPlatform,
  deletePlatform,
} from "./store/platformsSlice";

import {
  addDraft,
  deleteDraft,
} from "./store/draftsSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  // Posts from Redux Store
  const posts = useSelector((state) =>
    state.posts.ids.map((id) => state.posts.entities[id])
  );

  // Platforms from Redux Store
  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  // Drafts from Redux Store
  const drafts = useSelector(
    (state) => state.drafts.drafts
  );

  // Post form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Platform form
  const [platformName, setPlatformName] = useState("");

  // Draft form
  const [draftText, setDraftText] = useState("");

  // Clear post form
  const clearPostForm = () => {
    setTitle("");
    setContent("");
    setSelectedPlatform("");
    setEditingId(null);
  };

  // Add Post
  const handleAddPost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    dispatch(
      addPost({
        id: Date.now(),
        title: title,
        content: content,
        platform: selectedPlatform,
      })
    );

    clearPostForm();
  };

  // Update Post
  const handleUpdatePost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    dispatch(
      updatePost({
        id: editingId,
        changes: {
          title: title,
          content: content,
          platform: selectedPlatform,
        },
      })
    );

    clearPostForm();
  };

  // Edit Post
  const handleEditPost = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setSelectedPlatform(post.platform || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add Platform
  const handleAddPlatform = () => {
    if (!platformName.trim()) {
      alert("Please enter platform name");
      return;
    }

    dispatch(
      addPlatform({
        id: Date.now(),
        name: platformName,
      })
    );

    setPlatformName("");
  };

  // Add Draft
  const handleAddDraft = () => {
    if (!draftText.trim()) {
      alert("Please enter draft text");
      return;
    }

    dispatch(
      addDraft({
        id: Date.now(),
        text: draftText,
      })
    );

    setDraftText("");
  };

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">
        <p className="eyebrow">REDUX TOOLKIT PROJECT</p>

        <h1>Redux Post Manager</h1>

        <p className="subtitle">
          Manage posts, platforms and drafts.
        </p>
      </header>


      {/* STATS */}

      <section className="stats">

        <div className="stat-card">
          <strong>{posts.length}</strong>
          <small>Total Posts</small>
        </div>

        <div className="stat-card">
          <strong>{platforms.length}</strong>
          <small>Platforms</small>
        </div>

        <div className="stat-card">
          <strong>{drafts.length}</strong>
          <small>Drafts</small>
        </div>

      </section>


      {/* ADD / EDIT POST */}

      <section className="card">

        <div className="card-heading">
          <h2>
            {editingId ? "Edit Post" : "Add Post"}
          </h2>

          <p>
            {editingId
              ? "Update your post"
              : "Create a new post"}
          </p>
        </div>


        <div className="form-group">

          <label>Post Title</label>

          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>


        <div className="form-group">

          <label>Content</label>

          <textarea
            placeholder="Enter post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

        </div>


        <div className="form-group">

          <label>Platform</label>

          <select
            value={selectedPlatform}
            onChange={(e) =>
              setSelectedPlatform(e.target.value)
            }
          >

            <option value="">
              Select Platform
            </option>

            {platforms.map((platform) => (
              <option
                key={platform.id}
                value={platform.name}
              >
                {platform.name}
              </option>
            ))}

          </select>

        </div>


        {editingId ? (

          <div>

            <button
              className="primary-btn"
              onClick={handleUpdatePost}
            >
              Update Post
            </button>

            <button
              className="secondary-btn"
              onClick={clearPostForm}
            >
              Cancel
            </button>

          </div>

        ) : (

          <button
            className="primary-btn"
            onClick={handleAddPost}
          >
            Add Post
          </button>

        )}

      </section>


      {/* POSTS */}

      <section className="card">

        <div className="section-title">

          <h2>Posts</h2>

          <p>
            Posts stored in Redux state
          </p>

        </div>


        {posts.length === 0 ? (

          <div className="empty-state">

            <p>No posts added yet.</p>

          </div>

        ) : (

          <div className="post-list">

            {posts.map((post) => (

              <div
                className="post-item"
                key={post.id}
              >

                <h3>{post.title}</h3>

                <p className="post-content">
                  {post.content}
                </p>

                {post.platform && (

                  <span className="platform-tag">
                    {post.platform}
                  </span>

                )}

                <div className="post-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEditPost(post)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      dispatch(deletePost(post.id))
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* PLATFORMS */}

      <section className="card">

        <div className="section-title">

          <h2>Platforms</h2>

          <p>
            Add platforms for your posts
          </p>

        </div>


        <div className="inline-form">

          <input
            type="text"
            placeholder="Enter platform name"
            value={platformName}
            onChange={(e) =>
              setPlatformName(e.target.value)
            }
          />

          <button
            className="primary-btn"
            onClick={handleAddPlatform}
          >
            Add
          </button>

        </div>


        <div className="platform-list">

          {platforms.length === 0 ? (

            <p className="muted">
              No platforms added yet.
            </p>

          ) : (

            platforms.map((platform) => (

              <div
                className="platform-item"
                key={platform.id}
              >

                <span className="platform-name">
                  {platform.name}
                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch(
                      deletePlatform(platform.id)
                    )
                  }
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </section>


      {/* DRAFTS */}

      <section className="card">

        <div className="section-title">

          <h2>Drafts</h2>

          <p>
            Save post ideas for later
          </p>

        </div>


        <textarea
          placeholder="Write your draft here..."
          value={draftText}
          onChange={(e) =>
            setDraftText(e.target.value)
          }
        />


        <br />
        <br />


        <button
          className="primary-btn"
          onClick={handleAddDraft}
        >
          Save Draft
        </button>


        <div className="draft-list">

          {drafts.length === 0 ? (

            <p className="muted">
              No drafts saved yet.
            </p>

          ) : (

            drafts.map((draft) => (

              <div
                className="draft-item"
                key={draft.id}
              >

                <p>{draft.text}</p>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch(
                      deleteDraft(draft.id)
                    )
                  }
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </section>


      <footer>
        React + Redux Toolkit
      </footer>

    </div>
  );
}

export default App;