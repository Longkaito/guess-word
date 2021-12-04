import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "./App.scss";

function App() {
  let wordRandom = "";
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [dataWords, setDataWords] = useState([]);
  const [word, setWord] = useState("");
  const [timer, setTimer] = useState(10);
  const [numberQuestion, setNumberQuestion] = useState(1);
  const [score, setScore] = useState(0);

  function handleChangeWord(e) {
    let letter = e.target.innerText;
    setWord(word.replace(word[word.indexOf("_")], letter));
  }

  function updateWord() {
    wordRandom = dataWords[Math.floor(Math.random() * dataWords.length)];
    setWord(
      wordRandom.replace(
        wordRandom[Math.floor(Math.random() * wordRandom.length)],
        "_"
      )
    );
  }

  function handleCheckQuestion() {
    setNumberQuestion(numberQuestion + 1);
    if (numberQuestion === 10) {
      setNumberQuestion(1);
      setScore(0);
      alert(`Hay quá! Tổng điểm của bạn là ${score} điểm`);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const requestUrl = "https://randword.vercel.app/words?num=30";
      const response = await fetch(requestUrl);
      const responseJson = await response.json();
      setDataWords(responseJson);
      wordRandom = responseJson[Math.floor(Math.random() * dataWords.length)];
      setWord(
        wordRandom.replace(
          wordRandom[Math.floor(Math.random() * wordRandom.length)],
          "_"
        )
      );
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (word.indexOf("_") === -1 && word !== "") {
      let flag = true;
      for (let key of dataWords) {
        if (word.toLowerCase() === key) {
          flag = true;
          break;
        } else {
          flag = false;
        }
      }
      if (flag) {
        setTimer(10);
        updateWord();
        setScore((score) => score + 10);
        handleCheckQuestion();
        if (numberQuestion !== 10) {
          alert("Bạn có thêm 10 điểm");
        }
      } else {
        setTimer(10);
        updateWord();
        handleCheckQuestion();
        if (numberQuestion !== 10) {
          alert("Wrong!");
        }
      }
    }
  }, [word]);

  useEffect(() => {
    const interval = setInterval(() => setTimer((timer) => timer - 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timer < 0) {
      setTimer(10);
      updateWord();
      handleCheckQuestion();
      if (numberQuestion !== 10) {
        alert("Wrong!");
      }
    } else {
    }
  }, [timer]);

  return (
    <div className="container">
      <div className="ontop">
        <div className="score">
          <p>SCORE:</p>
          <span>{score}</span>
        </div>
        <div className="number-question">
          <p>{numberQuestion}</p>
          <span>/ 10</span>
        </div>
        <div className="timer">
          <p>TIMER:</p>
          <span>{timer}</span>
        </div>
      </div>
      <div className="onbottom">
        <div className="show-word">{word}</div>
        <div className="show-letter">
          {alphabet.map((value) => (
            <button key={value} onClick={handleChangeWord}>
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
