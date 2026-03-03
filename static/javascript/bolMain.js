document.addEventListener("DOMContentLoaded", () => { //wait so SVG is loaded just in case
    const classrooms = Array.from(document.querySelectorAll(".classroom")); //load classrooms into variable
    const classroomNumbers = classrooms.map(el => el.getAttribute("class-data")).filter(Boolean); //load classroom numbers and remove invalid IDS's
    console.log("classrooms: ", classrooms, "numbers: ", classroomNumbers);

    //random classroom
    const correctClassroom = classroomNumbers[Math.floor(Math.random() * classroomNumbers.length)]; //get a random classroom number and store into variable
    console.log("correct classroom", correctClassroom);

    //get difficulty
    const params = new URLSearchParams(window.location.search); //search for difficulty in URL parameters
    const difficulty = params.get("difficulty"); //get difficulty from URL parameters

    //set images path according to the difficulty
    const imagesFolder = difficulty === "hard" ? "../static/images_hard/" : "../static/images_easy/";

    const img = document.getElementById("classroomImage");
    // TODO: UNCOMMENT LINE 19 AND REMOVE LINE 20 WHEN WE HAVE ALL IMAGES
    //if (img) img.src = imagesFolder+correctClassroom; //set img element src
    if(img) img.src="../static/images_hard/267.png"
    console.log(img.src)

    const attemptsDiv = document.getElementById("attempts");
    const timerDiv = document.getElementById("timer");

    const maxAttemps = 5;
    let guessCount = 0;
    let gameOver = false;
    let seconds = 0;
    const guessedClassrooms = [];

    const updateAttempts = () => {
        attemptsDiv.textContent = `Število poskusov: ${Math.min(guessCount, maxAttemps)} / ${maxAttemps}`;
    }; //update attemps in HTML


    const timerId = setInterval(() => {
        seconds++;
        timerDiv.textContent = `Porabljen čas: ${seconds}s`;
    }, 1000); //update seconds in HTML

    document.addEventListener("click", async (e) => { //GLOBAL event listener for optimization
        if (gameOver) return; //return if game is over
        const classroom = e.target.closest(".classroom"); //get the classroom of the click
        if (!classroom) return; //if theres no classroom there, return nothing

        guessCount++; //increment guess count
        const clicked = classroomEl.getAttribute('class-data'); //get classroom number
        console.log("clicked classroom", clicked)
        guessedClassrooms.push(clicked); //add to guessed classrooms list
        console.log("clicked classroom list", guessedClassrooms)
        updateAttempts(); //update UI

        if (clicked === correctClassroom) { //if user guessed the classroom
            gameOver = true; //game over
            clearInterval(timerId); //stop timer interval
            const params = new URLSearchParams(); //parameters for /finish route
            params.set("guesses", guessCount);
            params.set("time", seconds);
            params.set("result", "win");
            params.set("correctClassroom", correctClassroom);
            params.set("guessedClassrooms", JSON.stringify(guessedClassrooms));
            setTimeout(() => {
                window.location.href = `/finish?${params.toString()}`;
            }, 350); //redirect with parameters and a small delay so it isn't instant
            return;
        }

        if (guessCount >= maxAttemps) { //if user ran out of guesses
            gameOver = true; //game over
            clearInterval(timerId);
            const params = new URLSearchParams(); //parameters for /finish route
            params.set("guesses", maxAttemps);
            params.set("time", seconds);
            params.set("result", "lose");
            params.set("correctClassroom", correctClassroom);
            params.set("guessedClassrooms", JSON.stringify(guessedClassrooms));
            setTimeout(() => {
                window.location.href = `/finish?${params.toString()}`;
            }, 350); //redirect with parameters and a small delay so it isn't instant
            return;
        }
    });

    updateAttempts(); //update UI on wrong guess
});
