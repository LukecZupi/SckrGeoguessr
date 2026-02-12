document.addEventListener("DOMContentLoaded", () => {
    // Array to store all classroom numbers (from elements with class 'classroom')
    const classroomNumbers = [];
    
    // Find all elements with the class 'classroom' and extract their 'class-data' attribute
    document.querySelectorAll(".classroom").forEach(classroomElement => {
        const classroomNumber = classroomElement.getAttribute("class-data");
        classroomNumbers.push(classroomNumber);   // Add to the array
    });

    // Show all classroom numbers in the console for debugging
    console.log("All classrooms:", classroomNumbers);

    // Randomly select one classroom as the 'correct' answer
    const correctClassroom = classroomNumbers[Math.floor(Math.random() * classroomNumbers.length)];
    console.log("Randomly selected classroom (correct answer):", correctClassroom);

    // Game state variables
    let score = 5000; // Starting score
    let guessCount = 0; // Number of guesses made
    let gameOver = false; // Whether the game has ended
    
    // --------- NOTE: Use a non-blocking delay so the browser can repaint/update the DOM.
    // The previous "sleep" used a busy loop which blocks the main thread and prevents DOM updates.
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //========  CLICK LISTENER Add a click event listener to each classroom element
    // Make the handler async so we can await delay(...) and allow UI updates to appear before alerts/reloads.
    document.querySelectorAll(".classroom").forEach(classroomElement => {

        //?? TUKI NE PRIDE IN SE NE POVEZE S CSS
        classroomElement.addEventListener("click", async () => {
            // If the game is over, ignore further clicks
            if (gameOver) return;
            
            guessCount++; // Increase guess count

            // Get the classroom number of the clicked element
            const clickedClassroom = classroomElement.getAttribute("class-data");
            console.log("Clicked classroom:", clickedClassroom);
           
            // Check if the clicked classroom is the correct one
            if (correctClassroom === clickedClassroom) {
                // Mark game over immediately to prevent further clicks while we show the result.
                gameOver = true;

                // Allow UI to update (e.g., score/attempts) before showing alert.
                await delay(1000);

                alert("Congratulations! You found the correct classroom: " + correctClassroom + "\nYour final score is: " + score.toFixed(0));
                // Reload to restart the game (keeps behavior from original code).
                location.reload();

            } else if (guessCount == 10) { // If 10 guesses used up
                // Update attempts DIV to show 10/10 immediately.
                if (attemptsDiv) attemptsDiv.textContent = `Attempts Made: 10 / 10`;

                if (scoreDiv) {
                    score = 0;
                };
                // Allow the browser to repaint so the user sees 10/10 before the alert.
                await delay(3000);

                alert("You lost, final score: 0 ; You ran out of attempts");
                gameOver = true;
                location.reload(); // Reload the page to reset the game
            }
            else if (correctClassroom !== clickedClassroom) {
                score *= 0.7; // Reduce score by 30% for each incorrect guess
            }
            // Show current score and guess count in the console for debugging
            console.log("Current score:", score.toFixed(2), "Guess count:", guessCount);
        });
    });


   //  ========= TIMER SETUP
    // This will show how many seconds the user has spent on the website
    let secondsElapsed = 0;
    const timerDiv = document.getElementById("timer"); // Make sure your HTML has <div id="timer"></div>
    setInterval(() => {
        secondsElapsed++;
        if (timerDiv) {
            timerDiv.textContent = `Time spent: ${secondsElapsed}s`;
        }
    }, 1000); // Update every 1000 milliseconds (1 second)


    // ========= NOTE: Removed blocking busy-loop sleep and replaced with delay() above.
    //  ========= SCORE DISPLAY SETUP
    // This will continuously update the score display on the webpage
    const scoreDiv = document.getElementById("score"); // Make sure your HTML has <div id="score"></div>
    setInterval(() => {
        if (scoreDiv) {
            scoreDiv.textContent = `Current Score: ${score.toFixed(0)} / 5000`;
        }
    }, 100);

    const attemptsDiv = document.getElementById("attempts");


    // ========= ATTEMPTS DISPLAY SETUP
    // This will continuously update the attempts display on the webpage
    setInterval(() => {
        if (attemptsDiv) {
            attemptsDiv.textContent = `Attempts Made: ${guessCount.toFixed(0)} / 10`;
        }
        if (guessCount >= 10) {
            attemptsDiv.textContent = `Attempts Made: 10 / 10`;
        }
    }, 100);


    /*
    -Kaj bo dodal:
    -redirect na drugo stran / vse razen če ti zmanka poskusov / you lost če ti zmanka poskusov
    -gumb za play again na redirectu - tukej location.reload zamenjaš z redirectom
    */
});

