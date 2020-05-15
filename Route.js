const user=require('./Controllers/user_controller')
const category=require('./Controllers/category_controller');
const subject=require('./Controllers/Subject_controller')
const Lesson=require('./Controllers/lesson_controller')
const Registration=require('./Controllers/SubjectRegistration_controller');
//const Roles=require('./Controllers/Roles_controller')
const auth=require('./Middlewares/auth_controller')
const exp=require('express')
const appRoute=exp.Router()


//route for everybody
//using login Route
appRoute.post('/api/v1/login/', user.login);
//register new user route
appRoute.post('/api/v1/register/', user.create);
//admin route for category

//general Route
//retrieve a subject in a category (by Id)
appRoute.get('/api/v1/subject/:subid', auth.auth,subject.RetrieveSubject)
//retrieve all subjects, by category
appRoute.get('/api/v1/category/:cat_id', auth.auth,category.RetrieveAllsubject)
// retrieve all categories
appRoute.get('/api/v1/category/', auth.auth,category.RetrieveAllCategories)
//search for subjects by name, sorted alphabetically in ascending order
appRoute.get('/api/v1/subject/search/:subname', auth.auth,subject.SearchSubject)
//search for tutors by first name, sorted alphabetically in ascending order



//admin routes
appRoute.post('/api/v1/admin/category/', auth.auth,auth.Admin,category.create)
//admin update category route
appRoute.patch('/api/v1/admin/category/', auth.auth,auth.Admin,category.update)
//admin delete category route
appRoute.delete('/api/v1/admin/category/', auth.auth,auth.Admin,category.delete)

//for subject crud/manipulations
appRoute.post('/api/v1/admin/subject/', auth.auth,auth.Admin,subject.create)
//admin update subject route
appRoute.patch('/api/v1/admin/subject/', auth.auth,auth.Admin,subject.update)
//admin delete subject route
appRoute.delete('/api/v1/admin/subject/', auth.auth,auth.Admin,subject.delete)


//for admin lesson crud/manipulations
appRoute.get('/api/v1/admin/lesson/', auth.auth,auth.Admin,Lesson.LessonRetrieve)
//admin book a lesson route
appRoute.post('/api/v1/admin/lesson/', auth.auth,auth.Admin,Lesson.bookLesson)
//admin update the lesson
appRoute.patch('/api/v1/admin/lesson/', auth.auth,auth.Admin,Lesson.updateLesson)
//Retrive Lessonby id
appRoute.get('/api/v1/admin/lesson/:id', auth.auth,auth.Admin,Lesson.LessonByID)
//Admin can delete lesson
appRoute.delete('/api/v1/admin/lesson/:id', auth.auth,auth.Admin,Lesson.DeleteLesson)


//admin Retrieving all tutors
appRoute.get('/api/v1/admin/tutor/', auth.auth,auth.Admin,user.RetrieveTutuor)
//admin Retrieving tutor by id
appRoute.get('/api/v1/admin/tutor/:id', auth.auth,auth.Admin,user.RetrieveTutuorByID)
//admin decactivate a tutor
appRoute.post('/api/v1/admin/tutor/', auth.auth,auth.Admin,user.DeactivateTutor)
//admin activate a tutor
appRoute.patch('/api/v1/admin/tutor/', auth.auth,auth.Admin,user.ActivateTutor)
//search for tutors by first name, sorted alphabetically in ascending order
appRoute.get('/api/v1/admin/search/tutor/:firstname', auth.auth,auth.Admin,user.SearchTutuor)
//Admin can make a tutor an admin
appRoute.post('/api/v1/admin/tutor/:id', auth.auth,auth.Admin,user.MakeTutorAdmin)



//tutors operation
//Tutor retrieve all subject
appRoute.get('/api/v1/tutor/', auth.auth,auth.Tutor,Registration.RetrieveAllsubject)
//Tutors can take a subject in a category
appRoute.post('/api/v1/tutor/', auth.auth,auth.Tutor,Registration.RegisterSubject)
//tutor update subject
appRoute.patch('/api/v1/tutor/', auth.auth,auth.Tutor,Registration.updateRegisteredSubject)
//tutor delete Registered subject
appRoute.delete('/api/v1/tutor/:id', auth.auth,auth.Tutor,Registration.DeleteRegisteredSubject)


//student Route
//student get tutors taking each subject in a category
appRoute.get('/api/v1/student/:catid', auth.auth,auth.Student,category.Retrieve_subject_tutor)
//search for tutors by first name, sorted alphabetically in ascending order
appRoute.get('/api/v1/student/search/tutor/:firstname', auth.auth,auth.Student,user.SearchTutuor)
//student book a lesson route
appRoute.post('/api/v1/student/lesson/', auth.auth,auth.Student,Lesson.bookLesson)




module.exports=appRoute