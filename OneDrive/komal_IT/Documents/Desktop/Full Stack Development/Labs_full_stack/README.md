## Lab 5.2 Feature Extension

### What change I wanted to make in the application

For this lab, I modified the way that the application presents data through the addition 
of pagination for the employee directory and the organization. Previously, the application 
would fetch all the data at once, which could have been a large quantity of data. In this 
lab, I made sure that the application shows limited data per page and fetches the data 
according to the page.

### What tool or tools I made use of to make this change

I utilized the same tools already being used in the project, namely Express as the backend 
framework and React as the frontend framework. On the backend framework, I added features 
to pass a page and pageSize parameter through the API to get data in sections. For the frontend 
framework, I added a function to get data from certain pages with buttons to navigate through pages.

### How this change affects the user experience
This change improves the user experience by making the application easier to read and less 
overwhelming when there are many employees or leadership records. Users can now move through 
the data page by page instead of scrolling through a very long list. The interface also 
explains which page they are currently viewing and how many total records exist, which 
makes the app feel more organized and more similar to a real production system.

### How this change affects my understanding of the app
Heips me to understand how the frontend and backend depend on each other in a full-stack application. 
I had to think about how query parameters are sent, how the backend shapes a response, and how the 
frontend stores page state and updates the screen. This helped me understand the app as a connected 
system instead of only as separate files, and it made the flow of server data much clearer to me.
