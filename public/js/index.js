const postsContainer = document.querySelector("#posts-container");

for (let i = 0; i < data.length; i++) {

    let post = data[i];

    // post card
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");


    // author
    const author = document.createElement("div");
    author.classList.add("author");


    // profile
    const profile = document.createElement("div");
    profile.classList.add("profile");

    profile.innerText = post.author[0];


    // author name
    const authorName = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.innerText = post.author;

    authorName.appendChild(h3);


    // put profile + name inside author
    author.appendChild(profile);
    author.appendChild(authorName);


    // post content
    const postContent = document.createElement("div");
    postContent.classList.add("post-content");

    const question = document.createElement("h2");
    question.innerText = post.question;

    postContent.appendChild(question);


    // buttons
    const postActions = document.createElement("div");
    postActions.classList.add("post-actions");


    const viewBtn = document.createElement("button");
    viewBtn.classList.add("view-btn");
    viewBtn.innerText = "View";

    viewBtn.onclick = function () {
       window.location.href = `/posts/${post.id}`;
    };
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerText = "Edit";

    editBtn.onclick = function () {
       window.location.href = `/posts/${post.id}/edit`;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = async function () {
        await fetch(`/posts/${post.id}`, {
            method: "DELETE"
        });
        window.location.href = "/posts";
    };

    postActions.appendChild(viewBtn);
    postActions.appendChild(editBtn);
    postActions.appendChild(deleteBtn);


    // put everything inside post card
    postCard.appendChild(author);
    postCard.appendChild(postContent);
    postCard.appendChild(postActions);
    

    // put post card inside container
    postsContainer.appendChild(postCard);
}