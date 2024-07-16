const accessKey = "woa2heBPmkxdtRfFSioOXUf93a8ThBtsKP7Yp5T9QAM";
const SearchForm = document.getElementById("search-form");
const SearchBox = document.getElementById("search-box");
const SearchResult = document.getElementById("search-result");
const ShowMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = SearchBox.value; // Get the search keyword from the input box
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`; 
    const response = await fetch(url); // Fetch data from Unsplash API
    const data = await response.json(); // Convert response to JSON

    const results = data.results; // Get the search results
    if (page === 1) {
        SearchResult.innerHTML = ''; // Clear previous results if it's a new search
    }

    // Loop through the results and display them
    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        SearchResult.appendChild(imageLink);
    });

    // Show or hide the "Show more" button based on total pages
    if (data.total_pages > page) {
        ShowMoreBtn.style.display = "block";
    } else {
        ShowMoreBtn.style.display = "none";
    }
}

// Event listener for the search form submission
SearchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    page = 1; // Reset page number for a new search
    searchImages(); // Perform the search
});

// Event listener for the "Show more" button click
ShowMoreBtn.addEventListener("click", () => {
    page++; // Increment the page number to load more results
    searchImages(); // Perform the search
});
