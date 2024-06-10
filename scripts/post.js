document.addEventListener("DOMContentLoaded", function () {
    const editBtn = document.getElementById("edit-btn");
    const saveBtn = document.getElementById("save-btn");
    const postTitle = document.getElementById("post-title");
    const postAuthor = document.getElementById("post-author");
    const postContent = document.getElementById("post-content");
    const likeBtn = document.getElementById("like-btn");
    const likeStatus = document.getElementById("like-status");
    const commentInput = document.getElementById("comment-input");
    const commentBtn = document.getElementById("comment-btn");
    const commentsList = document.getElementById("comments-list");

    let likeCount = 0;

    // Load post details from localStorage
    const postDetails = JSON.parse(localStorage.getItem('postDetails'));
    if (postDetails) {
        postTitle.textContent = postDetails.title;
        postAuthor.textContent = postDetails.author;
        postContent.textContent = postDetails.content;
    }

    editBtn.addEventListener("click", function () {
        postTitle.contentEditable = "true";
        postContent.contentEditable = "true";
        postTitle.classList.add("editable");
        postContent.classList.add("editable");
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
    });

    saveBtn.addEventListener("click", function () {
        postTitle.contentEditable = "false";
        postContent.contentEditable = "false";
        postTitle.classList.remove("editable");
        postContent.classList.remove("editable");
        saveBtn.style.display = "none";
        editBtn.style.display = "inline-block";
    });

    likeBtn.addEventListener("click", function () {
        likeCount++;
        likeStatus.textContent = `${likeCount} ${likeCount === 1 ? 'person likes' : 'people like'} this!`;
        likeBtn.textContent = "Liked!";
    });

    commentBtn.addEventListener("click", function () {
        const commentText = commentInput.value.trim();
        if (commentText !== "") {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.textContent = commentText;
            commentsList.insertBefore(commentElement, commentsList.firstChild);
            commentInput.value = "";
        }
    });
});
