const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load quizzes from data.json
const dataPath = path.join(__dirname, '../data/data.json');
const quizData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const quizzes = quizData.quizzes;

// Get all quizzes
router.get('/quizzes', (req, res) => {
  try {
    const quizzesData = quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      totalQuestions: quiz.questions.length
    }));
    res.json(quizzesData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Get a specific quiz
router.get('/quizzes/:id', (req, res) => {
  try {
    const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Return quiz without correct answers for security
    const safeQuiz = {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
      }))
    };
    
    res.json(safeQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz' });
  }
});

// Submit quiz answers and calculate score
router.post('/submit-quiz', (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = quizzes.find(q => q.id === parseInt(quizId));
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    let score = 0;
    const results = quiz.questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) score++;
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer: question.options[userAnswer] || 'Not answered',
        correctAnswer: question.options[question.correctAnswer],
        isCorrect: isCorrect
      };
    });
    
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    res.json({
      score: score,
      totalQuestions: quiz.questions.length,
      percentage: percentage,
      results: results
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz' });
  }
});

module.exports = router;
