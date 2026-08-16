import { useState } from "react";

function Dashboard({ onLogout }) {
  const username = localStorage.getItem("username") || "User";

  // Role ko safely normalize kar rahe hain
  const savedRole = localStorage.getItem("role") || "Viewer";
  const role =
    savedRole.charAt(0).toUpperCase() +
    savedRole.slice(1).toLowerCase();

  // Posts localStorage se load honge
  const getInitialPosts = () => {
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
  };

  const [posts, setPosts] = useState(getInitialPosts);

  const [section, setSection] = useState("posts");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  // Save posts in localStorage
  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  // =========================
  // CREATE POST
  // =========================

  const createPost = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Please enter title and content.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content
    };

    const newPosts = [...posts, newPost];

    savePosts(newPosts);

    setTitle("");
    setContent("");

    setSection("posts");

    alert("Post created successfully.");
  };

  // =========================
  // OPEN EDIT
  // =========================

  const editPost = (post) => {
    if (role !== "Admin" && role !== "Editor") {
      alert("You do not have permission to edit posts.");
      return;
    }

    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);

    setSection("edit");
  };

  // =========================
  // UPDATE POST
  // =========================

  const updatePost = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Please enter title and content.");
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === editingId) {
        return {
          ...post,
          title: title,
          content: content
        };
      }

      return post;
    });

    savePosts(updatedPosts);

    setEditingId(null);
    setTitle("");
    setContent("");

    setSection("posts");

    alert("Post updated successfully.");
  };

  // =========================
  // DELETE POST
  // =========================

  const deletePost = (id) => {
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
  // CREATE FORM
  // =========================

  const openCreateForm = () => {
    setEditingId(null);
    setTitle("");
    setContent("");

    setSection("create");
  };

  // =========================
  // CANCEL
  // =========================

  const cancelForm = () => {
    setEditingId(null);
    setTitle("");
    setContent("");

    setSection("posts");
  };

  // =========================
  // POSTS SECTION
  // =========================

  const renderPosts = () => {
    return (
      <div className="posts-section">

        <h3>Posts</h3>

        {posts.length === 0 ? (
          <div>
            <p>No posts available.</p>

            {(role === "Admin" || role === "Editor") && (
              <button onClick={openCreateForm}>
                Create Your First Post
              </button>
            )}
          </div>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post.id}>

              <h4>{post.title}</h4>

              <p>{post.content}</p>

              <div className="post-buttons">

                {(role === "Admin" || role === "Editor") && (
                  <button
                    onClick={() => editPost(post)}
                  >
                    Edit
                  </button>
                )}

                {role === "Admin" && (
                  <button
                    onClick={() => deletePost(post.id)}
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
    const isEditing = editingId !== null;

    return (
      <div className="form-section">

        <h3>
          {isEditing
            ? "Edit Post"
            : "Create Post"}
        </h3>

        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Enter post content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows="5"
        />

        <button
          onClick={
            isEditing
              ? updatePost
              : createPost
          }
        >
          {isEditing
            ? "Update Post"
            : "Create Post"}
        </button>

        <button onClick={cancelForm}>
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
      <div className="users-section">

        <h3>Manage Users</h3>

        <div className="user-card">
          <p>
            <strong>Username:</strong> admin
          </p>

          <p>
            <strong>Role:</strong> Admin
          </p>
        </div>

        <div className="user-card">
          <p>
            <strong>Username:</strong> editor
          </p>

          <p>
            <strong>Role:</strong> Editor
          </p>
        </div>

        <div className="user-card">
          <p>
            <strong>Username:</strong> viewer
          </p>

          <p>
            <strong>Role:</strong> Viewer
          </p>
        </div>

      </div>
    );
  };

  // =========================
  // PROFILE
  // =========================

  const renderProfile = () => {
    return (
      <div className="profile-section">

        <h3>User Profile</h3>

        <p>
          <strong>Username:</strong>{" "}
          {username}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {role}
        </p>

        <p>
          <strong>Authentication:</strong>{" "}
          JWT Token Based
        </p>

        <p>
          <strong>Session:</strong> Active
        </p>

      </div>
    );
  };

  return (
    <div className="container">

      <div className="card">

        <h1 className="title">
          JWT Authentication System
        </h1>

        <h2 className="subtitle">
          Welcome {username}
        </h2>

        <div className="info">

          <p>
            <strong>Username:</strong>{" "}
            {username}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {role}
          </p>

          <p>
            <strong>Authentication:</strong>{" "}
            JWT Token Based
          </p>

          <p>
            <strong>Session:</strong> Active
          </p>

        </div>

        <h3 className="role-title">
          Available Actions
        </h3>

        <div className="actions">

          {/* ADMIN ACTIONS */}

          {role === "Admin" && (
            <>
              <button onClick={openCreateForm}>
                Create Post
              </button>

              <button
                onClick={() =>
                  setSection("posts")
                }
              >
                Edit Post
              </button>

              <button
                onClick={() =>
                  setSection("posts")
                }
              >
                Delete Post
              </button>

              <button
                onClick={() =>
                  setSection("users")
                }
              >
                Manage Users
              </button>

              <button
                onClick={() =>
                  setSection("posts")
                }
              >
                View Posts
              </button>
            </>
          )}

          {/* EDITOR ACTIONS */}

          {role === "Editor" && (
            <>
              <button onClick={openCreateForm}>
                Create Post
              </button>

              <button
                onClick={() =>
                  setSection("posts")
                }
              >
                Edit Post
              </button>

              <button
                onClick={() =>
                  setSection("posts")
                }
              >
                View Posts
              </button>
            </>
          )}

          {/* VIEWER ACTIONS */}

          {role === "Viewer" && (
            <>
              <button
                onClick={() =>
                  setSection("posts")
                }
              >
                View Posts
              </button>

              <button
                onClick={() =>
                  setSection("profile")
                }
              >
                View Profile
              </button>
            </>
          )}

        </div>

        {/* CONTENT */}

        {section === "posts" &&
          renderPosts()}

        {section === "create" &&
          renderForm()}

        {section === "edit" &&
          renderForm()}

        {section === "users" &&
          renderUsers()}

        {section === "profile" &&
          renderProfile()}

        <button onClick={onLogout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;