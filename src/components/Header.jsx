import {
  Volume2,
  Moon,
} from "lucide-react";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo and Title */}
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Volume2 size={24} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Text-to-Speech Studio
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Turn your text into natural-sounding speech
            </p>
          </div>

        </div>

        {/* Dark Mode Button */}
        <button
          type="button"
          aria-label="Toggle dark mode"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Moon size={19} />
        </button>

      </div>
    </header>
  );
}

export default Header;