document.addEventListener("DOMContentLoaded", function () {
    // Function to render posts on the page
    function renderPosts(posts) {
        const postsContainer = document.getElementById("posts-container");
        postsContainer.innerHTML = ""; // Clear existing content

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post-card");
            postElement.setAttribute("data-title", post.title);
            postElement.setAttribute("data-author", post.username);
            postElement.setAttribute("data-content", post.content);
            postElement.innerHTML = `
                <div class="user-info">
                    <p class="username">${post.username}</p>
                </div>
                <div class="post-content">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-text">${post.content}</p>
                    <span class="ellipsis-icon"><i class="fas fa-ellipsis-h" onclick="viewPost(this)"></i></span>
                    <span class="delete-icon"><i class="fas fa-trash"></i></span>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });

        // Add event listeners for delete icons
        const deleteIcons = document.querySelectorAll(".delete-icon");
        const confirmationDialog = document.getElementById("confirmation-dialog");
        const confirmButton = document.querySelector(".confirm-btn");
        const cancelButton = document.querySelector(".cancel-btn");

        deleteIcons.forEach(icon => {
            icon.addEventListener("click", function () {
                const postCard = this.closest(".post-card");
                confirmationDialog.style.display = "block";

                confirmButton.addEventListener("click", function () {
                    postCard.remove();
                    confirmationDialog.style.display = "none";
                });

                cancelButton.addEventListener("click", function () {
                    confirmationDialog.style.display = "none";
                });
            });
        });
    }

    // Function to handle the "View Post" action
    window.viewPost = function (element) {
        const postCard = element.closest('.post-card');
        const postTitle = postCard.getAttribute('data-title');
        const postAuthor = postCard.getAttribute('data-author');
        const postContent = postCard.getAttribute('data-content');

        const postDetails = {
            title: postTitle,
            author: postAuthor,
            content: postContent
        };

        localStorage.setItem('postDetails', JSON.stringify(postDetails));
        window.location.href = 'post.html';
    };

    // Dummy data for posts (replace with actual data fetched from server/API)
    const posts = [
        { id: 1, username: "Shristi Gupta", title: "‘let’ me be a ‘const’(ant), not a ‘var’(iable)!", content: "Since JavaScript does not have any type-checking, either of these keywords can be used to declare a variable of any type (datatype) in JavaScript. Though all the three keywords are" },
        { id: 2, username: "Colby Fayock", title: "What is linting and how can it save you time?", content: "One of the biggest challenges in software development is time. It's something we can't easily get more of, but linting can help us make the most out of the time we have." },
        { id: 3, username: "Yazeed Bzadough", title: "How to Get More Views on Your Tech Blog", content: "If you're a developer with a Twitter account, you've already seen everyone and their cat start a blog, YouTube channel, or Patreon. We all want to become" },
        { id: 4, username: "Cedd Burge", title: "How to write easily describable code", content: "When code is not describable using words, most people have to do some mental mapping to turn it in to words. This wastes mental energy, and you run the risk of getting the mapping" },
        { id: 5, username: "Shristi Gupta", title: "Everything you should know about ‘module’ & ‘require’ in Node.js", content: "Node.js treats each JavaScript file as a separate module. For instance, if you have a file containing some code and this file is named xyz.js, then this file is treated as a module in Node.js" }
    ];

    // Initial render of posts when the page loads
    renderPosts(posts);

    // Example event listener for a button to fetch posts again (optional)
    const refreshButton = document.getElementById("refresh-button");
    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            // Logic to fetch posts again
            console.log("Refresh button clicked");
        });
    }

    // Add sign-in and sign-up button functionality
    const signInButton = document.querySelector(".signin-btn");
    const signUpButton = document.querySelector(".signup-btn");

    signInButton.addEventListener("click", function () {
        // Logic to display sign-in modal
        alert("Sign In button clicked!");
    });

    signUpButton.addEventListener("click", function () {
        // Logic to display sign-up modal
        alert("Sign Up button clicked!");
    });
});
