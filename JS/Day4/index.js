function change(){
    const cardContainer = document.getElementById("cardContainer")

    cardContainer.insertAdjacentHTML("beforeend", `
        <div class="card">
            <img src="https://via.placeholder.com/260x160.png?text=Card+Image" alt="Card image">
        </div>
    `)
}

function arrange(){
    document.getElementById("cardContainer").classList.add("vertical")
}

