// JavaScript Document
// main.js

// Login form handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;
            
            // Here you would typically send this data to your backend for authentication
            console.log('Login attempt:', { email, userType });
            
            // For demonstration, we'll just redirect based on user type
            switch(userType) {
                case 'client':
                    window.location.href = 'client-dashboard.html';
                    break;
                case 'partner':
                    window.location.href = 'partner-dashboard.html';
                    break;
                case 'investor':
                    window.location.href = 'investor-dashboard.html';
                    break;
                default:
                    alert('Please select a user type');
            }
        });
    }
});

// News ticker functionality
const newsItems = [
    "Global markets show strong growth",
    "New technological breakthrough in renewable energy",
    "International trade agreements set to boost economy",
    "Startups driving innovation in AI and machine learning"
];

let newsIndex = 0;

function updateNewsTicker() {
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        tickerContent.textContent = newsItems[newsIndex];
        newsIndex = (newsIndex + 1) % newsItems.length;
    }
}

setInterval(updateNewsTicker, 5000);

// Profile picture upload preview
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById('profilePicture').setAttribute('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Account activation toggle
function toggleActivation() {
    const activationStatus = document.getElementById('activationStatus');
    const activationToggle = document.getElementById('activationToggle');
    
    if (activationStatus.textContent === 'Inactive') {
        activationStatus.textContent = 'Active';
        activationStatus.classList.remove('text-danger');
        activationStatus.classList.add('text-success');
        activationToggle.textContent = 'Deactivate Account';
    } else {
        activationStatus.textContent = 'Inactive';
        activationStatus.classList.remove('text-success');
        activationStatus.classList.add('text-danger');
        activationToggle.textContent = 'Activate Account';
    }
}

// Dashboard initialization
function initializeDashboard() {
    const userTypeElement = document.getElementById('userType');
    if (userTypeElement) {
        const userType = userTypeElement.textContent;
        console.log(`Initializing ${userType} Dashboard`);
        // Here you would typically load user-specific data from your backend
        // and populate the dashboard with relevant information
    }
}

// Call dashboard initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);