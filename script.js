// --- Helper Functions for Cookies ---

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name + "=") === 0) {
            return c.substring(name.length + 1, c.length);
        }
    }
    return "";
}

// --- Core Application Logic ---

// Function to apply the styles via CSS variables
function applyPreferences(size, color) {
    if (size) {
        // Update the CSS variable (adding 'px' to the numeric value)
        document.documentElement.style.setProperty('--fontsize', size + 'px');
        // Keep the input field synced with the saved preference
        document.getElementById('fontsize').value = size; 
    }
    if (color) {
        // Update the CSS variable
        document.documentElement.style.setProperty('--fontcolor', color);
        // Keep the input field synced with the saved preference
        document.getElementById('fontcolor').value = color;
    }
}

// 1. Automatically Apply Preferences on Page Load
window.onload = function() {
    const savedFontSize = getCookie("fontsize");
    const savedFontColor = getCookie("fontcolor");
    
    // If cookies exist, apply them immediately
    applyPreferences(savedFontSize, savedFontColor);
};

// 2. Saving User Preferences on Form Submit
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission/page reload

    // Grab current values from the inputs
    const fontSizeVal = document.getElementById('fontsize').value;
    const fontColorVal = document.getElementById('fontcolor').value;

    // Save values to cookies (setting expiration to 30 days)
    setCookie("fontsize", fontSizeVal, 30);
    setCookie("fontcolor", fontColorVal, 30);

    // Immediately apply the new preferences to the page
    applyPreferences(fontSizeVal, fontColorVal);
});