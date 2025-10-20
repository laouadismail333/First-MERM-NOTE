import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm mb-6 text-primary hover:underline"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-xl border-t-4 border-primary">
          <div className="card-body">
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
              Create a New Note 📝
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium text-base-content">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your note title..."
                  className="input input-bordered w-full focus:input-primary"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium text-base-content">
                    Content
                  </span>
                </label>
                <textarea
                  placeholder="Write your thoughts here..."
                  className="textarea textarea-bordered w-full h-40 resize-none focus:textarea-primary"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary px-6"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
