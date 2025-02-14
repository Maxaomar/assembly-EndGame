import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./languajes"
import {getFarewellText} from "./Utils"


export function EndGameAssembly() {
    const [currentWord, setCurrentWord] = useState("react");
    const [guessedLetters, setguessedLetters] = useState([]);



    const wrongGuessesCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length

   const isGameWon =
        currentWord.split("").every(letter => guessedLetters.includes(letter))

   const isGameLost = wrongGuessesCount >= languages.length - 1
   const isGameOver = isGameWon || isGameLost
   const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)


    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setguessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }


    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessesCount

        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }

        const className = clsx("chip", isLanguageLost && "lost")
        return(
            <span
                className={className}
                style={styles}
                key={lang.name}
        >
            {lang.name}
        </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>
            {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
        ))



     const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return(
        <button
            className={className}
            key={letter}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>
        )
})



const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
})

function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
        return (
            <p className="farewell-message">
                {getFarewellText(languages[wrongGuessesCount - 1].name)}
            </p>
        )
    }

    if (isGameWon) {
        return (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
        )
    }
    if(isGameWon) {
        return (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    }

    return null
}

    return(
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>

            <section className={gameStatusClass}>
                {renderGameStatus()}
            </section>

            <section className="language-chips">
                {languageElements}
            </section>

            <section className="word">
              {letterElements}
            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>
           {isGameOver && <button className="new-game">New Game</button> }
        </main>
    )
}