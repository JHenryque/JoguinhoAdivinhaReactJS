import './App.css'
import StartScreen from "./components/StartScreen/index.jsx";
import { wordsList } from "./data/words.jsx";
import {useCallback, useEffect, useState} from "react";
import Game from "./components/Game/index.jsx";
import GameOver from "./components/GameOver/index.jsx";

    const stages = [
        {id: 1, name: "start"},
        {id: 2, name: "game"},
        {id: 3, name: "end"}
    ]

function App() {

        const [gameStage, setGameStage] = useState(stages[0].name);
        const [words] = useState(wordsList);

        const [pickWord, setPickWord] = useState("");
        const [pickWordCategory, setPickWordAndCategory] = useState("");
        const [letters, setLetters] = useState("");

        const [guessedLetter, setGuessedLetter] = useState([]);
        const [wrongLetter, setWrongLetter] = useState([]);
        const [guesse, setGuesse] = useState(3);
        const [score, setScore] = useState(0);

        const pickWordAndCategory = useCallback(() => {
            const  categories = Object.keys(words);
            const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

            //console.log(category);

            const word = words[category][Math.floor(Math.random() * words[category].length)]

            //console.log(word);

            return {word, category};
        }, [words]);

        const startGame = useCallback(() => {
            clearletterStates();

            const {word, category} = pickWordAndCategory();
            let wordLetters = word.split("");

            wordLetters = wordLetters.map((letter) => letter.toLowerCase());

            console.log(word, category);
            console.log(wordLetters);

            // fill startes
            setPickWord(word);
            setPickWordAndCategory(category);
            setLetters(wordLetters);

            setGameStage(stages[1].name);
        }, [pickWordAndCategory]);
        const verifyLetter = (letter) => {
            //setGameStage(stages[2].name);
            const normalizerdLetter = letter.toLowerCase();

            if (guessedLetter.includes(normalizerdLetter) || wrongLetter.includes(normalizerdLetter)) {
                return;
            }

            //push quessed
            if (letters.includes(normalizerdLetter)) {
                setGuessedLetter((actualGuessed)=> [
                    ...actualGuessed,
                    normalizerdLetter
                ]);

            } else {
                setWrongLetter((actualWrong)=> [
                    ...actualWrong,
                    normalizerdLetter
                ]);
                setGuesse((actualGuesses) => actualGuesses - 1);

            }
        };

        function clearletterStates() {
            setGuessedLetter([]);
            setWrongLetter([]);
        }

        useEffect(() => {
            if (guesse <= 0) {
                clearletterStates();
                setGameStage(stages[2].name);
            }
        },[guesse]);

        useEffect(() => {
            const uniqueLetters = [...new Set(letters)];

            if (guessedLetter.length === uniqueLetters.length) {
                setScore(actualScore => (actualScore += 100));

                startGame();
            }
        }, [guessedLetter, letters, startGame]);

        const retry = () => {
            setScore(0);
            setGuesse(3)
            setGameStage(stages[0].name);
        }

  return (
    <>
        <main className="App">
            {gameStage === "start" && <StartScreen startGame={startGame} />}
            {gameStage === "game" && <Game
                verifyLetter={verifyLetter}
                pickWord={pickWord}
                pickWordCategory={pickWordCategory}
                letters={letters}
                guessedLetter={guessedLetter}
                wrongLetter={wrongLetter}
                guesse={guesse}
                score={score}/>}
            {gameStage === "end" && <GameOver retry={retry} score={score} />}

        </main>
    </>
  )
}

export default App
