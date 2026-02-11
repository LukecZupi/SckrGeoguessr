console.log(document.querySelectorAll(".classroom").length);
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".classroom").forEach(el => {
        el.addEventListener("click", () => {
            console.log("Clicked classroom:", el.getAttribute("class-data"));
        });
        });
    });
