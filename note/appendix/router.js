import Vue from 'vue'
import Router from 'vue-router'
import { routerHelper, authHelper } from '@/utils'
import api from "@/api";
import store from '@/store'

const MainLayout = () => import('@/layouts/MainLayout')
const MyLovelyProgressLayout = () => import('@/layouts/MyLovelyProgressLayout')

const MyLovelyProgressHub = () => import('@/views/MyLovelyProgress/Hub')
const MyLovelyProgressSignIn = () => import('@/views/MyLovelyProgress/SignIn')

const EmployeeDevelopmentLayout = () => import('@/views/EmployeesDevelopment/Layout')
const EmployeeDevelopmentMainPage = () => import('@/views/EmployeesDevelopment/MainPage')

const EmployeeDevelopmentCreateOrganization = () => import('@/views/EmployeesDevelopment/Organizations/CreateOrganization')
const EmployeeDevelopmentOrganizationProfile = () => import('@/views/EmployeesDevelopment/Organizations/OrganizationProfile')
const EmployeeDevelopmentUpdateOrganization = () => import('@/views/EmployeesDevelopment/Organizations/UpdateOrganization')

const EmployeeDevelopmentSignUpOrganizationOwner = () => import('@/views/EmployeesDevelopment/OrganizationOwners/SignUpOrganizationOwner')

const EmployeeDevelopmentSignUpManager = () => import('@/views/EmployeesDevelopment/Managers/SignUpManager')

const EmployeeDevelopmentSignUpEmployeeByManager = () => import('@/views/EmployeesDevelopment/Employees/SignUpEmployeeByManager')
const EmployeeDevelopmentSignUpEmployeeByOrganizationOwner = () => import('@/views/EmployeesDevelopment/Employees/SignUpEmployeeByOrganizationOwner')

const UserProfile = () => import('@/views/EmployeesDevelopment/DevelopedEmployees/UserProfile')
const UserSkillsProfile = () => import('@/views/EmployeesDevelopment/DevelopedEmployees/UserSkillsProfile')
const UserProjectsProfile = () => import('@/views/EmployeesDevelopment/DevelopedEmployees/UserProjectsProfile')
const UpdateUserProfile = () => import('@/views/EmployeesDevelopment/DevelopedEmployees/UpdateUserProfile')

const RequestAssessment = () => import('@/views/EmployeesDevelopment/Assessments/RequestAssessment')
const AssessmentsHistory = () => import('@/views/EmployeesDevelopment/Assessments/AssessmentsLayout')

const SkillsLayout = () => import('@/views/EmployeesDevelopment/Skills/SkillsLayout')
const SkillInfo = () => import('@/views/EmployeesDevelopment/Skills/SkillInfo')
const CreateSkill = () => import('@/views/EmployeesDevelopment/Skills/CreateSkill')
const UpdateSkill = () => import('@/views/EmployeesDevelopment/Skills/UpdateSkill')

const Error403 = () => import('@/views/Errors/Error403')
const Error404 = () => import('@/views/Errors/Error404')
const Error500 = () => import('@/views/Errors/Error500')

Vue.use(Router)


const anonymousRequirement = {
  check: function (params) { return checkIfAnonymous() },
  callback: function (next) { redirectToHub(next) }
}

const authorizedRequirement = {
  check: function (params) { return checkIfAuthorized() },
  callback: function (next) { redirectToSignIn(next) }
}

const notEmployeeRequirement = {
  check: function (params) { return checkIfNotEmployee() },
  callback: function (next) { redirectToUserProfile(next) }
}

const employeeRequirement = {
  check: function (params) { return !checkIfNotEmployee() },
  callback: function (next) { redirectToUserProfile(next) }
}

const superUserRequirement = {
  check: function (params) { return checkIfSuperUser() },
  callback: function (next) { redirectToForbiddenErrorPage(next) }
}

const organizationOwnerRequirement = {
  check: function (params) { return checkIfOrganizationOwner() },
  callback: function (next) { redirectToForbiddenErrorPage(next) }
}

const managerRequirement = {
  check: function (params) { return checkIfManager() },
  callback: function (next) { redirectToForbiddenErrorPage(next) }
}

const superUserOrSameOrganizationRequirement = {
  check: function (params) { return checkIfSuperUserOrSameOrganization(params.organizationId) },
  callback: function (next) { redirectToForbiddenErrorPage(next) }
}

const superUserOrOrganizationOwnerRequirement = {
  check: function (params) { return checkIfSuperUserOrOrganizationOwner() },
  callback: function (next) { redirectToForbiddenErrorPage(next) }
}

const sameOrganizationRequirement = {
  check: function (params) { return checkIfSameOrganization(params.organizationId) },
  callback: function (next) { redirectToForbiddenErrorPage(next) }
}

const canUpdateDevelopedEmployeeProfileRequirement = {
  check: function (params) { return checkIfCanUpdateDevelopedEmployee(params.username) },
  callback: function (next) { redirectToForbiddenErrorPage(next) }
}


const checkIfAnonymous = () => {
  return !authHelper.common.isAuthorized()
}

const checkIfAuthorized = () => {
  return authHelper.common.isAuthorized()
}

const checkIfNotEmployee = () => {
  return !authHelper.common.isEmployee()
}

const checkIfSuperUser = () => {
  return authHelper.common.isSuperUser()
}

const checkIfOrganizationOwner = () => {
  return authHelper.common.isOrganizationOwner()
}

const checkIfManager = () => {
  return authHelper.common.isManager()
}

const checkIfSameOrganization = (organizationId) => {
  return authHelper.organizations.canReadSingleOrganization(organizationId)
}

const checkIfCanUpdateDevelopedEmployee = async (username) => {
  const response = await api.developedEmployees.get.profile(username);
  const data = response.data;

  const organizationId = data.organizationId
  const managerUserName = data.manager?.userName

  return authHelper.developedEmployees.canUpdateUserProfile(organizationId, managerUserName)
}


const checkIfSuperUserOrOrganizationOwner = () => {
  const isSuperUser = checkIfSuperUser()
  if (isSuperUser) {
    return true
  }

  const isOrganizationOwner = checkIfOrganizationOwner()

  return isOrganizationOwner
}

const checkIfSuperUserOrSameOrganization = (organizationId) => {
  const isSuperUser = checkIfSuperUser()
  if (isSuperUser) {
    return true
  }

  const isSameOrganization = checkIfSameOrganization(organizationId)

  return isSameOrganization
}


const redirectToHub = (next) => {
  next({ name: routerHelper.MyLovelyProgressHub })
}

const redirectToSignIn = (next) => {
  next({ name: routerHelper.SignIn })
}

const redirectToUserProfile = (next) => {
  const username = authHelper.common.getUsername()
  next({
    name: routerHelper.EmployeeDevelopmentUserProfile,
    params: { username }
  })
}

const redirectToForbiddenErrorPage = (next) => {
  next({ name: routerHelper.Error403 })
}



const checkAuthPolicies = async (to, from, next) => {
  const { authRequirements } = to.meta

  if (authRequirements) {
    for (let requirement of authRequirements) {
      const checkResult = await requirement.check(to.params)
      if (!checkResult) {
        requirement.callback(next)

        return
      }
    }

    next()
  }
  else {
    next()
  }
}


const routes = [
  {
    path: '/',
    beforeEnter: async function (to, from, next) {
      store.commit('SET_LOADING', true)
      await store.dispatch('SET_USER_DATA')
      store.commit('SET_LOADING', false)
      next()
    },
    component: MainLayout,
    children: [
      {
        path: '',
        component: MyLovelyProgressLayout,
        redirect: { name: routerHelper.MyLovelyProgressHub },
        children: [
          {
            path: 'hub',
            component: MyLovelyProgressHub,
            name: routerHelper.MyLovelyProgressHub,
            meta: {
              authRequirements: [
                authorizedRequirement,
                notEmployeeRequirement
              ]
            },
            beforeEnter: checkAuthPolicies
          },
          {
            path: 'employee-development',
            component: EmployeeDevelopmentLayout,
            children: [
              {
                path: '',
                component: EmployeeDevelopmentMainPage,
                name: routerHelper.EmployeeDevelopmentIndex,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    notEmployeeRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organization-owner/sign-up',
                component: EmployeeDevelopmentSignUpOrganizationOwner,
                name: routerHelper.SignUpOrganizationOwner,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    superUserRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/create',
                component: EmployeeDevelopmentCreateOrganization,
                name: routerHelper.EmployeeDevelopmentCreateOrganization,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    superUserRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId',
                component: EmployeeDevelopmentOrganizationProfile,
                name: routerHelper.EmployeeDevelopmentOrganizationProfile,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    superUserOrSameOrganizationRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId/update',
                component: EmployeeDevelopmentUpdateOrganization,
                name: routerHelper.EmployeeDevelopmentUpdateOrganization,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    superUserOrOrganizationOwnerRequirement,
                    sameOrganizationRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId/sign-up-manager',
                component: EmployeeDevelopmentSignUpManager,
                name: routerHelper.EmployeeDevelopmentSignUpManager,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    superUserRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId/sign-up-employee/by-manager',
                component: EmployeeDevelopmentSignUpEmployeeByManager,
                name: routerHelper.EmployeeDevelopmentSignUpEmployeeByManager,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    managerRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId/sign-up-employee/by-organization-owner',
                component: EmployeeDevelopmentSignUpEmployeeByOrganizationOwner,
                name: routerHelper.EmployeeDevelopmentSignUpEmployeeByOrganizationOwner,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    organizationOwnerRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'employees/:username',
                component: UserProfile,
                name: routerHelper.EmployeeDevelopmentUserProfile,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                  ]
                },
                beforeEnter: checkAuthPolicies,
                redirect: to => (
                  {
                    name: routerHelper.EmployeeDevelopmentUserSkillsProfile,
                    params: {
                      username: to.params.username
                    },
                  }),
                children: [
                  {
                    path: 'skills',
                    component: UserSkillsProfile,
                    name: routerHelper.EmployeeDevelopmentUserSkillsProfile,
                    props: true,
                  },
                  {
                    path: 'projects',
                    component: UserProjectsProfile,
                    name: routerHelper.EmployeeDevelopmentUserProjectsProfile,
                    props: true,
                  }
                ]
              },
              {
                path: 'employees/:username/assessments/create',
                component: RequestAssessment,
                name: routerHelper.RequestAssessment,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    employeeRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'employees/:username/assessments/history',
                component: AssessmentsHistory,
                name: routerHelper.AssessmentsHistory,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'employees/:username/update',
                component: UpdateUserProfile,
                name: routerHelper.EmployeeDevelopmentUpdateUserProfile,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    canUpdateDevelopedEmployeeProfileRequirement
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId/skills',
                component: SkillsLayout,
                name: routerHelper.SkillsLayout,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    sameOrganizationRequirement,
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId/skills/create',
                component: CreateSkill,
                name: routerHelper.CreateSkill,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    sameOrganizationRequirement,
                    organizationOwnerRequirement,
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId/skills/:skillId',
                component: SkillInfo,
                name: routerHelper.SkillInfo,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    sameOrganizationRequirement,
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
              {
                path: 'organizations/:organizationId/skills/:skillId/update',
                component: UpdateSkill,
                name: routerHelper.UpdateSkill,
                props: true,
                meta: {
                  authRequirements: [
                    authorizedRequirement,
                    sameOrganizationRequirement,
                    organizationOwnerRequirement,
                  ]
                },
                beforeEnter: checkAuthPolicies
              },
            ]
          },
          {
            path: 'sign-in',
            component: MyLovelyProgressSignIn,
            name: routerHelper.SignIn,
            meta: {
              authRequirements: [
                anonymousRequirement
              ]
            },
            beforeEnter: checkAuthPolicies
          }
        ]
      },
      {
        path: '403',
        component: Error403,
        name: routerHelper.Error403
      },
      {
        path: '404',
        component: Error404,
        name: routerHelper.Error404
      },
      {
        path: '500',
        component: Error500,
        name: routerHelper.Error500
      }
    ]
  },
  {
    path: '*',
    redirect: { name: routerHelper.Error404 }
  }
]

const router = new Router({
  mode: 'history',
  fallback: false,
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
