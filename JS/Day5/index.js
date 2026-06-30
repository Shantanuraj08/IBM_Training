function dataprint(){
    let element = document.getElementById("color-dropdown");
    let result = document.getElementById("result");

    element.addEventListener("change", (event) => {
        let selectedColor = event.target.value;
        result.textContent = `You selected: ${selectedColor}`;
    })
}

function dropdownToggle(){
    let dropdownBtn = document.getElementById("drpdown");
    let dropdownContent = document.getElementById("dropdowncntent");
    
    dropdownBtn.addEventListener("click", () => {
        dropdownContent.classList.toggle("hiddent");
    });


    window.addEventListener("click", (event) => {
    if (!dropdownBtn.contains(event.target)) {
        dropdownContent.classList.add("hiddent");
    }
});
}

dataprint();

dropdownToggle();

let el = function(){
    console.log("Hello World");
}

el()