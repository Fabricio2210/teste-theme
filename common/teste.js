
    api.onPageChange((url) => {
        news(url);
    });
    
    const news = (url) => {
        if (url.includes('/c/') || url.includes('/t/')) {
            $("#news").hide();
        } else {
            $("#news").show();
        }
    };
    api.onPageChange((url) => {
        updateBreadcrumbs(url);
    });
    
    const updateBreadcrumbs = (url) => {
        // Helper function to reset the breadcrumbs container
        const resetBreadcrumbs = () => {
            $("#breadcrumbsContainer").empty();
            $("#col2").empty();
            // If on the homepage
            if (url === '/') {
            } else {
                $("#breadcrumbsContainer").append(`
                    <li class="breadcrumb-item">
                        <a class="home" href="/"><< Forum</a>
                    </li>
                `);
                $("#col2").append(`
                    <li class="breadcrumb-item">
                        <a class="home" href="/"><< Forum</a>
                    </li>
                `);
            }
        };
    
        resetBreadcrumbs();
    
        if (url.includes('/c/')) {
            // If on a category page
            const categorySlugOrId = url.split('/')[2];
    
            $.ajax({
                type: "GET",
                url: `/c/${categorySlugOrId}/show.json`,
                success: function(response) {
                    if (response && response.category && response.category.name) {
                        const categoryTitle = response.category.name;
                        $("#breadcrumbsContainer").append(`
                            <li class="breadcrumb-item active">
                                ${categoryTitle}
                            </li>
                        `);
                        $("#col2").append(`
                              <li class="breadcrumb-item active">
                                ${categoryTitle}
                            </li>
                        `);
                    }
                },
                error: function(error) {
                    console.error("Error fetching category details", error);
                }
            });
        } else if (url.includes('/t/')) {
            // If on a topic page
            const topicId = url.split('/')[2];
    
            $.ajax({
                type: "GET",
                url: `/t/${topicId}.json`,
                success: function(response) {
                    if (response && response.title) {
                        let topicTitle = response.title;
                        const categoryId = response.category_id;
    
                        // Remove anything between two colons from the topic title
                        topicTitle = topicTitle.replace(/:[^:]*:/g, '').trim();
    
                        // Now, fetch the category name using the category ID
                        $.ajax({
                            type: "GET",
                            url: `/c/${categoryId}/show.json`,
                            success: function(categoryResponse) {
                                if (categoryResponse && categoryResponse.category) {
                                    const categoryTitle = categoryResponse.category.name;
                                    const categoryURL = `/c/${categoryResponse.category.slug}`;
                                    console.log(topicTitle);
                                    $("#breadcrumbsContainer").append(`
                                        <li class="breadcrumb-item">
                                            <a href="${categoryURL}">${categoryTitle}</a>
                                        </li>
                                        <li class="breadcrumb-item active">
                                            ${topicTitle}
                                        </li>
                                    `);
                                    $("#col2").append(`
                                         <li class="breadcrumb-item">
                                            <a href="${categoryURL}">${categoryTitle}</a>
                                        </li>
                                        <li class="breadcrumb-item active">
                                            ${topicTitle}
                                        </li>
                                    `);
                                }
                            },
                            error: function(error) {
                                console.error("Error fetching category details for topic", error);
                            }
                        });
                    }
                },
                error: function(error) {
                    console.error("Error fetching topic details", error);
                }
            });
        }
    }                                            
                          
