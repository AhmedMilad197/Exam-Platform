import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import AddQuestionView from '../views/AddQuestionView.vue'
import QuestionListView from '../views/QuestionListView.vue'
import ExamListView from '../views/ExamListView.vue'
import ExamView from '../views/ExamView.vue'
import EditQuestionView from '../views/EditQuestionView.vue'
import TeacherListView from '../views/TeacherListView.vue'
import StudentListView from '../views/StudentListView.vue'
import SubjectListView from '../views/SubjectListView.vue'
import AddStudentView from '../views/AddStudentView.vue'
import StudentDetailsView from '../views/StudentDetailsView.vue'
import EditStudentView from '../views/EditStudentView.vue'
import SubjectDetailsView from '../views/SubjectDetailsView.vue'
import EditSubjectView from '../views/EditSubjectView.vue'
import AddSubjectView from '../views/AddSubjectView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add-question/:subject',
      name: 'add-question',
      component: AddQuestionView,
      props: true
    },
    {
      path: '/question-list/:subject',
      name: 'questions',
      component: QuestionListView,
      props: true
    },
    {
      path: '/:subject/exam-list',
      name: 'exam_list',
      component: ExamListView,
      props: true
    },
    {
      path: '/:subject/exam/:exam',
      name: 'exam',
      component: ExamView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/Login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/edit-question/:id',
      name: 'edit-question',
      component: EditQuestionView,
      props: true
    },
    {
      path: '/teachers',
      name: 'teachers',
      component: TeacherListView
    },
    {
      path: '/students',
      name: 'students',
      component: StudentListView
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: SubjectListView
    },
    {
      path: '/add-student',
      name: 'add-student',
      component: AddStudentView
    },
    {
      path: '/student/:id',
      name: 'student',
      component: StudentDetailsView,
      props: true
    },
    {
      path: '/update/student/:id',
      name: 'student-update',
      component: EditStudentView,
      props: true
    },
    {
      path: '/subject/:id',
      name: 'subject',
      component: SubjectDetailsView,
      props: true
    },
    {
      path: '/update/subject/:id',
      name: 'subject-update',
      component: EditSubjectView,
      props: true
    },
    {
      path: '/add-subject',
      name: 'add-subject',
      component: AddSubjectView,
      props: true
    },
  ]
})

export default router
