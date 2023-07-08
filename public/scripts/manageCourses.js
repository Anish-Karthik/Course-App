function parseResponse(response) {
    console.log(response);
}
function callback(response) {
    response.json().then(parseResponse);
    getCourses();
}

function addCourse() {
    fetch('/admin/courses', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            imageLink: document.getElementById("imageLink").value
        })
    }).then(callback);
}

function editCourse(courseId) {
    fetch(`/admin/courses/${courseId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            imageLink: document.getElementById("imageLink").value
        })
    }).then(callback);
}

function deleteCourse(courseId) {
    fetch(`/admin/courses/${courseId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(callback);
}



function getCourses() {
    fetch('/admin/courses').then((res) => {
        res.json().then((data) => {
            console.log(data);
            let courses = data.courses;
            let coursesDiv = $('#courses');
            coursesDiv.empty();
            coursesDiv.append('<h1>Courses</h1>');
            courses.forEach((course) => {
                // create a div using jquery
                const courseDiv = $(`<div class="course" id="Course${course.id}"></div>`);

                courseDiv.append(`
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p>${course.price}</p>
                    <img src="${course.imageLink}" alt="${course.title}">
                `);

                const editButton = $('<button id="editButton">Edit</button>');
                editButton.click(() => editCourse(course.id));
                courseDiv.append(editButton);

                const deleteButton = $('<button id="deleteButton">Delete</button>');
                deleteButton.click(() => deleteCourse(course.id));
                courseDiv.append(deleteButton);
            });
        });
    });
}