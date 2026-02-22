// Make sure the script runs only after the page has fully loaded
window.onload = function () {

    // Each department has a name and a list of employees
    var departments = [
        {
            name: "Administration",
            employees: [
                { firstName: "Zoë", lastName: "Robins" },
                { firstName: "Madeleine", lastName: "Madden" }
            ]
        },
        {
            name: "Audit",
            employees: [
                { firstName: "Josha", lastName: "Sadowski" },
                { firstName: "Kate", lastName: "Fleetwood" }
            ]
        },
        {
            name: "Banking Operations",
            employees: [
                { firstName: "Priyanka", lastName: "Bose" },
                { firstName: "Hammed", lastName: "Animashaun" },
                { firstName: "Álvaro", lastName: "Morte" },
                { firstName: "Taylor", lastName: "Napier" },
                { firstName: "Alan", lastName: "Simmonds" }
            ]
        },
        {
            name: "Communications",
            employees: [
                { firstName: "Gil", lastName: "Cardinal" },
                { firstName: "Richard J.", lastName: "Lewis" }
            ]
        },
        {
            name: "Corporate Services",
            employees: [
                { firstName: "Randy", lastName: "Bradshaw" },
                { firstName: "Tracey", lastName: "Cook" },
                { firstName: "Lubomir", lastName: "Mykytiuk" }
            ]
        },
        {
            name: "Facilities",
            employees: [
                { firstName: "Dakota", lastName: "House" },
                { firstName: "Lori Lea", lastName: "Okemah" },
                { firstName: "Renae", lastName: "Morrisseau" },
                { firstName: "Rick", lastName: "Belcourt" },
                { firstName: "Selina", lastName: "Hanusa" }
            ]
        },
        {
            name: "Financial Services",
            employees: [
                { firstName: "Buffy", lastName: "Gaudry" },
                { firstName: "Shaneen Ann", lastName: "Fox" },
                { firstName: "Allan", lastName: "Little" },
                { firstName: "Danny", lastName: "Rabbit" }
            ]
        },
        {
            name: "Human Resources",
            employees: [
                { firstName: "Jesse Ed", lastName: "Azure" },
                { firstName: "Stacy", lastName: "Da Silva" },
                { firstName: "Vladimír", lastName: "Valenta" },
                { firstName: "Samone", lastName: "Sayeses-Whitney" },
                { firstName: "Paul", lastName: "Coeur" }
            ]
        },
        {
            name: "Information Technology",
            employees: [
                { firstName: "Graham", lastName: "Greene" },
                { firstName: "Sandika", lastName: "Evergreen" },
                { firstName: "Jennifer", lastName: "Rodriguez" }
            ]
        },
        {
            name: "IT Technician",
            employees: [
                { firstName: "Aiyana", lastName: "Littlebear" },
                { firstName: "Inara", lastName: "Thunderbird" },
                { firstName: "Kaya", lastName: "Runningbrook" },
                { firstName: "Elara", lastName: "Firehawk" },
                { firstName: "Siona", lastName: "Moonflower" },
                { firstName: "Kaiyu", lastName: "Greywolf" },
                { firstName: "Ayawamat", lastName: "Nightwind" },
                { firstName: "Tala", lastName: "Braveheart" },
                { firstName: "Iniko", lastName: "Stonebear" },
                { firstName: "Onatah", lastName: "Redhawk" }
            ]
        }
    ];

    // Get the main element where the employee list will be displayed
    var main = document.getElementById("content");

    // Loop through each department
    for (var i = 0; i < departments.length; i++) {

        // Create a section for the department
        var section = document.createElement("section");

        // Create and add the department heading
        var heading = document.createElement("h2");
        heading.innerText = departments[i].name;
        section.appendChild(heading);

        // Create a list to hold employee names
        var list = document.createElement("ul");

        // Loop through employees in the current department
        for (var j = 0; j < departments[i].employees.length; j++) {
            var listItem = document.createElement("li");
            listItem.innerText =
                departments[i].employees[j].firstName + " " +
                departments[i].employees[j].lastName;
            list.appendChild(listItem);
        }

        // Add the employee list to the department section
        section.appendChild(list);

        // Add the department section to the main element
        main.appendChild(section);
    }

    // Get the current year
    var currentYear = new Date().getFullYear();
    document.getElementById("year").innerText =
        "Copyright Pixell River Financial " + currentYear;
};








