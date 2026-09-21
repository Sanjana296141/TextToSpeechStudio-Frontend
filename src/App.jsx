import { useEffect, useState } from "react";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import LanguageSelector from "./components/LanguageSelector";
import VoiceSelector from "./components/VoiceSelector";
import AudioPlayer from "./components/AudioPlayer";
import DownloadButton from "./components/DownloadButton";
import {
  generateSpeech,
  getVoices,
} from "./services/api";

function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [loadingVoices, setLoadingVoices] = useState(true);
  const [voiceError, setVoiceError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [audioData, setAudioData] = useState(null);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        setLoadingVoices(true);
        setVoiceError("");

        const response = await getVoices();
        const voiceData = response.data;

        if (!Array.isArray(voiceData)) {
          throw new Error(
            "Invalid voice data received from backend."
          );
        }

        setVoices(voiceData);

        if (voiceData.length > 0) {
          setSelectedLanguage(voiceData[0].language);
        }
      } catch (error) {
        console.error(
          "Unable to load voices:",
          error
        );

        setVoiceError(
          "Unable to load languages and voices from the backend."
        );
      } finally {
        setLoadingVoices(false);
      }
    };

    fetchVoices();
  }, []);

  const languages = [
    ...new Set(
      voices
        .map((voice) => voice.language)
        .filter(Boolean)
    ),
  ];

  const filteredVoices = voices.filter(
    (voice) =>
      voice.language === selectedLanguage
  );

  useEffect(() => {
    if (filteredVoices.length > 0) {
      setSelectedVoice(filteredVoices[0].id);
    } else {
      setSelectedVoice("");
    }
  }, [selectedLanguage, voices]);

  const currentVoice = voices.find(
    (voice) => voice.id === selectedVoice
  );

  const handleGenerateSpeech = async () => {
    setGenerationError("");
    setAudioData(null);

    if (!text.trim()) {
      setGenerationError(
        "Please enter some text first."
      );
      return;
    }

    if (!selectedLanguage) {
      setGenerationError(
        "Please select a language."
      );
      return;
    }

    if (!selectedVoice) {
      setGenerationError(
        "Please select a voice."
      );
      return;
    }

    try {
      setIsGenerating(true);

      const requestData = {
        text: text.trim(),
        language: selectedLanguage,
        voice: selectedVoice,
      };

      console.log(
        "Sending TTS request:",
        requestData
      );

      const response =
        await generateSpeech(requestData);

      console.log(
        "TTS response:",
        response.data
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(
          result.error ||
            "Speech generation failed."
        );
      }

      setAudioData(result);
    } catch (error) {
      console.error(
        "Speech generation error:",
        error
      );

      const backendMessage =
        error.response?.data?.error;

      setGenerationError(
        backendMessage ||
          error.message ||
          "Unable to generate speech. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const audioUrl = audioData?.audio_url
    ? `http://127.0.0.1:5000${audioData.audio_url}`
    : "";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Create Speech From Text
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Enter your text, choose a language and voice,
            then generate high-quality speech instantly.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <TextInput
                value={text}
                onChange={setText}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Voice Settings
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Choose your preferred language and voice.
              </p>

              {voiceError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">
                    {voiceError}
                  </p>
                </div>
              )}

              <LanguageSelector
                languages={languages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={
                  setSelectedLanguage
                }
                loading={loadingVoices}
              />

              <VoiceSelector
                voices={filteredVoices}
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                loading={loadingVoices}
              />

              {!loadingVoices &&
                currentVoice && (
                  <div className="mt-5 rounded-xl bg-indigo-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                      Selected Voice
                    </p>

                    <p className="mt-1 text-sm font-semibold text-indigo-900">
                      {currentVoice.name}
                    </p>

                    <p className="mt-1 text-xs text-indigo-700">
                      {currentVoice.gender} •{" "}
                      {currentVoice.accent}
                    </p>
                  </div>
                )}

              {generationError && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">
                    {generationError}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleGenerateSpeech}
                disabled={
                  isGenerating ||
                  !text.trim() ||
                  !selectedLanguage ||
                  !selectedVoice
                }
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating Speech...
                  </>
                ) : (
                  "Generate Speech"
                )}
              </button>
            </div>
          </div>

          {audioData && (
            <div className="mt-8 border-t border-slate-200 pt-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Speech Generated Successfully 🎉
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your MP3 file has been generated by the backend.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <AudioPlayer
                  audioUrl={audioUrl}
                />
              </div>

              <div className="mt-4 flex justify-center sm:justify-end">
                <DownloadButton
                  audioUrl={audioUrl}
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">
                    Language
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {audioData.language}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">
                    Voice
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                    {audioData.voice}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">
                    Estimated Duration
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {audioData.estimated_duration}s
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;