## Lab 5.2 Feature Extension

### What change I wanted to make in the application
For Lab 5.2, I changed how the application manages data by adding paginated API responses for both the employee directory 
and the organization page. Instead of sending every record to the browser in one response, the backend now returns a page 
of results plus metadata such as the current page, total pages, and total items. The frontend then uses that metadata to 
display smaller sections of data that are easier to navigate.

### What tool or tools I made use of to make this change
I used the existing Express backend and React frontend to build the pagination feature without changing the whole 
architecture of the app. On the server side, I updated the controller and service layers to accept `page` and `pageSize` 
query parameters and return paginated responses. On the client side, I updated the repository layer and the React page 
components so they request a specific page and render navigation buttons for moving through the results.

### How this change affects the user experience
This change improves the user experience by making the application easier to read and less overwhelming when there are 
many employees or leadership records. Users can now move through the data page by page instead of scrolling through a 
very long list. The interface also explains which page they are currently viewing and how many total records exist, which 
makes the app feel more organized and more similar to a real production system.

### How this change affects my understanding of the app
Adding pagination improved my understanding of how the frontend and backend depend on each other in a full-stack application. 
I had to think about how query parameters are sent, how the backend shapes a response, and how the frontend stores page state 
and updates the screen. This helped me understand the app as a connected system instead of only as separate files, and it made 
the flow of server data much clearer to me.
