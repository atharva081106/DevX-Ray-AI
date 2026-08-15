# 🚀 DevX-Ray AI 🔮

**🔥 Analyze. ⚡ Diagnose. 🚀 Upgrade.**

### 🟢 **LIVE DEMO:** [**https://dev-x-ray-ai.vercel.app/**](https://dev-x-ray-ai.vercel.app/) 🟢

DevX-Ray AI is a **mind-blowing** intelligent developer skill analysis platform! It dissects GitHub repositories 🧬, detects deep coding weaknesses 🐛, provides superhuman debugging assistance 🦸‍♂️, and generates hyper-personalized learning roadmaps 🗺️.

![DevX-Ray AI](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green?style=for-the-badge&logo=fastapi)
![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-blue?style=for-the-badge&logo=google)

## ✨ Features

### 🔍 GitHub Repository Analyzer
- Fetch and analyze public GitHub repositories
- Extract code architecture and patterns
- Generate comprehensive project summaries

### 📊 Developer Skill Scoring (0-10 Scale)
- **Architecture Thinking**: Code organization and structure
- **Algorithm Optimization**: Code efficiency
- **Modularity**: Component separation
- **Error Handling**: Exception management
- **Code Readability**: Naming and documentation
- **Maintainability**: Long-term code quality

### 🎯 Static Code Intelligence
- Cyclomatic complexity analysis (via Radon)
- Code quality metrics (via Pylint)
- Function length detection
- Comment density analysis
- Duplicate code detection

### 🤖 AI-Powered Features
- Architecture explanation with Gemini AI
- Personalized 4-week learning roadmaps
- Debug assistant with error explanations
- Refactoring suggestions
- Time complexity analysis

### 🎨 Extraordinary UI
- Futuristic dark theme with glassmorphism
- Neon gradient accents
- Smooth animations with Framer Motion
- Interactive radar charts with Recharts
- Monaco Editor integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

6. Run the backend:
```bash
python main.py
```

Backend will run at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Frontend will run at `http://localhost:3000`

## 🎯 Usage

### Analyze a Repository
1. Open `http://localhost:3000`
2. Enter a GitHub repository URL (e.g., `https://github.com/user/repo`)
3. Click "Analyze Repo"
4. View comprehensive analysis including:
   - Architecture overview
   - Skill radar chart
   - Code weaknesses
   - Personalized learning plan
   - Refactoring suggestions

### Debug Code
1. Click "Debug Code Assistant"
2. Paste your code in the left panel
3. Enter the error message
4. Click "Debug & Fix"
5. Get:
   - Error explanation
   - Root cause analysis
   - Corrected code
   - Optimization tips
   - Time complexity

## 📁 Project Structure

```
devxray-ai/
├── frontend/                 # Next.js frontend
│   ├── app/
│   │   ├── page.tsx         # Landing page
│   │   ├── dashboard/       # Analysis dashboard
│   │   ├── debug/           # Debug assistant
│   │   ├── components/      # React components
│   │   └── globals.css      # Global styles
│   ├── package.json
│   └── ...
│
├── backend/                 # FastAPI backend
│   ├── main.py             # FastAPI app
│   ├── services/
│   │   ├── github_fetcher.py      # GitHub API
│   │   ├── static_analyzer.py     # Code analysis
│   │   └── ai_service.py          # Gemini AI
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Code Editor**: Monaco Editor
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **AI**: Google Gemini Pro
- **Static Analysis**: Radon, Pylint
- **HTTP Client**: aiohttp
- **Language**: Python 3.9+

## 🎨 UI Design Philosophy

DevX-Ray AI features an **extraordinary futuristic design** with:
- Dark theme with deep slate background
- Glassmorphism effects with backdrop blur
- Neon gradient accents (Indigo, Cyan, Yellow, Red)
- Custom fonts: Orbitron (display) & JetBrains Mono (body)
- Smooth micro-interactions
- Animated scan lines and glows
- Holographic effects

## 📊 API Endpoints

### POST `/analyze-repo`
Analyze a GitHub repository
```json
{
  "repo_url": "https://github.com/user/repo"
}
```

### POST `/debug-code`
Debug code with AI assistance
```json
{
  "code": "your_code_here",
  "error_message": "error_message_here"
}
```

### POST `/generate-learning-plan`
Generate personalized learning roadmap

### POST `/refactor-suggestions`
Get refactoring recommendations

## 🔐 Environment Variables

### Backend (.env)
```
GEMINI_API_KEY=your_gemini_api_key
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Render/Railway)
```bash
cd backend
# Deploy using platform-specific CLI
```

## 🎯 Performance

- Repository fetch: < 5 seconds
- Static analysis: < 10 seconds
- AI response: < 5 seconds
- UI latency: < 200ms

## 🔮 Future Roadmap

- [ ] GitHub OAuth integration
- [ ] Skill tracking over time
- [ ] Repository comparison
- [ ] AI mock interviews
- [ ] Resume feedback
- [ ] Multi-language support (Java, JavaScript, C++, Go)
- [ ] VS Code extension
- [ ] Team collaboration features

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, FastAPI, and Gemini AI**

*"This is not just AI explaining code. It's AI upgrading developers."*
