# 🎙️ Text-to-Speech Studio — Frontend

A modern and responsive React frontend for **Text-to-Speech Studio**, a web application that converts written text into speech and allows users to listen to and download the generated MP3 audio.

The frontend communicates with a Flask REST API using Axios.

---

## 🚀 Features

- Modern responsive UI
- React-based component architecture
- Text-to-speech generation
- Character counter
- Word counter
- Language selection
- Voice selection
- Backend API integration
- Custom audio player
- Play/Pause controls
- Audio progress/seek control
- Volume control
- Mute/Unmute
- Playback speed control
- MP3 download
- Loading states
- Error handling
- Responsive design
- Mobile-friendly layout

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend framework |
| JavaScript | Application logic |
| Tailwind CSS | UI styling |
| Axios | API communication |
| Lucide React | Icons |
| Vite | Development/build tool |
| HTML5 Audio API | Audio playback |

---

## 📁 Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AudioPlayer.jsx
│   │   ├── DownloadButton.jsx
│   │   ├── Header.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── TextInput.jsx
│   │   └── VoiceSelector.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Requirements

Make sure you have:

- Node.js
- npm
- Git

Check your versions:

```bash
node --version
npm --version
```

---

# 🔧 Installation

## 1. Clone the repository

```bash
git clone https://github.com/Sanjana296141/TextToSpeechStudio-Frontend.git
```

## 2. Navigate to the project

```bash
cd TextToSpeechStudio-Frontend
```

## 3. Install dependencies

```bash
npm install
```

---

# 🔐 Environment Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

The `.env` file is excluded from Git.

For sharing the project, developers can create their own `.env` using the required API URL.

---

# ▶️ Running the Frontend

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

Make sure the Flask backend is running at the same time.

---

# 🔗 Backend Integration

The frontend communicates with the Flask backend through Axios.

API configuration is located at:

```text
src/services/api.js
```

The frontend currently communicates with endpoints such as:

```text
GET  /api/voices
POST /api/tts
```

---

# 🎨 Main Components

## TextInput

Handles:

- Text entry
- Character count
- Word count
- Text validation
- Clear/input interactions

---

## LanguageSelector

Allows users to select the desired language.

Currently supported languages include:

- 🇺🇸 English
- 🇮🇳 Hindi
- 🇮🇳 Gujarati
- 🇮🇳 Marathi
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German

---

## VoiceSelector

Displays available voices based on the selected language.

Each voice displays information such as:

- Name
- Gender
- Accent

---

## AudioPlayer

Provides custom audio controls:

- Play
- Pause
- Seek
- Volume
- Mute
- Playback speed

Supported playback speeds:

```text
0.5x
0.75x
1x
1.25x
1.5x
1.75x
2x
```

---

## DownloadButton

Allows users to download the generated speech as an MP3 file.

Downloaded files use a timestamp-based filename such as:

```text
tts-2026-09-21-1506.mp3
```

---

# 🔄 Application Flow

```text
User enters text
       ↓
Select language
       ↓
Select voice
       ↓
Click "Generate Speech"
       ↓
React sends POST /api/tts
       ↓
Flask processes the request
       ↓
Speech is generated
       ↓
Backend returns audio URL
       ↓
React loads the MP3
       ↓
User plays or downloads audio
```

---

# 🧪 Testing

Start the frontend:

```bash
npm run dev
```

Start the backend separately:

```bash
python app.py
```

Then open:

```text
http://localhost:5173
```

Test:

1. Enter text.
2. Select a language.
3. Select a voice.
4. Click **Generate Speech**.
5. Play the generated audio.
6. Test seek, volume, mute, and playback speed.
7. Download the MP3 file.

---

# 📱 Responsive Design

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The main layout changes from a two-column desktop layout to a single-column mobile layout.

---

# 🔮 Future Improvements

Planned frontend improvements include:

- Dark mode
- Toast notifications
- Skeleton loading states
- Copy-to-clipboard
- Generation history
- Better waveform visualization
- Voice preview
- Advanced voice controls
- Authentication
- User dashboard
- Production deployment

---

## 👩‍💻 Author

**Sanjana**

Text-to-Speech Studio — Frontend
