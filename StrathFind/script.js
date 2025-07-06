document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const reportForm = document.getElementById('reportForm');
    const listingsContainer = document.getElementById('listingsContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Initialize the page
    loadItems();

    // Form submission
    reportForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('type', document.getElementById('itemType').value);
        formData.append('name', document.getElementById('itemName').value);
        formData.append('description', document.getElementById('itemDescription').value);
        formData.append('location', document.getElementById('location').value);
        formData.append('date', document.getElementById('date').value);
        formData.append('contact', document.getElementById('contact').value);
        formData.append('image', document.getElementById('itemImage').files[0]);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                body: formData,
                headers: {"Authorization": `Bearer ${token}`}
            });

            if (response.ok) {
                alert('Thank you for your report!');
                reportForm.reset();
                document.getElementById('imagePreview').style.display = 'none';
                loadItems(); // Refresh listings
            } else {
                throw new Error('Failed to submit report');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('There was an error submitting your report. Please try again.');
        }
    });

    // Image preview functionality
    document.getElementById('itemImage').addEventListener('change', function(e) {
        const preview = document.getElementById('imagePreview');
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', async function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter listings
            const filter = this.dataset.filter;
            let url = 'http://localhost:5000/api/items';

            if (filter !== 'all') {
                url += `?type=${filter}`;
            }

            try {
                const response = await fetch(url);
                const filteredItems = await response.json();
                renderListings(filteredItems);
            } catch (err) {
                console.error('Error loading filtered items:', err);
            }
        });
    });

    // Load items from backend
    async function loadItems() {
        try {
            const response = await fetch('http://localhost:5000/api/items');
            const items = await response.json();
            renderListings(items);
        } catch (err) {
            console.error('Error loading items:', err);
        }
    }

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
                    ${item.image ? `<img src="http://localhost:5000/${item.image}" alt="${item.name}" class="item-image">` : ''}
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