document.addEventListener("DOMContentLoaded", () => {

    $.get("/random-classroom", function (classroom) {

        const img = document.getElementById("classroomImage");

        if (img) img.src = "../static/images/267.png";

        $.post("/set-classroom", { value: classroom }, function (res) {
            console.log(res);
        });

    });

});

/*
let correctClassroom;

export function getCorrectClassroom() {
    return correctClassroom;
}

document.addEventListener("DOMContentLoaded", () => {
    const classrooms = Array.from(document.querySelectorAll(".classroom"));
    const classroomNumbers = classrooms
        .map(el => el.getAttribute("class-data"))
        .filter(Boolean);

    console.log("classrooms:", classrooms, "numbers:", classroomNumbers);

    correctClassroom = classroomNumbers[Math.floor(Math.random() * classroomNumbers.length)];

    console.log("correct classroom", correctClassroom);

    const img = document.getElementById("classroomImage");

    //if (img) img.src = "../static/images" + correctClassroom + ".png";
    if (img) img.src = "../static/images/267.png";
});
*/