// =============================
// DOM Elements
// =============================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const profile = document.getElementById("profile");
const repositories = document.getElementById("repositories");
const recentSearches = document.getElementById("recent-searches");

// =============================
// Event Listeners
// =============================

// Search Button
searchBtn.addEventListener("click", () => {
    const username = searchInput.value.trim();

    if (username !== "") {
        fetchUser(username);
    }
});

// Press Enter to Search
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// =============================
// Fetch User
// =============================

async function fetchUser(username) {

    profile.innerHTML = `
        <div class="placeholder">
            Loading Profile...
        </div>
    `;

    repositories.innerHTML = `
        <div class="placeholder">
            Loading Repositories...
        </div>
    `;

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        const data = await response.json();

        if (data.message === "Not Found") {

            profile.innerHTML = `
                <div class="placeholder">
                    User Not Found
                </div>
            `;

            repositories.innerHTML = `
                <div class="placeholder">
                    No Repositories
                </div>
            `;

            return;
        }

        displayProfile(data);

        await fetchRepositories(username);

        saveRecentSearch(username);

    } catch (error) {

        profile.innerHTML = `
            <div class="placeholder">
                Something went wrong.
            </div>
        `;

        repositories.innerHTML = `
            <div class="placeholder">
                Unable to load repositories.
            </div>
        `;

    }

}

// =============================
// Display Profile
// =============================

function displayProfile(user) {

    profile.innerHTML = `

        <div class="profile-card">

            <img
                src="${user.avatar_url}"
                class="avatar"
            >

            <h2>${user.name ?? user.login}</h2>

            <p>${user.bio ?? "No bio available."}</p>

            <br>

            <p><strong>Followers:</strong> ${user.followers}</p>

            <p><strong>Following:</strong> ${user.following}</p>

            <p><strong>Repositories:</strong> ${user.public_repos}</p>

            <p><strong>Location:</strong> ${user.location ?? "Not Available"}</p>

            <p><strong>Company:</strong> ${user.company ?? "Not Available"}</p>

            <p>
                <strong>Website:</strong>
                ${
                    user.blog
                        ? `<a href="${user.blog}" target="_blank">${user.blog}</a>`
                        : "Not Available"
                }
            </p>

            <br>

            <a href="${user.html_url}" target="_blank">
                Visit GitHub Profile
            </a>

        </div>

    `;

}

// =============================
// Fetch Repositories
// =============================

async function fetchRepositories(username) {

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );

        const repos = await response.json();

        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

        displayRepositories(repos.slice(0, 5));

    } catch (error) {

        repositories.innerHTML = `
            <div class="placeholder">
                Unable to load repositories.
            </div>
        `;

    }

}// =============================
// Display Repositories
// =============================

function displayRepositories(repos) {

    if (repos.length === 0) {

        repositories.innerHTML = `
            <div class="placeholder">
                No repositories found.
            </div>
        `;

        return;
    }

    let output = `
        <h2 style="margin-bottom:20px;">Top Repositories</h2>
    `;

    repos.forEach(repo => {

        output += `

        <div class="repo-card">

            <h3>${repo.name}</h3>

            <p>${repo.description ?? "No description available."}</p>

            <br>

            <p><strong>Language:</strong> ${repo.language ?? "Unknown"}</p>

            <p>⭐ ${repo.stargazers_count}</p>

            <p>🍴 ${repo.forks_count}</p>

            <br>

            <a href="${repo.html_url}" target="_blank">
                Open Repository
            </a>

        </div>

        `;

    });

    repositories.innerHTML = output;

}

// =============================
// Recent Searches
// =============================

function saveRecentSearch(username) {

    let searches = JSON.parse(
        localStorage.getItem("recentSearches")
    ) || [];

    // Remove duplicate username
    searches = searches.filter(name => name !== username);

    // Add newest search at the beginning
    searches.unshift(username);

    // Keep only the latest 5 searches
    if (searches.length > 5) {
        searches.pop();
    }

    localStorage.setItem(
        "recentSearches",
        JSON.stringify(searches)
    );

    displayRecentSearches();

}

// =============================
// Display Recent Searches
// =============================

function displayRecentSearches() {

    const searches = JSON.parse(
        localStorage.getItem("recentSearches")
    ) || [];

    if (searches.length === 0) {

        recentSearches.innerHTML = `
            <div class="placeholder">
                No recent searches.
            </div>
        `;

        return;
    }

    let output = `
        <h2 style="margin-bottom:20px;">
            Recent Searches
        </h2>
    `;

    searches.forEach(username => {

        output += `
            <button
                class="recent-btn"
                onclick="searchRecent('${username}')">
                ${username}
            </button>
        `;

    });

    recentSearches.innerHTML = output;

}

// =============================
// Search Recent User
// =============================

function searchRecent(username) {

    searchInput.value = username;

    fetchUser(username);

}

// =============================
// Load Recent Searches
// =============================

displayRecentSearches();