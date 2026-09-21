import { Clipboard, Eraser } from "lucide-react";

const MAX_TEXT_LENGTH = 5000;

function TextInput({ value, onChange }) {
  const characterCount = value.length;

  const wordCount = value.trim()
    ? value.trim().split(/\s+/).length
    : 0;

  const progressPercentage =
    (characterCount / MAX_TEXT_LENGTH) * 100;

  const isNearLimit = progressPercentage >= 90;

  const handleClear = () => {
    onChange("");
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();

      const remainingCharacters =
        MAX_TEXT_LENGTH - characterCount;

      const textToPaste = clipboardText.slice(
        0,
        remainingCharacters
      );

      onChange(value + textToPaste);
    } catch (error) {
      console.error("Unable to paste text:", error);
    }
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Your Text
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Enter or paste the text you want to convert into speech.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Clipboard size={15} />
            Paste
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={!value}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Eraser size={15} />
            Clear
          </button>
        </div>
      </div>

      {/* Textarea */}
      <div className="mt-4">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Type or paste your text here..."
          maxLength={MAX_TEXT_LENGTH}
          rows={12}
          className={`w-full resize-none rounded-xl border bg-white p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
            isNearLimit
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
          }`}
        />
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-200 ${
            isNearLimit
              ? "bg-red-500"
              : "bg-indigo-600"
          }`}
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>

      {/* Statistics */}
      <div className="mt-2 flex items-center justify-between text-xs">
        <div className="flex gap-4">
          <span className="text-slate-500">
            Characters:{" "}
            <span className="font-medium text-slate-700">
              {characterCount}
            </span>
          </span>

          <span className="text-slate-500">
            Words:{" "}
            <span className="font-medium text-slate-700">
              {wordCount}
            </span>
          </span>
        </div>

        <span
          className={
            isNearLimit
              ? "font-semibold text-red-600"
              : "text-slate-500"
          }
        >
          {characterCount} / {MAX_TEXT_LENGTH}
        </span>
      </div>

      {/* Warning */}
      {isNearLimit && (
        <p className="mt-2 text-xs font-medium text-red-600">
          You are close to the 5000 character limit.
        </p>
      )}
    </div>
  );
}

export default TextInput;