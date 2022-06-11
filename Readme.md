# REST API server for Classroom-Backend

## ENV Vars

```env
MONGO_URL=Your_Mongo_Database_URL
APP_SECRET=token_encryption_secret_for_jwt
```

## important : "/api" is used with every path before the URLs given

## API DOCS

### ADMIN ROUTES

these are only accessed by admin

| Use                    |                 URL              | Method |         Body         |   Status    |
| ---------------------- | -------------------------------- | ------ | -------------------- | ----------- |
|     Add Teacher        |        /admin/teacher            | POST   | name,email,password  | CREATED     |
|     Add Student        |        /admin/student            | POST   | name,email,password  | CREATED     |
|     Add Classroom      |        /admin/class              | POST   |          name        | CREATED     |
|   Get List of Teachers |        /teacher/list             | GET    |          \_\_        | OK          |
|   Get List of Students |        /student/list             | GET    |          \_\_        | OK          |
|   Get List of Classes  |        /class/list               | GET    |          \_\_        | OK          |
| Map teacher with Class |/teacher/:teacherid/class/:classid| POST   |          \_\_        | CREATED     |
| Map students with Class|   /student/class/:classid        | POST   |      [studentId]     | CREATED     |
|    Update Teacher      |        /admin/teacher/:id        | PUT    | name,email,password  | CREATED     |
|    Update Student      |        /admin/student/:id        | PUT    | name,email,password  | CREATED     |
|    Update Classroom    |        /admin/class/:id          | PUT    |          name        | CREATED     |
|   Remove Student       |        /admin/student/:id        | DELETE |          \_\_        | OK          |
|   Remove Teacher       |        /admin/teacher/:id        | DELETE |          \_\_        | OK          |
|   Remove Classroom     |        /admin/class/:id          | DELETE |          \_\_        | OK          |

---

### Auth Routes
|       Use     | URL                         | Method | Body             | Access  | Status |
| ------------- | --------------------------- | ------ | -----------------| ------- | ------ |
| Admin Login   |  /auth/admin/login          | POST   | email, password  | Admin   | OK     |
| Student Login |  /auth/student/login        | POST   | email, password  | Teacher | OK     |
| Teacher Login |  /auth/teacher/login        | POST   | email, password  | Student | OK     |
 
 ---

### Teacher Routes

|  Use             | URL                    | Method | Params                       | Access  | Status |
| ---------------- | -----------------------| ------ | ---------------------------- | ------- | ------ |
| Get Student List | /teacher/studentList   | GET    |            \_\_              | Teacher | OK     |
|  Add Score       | /teacher/addscore/:id  | POST   |           subjectObj         | Teacher | CREATED|
|  Get ScoreCards  | /teacher/getscorecard  | GET    |            \_\_              | Teacher | OK     |

subjectObj = {
    subject_name , date_of_exam , date_of_score, score,comments
}
---

### Student Routes

| Use             | URL                         | Method | Body         | Access  | Status |
| --------------- | --------------------------- | ------ | -------------| ------- | ------ |
| Get Scorecard   | /student/getscorecard       | GET    |     \_\_     | Student | OK     |

---