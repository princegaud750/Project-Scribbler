document.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.querySelector(".signup-btn");
    const signInButton = document.querySelector(".signin-btn");
    const signUpLink = document.getElementById("signupLink");
    const createPostButton = document.querySelector(".create-post-btn");
    const allPostsButton = document.querySelector(".all-posts-btn");

    const signUpModal = document.getElementById("signupModal");
    const signInModal = document.getElementById("signinModal");
    const createPostModal = document.getElementById("createPostModal");
    const allPostsModal = document.getElementById("allPostsModal");

    signUpButton.addEventListener("click", function() {
        signUpModal.style.display = "block";
    });

    signInButton.addEventListener("click", function() {
        signInModal.style.display = "block";
    });

    
    createPostButton.addEventListener("click", function() {
    createPostModal.style.display = "block";
});


    signUpLink.addEventListener("click", function(event) {
        event.preventDefault();
        signInModal.style.display = "none";
        signUpModal.style.display = "block";
    });

    allPostsButton.addEventListener("click", function() {
        window.location.href = "postslist.html";
    });

    const closeButtons = document.querySelectorAll(".close");

    closeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            signUpModal.style.display = "none";
            signInModal.style.display = "none";
            createPostModal.style.display = "none";
            allPostsModal.style.display = "none";
        });
    });

    window.addEventListener("click", function(event) {
        if (event.target == signUpModal || event.target == signInModal || event.target == createPostModal || event.target == allPostsModal) {
            signUpModal.style.display = "none";
            signInModal.style.display = "none";
            createPostModal.style.display = "none";
            allPostsModal.style.display = "none";
        }
    });

    // Functionality for signing up a user
    function signUpUser() {
        const signUpForm = document.getElementById("signupForm");
        signUpForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(signUpForm);
            const name = formData.get('signupName');
            const username = formData.get('signupUsername');
            const password = formData.get('signupPassword');
            const confirmPassword = formData.get('confirmPassword');
    
            // Check if the username already exists
            fetch('https://example.com/check-username', {
                method: 'POST',
                body: JSON.stringify({ username }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to check username');
                }
                return response.json();
            })
            .then(data => {
                if (data.exists) {
                    alert('Username already exists. Please choose a different username.');
                } else {
                    // Proceed with sign-up if username is available
                    fetch('https://example.com/signup', {
                        method: 'POST',
                        body: JSON.stringify({ name, username, password, confirmPassword }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to sign up');
                        }
                        // Redirect the user to the login page after successful sign-up
                        window.location.href = "login.html";
                    })
                    .catch(error => {
                        console.error('Error signing up:', error);
                        // Handle error
                    });
                }
            })
            .catch(error => {
                console.error('Error checking username:', error);
                // Handle error
            });
        });
    }
    

    // Functionality for signing in a user
    function signInUser() {
        const signInForm = document.getElementById("signInForm");
        signInForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(signInForm);
            const username = formData.get('signinUsername');
            const password = formData.get('signinPassword');
    
            fetch('https://example.com/signin', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to sign in');
                }
                // Redirect the user to the home page after successful login
                window.location.href = "index.html";
            })
            .catch(error => {
                console.error('Error signing in:', error);
                // Handle error
            });
        });
    }
    

    signUpUser();
    signInUser();
});
