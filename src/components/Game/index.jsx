import styles from "./game.module.css";
import {useRef, useState} from "react";

// eslint-disable-next-line react/prop-types
export default function Game({verifyLetter, pickWord, pickWordCategory, letters, guessedLetter, wrongLetter, guesse, score}) {
   const [letter, setLetter] = useState("");
   const letterInputRf = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        verifyLetter(letter);
        setLetter("");

        letterInputRf.current.focus();
    }

    return (
        <div className={styles.game}>
            <h1>Game</h1>
            <p className={styles.points}>
              <span>Pontuação: {score}</span>
              <h1>Adivinhe a Palavra:</h1>
            </p>
              <h3 className={styles.tip}>
                  Dica sobre a palavra: <span>{pickWordCategory}</span>
              </h3>
            <p>Voçê ainda tem {guesse} Tentativa(S).</p>

            <div className={styles.wordContainer}>
                {
                    // eslint-disable-next-line react/prop-types
                    letters.map((letter, i) => (
                        // eslint-disable-next-line react/prop-types
                        guessedLetter.includes(letter)
                            ? <span key={i} className={styles.letter}>{letter}</span>
                            : <span key={i} className={styles.blankSquare}></span>
                    ))
                }

            </div>
            <div className={styles.letterContainer}>
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="letter" maxLength="1" required value={letter} onChange={(e)=> setLetter(e.target.value)} ref={letterInputRf}/>
                    <button>Jogar!</button>
                </form>
            </div>
            <div className={styles}>
                <p>Letras já utilizandas:</p>
                {
                    // eslint-disable-next-line react/prop-types
                    wrongLetter.map((letter, i) => (
                        <span key={i}>{letter}, </span>
                    ))
                }
            </div>
        </div>
    )
}