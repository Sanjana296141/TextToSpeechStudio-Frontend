import { Download } from "lucide-react";

function DownloadButton({ audioUrl }) {
  const handleDownload = () => {
    if (!audioUrl) {
      return;
    }

    const link = document.createElement("a");

    link.href = audioUrl;
    link.download = `tts-${new Date()
      .toISOString()
      .slice(0, 16)
      .replace("T", "-")
      .replace(":", "")}.mp3`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={!audioUrl}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={18} />

      Download MP3
    </button>
  );
}

export default DownloadButton;