import stylles from "./gameOver.module.css";

// eslint-disable-next-line react/prop-types
export default function GameOver({ retry, score }) {
  return (
    <div className={stylles}>
      <h2>Game Over</h2>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retry}>Resetar Jogor</button>
    </div>
  );
}
