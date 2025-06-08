document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real app, this would come from a database
    let listings = [
        {
            id: 1,
            type: 'lost',
            name: 'Black Wallet',
            description: 'Black leather wallet with credit cards and ID inside. Reward offered.',
            location: 'Central Park',
            date: '2023-05-15',
            contact: 'john@example.com'
        },
        {
            id: 2,
            type: 'found',
            name: 'iPhone 12',
            description: 'Silver iPhone found near the food court. Has a blue case.',
            location: 'City Mall',
            date: '2023-05-18',
            contact: '555-1234'
        },
        {
            id: 3,
            type: 'lost',
            name: 'Gold Necklace',
            description: 'Thin gold chain with heart pendant. Sentimental value.',
            location: 'Main Street',
            date: '2023-05-20',
            contact: 'sarah@example.com'
        }
    ];

    // DOM Elements
    const reportForm = document.getElementById('reportForm');
    const listingsContainer = document.getElementById('listingsContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Initialize the page
    renderListings(listings);

    // Form submission
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newItem = {
            id: Date.now(), // Simple unique ID
            type: document.getElementById('itemType').value,
            name: document.getElementById('itemName').value,
            description: document.getElementById('itemDescription').value,
            location: document.getElementById('location').value,
            date: document.getElementById('date').value,
            contact: document.getElementById('contact').value
        };

        listings.unshift(newItem); // Add to beginning of array
        renderListings(listings);
        reportForm.reset();

        alert('Thank you for your report!');
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter listings
            const filter = this.dataset.filter;
            let filteredListings = listings;

            if (filter !== 'all') {
                filteredListings = listings.filter(item => item.type === filter);
            }

            renderListings(filteredListings);
        });
    });

    // Render listings to the page
    function renderListings(items) {
        listingsContainer.innerHTML = '';

        if (items.length === 0) {
            listingsContainer.innerHTML = '<p class="no-items">No items found.</p>';
            return;
        }

        items.forEach(item => {
            const listingElement = document.createElement('div');
            listingElement.className = `listing-card ${item.type}`;
            listingElement.innerHTML = `
                <div class="card-header">
                    ${item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                </div>
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <p><strong>Description:</strong> ${item.description}</p>
                    <p><strong>Location:</strong> ${item.location}</p>
                </div>
                <div class="card-footer">
                    <span>${formatDate(item.date)}</span>
                    <span>Contact: ${item.contact}</span>
                </div>
            `;

            listingsContainer.appendChild(listingElement);
        });
    }

    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});