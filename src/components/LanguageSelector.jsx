import { Globe2 } from "lucide-react";

const LANGUAGE_DETAILS = {
  "en-US": {
    name: "English",
    flag: "🇺🇸",
  },
  "hi-IN": {
    name: "Hindi",
    flag: "🇮🇳",
  },
  "gu-IN": {
    name: "Gujarati",
    flag: "🇮🇳",
  },
  "mr-IN": {
    name: "Marathi",
    flag: "🇮🇳",
  },
  "es-ES": {
    name: "Spanish",
    flag: "🇪🇸",
  },
  "fr-FR": {
    name: "French",
    flag: "🇫🇷",
  },
  "de-DE": {
    name: "German",
    flag: "🇩🇪",
  },
};

function LanguageSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
  loading,
}) {
  return (
    <div>
      {/* Section Title */}
      <div className="flex items-center gap-2">
        <Globe2 size={18} className="text-indigo-600" />

        <h4 className="text-sm font-semibold text-slate-800">
          Language
        </h4>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Loading available languages...
          </p>
        </div>
      )}

      {/* Language List */}
      {!loading && languages.length > 0 && (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {languages.map((languageCode) => {
            const language = LANGUAGE_DETAILS[languageCode];

            if (!language) {
              return null;
            }

            const isSelected =
              selectedLanguage === languageCode;

            return (
              <button
                key={languageCode}
                type="button"
                onClick={() =>
                  onLanguageChange(languageCode)
                }
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-2xl">
                  {language.flag}
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {language.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {languageCode}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && languages.length === 0 && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            No languages are currently available.
          </p>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;