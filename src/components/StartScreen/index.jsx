import styles from "./start.module.css";

// eslint-disable-next-line react/prop-types
export default function StartScreen({startGame}) {
    return (
        <main className={styles.start}>
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para comerçar a jogar</p>
            <button onClick={startGame}>Começar o Jogo</button>
        </main>
    )
}