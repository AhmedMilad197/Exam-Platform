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
import TeacherDetailsView from '../views/TeacherDetailsView.vue'
import StudentListView from '../views/StudentListView.vue'
import SubjectListView from '../views/SubjectListView.vue'
import AddStudentView from '../views/AddStudentView.vue'
import StudentDetailsView from '../views/StudentDetailsView.vue'
import EditStudentView from '../views/EditStudentView.vue'
import SubjectDetailsView from '../views/SubjectDetailsView.vue'
import EditSubjectView from '../views/EditSubjectView.vue'
import AddSubjectView from '../views/AddSubjectView.vue'
import LoginView from '../views/LoginView.vue'
import StudentLoginView from '../views/StudentLoginView.vue'
import QuestionBankView from '../views/QuestionBankView.vue'
import CreateExamView from '../views/CreateExamView.vue'
import TeacherStudent from '../views/TeacherStudentView.vue'
import AddStudentToSubject from '../views/AddStudentToSubjectView.vue'
import EditExamView from '../views/EditExamView.vue'
import AddTeacherToSubjectView from '../views/AddTeacherToSubjectView.vue'
import ViewQuestionView from '../views/ViewQuestionView.vue'
import ViewExamView from '../views/ViewExamView.vue'
import StudentExamListView from '../views/StudentExamListView.vue'
import StudentSubjectListView from '../views/StudentSubjectListView.vue'
import TeacherSubjectListView from '../views/TeacherSubjectListView.vue'
import SendOTPView from '../views/SendOTPView.vue'
import OTPVerificationView from '../views/OTPVerificationView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import StudentExamMarkView from '../views/StudentExamMarkView.vue'
import LandingPageView from '../views/LandingPageView.vue'
import StudentExamHistoryView from '../views/StudentExamHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPageView',
      component: LandingPageView
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
      name: 'exam-list',
      component: ExamListView,
      props: true
    },
    {
      // path: '/:subject/exam/:exam',
      path: '/student/exam/:exam',
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
      path: '/teacher/:id',
      name: 'teacher',
      component: TeacherDetailsView,
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
    {
      path: '/:subject/questions',
      name: 'teacher-questions',
      component: QuestionBankView,
      props: true
    },
    {
      path: '/:subject/exam/create',
      name: 'exam-create',
      component: CreateExamView,
      props: true
    },
    {
      path: '/:subject/exam/edit',
      name: 'exam-edit',
      component: EditExamView,
      props: true
    },
    {
      path: '/:subject/students',
      name: 'teacher-student',
      component: TeacherStudent,
      props: true
    },
    {
      path: '/:subject/add/student',
      name: 'teacher-add-student',
      component: AddStudentToSubject,
      props: true
    },
    {
      path: '/teacher-course/:course',
      name: 'subject-teacher',
      component: AddTeacherToSubjectView,
      props: true
    },
    {
      path: '/view-question/:id',
      name: 'view-question',
      component: ViewQuestionView,
      props: true
    },
    {
      path: '/view-exam/:id',
      name: 'view-exam',
      component: ViewExamView,
      props: true
    },
    {
      path: '/student/login',
      name: 'student-login',
      component: StudentLoginView,
      props: true
    },
    {
      path: '/student/exam-list/:id',
      name: 'student-exam-list',
      component: StudentExamListView,
      props: true
    },
    {
      path: '/student/subject-list',
      name: 'student-subject-list',
      component: StudentSubjectListView,
      props: true
    },
    {
      path: '/subject/teachers/:id',
      name: 'teacher-subject-list',
      component: TeacherSubjectListView,
      props: true
    },
    {
      path: '/forgot-my-password',
      name: 'send-otp',
      component: SendOTPView,
      props: true
    },
    {
      path: '/otp-verification',
      name: 'otp-verification',
      component: OTPVerificationView,
      props: true
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      props: true
    },
    {
      path: '/view-exam/students/:id',
      name: 'student-exam-marks',
      component: StudentExamMarkView,
      props: true
    },
    {
      path: '/student-exam/:id',
      name: 'student-exam-history',
      component: StudentExamHistoryView,
      props: true
    },
  ]
})

export default router
