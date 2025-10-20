import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, SaveIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note:", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="btn btn-outline gap-2">
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error gap-2"
          >
            <Trash2Icon className="h-5 w-5" />
            Delete
          </button>
        </div>

        {/* Note Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body space-y-8">
            <h2 className="text-2xl font-semibold text-center text-primary">
              Edit Note
            </h2>

            {/* Title input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Title
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter a catchy note title..."
                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            {/* Content input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Content
                </span>
              </label>
              <textarea
                placeholder="Start writing your note..."
                className="textarea textarea-bordered w-full rounded-xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                value={note.content}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })
                }
              />
            </div>

            <div className="card-actions justify-end">
              <button
                className={`btn btn-primary gap-2 ${saving ? "loading" : ""}`}
                onClick={handleSave}
                disabled={saving}
              >
                <SaveIcon className="h-5 w-5" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
