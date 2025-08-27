# 🐾 Pet Feeding Tracker

A modern, responsive web application built with React to help pet owners track and manage their pets' feeding schedules. Keep your furry friends happy and healthy with automated reminders and comprehensive feeding history.

## ✨ Features

- **📊 Dashboard**: Real-time overview of feeding status with visual statistics
- **🐕 Pet Management**: Add and manage multiple pets with custom feeding schedules
- **⏰ Smart Scheduling**: Automatic detection of overdue, upcoming, and completed feedings
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **📝 Feeding History**: Complete log of all feeding activities with timestamps
- **🔔 Visual Alerts**: Color-coded status indicators for easy identification
- **🎨 Modern UI**: Clean, intuitive interface built with Tailwind CSS

## 🚀 Demo

[Live Demo]([https://claude.ai/public/artifacts/3329907d-e311-45ca-b16c-7fcb2d588ed7])

## 📱 Screenshots

### Dashboard
![Dashboard Screenshot](screenshots/dashboard.png)

### Pet Management
![Pets Screenshot](screenshots/pets.png)

### Feeding Schedule
![Schedule Screenshot](screenshots/schedule.png)

## 🛠️ Built With

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Beautiful icons
- **JavaScript ES6+** - Modern JavaScript features

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14.0 or higher)
- **npm** or **yarn** package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pet-feeding-tracker.git
   cd pet-feeding-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages**
   ```bash
   npm install lucide-react
   npm install -D tailwindcss postcss autoprefixer
   ```

4. **Initialize Tailwind CSS** (if not already configured)
   ```bash
   npx tailwindcss init -p
   ```

5. **Configure Tailwind CSS**
   Add the following to your `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

6. **Add Tailwind directives**
   Add to your `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## 🚀 Usage

1. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Open your browser**
   Navigate to `http://localhost:3000`

3. **Start tracking your pets' feeding schedule!**

## 📁 Project Structure

```
pet-feeding-tracker/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── PetFeedingTracker.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── README.md
└── screenshots/
    ├── dashboard.png
    ├── pets.png
    └── schedule.png
```

## 🔧 Configuration

### Adding New Pets

The application comes with sample pets (Whiskers the cat and Buddy the dog). You can modify the initial data in the `PetFeedingTracker.jsx` file:

```javascript
const [pets, setPets] = useState([
  { 
    id: 1, 
    name: 'Your Pet Name', 
    avatar: '🐱', // Change emoji
    schedule: [
      { time: '07:00', amount: '1 cup', completed: false },
      { time: '19:00', amount: '1 cup', completed: false }
    ]
  }
]);
```

### Customizing Feeding Times

Modify the schedule array to match your pets' feeding routine:
- **time**: 24-hour format (HH:MM)
- **amount**: Feeding portion description
- **completed**: Automatically managed by the app

## 🎯 How to Use

1. **Dashboard**: View overall feeding status and quick actions
2. **My Pets**: Manage your pets and their feeding schedules
3. **Schedules**: See today's complete feeding timeline
4. **History**: Review past feeding activities
5. **Mark Fed**: Click buttons to log completed feedings

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the project**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling consistency
- Ensure responsive design works on all devices
- Add comments for complex logic
- Test your changes thoroughly

## 🐛 Issues and Bugs

Found a bug? Have a feature request? Please [open an issue](https://github.com/nnan0624/pet-feeding-tracker/issues) with:
- Clear description of the problem or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- **Lucide React** for the beautiful icon set
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing framework
- Pet owners worldwide who inspired this project! 🐾

## 📞 Contact

**Project Link**: [https://github.com/nnan0624/pet-feeding-tracker](https://github.com/yourusername/pet-feeding-tracker)

---

### 🌟 If you find this project helpful, please give it a star on GitHub!

**Made with ❤️ for pet lovers everywhere**
