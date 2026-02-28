document.addEventListener('DOMContentLoaded', () => { //wait so document is loaded
    const classrooms = Array.from(document.querySelectorAll('.classroom')); //load classrooms into var
    const classroomNumbers = classrooms.map(el => el.getAttribute('class-data')).filter(Boolean); //load classroom numbers and remove invalid IDS's
    console.log(classrooms, classroomNumbers); //log for debug purposes

    const correctClassroom = classroomNumbers[Math.floor(Math.random() * classroomNumbers.length)]; //get a random classroom and store into var
    console.log("correct classroom", correctClassroom);
    console.log(typeof correctClassroom); //log for debug and testing -- DELETE IN PRODUCTION

    //get difficulty
    const params = new URLSearchParams(window.location.search);
    const difficulty = params.get('difficulty');

    //set images path according to the difficulty
    const imagesFolder = difficulty === 'hard' ? '../static/images_hard/' : '../static/images_easy/'; //get image path based of diff

    const img = document.getElementById('classroomImage'); //get img element in HTML
    //if (img) img.src = imagesFolder+correctClassroom; //set img element src to the corrcet classroom path
    if(img) img.src="../static/images_hard/267.png"
    console.log(img.src) //debug for testing purposes
    const attemptsDiv = document.getElementById('attempts'); //get attemps div from HTML
    const timerDiv = document.getElementById('timer'); //get timer div from HTML

    //self explanatory
    const MAX_ATTEMPTS = 5;
    let guessCount = 0;
    let gameOver = false;
    let secondsElapsed = 0;
    const guessedClassrooms = [];

    const updateAttempts = () => { //just updates attempts HTML element
        if (attemptsDiv) attemptsDiv.textContent = `Število poskusov: ${Math.min(guessCount, MAX_ATTEMPTS)} / ${MAX_ATTEMPTS}`;
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)); //???? idk

    const timerId = setInterval(() => { //updates the timer HTML element
        secondsElapsed++;
        if (timerDiv) timerDiv.textContent = `Porabljen čas: ${secondsElapsed}s`;
    }, 1000);

    document.addEventListener('click', async (e) => { //add a GLOBAL event listener
        if (gameOver) return; //if game is over, return from func
        const classroomEl = e.target.closest('.classroom'); // gets the closest classroom to the click
        if (!classroomEl) return;

        guessCount++; //increment guess count
        const clicked = classroomEl.getAttribute('class-data'); //get classroom number
        guessedClassrooms.push(clicked); //add to guessed classrooms list
        updateAttempts(); //update UI

        if (clicked === correctClassroom) { //if user guessed the classroom
            gameOver = true; //game over
            await sleep(200); //wait so redirect isn't instant
            clearInterval(timerId);
            const params = new URLSearchParams(); //new var for parameters
            params.set('guesses', guessCount);
            params.set('time', secondsElapsed);
            params.set('result', 'win');
            params.set('correctClassroom', correctClassroom);
            params.set('guessedClassrooms', JSON.stringify(guessedClassrooms));
            window.location.href = `/finish?${params.toString()}`; //redirect with parameters
            return;
        }

        if (guessCount >= MAX_ATTEMPTS) { //if user ran out of guesses
            gameOver = true; //game over
            await sleep(200); //wait so redirect isn't instant
            clearInterval(timerId);
            const params = new URLSearchParams(); //new var for parameters
            params.set('guesses', MAX_ATTEMPTS);
            params.set('time', secondsElapsed);
            params.set('result', 'lose');
            params.set('correctClassroom', correctClassroom);
            params.set('guessedClassrooms', JSON.stringify(guessedClassrooms));
            window.location.href = `/finish?${params.toString()}`; //redirect with parameters
            return;
        }
    });

    updateAttempts(); //update UI on wrong guess
});
