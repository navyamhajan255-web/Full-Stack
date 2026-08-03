import { useState } from "react";

function PostComposer() {
  const [post, setPost] = useState("");
  const [platform, setPlatform] = useState("Twitter");

  const limits = {
    Twitter: 280,
    Facebook: 63206,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const handlePublish = () => {
    if (post.trim() === "") {
      alert("Please write something before publishing.");
      return;
    }

    if (post.length > limits[platform]) {
      alert("Character limit exceeded!");
      return;
    }

    alert("Post Published Successfully!");

    setPost("");
    setPlatform("Twitter");
  };

  return (
    <div className="container">
      <h2>📱 Dynamic Multi Platform Post Composer</h2>

      <label>Select Platform:</label>

      <br />
      <br />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter</option>
        <option>Facebook</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
      </select>

      <br />
      <br />

      <textarea
        rows="8"
        cols="50"
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      <br />
      <br />

      <label>Upload Image/Video:</label>

      <br />
      <br />

      <input
        type="file"
        accept="image/*,video/*"
      />

      <br />
      <br />

      <p className="counter">
        Characters: {post.length} / {limits[platform]}
      </p>

      <p>
        Selected Platform: {platform}
      </p>

      {post.length > limits[platform] && (
        <p className="error">
          Character limit exceeded for {platform}
        </p>
      )}

      <br />

      <button onClick={handlePublish}>
        Publish Post
      </button>
    </div>
  );
}

export default PostComposer;