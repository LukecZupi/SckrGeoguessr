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
    
    //========  CLICK LISTENER Add a click event listener to each classroom element
    document.querySelectorAll(".classroom").forEach(classroomElement => {
        classroomElement.addEventListener("click", () => {
            // If the game is over, ignore further clicks
            if (gameOver) return;
            
            guessCount++; // Increase guess count

            // Get the classroom number of the clicked element
            const clickedClassroom = classroomElement.getAttribute("class-data");
            console.log("Clicked classroom:", clickedClassroom);
           
            // Check if the clicked classroom is the correct one
            if (correctClassroom === clickedClassroom) {
                alert("Congratulations! You found the correct classroom: " + correctClassroom + "\nYour final score is: " + score.toFixed(0));
                gameOver = true; // End the game

            } else if (guessCount >= 10) { // If 10 guesses used up
                alert("You lost, final score: 0");
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
});
