let count = 1; 
document.addEventListener("DOMContentLoaded", () => {

    const countDisplay = document.querySelector(".count");
    const submit = document.getElementById("start");

    submit.addEventListener("click", () => {
        count++; 
        countDisplay.innerHTML = count; 
    });
});
