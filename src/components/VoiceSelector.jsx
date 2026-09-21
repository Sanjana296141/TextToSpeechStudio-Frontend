import { Mic2, UserRound } from "lucide-react";

function VoiceSelector({
  voices,
  selectedVoice,
  onVoiceChange,
  loading,
}) {
  if (loading) {
    return (
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Mic2 size={18} className="text-indigo-600" />

          <h4 className="text-sm font-semibold text-slate-800">
            Voice
          </h4>
        </div>

        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Loading available voices...
          </p>
        </div>
      </div>
    );
  }

  if (voices.length === 0) {
    return (
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Mic2 size={18} className="text-indigo-600" />

          <h4 className="text-sm font-semibold text-slate-800">
            Voice
          </h4>
        </div>

        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            No voices are available for this language.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Section Title */}
      <div className="flex items-center gap-2">
        <Mic2 size={18} className="text-indigo-600" />

        <h4 className="text-sm font-semibold text-slate-800">
          Voice
        </h4>
      </div>

      {/* Voice Cards */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {voices.map((voice) => {
          const isSelected = selectedVoice === voice.id;

          return (
            <button
              key={voice.id}
              type="button"
              onClick={() => onVoiceChange(voice.id)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                  : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
              }`}
            >
              {/* Voice Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isSelected
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <UserRound size={19} />
              </div>

              {/* Voice Information */}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {voice.name}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {voice.gender} • {voice.accent}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VoiceSelector;