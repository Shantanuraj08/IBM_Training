const usersContainer = document.getElementById("users");

async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const users = await response.json();

        users.forEach((user) => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;

            usersContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        usersContainer.innerHTML = `<h2>Failed to load users.</h2>`;
    }
}

fetchUsers();