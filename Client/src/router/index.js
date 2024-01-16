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
      path: '/questions/:subject',
      name: 'subject',
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
      path: '/edit-question',
      name: 'edit_question',
      component: EditQuestionView
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
      component: TeacherListView
    },
  ]
})

export default router
