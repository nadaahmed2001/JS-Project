
//toggel button continue reading 
document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); 

            const targetId = button.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                if (targetContent.style.display === "none" || targetContent.style.display === "") {
                    targetContent.style.display = "block";
                    button.textContent = "SHOW LESS";
                } else {
                    targetContent.style.display = "none";
                    button.textContent = "CONTINUE READING";
                }
            }
        });
    });
});






////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const blogSection = document.getElementById("blog-section");
    const paginationButtons = document.querySelectorAll(".pagination-btn");

    // Define the content for each section
    const sections = [
        `<div class="container">
        <!-- Blog post 1 -->
        <div class="col-12">
            <div class="blog-section-box">
                <div class="blog-section-img">
                    <img src="images/Blog_About/b1.jpg" alt="The Cotton-Jerrey Zip-Up Hoodie" class="img-fluid">
                </div>
                <div class="blog-section-detailes">
                    <h4>The Cotton-Jerrey Zip-Up Hoodie</h4>
                    <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                        wolf chartreuse hexagon irony, godard.</p>
                    <p class="hidden-content" id="content-1" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                        Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
                    <a href="#" class="toggle-btn" data-target="content-1">CONTINUE READING</a>
                </div>
                <h1>13/01</h1>
            </div>
        </div>
        </div>
        `,
        `
        <div class="container">
        <!-- Blog post 2 -->
        <div class="col-12">
            <div class="blog-section-box">
                <div class="blog-section-img">
                    <img src="images/Blog_About/b2.jpg" alt="How to Style a Quiff">
                </div>
                <div class="blog-section-detailes">
                    <h4>How to Style a Quiff</h4>
                    <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                        wolf chartreuse hexagon irony, godard.</p>
                    <p class="hidden-content" id="content-2" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                        Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
                    <a href="#" class="toggle-btn" data-target="content-2">CONTINUE READING</a>
                </div>
                <h1>13/01</h1>
            </div>
        </div>
        </div>
        `,
        `
        <div class="container">
        <!-- Blog post 3 -->
        <div class="col-12">
            <div class="blog-section-box">
                <div class="blog-section-img">
                    <img src="images/Blog_About/b3.jpg" alt="Must Have Skeater Girl Item">
                </div>
                <div class="blog-section-detailes">
                    <h4>Must Have Skeater Girl Item</h4>
                    <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                        wolf chartreuse hexagon irony, godard.</p>
                    <p class="hidden-content" id="content-3" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                        Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
                    <a href="#" class="toggle-btn" data-target="content-3">CONTINUE READING</a>
                </div>
                <h1>13/01</h1>
            </div>
        </div>
        </div>
        `,
        `
        <div class="container">
       <!-- Blog post 4 -->
        <div class="col-12">
            <div class="blog-section-box">
                <div class="blog-section-img col-sm-12">
                    <img src="images/Blog_About/b4.jpg" alt="Runaway Inspired Trends">
                </div>
                <div class="blog-section-detailes">
                    <h4>Runaway Inspired Trends</h4>
                    <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                        wolf chartreuse hexagon irony, godard.</p>
                    <p class="hidden-content" id="content-4" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                        Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
                    <a href="#" class="toggle-btn" data-target="content-4">CONTINUE READING</a>
                </div>
                <h1>13/01</h1>
            </div>
        </div>
        </div>
        `
        ,
        `<div class="container">
         <!-- Blog post 5 -->
        <div class="col-12">
            <div class="blog-section-box">
                <div class="blog-section-img">
                    <img src="images/Blog_About/b6.jpg" alt="AW20 Menswear Trends">
                </div>
                <div class="blog-section-detailes">
                    <h4>AW20 Menswear Trends</h4>
                    <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                        wolf chartreuse hexagon irony, godard.</p>
                    <p class="hidden-content" id="content-5" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                        Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
                    <a href="#" class="toggle-btn" data-target="content-5">CONTINUE READING</a>
                </div>
                <h1>13/01</h1>
            </div>
        </div>
      </div>

`
,
`<div class="container">
<!-- Blog post 6 -->
<div class="col-12">
    <div class="blog-section-box">
        <div class="blog-section-img">
            <img src="images/Blog_About/b4.jpg" alt="The Cotton-Jerrey Zip-Up Hoodie" class="img-fluid">
        </div>
        <div class="blog-section-detailes">
            <h4>The Cotton-Jerrey Zip-Up Hoodie</h4>
            <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                wolf chartreuse hexagon irony, godard.</p>
            <p class="hidden-content" id="content-1" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
            <a href="#" class="toggle-btn" data-target="content-1">CONTINUE READING</a>
        </div>
        <h1>13/01</h1>
    </div>
</div>
</div>
`,
`
<div class="container">
<!-- Blog post 7 -->
<div class="col-12">
    <div class="blog-section-box">
        <div class="blog-section-img">
            <img src="images/Blog_About/b1.jpg" alt="How to Style a Quiff">
        </div>
        <div class="blog-section-detailes">
            <h4>How to Style a Quiff</h4>
            <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                wolf chartreuse hexagon irony, godard.</p>
            <p class="hidden-content" id="content-2" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
            <a href="#" class="toggle-btn" data-target="content-2">CONTINUE READING</a>
        </div>
        <h1>13/01</h1>
    </div>
</div>
</div>
`,
`
<div class="container">
<!-- Blog post 8 -->
<div class="col-12">
    <div class="blog-section-box">
        <div class="blog-section-img">
            <img src="images/Blog_About/b3.jpg" alt="Must Have Skeater Girl Item">
        </div>
        <div class="blog-section-detailes">
            <h4>Must Have Skeater Girl Item</h4>
            <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                wolf chartreuse hexagon irony, godard.</p>
            <p class="hidden-content" id="content-3" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
            <a href="#" class="toggle-btn" data-target="content-3">CONTINUE READING</a>
        </div>
        <h1>13/01</h1>
    </div>
</div>
</div>
`,
`
<div class="container">
<!-- Blog post 9 -->
<div class="col-12">
    <div class="blog-section-box">
        <div class="blog-section-img col-sm-12">
            <img src="images/Blog_About/b5.jpg" alt="Runaway Inspired Trends">
        </div>
        <div class="blog-section-detailes">
            <h4>Runaway Inspired Trends</h4>
            <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                wolf chartreuse hexagon irony, godard.</p>
            <p class="hidden-content" id="content-4" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
            <a href="#" class="toggle-btn" data-target="content-4">CONTINUE READING</a>
        </div>
        <h1>13/01</h1>
    </div>
</div>
</div>
`
,
`<div class="container">
 <!-- Blog post 10 -->
<div class="col-12">
    <div class="blog-section-box">
        <div class="blog-section-img">
            <img src="images/Blog_About/b1.jpg" alt="AW20 Menswear Trends">
        </div>
        <div class="blog-section-detailes">
            <h4>AW20 Menswear Trends</h4>
            <p>Kickstarter man braid godard coloring book. Raclette waistcoat selfies yr
                wolf chartreuse hexagon irony, godard.</p>
            <p class="hidden-content" id="content-5" style="display: none;">Welcome, Kickstarter man braid godard coloring book. 
                Raclette waistcoat selfies yr wolf chartreuse hexagon irony, godard.</p>
            <a href="#" class="toggle-btn" data-target="content-5">CONTINUE READING</a>
        </div>
        <h1>13/01</h1>
    </div>
</div>
</div>

`


    ];
     // State to track the current page
     let currentPage = 0;

     // Function to update the content based on page range
     const updateBlogSection = (startIndex, endIndex) => {
         blogSection.innerHTML = sections.slice(startIndex, endIndex).join('');
     };
     
       // Function to handle pagination logic
    const handlePagination = (page) => {
        if (page === "start") {
            // For "start", show posts 1 to 5 (index 0 to 4)
            updateBlogSection(0, 5);
            currentPage = 0;
        } else if (page === "1") {
            // Page 1, show posts 1 to 5 (index 0 to 4)
            updateBlogSection(0, 5);
            currentPage = 1;
        } else if (page === "2") {
            // Page 2, show posts 3 to 7 (index 2 to 6)
            updateBlogSection(2, 7);
            currentPage = 2;
        } else if (page === "3") {
            // Page 3, show posts 5 to 10 (index 4 to 9)
            updateBlogSection(5, 10);
            currentPage = 3;
        } else if (page === "next") {
            // Handle "next" button functionality to move through pages
            if (currentPage < 3) {
                currentPage += 1;
            } else {
                currentPage = 0; // Loop back to the first page
            }
            if (currentPage === 0) {
                updateBlogSection(0, 5); // Show posts 1 to 5
            } else if (currentPage === 1) {
                updateBlogSection(0, 5); // Show posts 1 to 5
            } else if (currentPage === 2) {
                updateBlogSection(2, 7); // Show posts 3 to 7
            } else if (currentPage === 3) {
                updateBlogSection(5, 10); // Show posts 5 to 10
            }
        }
    };
    // Add click event listeners to pagination buttons
    paginationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("data-page");
            handlePagination(page);
        });
    });
});
    // // Function to show sections based on page
    // const updateBlogSection = (startIndex, endIndex) => {
    //     blogSection.innerHTML = sections.slice(startIndex, endIndex).join('');
    // };

    // // Function to update content for different pages
    // const handlePagination = (page) => {
    //     if (page === "start") {
    //         // For "start" page, show posts 1 to 5 (index 0 to 4)
    //         updateBlogSection(0, 5);
    //     } else if (page === "1") {
    //         // Page 1, show posts 1 to 5 (index 0 to 4)
    //         updateBlogSection(0, 5);
    //     } else if (page === "2") {
    //         // Page 2, show posts 3 to 7 (index 2 to 6)
    //         updateBlogSection(3, 8);
    //     } else if (page === "3") {
    //         // Page 3, show posts 5 to 10 (index 4 to 9)
    //         updateBlogSection(5, 10);
    //     } else if (page === "next") {
    //         const currentIndex = sections.findIndex(
    //             (section) => section === blogSection.innerHTML
    //         );

    //         const nextPageStart = currentIndex + 1;
    //         const nextPageEnd = Math.min(nextPageStart + 5, sections.length);
    //         updateBlogSection(nextPageStart, nextPageEnd);
    //     }
    // };

    // // Add click event listeners to the buttons
    // paginationButtons.forEach((button) => {
    //     button.addEventListener("click", () => {
    //         const page = button.getAttribute("data-page");
    //         handlePagination(page);
    //     });
    // });

    // // Function to show all sections when "start" is clicked
    // const showAllSections = () => {
    //     blogSection.innerHTML = sections.join(''); // Join all sections together
    // };

    // // Function to update the content
    // const updateBlogSection = (index) => {
    //     blogSection.innerHTML = sections[index];
    // };

    // // Add click event listeners to the buttons
    // paginationButtons.forEach((button) => {
    //     button.addEventListener("click", () => {
    //         const page = button.getAttribute("data-page");

    //         if (page === "start") {
    //             showAllSections(); 
    //             //updateBlogSection(0);
    //         } else if (page === "1") {
    //             updateBlogSection(0);
    //         } else if (page === "2") {
    //             updateBlogSection(1);
    //         } else if (page === "3") {
    //             updateBlogSection(2);
    //         } else if (page === "next") {
    //             const currentIndex = sections.findIndex(
    //                 (section) => section === blogSection.innerHTML
    //             );
    //             const nextIndex = (currentIndex + 1) % sections.length;
    //             updateBlogSection(nextIndex);
    //         }
    //     });
    // });
//});




  

//////////////////////////////////





document.addEventListener("DOMContentLoaded", function () {
    const carousel = new bootstrap.Carousel('#testimonialCarousel', {
      interval: 4000,
      ride: 'carousel'
    });
  });