const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

let ADMINS = [];
let USERS = [];
let COURSES = [];

COURSES.push({id: 1, title: 'JAVA', description: 'Course 1 description', price: 399, imageLink: 'https://via.placeholder.com/150'});
COURSES.push({id: 2, title: 'C++', description: 'Course 2 description', price: 499, imageLink: 'https://via.placeholder.com/150'});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Admin routes
app.get('/admin/home', (req, res) => {
  res.sendFile(__dirname + '/public/adminHome.html');
});
app.get('/admin/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});
app.get('/admin/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});
app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  res.status(200).json({courses: COURSES});
  console.log("courses sent successfully"); // "courses sent successfully
});

app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const {username, password} = req.body;
  const admin = {username, password};
  if (ADMINS.find((admin) => admin.username === username)) {
    console.log("Admin already exists"); // "Admin already exists
    return res.status(400).json({message: 'Admin already exists'});
  }
  console.log("Admin created successfully"); // "Admin created successfully
  ADMINS.push(admin);
  res.status(201).json({message: 'Admin created successfully'});
});
app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username, password} = req.body;
  const admin = {username, password};
  if (ADMINS.find((admin) => admin.username === username)) {
    console.log("Admin logged in successfully"); // "Admin logged in successfully
    res.status(200).json({message: 'Admin logged in successfully'});
  } else {
    console.log("Admin does not exist"); // "Admin does not exist
    res.status(400).json({message: 'Admin does not exist'});
  }
});
app.post('/admin/courses', (req, res) => {
  // logic to create a course
  const {title, description, price, imageLink} = req.body;
  const course = {id: COURSES.length + 1 ,title, description, price, imageLink};
  COURSES.push(course);
  console.log("Course created successfully"); // "Course created successfully
  res.status(201).json({message: 'Course created successfully'});
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  const {courseId} = req.params;
  const {title, description, price, imageLink} = req.body;
  if(courseId > COURSES.length || courseId < 1) {
    console.log("Course does not exist"); // "Course does not exist
    return res.status(400).json({message: 'Course does not exist'});
  }
  COURSES[courseId - 1] = {id: courseId, title, description, price, imageLink};
  console.log("Course updated successfully"); // "Course updated successfully
  res.status(200).json({message: 'Course updated successfully'});
});

app.delete('/admin/courses/:courseId', (req, res) => {
  // logic to delete a course
  const {courseId} = req.params;
  if(courseId > COURSES.length || courseId < 1) {
    console.log("Course does not exist"); // "Course does not exist
    return res.status(400).json({message: 'Course does not exist'});
  }
  COURSES.splice(courseId - 1, 1);
  for(let i = courseId - 1; i < COURSES.length; i++) {
    COURSES[i].id--;
  }
  console.log("Course deleted successfully"); // "Course deleted successfully
  res.status(200).json({message: 'Course deleted successfully'});
});


// User routes
app.get('/user/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});
app.get('/user/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const {username, password} = req.body;
  const user = {username, password, purchedCourses: []};
  if (USERS.find((user) => user.username === username)) {
    return res.status(400).json({message: 'User already exists'});
  }
  USERS.push(user);
  res.status(201).json({message: 'User created successfully'});
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const {username, password} = req.body;
  const user = {username, password};
  if (USERS.find((user) => user.username === username)) {
    res.status(200).json({message: 'User logged in successfully'});
  } else {
    res.status(400).json({message: 'User does not exist'});
  }
});

app.get('/users/:username/courses', (req, res) => {
  // logic to list all courses
  const {username} = req.body;
  const user = USERS.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({message: 'User does not exist'});
  }

  res.status(200).json({
    courses: COURSES.filter((course) => {
      return !user.purchedCourses.find((purchedCourse) => purchedCourse.id === course.id);
    })
  });
});

app.post('/users/:username/courses/:courseId', (req, res) => {
  // logic to purchase a course
  const {courseId} = req.params;
  const {username} = req.body;
  if(courseId > COURSES.length || courseId < 1) {
    return res.status(400).json({message: 'Course does not exist'});
  }
  
  const user = USERS.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({message: 'User does not exist'});
  }
  user.purchedCourses.push(COURSES[courseId - 1]);
  res.status(200).json({message: 'Course purchased successfully'});
});

app.get('/users/:username/purchasedCourses', (req, res) => {
  // logic to view purchased courses
  const {username} = req.body;
  const user = USERS.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({message: 'User does not exist'});
  }
  res.status(200).json({courses: user.purchedCourses});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
