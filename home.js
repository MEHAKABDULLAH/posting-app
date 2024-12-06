import{auth,onAuthStateChanged, signOut,db,getFirestore,collection, addDoc, getDocs,
     updateDoc, deleteDoc, doc, query, orderBy,where
   } from "./firebase.js"
  
  
  
  
    onAuthStateChanged(auth , (user)=> {
      console.log(user);
      
    if (user) {
      const profilePicture = document.querySelector(".profile-pict");
      const displayName = document.querySelector(".dp-name-p");
      displayName.innerHTML = user.displayName || "Anonymous"; 
      profilePicture.src = user.photoURL || "default-pic.jpg";



      currentUser = user;
      loginBtn.textContent = "Logout";
      loadBlogs();
    } else {   
        currentUser = null;
        loginBtn.textContent = "Login";
        loadBlogs();
      console.log(error);
      
    }
  });
  
  document.querySelector(".login").addEventListener("click", function() {
   window.location.href = "home.html"
});
  
  
  
  
  const logoutBtn = document.getElementById('logoutBtn');
  
  let out = ()=>{
  
   signOut(auth).then(() => {
     alert('logout successfully!.')
     window.location.href = 'home.html'
   }).catch((error) => {
     alert('error',error)
   });
  }
  logoutBtn.addEventListener("click",out)


  ///searchinput//


  const mainContent = document.getElementById("mainContent");
  const postBlogButton = document.getElementById("postBlog");
  const blogsContainer = document.getElementById("blogsContainer");
  const searchBar = document.getElementById("searchBar");
  
  let currentUser = null;
////fisrt work//




  ////last work///
  postBlogButton.addEventListener("click", async () => {
    const title = document.getElementById("blogTitle").value;
    const content = document.getElementById("blogContent").value;
    const category = document.getElementById("blogCategory").value;
  
    if (!title || !content || !currentUser) {
      alert("Please fill in all fields and login first.");
      return;
    }
  
    const blogData = {
      title,
      content,
      category,
      author: currentUser.email,
      timestamp: new Date(),
    };
  
    await addDoc(collection(db, "blogs"), blogData);
    alert(" posted successfully!");
    loadBlogs();
  });
  
  // Load Blogs (with sorting by timestamp, showing recent first)
  async function loadBlogs() {
    const blogsQuery = query(collection(db, "blogs"), orderBy("timestamp", "desc"));
    const blogsSnapshot = await getDocs(blogsQuery);
    blogsContainer.innerHTML = "<h2>All Blogs</h2>";
  
    blogsSnapshot.forEach((doc) => {
      const blog = doc.data();
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog-post");
  
      blogElement.innerHTML = `
        <h3>${blog.title}</h3>
        <small>By: ${blog.author} | ${new Date(blog.timestamp.seconds * 1000).toLocaleString()}</small>
        <p>${blog.content}</p>
        <small>Category: ${blog.category}</small>
      `;
  //update and delete
      if (currentUser && currentUser.email === blog.author) {
        blogElement.innerHTML += `
          <button id="edit" onclick="editBlog('${doc.id}', '${blog.title}', '${blog.content}')">Edit</button>
          <button id="delete" onclick="deleteBlog('${doc.id}')">Delete</button>
        `;
      }
  
      blogsContainer.appendChild(blogElement);
    });
  }
  
  // Edit Blog
  window.editBlog = async (id, title, content) => {
    const newTitle = prompt("Edit Title:", title);
    const newContent = prompt("Edit Content:", content);
  
    if (newTitle && newContent) {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, { title: newTitle, content: newContent });
      alert("Blog updated successfully!");
      loadBlogs();
    }
  };
  
  // Delete Blogs
  window.deleteBlog = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "blogs", id));
      alert("Blog deleted successfully!");
      loadBlogs();
    }
  };
  














  //Search Blogs
  

  searchBar.addEventListener("input", async () => {
    const searchTerm = searchBar.value.toLowerCase();
    console.log("Search Term:", searchTerm); // Debugging line
    const blogsContainer = document.getElementById("blogsContainer");
    blogsContainer.innerHTML = ""; // Clear previous results

    // Fetch all blogs
    const blogsQuery = query(collection(db, "blogs"), orderBy("timestamp", "desc"));
    
    try {
        const blogsSnapshot = await getDocs(blogsQuery);
        blogsContainer.innerHTML = "<h2>Search Results</h2>";

        // Filter results based on the search term
        let resultsFound = false; // Flag to check if any results are found
        blogsSnapshot.forEach((doc) => {
            const blog = doc.data();
            // Check for partial matches
            if (
                blog.title.toLowerCase().includes(searchTerm) ||
                blog.content.toLowerCase().includes(searchTerm) ||
                blog.category.toLowerCase().includes(searchTerm) // Include category if needed
            ) {
                resultsFound = true; // Set flag to true if a result is found
                const blogElement = document.createElement("div");
                blogElement.classList.add("blog-post");

                blogElement.innerHTML = `
                    <h3>${blog.title}</h3>
                    <small>By: ${blog.author} | ${new Date(blog.timestamp.seconds * 1000).toLocaleString()}</small>
                    <p>${blog.content}</p>
                    <small>Category: ${blog.category}</small>
                `;
                blogsContainer.appendChild(blogElement);
            }
        });

        // If no results found
        if (!resultsFound) {
            blogsContainer.innerHTML += "<p>No results found.</p>";
        }
    } catch (error) {
        console.error("Error fetching blogs: ", error);
        blogsContainer.innerHTML = "<p>Error fetching blogs. Please try again later.</p>";
    }
});
  //////new code///

