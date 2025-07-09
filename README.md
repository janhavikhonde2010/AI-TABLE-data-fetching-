# AI Lead Analytics Dashboard

A beautiful, modern lead search and analytics application built with React, TypeScript, and TailwindCSS. Search and analyze leads by date with real-time insights and performance metrics.

## ✨ Features

- **Date-based Lead Search**: Search leads by specific dates
- **Real-time Analytics**: View lead quality, scores, and suggestions
- **Beautiful UI**: Modern design with glass morphism effects
- **Responsive Design**: Works perfectly on all screen sizes
- **Performance Metrics**: Average scores and quality insights
- **Dark Mode Support**: Automatic dark/light theme switching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- AI Table account with API access

### Installation

1. **Clone and install dependencies**:

```bash
git clone <your-repo>
cd ai-lead-analytics
npm install
```

2. **Set up environment variables**:

```bash
cp .env.example .env
```

Edit `.env` with your AI Table credentials:

```env
VITE_AI_TABLE_ID=your_table_id_here
VITE_AI_API_TOKEN=your_api_token_here
```

3. **Start the development server**:

```bash
npm run dev
```

4. **Open your browser** to `http://localhost:8080`

## 🔧 Configuration

### AI Table Setup

1. Sign up for an account at [aitable.ai](https://aitable.ai)
2. Create a new datasheet with the following columns:
   - `Date` (Date field)
   - `Name` (Single line text)
   - `Lead Quality` (Single select: High, Medium, Low)
   - `Lead Score` (Number field)
   - `Suggestion` (Long text)
3. Get your API token from the AI Table dashboard
4. Copy your datasheet ID from the URL
5. Add both to your `.env` file

### Environment Variables

| Variable            | Description                | Required |
| ------------------- | -------------------------- | -------- |
| `VITE_AI_TABLE_ID`  | Your AI Table datasheet ID | Yes      |
| `VITE_AI_API_TOKEN` | Your AI Table API token    | Yes      |

## 🎨 Design System

The application uses a modern design system with:

- **Primary Color**: Blue (#6366F1) - Modern and professional
- **Glass Morphism**: Subtle transparency effects
- **Smooth Animations**: Micro-interactions for better UX
- **Responsive Grid**: Adapts to all screen sizes
- **Typography**: Clean, readable fonts with proper hierarchy

## 📱 Screenshots

### Desktop View

![Desktop Dashboard](./docs/desktop-view.png)

### Mobile View

![Mobile Dashboard](./docs/mobile-view.png)

## 🛠️ Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run test       # Run tests
npm run typecheck  # TypeScript validation
```

### Project Structure

```
client/
├── components/ui/     # Reusable UI components
├── pages/            # Application pages
├── lib/              # Utilities and helpers
└── global.css        # Global styles and theme

server/               # Express API backend
├── routes/           # API endpoints
└── index.ts          # Server configuration

shared/               # Shared types and interfaces
└── api.ts            # API type definitions
```

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS 3 + Radix UI
- **Backend**: Express.js + TypeScript
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🔒 Security Notes

- API tokens are handled client-side for this demo
- For production, consider moving API calls to the backend
- Always use environment variables for sensitive data
- Enable CORS protection in production

## 📊 API Integration

The app integrates with AI Table's REST API:

```typescript
// Example API call
const response = await axios.get(
  `https://aitable.ai/fusion/v1/datasheets/${tableId}/records?filter=date=${date}`,
  {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  },
);
```

### Rate Limits

AI Table API has rate limiting. The app handles:

- 429 responses with user-friendly messages
- Automatic retry suggestions
- Error state management

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/spa`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel

1. Import your repository to Vercel
2. Framework preset: `Vite`
3. Add environment variables
4. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [AI Table](https://aitable.ai) for the powerful API
- [Radix UI](https://radix-ui.com) for accessible components
- [TailwindCSS](https://tailwindcss.com) for utility-first styling
- [Lucide](https://lucide.dev) for beautiful icons

---


