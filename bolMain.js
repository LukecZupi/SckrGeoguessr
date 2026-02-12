document.addEventListener("DOMContentLoaded", () => {
    const classrooms = [...document.querySelectorAll(".classroom")];
    const classroomNumbers = classrooms.map(el => el.getAttribute("class-data"));

    const correctClassroom = classroomNumbers[
        Math.floor(Math.random() * classroomNumbers.length)
    ];
	console.log("correct classroom: " + correctClassroom);

    let guessCount = 0;
    let gameOver = false;

    const attemptsDiv = document.getElementById("attempts");
    const timerDiv = document.getElementById("timer");

    function updateUI() {

        if (attemptsDiv)
            attemptsDiv.textContent = `Število poskusov: ${Math.min(guessCount, 10)} / 10`;
    }

    function delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    // Event delegation (1 listener instead of many)
    document.addEventListener("click", async (e) => {
        const classroomElement = e.target.closest(".classroom");
        if (!classroomElement || gameOver) return;

        guessCount++;
        const clickedClassroom = classroomElement.getAttribute("class-data");
		console.log("clicked classroom: " + clickedClassroom);

        if (clickedClassroom === correctClassroom) {
            gameOver = true;
            updateUI();
            await delay(500);
            alert(`Bravo! Našli ste pravo učilnico: ${correctClassroom} :]\n Število poskusov: ${guessCount}\n Porabljen čas: ${secondsElapsed}s`);
            location.reload();
            return;
        }

        if (guessCount >= 10) {
            gameOver = true;
            updateUI();
            await delay(500);
            alert(`Izgubili ste: uporabili ste vse poskuse :[ \n število poskusov: 10 \n Porabljen čas: ${secondsElapsed}s`);
            location.reload();
            return;
        }

        // Wrong guess
        updateUI();
    });

    // Timer (this one actually needs interval)
    let secondsElapsed = 0;
    setInterval(() => {
        secondsElapsed++;
        if (timerDiv)
            timerDiv.textContent = `Porabljen čas: ${secondsElapsed}s`;
    }, 1000);

    updateUI(); // initial render
});