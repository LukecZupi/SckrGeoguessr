document.addEventListener("DOMContentLoaded", () => {
    const classrooms = [];
    document.querySelectorAll(".classroom").forEach(el => {
        const classData = el.getAttribute("class-data");
        classrooms.push(classData);
    });
    console.log(classrooms);
    document.querySelectorAll(".classroom").forEach(el => {
    el.addEventListener("click", () => {
        console.log("Clicked classroom:", el.getAttribute("class-data"));
    });
    });
});
