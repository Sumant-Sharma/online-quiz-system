const quizzes = [
  {
    id: 1,
    title: "General Knowledge Quiz",
    description: "Test your general knowledge with 5 interesting questions",
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Jane Austen", "William Shakespeare", "Mark Twain", "Charles Dickens"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "In what year did the Titanic sink?",
        options: ["1912", "1913", "1911", "1914"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 2,
    title: "Science Quiz",
    description: "Challenge yourself with science questions",
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "What is the smallest unit of life?",
        options: ["Atom", "Molecule", "Cell", "Tissue"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "How many bones does an adult human have?",
        options: ["186", "206", "226", "246"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"],
        correctAnswer: 0
      }
    ]
  }
];

module.exports = quizzes;
