# Manual Test Cases for WebKhoaHoc API

---

## User Authentication

### TC-001: Register New User
- **Precondition:** User is not registered
- **Steps:**
  1. Send POST to `/api/users/register` with:
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "123456"
     }
     ```
  2. Observe response
- **Expected:** Status 201, message "User registered successfully"

---

### TC-002: Register Existing User
- **Precondition:** User with email `test@example.com` exists
- **Steps:**
  1. Repeat TC-001
- **Expected:** Status 400, error message about duplicate email

---

### TC-003: User Login Success
- **Precondition:** User exists with email `test@example.com` and password `123456`
- **Steps:**
  1. Send POST to `/api/users/login` with:
     ```json
     {
       "email": "test@example.com",
       "password": "123456"
     }
     ```
  2. Observe response
- **Expected:** Status 200, message "Login successful", JWT token returned

---

### TC-004: User Login Fail (Wrong Password)
- **Precondition:** User exists
- **Steps:**
  1. Send POST to `/api/users/login` with wrong password
- **Expected:** Status 400, error "Invalid credentials"

---

### TC-005: Get User Info (Authorized)
- **Precondition:** User logged in, has JWT token
- **Steps:**
  1. Send GET to `/api/users/me` with Authorization header `Bearer <token>`
- **Expected:** Status 200, user info returned

---

### TC-006: Update User Info
- **Precondition:** User logged in
- **Steps:**
  1. Send PUT to `/api/users/update` with new data
- **Expected:** Status 200, updated user info

---

## Courses

### TC-007: Get All Courses
- **Steps:**
  1. Send GET to `/api/courses`
- **Expected:** Status 200, list of courses

---

### TC-008: Get Course by ID
- **Steps:**
  1. Send GET to `/api/courses/{courseId}`
- **Expected:** Status 200, course details with lessons

---

### TC-009: Create New Course
- **Steps:**
  1. Send POST to `/api/courses` with course data
- **Expected:** Status 201, created course returned

---

### TC-010: Update Course
- **Steps:**
  1. Send PUT to `/api/courses/{courseId}` with updated data
- **Expected:** Status 200, updated course returned

---

### TC-011: Delete Course
- **Steps:**
  1. Send DELETE to `/api/courses/{courseId}`
- **Expected:** Status 200, message "Course deleted"

---

## Lessons

### TC-012: Get All Lessons
- **Steps:**
  1. Send GET to `/api/lessons`
- **Expected:** Status 200, list of lessons

---

### TC-013: Get Lesson by ID
- **Steps:**
  1. Send GET to `/api/lessons/{lessonId}`
- **Expected:** Status 200, lesson details

---

### TC-014: Create New Lesson
- **Steps:**
  1. Send POST to `/api/lessons` with lesson data
- **Expected:** Status 201, created lesson returned

---

### TC-015: Update Lesson
- **Steps:**
  1. Send PUT to `/api/lessons/{lessonId}` with updated data
- **Expected:** Status 200, updated lesson returned

---

### TC-016: Delete Lesson
- **Steps:**
  1. Send DELETE to `/api/lessons/{lessonId}`
- **Expected:** Status 200, message "Lesson deleted"

---

## Support Tickets

### TC-017: Create Support Ticket
- **Steps:**
  1. Send POST to `/api/support` with ticket data
- **Expected:** Status 201, created ticket returned

---

### TC-018: Get All Support Tickets
- **Steps:**
  1. Send GET to `/api/support`
- **Expected:** Status 200, list of tickets

---

### TC-019: Update Support Ticket
- **Steps:**
  1. Send PUT to `/api/support/{ticketId}` with updated data
- **Expected:** Status 200, updated ticket returned

---

### TC-020: Delete Support Ticket
- **Steps:**
  1. Send DELETE to `/api/support/{ticketId}`
- **Expected:** Status 200, message "Ticket deleted"

---