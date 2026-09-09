# Online Quiz System

A dynamic, responsive, and interactive online quiz system built with HTML, CSS, JavaScript frontend and Node.js/Express backend.

## Features

✨ **Key Features:**
- 📱 **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Interactive UI** - Smooth animations and transitions for engaging user experience
- 📊 **Real-time Progress Tracking** - Visual progress bar and question counter
- 🎯 **Instant Results** - Detailed score display and answer review
- ⚡ **Dynamic Content** - Quiz questions loaded from backend API
- 💾 **Auto-save** - Quiz progress auto-saves every 30 seconds
- 🎓 **Multiple Quizzes** - Support for multiple quiz categories
- 🔒 **Secure** - Protected answer verification on backend

## Project Structure

```
Online Quiz System/
├── server.js              # Express server entry point
├── package.json           # Project dependencies
├── routes/
│   └── quiz.js           # Quiz API routes
├── data/
│   └── quizzes.js        # Quiz data
├── public/
│   ├── index.html        # Main HTML file
│   ├── css/
│   │   └── style.css     # Responsive styles
│   └── js/
│       └── script.js     # Interactive functionality
└── README.md             # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Navigate to project directory:**
   ```bash
   cd "Online Quiz System"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Usage

### For Development (with auto-reload)
```bash
npm run dev
```
This requires `nodemon` to be installed (included in devDependencies).

### API Endpoints

#### Get All Quizzes
- **GET** `/api/quizzes`
- Returns: Array of quiz metadata (title, description, totalQuestions)

#### Get Quiz Details
- **GET** `/api/quizzes/:id`
- Returns: Complete quiz with questions and options (answers not included)

#### Submit Quiz Answers
- **POST** `/api/submit-quiz`
- Request Body: `{ quizId: number, answers: number[] }`
- Returns: Score, percentage, and detailed results

## Features Breakdown

### Frontend Features
1. **Navigation** - Easy navigation between Home, Quizzes, and About pages
2. **Responsive Grid** - Quiz cards automatically adjust to screen size
3. **Progress Tracking** - Visual progress bar during quiz
4. **Interactive Options** - Hover effects and smooth transitions
5. **Results Display** - Color-coded results (green for correct, red for incorrect)
6. **Mobile Optimization** - Touch-friendly interface with optimized spacing

### Backend Features
1. **RESTful API** - Clean API endpoints for frontend communication
2. **Quiz Management** - Easy-to-add quiz data structure
3. **Answer Verification** - Secure server-side answer checking
4. **Score Calculation** - Automatic percentage calculation
5. **Error Handling** - Comprehensive error responses

## Customization

### Adding New Quizzes
Edit `data/quizzes.js` and add new quiz objects:

```javascript
{
  id: 3,
  title: "Your Quiz Title",
  description: "Quiz description",
  questions: [
    {
      id: 1,
      question: "Question text?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0  // Index of correct option
    }
  ]
}
```

### Styling Customization
Edit `public/css/style.css` to customize:
- Colors (see `:root` CSS variables)
- Fonts and sizing
- Animations and transitions
- Layout and spacing

### Adding More Features
1. **User Authentication** - Add login/registration
2. **Database** - Replace data/quizzes.js with MongoDB/PostgreSQL
3. **Leaderboard** - Track high scores
4. **Certificates** - Generate certificates for passing scores
5. **Timer** - Add time limits to quizzes

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Desktop:** 1200px and above
- **Tablet:** 768px to 1199px
- **Mobile:** 480px to 767px
- **Small Mobile:** Below 480px

## Performance Optimization

- Minified CSS for faster load times
- Async API calls prevent UI blocking
- Progress tracking with localStorage auto-save
- Optimized animations for smooth 60fps performance
- Lazy loading of quiz data

## Keyboard Shortcuts

- **H** - Go to Home page
- **Q** - Go to Quizzes page
- **Tab** - Navigate between options
- **Enter/Space** - Select option

## Troubleshooting

### Port Already in Use
Change the port in `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change 3001 to desired port
```

### CORS Issues
The server is configured to serve static files from the `public` directory. No CORS headers needed.

### Quiz Data Not Loading
1. Verify `data/quizzes.js` exists
2. Check browser console for error messages
3. Verify server is running on correct port

## Future Enhancements

- [ ] User accounts and progress tracking
- [ ] Database integration
- [ ] Admin panel for quiz management
- [ ] Question categories with filtering
- [ ] Difficulty levels
- [ ] Social sharing of results
- [ ] PDF certificate generation
- [ ] Analytics dashboard

## License

This project is open-source and available under the ISC License.

## Support

For issues or questions, please check the code comments or refer to the main source files.

---

**Created:** 2024  
**Last Updated:** April 2026

Enjoy using Quiz Master! 🎯
