# onlineTutor
api link: https://tutoringonline.herokuapp.com/
googlesheet link for the documentation
https://docs.google.com/document/d/1krZVWfjXRre3kqYfJJoS9jW8Izo9pDIDp9LpNkXifQ4/edit?usp=sharing
# General: (For Admin, Tutors and Students);
1: Admin/Students /tutors can retrieve a subject in a category (by Id)
End-Point: /api/v1/subject/:subid
Method: GET  
Header: {
auth-token required
Content-Type: application/json
}

# : Admin/Students /tutors can retrieve all subjects, by category
 End-point: /api/v1/category/:cat_id
 Method: GET;
 Header: {auth-token:
 Content-Type: application/json
}

# 3. Admin/Students /tutors can retrieve all categories
End-Point: /api/v1/category/
Method: GET
Header: {
auth-token:
Content-Type: application/json
}

# 4) Admin/Students /tutors can search for subjects by name, sorted alphabetically in ascending order.
End-Point: /api/v1/subject/search/:subname
Method: GET
Headers: {
auth-token
Content-Type: application/json
}

# 5) Admin/Students can search for tutors by first name, sorted alphabetically in ascending order.

End-Point: /api/v1/student/search/tutor/:firstname
End-Point: /api/v1/admin/search/tutor/:firstname
Method: GET
Headers: {
auth-token:
Content-Type: application/json
}

# 6) Admin/Students /tutors can sign in.
End-Point: /api/v1/login,
Method:Post;
Body: {
Name:
Password:
}

# 7) Student/Tutor can register
End-Point: /api/v1/register/,
Method: Post;
Header: {
Content-Type: application/json
}
Body: {
name:, 
Email:,
phone:,
password:,
role: Tutor or Student, 
first_name:
}


# Admin:
# 1: Admin can create subjects under 3 categories: primary, JSS, SSS
End-Point: /api/v1/admin/subject/
Method: Post;
Headers: {
auth-token:
Content-Type: application/json
}

Body: {
name : //subject name, 
cart_ids: //category id
}

# 2) Admin can update a subject in a category (by Id)
End-Point: /api/v1/admin/subject/
Method: Patch;
Headers: {
auth-token:
Content-Type: application/json
}

Body: {
ids: //subject id, 
nameup: //name of the the subject}
# 3) Admin can delete a subject in a category (by Id)
End-Point: /api/v1/admin/subject/
Method: Delete;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}

Body: {
ids: //subject id
}
///category operation
# 4) Admin can create a category
End-Point: /api/v1/admin/category/
Method: Post;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
///////////////////////////////////////////////////////////////////////////////////////////////////
Body: {
name: //name of category
ui: //category id
}

# 4) Admin can update a category
End-Point: /api/v1/admin/category/
Method: Patch;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
///////////////////////////////////////////////////////////////////////////////////////////////////
Body: {
name: //name of category
ui: //category id
}


# 4) Admin can delete a category
End-Point: /api/v1/admin/category/
Method: Patch;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
Body: {
name: //name of category
ui: //category id
}

# 5) Admin can retrieve all tutors
End-Point: /api/v1/admin/tutor/
Method: GET 
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}

# 6) Admin can get a tutor (by Id)

End-Point: /api/v1/admin/tutor/:id
Method: GET;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}

# 7) Admin can deactivate a tutor (by Id)
End-Point: /api/v1/admin/tutor/
Method: POST;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
Body: {
userid: //tutor id to deactivate
}


# 7) Admin can activate a tutor (by Id)
End-Point: /api/v1/admin/tutor/
Method: PATCH;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
Body: {
userid: //tutor id to deactivate
}


# 8) Admin can book lessons
End-Point: /api/v1/admin/lesson/
Method: Post;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
Body: {
ids: //subject id to book
userid: //userid to book for,
bookby //bookers id}

# 9). Admin can retrieve all lessons
End-Point: /api/v1/admin/lesson/
Method: GET;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}

# 10). Admin can get a lesson (by Id)
End-Point: /api/v1/admin/lesson/:id'
Method: GET;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}

# 11). Admin can update a lesson (by Id)
End-Point: /api/v1/admin/lesson/
Method: PATCH;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
Body: {
lessonid: //the lesson id, 
subject :  //the suject to update to id
}



# 12). Admin can delete a lesson (by Id)
End-Point: /api/v1/admin/lesson/:id  //lesson id
Method: Delete;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}

# 13 Admin signs up as a tutor but you can make a tutor of your choice an admin by giving them the admin role. Not all tutors must be admin. Just a few.

End-Point: /api/v1/admin/tutor/:id  //lesson id
Method: POST;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}




# Tutors:
# 1) Tutors can register to take a subject in a category
End-Point: /api/v1/tutor/
Method: Post;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
Body: {
ids:  //the subject id to register
}

# 2) Tutors can see all subjects they registered to take
End-Point: /api/v1/tutor/
Method: Get;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}

# 3) Tutors can update a registered subject
End-Point: /api/v1/tutor/
Method: Patch;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
Body: {
regID:  //the registration id
subject: //the subject id with to update with
}

# 4) Tutors can delete a registered subject
End-Point: /api/v1/tutor/:id   //id the registration id
Method: Delete;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}






# Students:
# 2) Students can see all tutors taking a subject in a category
End-Point: /api/v1/student/:catid  // catid the category id
Method: Get;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}

# 3) Students can book lessons
End-Point: /api/v1/student/lesson/
Method: Post;
Headers: {
auth-token:  //the return auth-token
Content-Type: application/json
}
Body: {
ids: //subject id to book
userid: //userid the student id,
bookby //student booking id}



