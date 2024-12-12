function checkTermsAccepted() {
    // Retrieve the acceptance status from local storage
    const accepted = localStorage.getItem('tosAccepted') === 'true';

    // If not accepted, redirect to index.html
    if (!accepted) {
        window.location.href = 'index.html';
        document.getElementById('update-log').style.display = 'block';
    }
}

// Call the checkTermsAccepted function when the page loads
window.onload = checkTermsAccepted;
