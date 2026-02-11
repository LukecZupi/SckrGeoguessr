const classrooms = document.querySelectorAll(".classroom");
    console.log(classrooms);
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".classroom").forEach(el => {
        console.log(el.getAttribute("class-data"))
        el.addEventListener("click", () => {
            console.log("Clicked classroom:", el.getAttribute("class-data"));
        });
        });
    });
