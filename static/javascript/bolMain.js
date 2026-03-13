document.addEventListener("DOMContentLoaded", () => {
    $.ajax({
        url: "/randClassroom",
        data: {
        },
        success: function (result) {
            console.log(result);
            const img = document.getElementById("classroomImage");

            //if (img) img.src = "../static/images" + correctClassroom + ".png";
            if (img) img.src = "../static/images/267.png";
        }
    });
});


var pass_to_python = result;
$.ajax(
    {
        type: 'POST',
        dataType: 'text',
        url: '/getVar?value=' + pass_to_python,
        success: function (result) {
            var reply = result.reply;
            if (reply == "success") {
                console.log("success for passing var")
                return;
            }
            else {
                alert("some error ocured in session agent")
            }

        }
    }
);


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