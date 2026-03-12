// Select Elements from the DOM
const newsContainer = document.getElementById('news-container');
const loadingElement = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const topicButtons = document.querySelectorAll('.topic-btn');

/**
 * Fetch news from the API for a specific query
 * @param {string} query - The topic selected (e.g., 'technology', 'sports')
 */
async function fetchNews(query) {
    // 1. Show loading spinner, hide error & previous news
    newsContainer.innerHTML = ''; // Clear old news
    newsContainer.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingElement.classList.remove('hidden');

    try {
        // Build the URL using the Hacker News API based on the passed query
        const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
        
        // 2. Await the response
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        // 3. Convert response to JSON
        const data = await res.json();
        
        // Print the data to console as requested
        console.log("data:", data);

        // 4. Render the news articles using showNews
        showNews(data.hits);

    } catch (error) {
        console.error('Error fetching news:', error);
        // Show error message if something fails
        loadingElement.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

/**
 * Render an array of news articles to the DOM
 * @param {Array} hits - Array of items from the HackerNews API (data.hits)
 */
function showNews(hits) {
    // Hide loading
    loadingElement.classList.add('hidden');
    
    // We only want articles that actually have a title
    const validArticles = hits.filter(article => article.title || article.story_title);

    if (validArticles.length === 0) {
        errorMessage.classList.remove('hidden');
        errorMessage.innerHTML = '<p>No news found for this category at the moment.</p>';
        return;
    }

    // Show container
    newsContainer.classList.remove('hidden');

    // Create HTML for each article
    validArticles.forEach(article => {
        // Hacker News API returns either 'title' or 'story_title'
        const displayTitle = article.title || article.story_title;
        
        // Link to the article or the hacker news page if normal URL is missing
        const linkUrl = article.url || article.story_url || `https://news.ycombinator.com/item?id=${article.objectID}`;
        
        // Grab author and points for some extra info since HN doesn't have descriptions
        const author = article.author || 'Unknown User';
        const points = article.points || 0;

        // Hacker News API does not provide images.
        // We will generate a unique but consistent image using Picsum Photos based on the ID!
        const imageUrl = `https://picsum.photos/seed/${article.objectID}/800/600`;

        const card = document.createElement('div');
        card.className = 'news-card';

        // Using Template Literals to build the card structure cleanly
        card.innerHTML = `
            <img src="${imageUrl}" alt="News Image" class="news-img" onerror="this.src='https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'">
            <div class="news-content">
                <h3 class="news-title">${displayTitle}</h3>
                <p class="news-desc"><strong>Author:</strong> ${author} <br> <strong>Points:</strong> ${points} ⭐</p>
                <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="read-more">Read Full Story</a>
            </div>
        `;

        newsContainer.appendChild(card);
    });
}

// -----------------------------------------
// Event Listeners for category buttons
// -----------------------------------------
topicButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Remove 'active' class from all buttons
        topicButtons.forEach(btn => btn.classList.remove('active'));
        
        // 2. Add 'active' class to the clicked button
        button.classList.add('active');

        // 3. Get the category from the 'data-topic' attribute
        const selectedCategory = button.getAttribute('data-topic');

        // 4. Fetch and display news for the new category
        fetchNews(selectedCategory);
    });
});

// -----------------------------------------
// Default behavior when prompt loads
// -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // By default, fetch 'general' search
    fetchNews('general');
});
