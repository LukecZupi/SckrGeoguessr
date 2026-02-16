document.addEventListener("DOMContentLoaded", () => {
    const classrooms = [...document.querySelectorAll(".classroom")];
    const classroomNumbers = classrooms.map(el => el.getAttribute("class-data"));

    const correctClassroom = classroomNumbers[
        Math.floor(Math.random() * classroomNumbers.length)
    ];
	console.log("correct classroom: " + correctClassroom);
	//get the path for the image to display on HTML
	const path = `../static/images/${correctClassroom}`;
	console.log(path);
	const img = document.getElementById("classroomImage");
	img.src = path;

    let guessCount = 0;
    let gameOver = false;
    const guessedClassrooms = [];

    const attemptsDiv = document.getElementById("attempts");
    const timerDiv = document.getElementById("timer");

    function updateUI() {

        if (attemptsDiv)
            attemptsDiv.textContent = `Število poskusov: ${Math.min(guessCount, 5)} / 5`;
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
        guessedClassrooms.push(clickedClassroom);

        if (clickedClassroom === correctClassroom) {
            gameOver = true;
            updateUI();
            await delay(200);
            const params = new URLSearchParams();
            params.set('guesses', guessCount);
            params.set('time', secondsElapsed);
            params.set('result', 'win');
            params.set('correctClassroom', correctClassroom);
            params.set('guessedClassrooms', JSON.stringify(guessedClassrooms));
            window.location.href = `/finish?${params.toString()}`;
            return;
        }

        if (guessCount >= 5) {
            gameOver = true;
            updateUI();
            await delay(200);
            const params = new URLSearchParams();
            params.set('guesses', 5);
            params.set('time', secondsElapsed);
            params.set('result', 'lose');
            params.set('correctClassroom', correctClassroom);
            params.set('guessedClassrooms', JSON.stringify(guessedClassrooms));
            window.location.href = `/finish?${params.toString()}`;
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
