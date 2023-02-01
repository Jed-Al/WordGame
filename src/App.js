/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react"
import { Button, Card } from "reactstrap"
import "./App.css"

const wordList = [
    {
        word: "python",
        hint: "programming language"
    },
    {
        word: "guitar",
        hint: "a musical instrument"
    },
    {
        word: "aim",
        hint: "a purpose or intention"
    },
    {
        word: "venus",
        hint: "planet of our solar system"
    },
    {
        word: "gold",
        hint: "a yellow precious metal"
    },
    {
        word: "ebay",
        hint: "online shopping site"
    },
    {
        word: "golang",
        hint: "programming language"
    },
    {
        word: "coding",
        hint: "related to programming"
    },
    {

        word: "matrix",
        hint: "science fiction movie"
    },
    {
        word: "bugs",
        hint: "related to programming"
    },
    {
        word: "avatar",
        hint: "epic science fiction film"
    },
    {
        word: "gif",
        hint: "a file format for image"
    },
    {
        word: "mental",
        hint: "related to the mind"
    },
    {
        word: "map",
        hint: "diagram represent of an area"
    },
    {
        word: "island",
        hint: "land surrounded by water"
    },
    {
        word: "hockey",
        hint: "a famous outdoor game"
    },
    {
        word: "chess",
        hint: "related to a indoor game"
    },
    {
        word: "viber",
        hint: "a social media app"
    },
    {

        word: "github",
        hint: "code hosting platform"
    },
    {
        word: "png",
        hint: "a image file format"
    },
    {
        word: "silver",
        hint: "precious greyish-white metal"
    },
    {
        word: "mobile",
        hint: "an electronic device"
    },
    {
        word: "gpu",
        hint: "computer component"
    },
    {
        word: "java",
        hint: "programming language"
    },
    {
        word: "google",
        hint: "famous search engine"
    },
    {
        word: "venice",
        hint: "famous city of waters"
    },
    {
        word: "excel",
        hint: "microsoft product for windows"
    },
    {
        word: "mysql",
        hint: "a relational database system"
    },
    {

        word: "nepal",
        hint: "developing country name"
    },
    {
        word: "flute",
        hint: "a musical instrument"
    },
    {
        word: "crypto",
        hint: "related to cryptocurrency"
    },
    {
        word: "tesla",
        hint: "unit of magnetic flux density"
    },
    {
        word: "mars",
        hint: "planet of our solar system"
    },
    {
        word: "proxy",
        hint: "related to server application"
    },
    {
        word: "email",
        hint: "related to exchanging message"
    },
    {
        word: "html",
        hint: "markup language for the web"
    },
    {
        word: "air",
        hint: "related to a gas"
    },
    {
        word: "idea",
        hint: "a thought or suggestion"
    },
    {

        word: "server",
        hint: "related to computer or system"
    },
    {
        word: "svg",
        hint: "a vector image format"
    },
    {
        word: "jpeg",
        hint: "a image file format"
    },
    {
        word: "search",
        hint: "act to find something"
    },
    {
        word: "key",
        hint: "small piece of metal"
    },
    {
        word: "egypt",
        hint: "a country name"
    },
    {
        word: "joker",
        hint: "psychological thriller film"
    },
    {
        word: "dubai",
        hint: "developed country name"
    },
    {
        word: "photo",
        hint: "representation of person or scene"
    },
    {
        word: "nile",
        hint: "largest river in the world"
    },
    {

        word: "rain",
        hint: "related to a water"
    },
];

export default function App() {
    const [word, setWord] = useState("");
    const [hint, setHint] = useState("");
    const [remainingGuesses, setRemainingGuesses] = useState(8);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [input, setInput] = useState([]);

    const observeGame = useCallback(() => {
        if (remainingGuesses === 0) {
            alert("Game over! You don't have remaining guesses.");
            const inputs = document.querySelectorAll(".letter");
            inputs.forEach((input, index) => {
                input.value = word[index];
                input.style.color = "green";
            });
            return;
        }
        if (word === "") return;
        if (word === input.join("")) {
            alert("You won!");
            resetGame();
            return;
        };

    }, [input]);

    const resetGame = useCallback(() => {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        setWord(randomWord.word);
        setHint(randomWord.hint);
        setRemainingGuesses(8);
        setWrongLetters([]);
        clearInput();
    }, []);

    function clearInput() {
        const inputs = document.querySelectorAll(".letter");
        inputs.forEach((input) => {
            input.value = "";
        });
    };

    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        observeGame();
    }, [input, observeGame]);

    return (
        <div className="game">
            <Card className="card" outline>
                <h2>Guess the word</h2>
                <div className="word">
                    {word.split("").map((letter, index) => (
                        <input
                            className="letter"
                            key={index}
                            type="text"
                            maxLength="1"
                            onChange={(e) => {
                                const l = e.target.value.toLowerCase();
                                if (l === "") {
                                    return;
                                }

                                if (l === letter) {
                                    e.target.style.color = "green";
                                    // setTimeout fixes the problem of last letter not being shown
                                    setTimeout(() => {
                                        setInput((input) => {
                                            const newInput = [...input];
                                            newInput[index] = l;
                                            return newInput;
                                        });
                                    }, 100);
                                } else {
                                    e.target.style.color = "red";
                                    setRemainingGuesses(remainingGuesses - 1);
                                    setWrongLetters([...wrongLetters, l]);
                                }
                            }}
                        />
                    ))}
                </div>
                <p className="word">Word: {word}</p>
                <p className="hint">Hint: {hint}</p>
                <p className="remaining-guesses">Remaining guesses: {remainingGuesses}</p>
                <p className="wrong-letters">Wrong letters: {wrongLetters.join(", ")}</p>
                <Button
                    color="primary"
                    className="reset-button"
                    onClick={() => {
                        resetGame();
                    }}
                >
                    Reset game
                </Button>
            </Card>
        </div>
    )
}