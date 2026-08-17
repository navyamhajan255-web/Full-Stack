import { useState } from "react";

function Dashboard({ onLogout }) {
  const username = localStorage.getItem("username") || "User";

  const savedRole = localStorage.getItem("role") || "Viewer";

  const role =
    savedRole.charAt(0).toUpperCase() +
    savedRole.slice(1).toLowerCase();

  // Load posts from localStorage
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");

    if (savedPosts) {
      return JSON.parse(savedPosts);
    }

    return [
      {
        id: 1,
        title: "My First Post",
        content: "This is my first post."
      },
      {
        id: 2,
        title: "JWT Authentication",
        content: "JWT is used for authentication."
      }
    ];
  });

  const [page, setPage] = useState("posts");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  // Save posts
  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  // =========================
  // CREATE POST
  // =========================

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content
    };

    savePosts([...posts, newPost]);

    setTitle("");
    setContent("");

    setPage("posts");

    alert("Post created successfully.");
  };

  // =========================
  // START EDIT
  // =========================

  const handleEdit = (post) => {
    if (role !== "Admin" && role !== "Editor") {
      alert("You do not have permission to edit posts.");
      return;
    }

    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);

    setPage("edit");
  };

  // =========================
  // UPDATE POST
  // =========================

  const handleUpdate = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content.");
      return;
    }

    const updatedPosts = posts.map((post) =>
      post.id === editingId
        ? {
            ...post,
            title: title,
            content: content
          }
        : post
    );

    savePosts(updatedPosts);

    setEditingId(null);
    setTitle("");
    setContent("");

    setPage("posts");

    alert("Post updated successfully.");
  };

  // =========================
  // DELETE POST
  // =========================

  const handleDelete = (id) => {
    if (role !== "Admin") {
      alert("Only Admin can delete posts.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedPosts = posts.filter(
      (post) => post.id !== id
    );

    savePosts(updatedPosts);

    alert("Post deleted successfully.");
  };

  // =========================
  // CREATE PAGE
  // =========================

  const openCreate = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setPage("create");
  };

  // =========================
  // CANCEL
  // =========================

  const cancelForm = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setPage("posts");
  };

  // =========================
  // POSTS
  // =========================

  const renderPosts = () => {
    return (
      <div className="content-section">
        <h2>Posts</h2>

        {posts.length === 0 ? (
          <div className="empty-posts">
            <p>No posts available.</p>

            {(role === "Admin" || role === "Editor") && (
              <button onClick={openCreate}>
                Create Post
              </button>
            )}
          </div>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post.id}>
              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <div className="post-actions">

                {/* Edit only for Admin and Editor */}
                {(role === "Admin" || role === "Editor") && (
                  <button
                    className="small-button"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                )}

                {/* Delete only for Admin */}
                {role === "Admin" && (
                  <button
                    className="small-button delete-button"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                )}

              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // =========================
  // CREATE / EDIT FORM
  // =========================

  const renderForm = () => {
    const editing = editingId !== null;

    return (
      <div className="content-section">
        <h2>
          {editing ? "Edit Post" : "Create Post"}
        </h2>

        <input
          className="post-input"
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="post-textarea"
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={
            editing
              ? handleUpdate
              : handleCreate
          }
        >
          {editing ? "Update Post" : "Create Post"}
        </button>

        <button
          className="secondary-button"
          onClick={cancelForm}
        >
          Cancel
        </button>
      </div>
    );
  };

  // =========================
  // MANAGE USERS
  // =========================

  const renderUsers = () => {
    return (
      <div className="content-section">
        <h2>Manage Users</h2>

        <div className="user-card">
          <strong>Admin</strong>
          <p>Full access to the system.</p>
        </div>

        <div className="user-card">
          <strong>Editor</strong>
          <p>Can create and edit posts.</p>
        </div>

        <div className="user-card">
          <strong>Viewer</strong>
          <p>Can view posts.</p>
        </div>
      </div>
    );
  };

  // =========================
  // PROFILE
  // =========================

  const renderProfile = () => {
    return (
      <div className="content-section">
        <h2>My Profile</h2>

        <p>
          <strong>Username:</strong> {username}
        </p>

        <p>
          <strong>Role:</strong> {role}
        </p>

        <p>
          <strong>Authentication:</strong> JWT Token Based
        </p>

        <p>
          <strong>Session:</strong> Active
        </p>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <h1 className="dashboard-title">
          JWT Authentication System
        </h1>

        <h2 className="welcome">
          Welcome {username}
        </h2>

        {/* USER INFORMATION */}
        <div className="user-info">
          <p>
            <strong>Username:</strong> {username}
          </p>

          <p>
            <strong>Role:</strong> {role}
          </p>

          <p>
            <strong>Authentication:</strong> JWT Token Based
          </p>

          <p>
            <strong>Session:</strong> Active
          </p>
        </div>

        <h2 className="actions-title">
          Available Actions
        </h2>

        {/* =========================
            ADMIN
        ========================= */}

        {role === "Admin" && (
          <div className="main-actions">

            <button onClick={openCreate}>
              Create Post
            </button>

            <button onClick={() => setPage("posts")}>
              View Posts
            </button>

            <button onClick={() => setPage("users")}>
              Manage Users
            </button>

          </div>
        )}

        {/* =========================
            EDITOR
        ========================= */}

        {role === "Editor" && (
          <div className="main-actions">

            <button onClick={openCreate}>
              Create Post
            </button>

            <button onClick={() => setPage("posts")}>
              View Posts
            </button>

          </div>
        )}

        {/* =========================
            VIEWER
        ========================= */}

        {role === "Viewer" && (
          <div className="main-actions">

            <button onClick={() => setPage("posts")}>
              View Posts
            </button>

            <button onClick={() => setPage("profile")}>
              View Profile
            </button>

          </div>
        )}

        {/* =========================
            CONTENT
        ========================= */}

        {page === "posts" && renderPosts()}

        {page === "create" && renderForm()}

        {page === "edit" && renderForm()}

        {page === "users" && renderUsers()}

        {page === "profile" && renderProfile()}

        {/* LOGOUT */}

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;