import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.load();

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Unable to play audio:", error);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;

    if (!audio || !duration) {
      return;
    }

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (event) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const newVolume = Number(event.target.value);

    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.volume > 0) {
      audio.dataset.previousVolume = String(audio.volume);
      audio.volume = 0;
      setVolume(0);
    } else {
      const previousVolume =
        Number(audio.dataset.previousVolume) || 1;

      audio.volume = previousVolume;
      setVolume(previousVolume);
    }
  };

  const handlePlaybackRateChange = (event) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const newRate = Number(event.target.value);

    audio.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? (
            <Pause size={21} />
          ) : (
            <Play
              size={21}
              className="ml-0.5"
            />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span>{formatTime(currentTime)}</span>

            <span>{formatTime(duration)}</span>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onChange={handleSeek}
            className="w-full cursor-pointer accent-indigo-600"
            aria-label="Audio progress"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            className="text-slate-600 transition hover:text-indigo-600"
            aria-label={volume === 0 ? "Unmute audio" : "Mute audio"}
          >
            {volume === 0 ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-28 cursor-pointer accent-indigo-600"
            aria-label="Volume"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="playback-speed"
            className="text-xs font-medium text-slate-500"
          >
            Speed
          </label>

          <select
            id="playback-speed"
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="1.75">1.75x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;