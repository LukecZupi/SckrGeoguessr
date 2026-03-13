let correctClassroom = null;

$.ajax({
    url: "/get-classroom",
    success: function (result) {

        console.log("server returned:", result);

        correctClassroom = result;

        console.log("correct classroom:", correctClassroom);

        startGame();
    }
});


function startGame() {
    console.log("GAME STARTED")
    const maxAttemps = 5;
    let guessCount = 0;
    let gameOver = false;
    const guessedClassrooms = [];

    document.addEventListener("click", (e) => {

        if (gameOver) return;

        const classroom = e.target.closest(".classroom");
        if (!classroom) return;

        guessCount++;

        const clicked = classroom.getAttribute("class-data");
        console.log("clicked classroom", clicked);

        guessedClassrooms.push(clicked);

        if (clicked === correctClassroom) {

            gameOver = true;

            const params = new URLSearchParams();
            params.set("guesses", guessCount);
            params.set("result", "win");
            params.set("correctClassroom", correctClassroom);
            params.set("guessedClassrooms", JSON.stringify(guessedClassrooms));

            setTimeout(() => {
                window.location.href = `/finish?${params.toString()}`;
            }, 250);

            return;
        }

        if (guessCount >= maxAttemps) {

            gameOver = true;

            const params = new URLSearchParams();
            params.set("guesses", maxAttemps);
            params.set("result", "lose");
            params.set("correctClassroom", correctClassroom);
            params.set("guessedClassrooms", JSON.stringify(guessedClassrooms));

            setTimeout(() => {
                window.location.href = `/finish?${params.toString()}`;
            }, 250);
        }

    });
}