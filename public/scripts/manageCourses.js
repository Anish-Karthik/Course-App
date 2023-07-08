window.onload = () => {
    getCourses();
}

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
            let courseList = $('#courseList');
            courseList.empty();
            courseList.append('<h1>Courses</h1>');
            courses.forEach((course) => {
                
                const courseDiv = $(`<div class="card" id="Course${course.id}"></div>`);
                const cardBody = $('<div class="card-body"></div>');

                cardBody.append(`
                    <h2 class="course-title" >${course.title}</h3>
                    <p class="course-description" >${course.description}</p>
                    <p class="course-price" >Rs. ${course.price}</p>
                `);

                const editButton = $('<button class="buttons edit-button" id="editButton">Edit</button>');
                editButton.click(() => editCourse(course.id));
                cardBody.append(editButton);

                const deleteButton = $('<button class="buttons delete-button" id="deleteButton">Delete</button>');
                deleteButton.click(() => deleteCourse(course.id));
                cardBody.append(deleteButton);

                courseDiv.append(`<img class="course-image" src="${course.imageLink}" alt="${course.title}">`);
                courseDiv.append(cardBody);
                courseList.append(courseDiv);
            });
        });
    });
}