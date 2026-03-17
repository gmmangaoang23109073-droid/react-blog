import { useState } from "react";
import "../App.css";

function AboutPage() {

  const quizData = [
    {
      question: "What is Glaiza's Nickname?",
      options: ["Glai", "Gigi", "May", "Lia"],
      answer: 0
    },
    {
      question: "Which color does Glaiza love the most?",
      options: ["Blue", "Green", "Pink", "Orange"],
      answer: 2
    },
    {
      question: "What does Glaiza say fashion helps her with the most?",
      options: ["Making Friends", "Boosting Confidence", "Saving Money", "Traveling"],
      answer: 1
    },
    {
      question: "Which type of outfit does Glaiza enjoy wearing lately?",
      options: ["Streetwear only", "Cozy outfits only", "Classy and sophisticated fits", "Sportswear"],
      answer: 2
    },
    {
      question: "Who inspires Glaiza's fashion?",
      options: ["Movie actors", "Teachers", "Athletes", "Social Media Influencers"],
      answer: 3
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  const currentData = quizData[currentQuestionIndex];

  const selectOption = (index) => {
    setSelectedOptionIndex(index);
  };

  const submitAnswer = () => {

    if (selectedOptionIndex === null) return;

    if (selectedOptionIndex === currentData.answer) {
      setScore(score + 1);
      setResult("Correct!");
    } else {
      setResult(`Wrong! Correct answer: ${currentData.options[currentData.answer]}`);
    }

    setTimeout(() => {

      if (currentQuestionIndex + 1 < quizData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionIndex(null);
        setResult("");
      } else {
        setQuizFinished(true);
      }

    }, 1500);
  };

  return (
    <div className="about-content">

      <h2 className="about-title">About Me</h2>

      <div className="about-intro">
        <img src="/images/glai.png" className="about-pic" alt="Intro" />

        <p className="about-text">
          Hello! My name is Glaiza May B. Mangaoang, but you can call me Glai for short.
          I was born on May 7, 2005, and I am 20 years old. I love girly things, pink color,
          dressing up, make ups and boosting my self-esteem by looking my best.
          Fashion is more than just clothing to me; it is a way to express who I am and how I feel.
        </p>
      </div>

      <section className="section">
        <h3 className="section-title">My Fashion Inspiration</h3>

        <div className="container">
          <div className="item"><img src="/images/inspo2.jpg" className="small-img" alt="Inspiration 1" /></div>
          <div className="item"><img src="/images/inspo3.jpg" className="small-img" alt="Inspiration 2" /></div>
          <div className="item"><img src="/images/inspo4.jpg" className="small-img" alt="Inspiration 3" /></div>
        </div>
      </section>

      <section className="section">
        <h3 className="section-title">My Personal Style</h3>

        <div className="container">
          <div className="item"><img src="/images/prtty1.jpg" className="small-img" alt="Pretty 1" /></div>
          <div className="item"><img src="/images/prtty2.jpg" className="small-img" alt="Pretty 2" /></div>
          <div className="item"><img src="/images/prtty3.jpg" className="small-img" alt="Pretty 3" /></div>
        </div>
      </section>

      <section className="section">
        <h3 className="section-title">Favorite Fashion Pieces</h3>

        <div className="container">
          <div className="item"><img src="/images/fit1.jpg" className="small-img" alt="Outfit 1" /></div>
          <div className="item"><img src="/images/fit2.jpg" className="small-img" alt="Outfit 2" /></div>
          <div className="item"><img src="/images/fit3.jpg" className="small-img" alt="Outfit 3" /></div>
          <div className="item"><img src="/images/fit4.jpg" className="small-img" alt="Outfit 4" /></div>
          <div className="item"><img src="/images/fit5.jpg" className="small-img" alt="Outfit 5" /></div>
          <div className="item"><img src="/images/fit6.jpg" className="small-img" alt="Outfit 6" /></div>
          <div className="item"><img src="/images/fit7.jpg" className="small-img" alt="Outfit 7" /></div>
          <div className="item"><img src="/images/fit8.jpg" className="small-img" alt="Outfit 8" /></div>
          <div className="item"><img src="/images/fit9.jpg" className="small-img" alt="Outfit 9" /></div>
        </div>
      </section>

      <h3 className="section-title">Game Time!</h3>

      <div className="quiz-container">

        {!quizFinished ? (
          <>
            <h2>{currentData.question}</h2>

            {currentData.options.map((opt, i) => (
              <div
                key={i}
                className={`option ${selectedOptionIndex === i ? "selected" : ""}`}
                onClick={() => selectOption(i)}
              >
                {opt}
              </div>
            ))}

            <button onClick={submitAnswer} disabled={selectedOptionIndex === null}>
              Submit Answer
            </button>

            <p>{result}</p>
          </>
        ) : (
          <h2>Your final score is {score} out of {quizData.length}</h2>
        )}

      </div>

    </div>
  );
}

export default AboutPage;