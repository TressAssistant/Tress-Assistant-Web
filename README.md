# Tress Assistant Web

Tress Assistant is an advanced 3D visualization tool that lets you preview new hair colors and styles before making a change. Experiment with a variety of looks under different environments and lighting conditions, explore both natural and creative options, and find the perfect match for your personality—all in an intuitive, user-friendly, and mobile-friendly interface. Discover confidence in your next hair transformation with Tress Assistant.

## Features

- 🌞 Realistic lighting and environment simulation (time, latitude, solar declination, and more)
- 👤 Customizable head models (male/female) with adjustable skin tones
- 💇‍♂️ Multiple hair styles and a wide range of natural and creative hair colors
- 🔄 Interactive 3D controls: rotate, zoom, and pan
- ⚙️ Advanced rendering options: axes helper, FPS limiter, and stats
- 💾 User settings persisted locally
- 🔒 Privacy: No login or account required, no 3rd-party trackings, no ads, all data stays on your device

## Getting Started

### Prerequisites

- **Node.js v20** (recommended)
- **npm** (comes with Node.js)

### Installation

```sh
# Clone the repository
git clone https://github.com/TressAssistant/Tress-Assistant-Web
cd Tress-Assistant-Web

# Install dependencies
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Caching 3D Models

To optimize loading of 3D models, configure your server to set the following cache headers for files in `/public/models`:

```text
Cache-Control: public, max-age=31536000, immutable
```

## Project Structure

```text
├── public/
│   ├── fonts/           # Custom font files
│   ├── images/          # UI and preview images
│   ├── models/          # 3D model files (.glb)
│   └── robots.txt
├── textures/            # Texture assets
├── src/
│   ├── blocks/          # UI blocks and overlays
│   ├── components/      # Reusable UI components
│   ├── enums/           # Enumerations for options
│   ├── environment/     # Lighting and environment logic
│   ├── objects/         # 3D object components
│   ├── pages/           # Page components (Home, etc.)
│   ├── services/        # Utility and simulation logic
│   ├── stores/          # Zustand state management
│   └── styles/          # Tailwind and global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## Credits

See the **About** tab in the app for model and library attributions.

## License

This project is licensed under the MIT License.

---

Made with ❤️ using [React](https://react.dev/), [Three.js](https://threejs.org/), and [Vite](https://vitejs.dev/).
