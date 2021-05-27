import axios from 'axios'
import Vue from 'vue'
import qs from 'querystring'

axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${Vue.$cookies.get('token')}`

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.defaults.headers.post['Content-Type'] = 'application/json'

const api = {
  authentication: {
    post: {
      token(model) {
        const data = {
          client_id: 'auth_server.ro.public',
          ...model,
          grant_type: 'password'
        }

        return axios.post(process.env.VUE_APP_AUTHENTICATION_API_BASEPATH + '/connect/token', qs.stringify(data), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      },
      refresh_token() {
        const data = {
          client_id: 'auth_server.ro.public',
          grant_type: 'refresh_token',
          refresh_token: Vue.$cookies.get('refresh-token')
        }

        return axios.post(process.env.VUE_APP_AUTHENTICATION_API_BASEPATH + '/connect/token', qs.stringify(data), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      }
    },
  },
  files: {
    get: {
      image(id) {
        return axios.get(process.env.VUE_APP_PUBLIC_FILE_API_BASEPATH + `/images/${id}`)
      },
      imageUrl(id) {
        return process.env.VUE_APP_PUBLIC_FILE_API_BASE_URI + `api/images/${id}`
      },
      genderUrl(id) {
        return process.env.VUE_APP_PUBLIC_FILE_API_BASE_URI + `api/genders/${id}`
      }
    }
  },
  organizations: {
    get: {
      getMany(startIndex, size) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + '/organizations/read-many', {
          params: {
            startIndex,
            size
          }
        })
      },
      getSingle(organizationId) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/read/${organizationId}`)
      }
    },
    put: {
      updateOrganization(organizationId, model) {
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "put",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/update/${organizationId}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
    },
    post: {
      createOrganization(model) {
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "post",
          url: process.env.VUE_APP_EDM_API_BASEPATH + '/organizations/create',
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
    }
  },
  organizationOwners: {
    post: {
      signUpOrganizationOwner(model) {
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "post",
          url: process.env.VUE_APP_EDM_API_BASEPATH + '/organization-owners/sign-up',
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      },
    }
  },
  managers: {
    get: {
      getMany(organizationId, startIndex, size) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/managers/read-many`, {
          params: {
            startIndex,
            size
          }
        })
      },
      getAll(startIndex, size) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/managers/read-all`, {
          params: {
            startIndex,
            size
          }
        })
      }
    },
    post: {
      signUpManager(organizationId, model) {
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "post",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/managers/sign-up`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
    }
  },
  employees: {
    get: {
      getMany(organizationId, startIndex, size) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/employees/read-many`, {
          params: {
            startIndex,
            size
          }
        })
      },
      getAll(startIndex, size) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/employees/read-all`, {
          params: {
            startIndex,
            size
          }
        })
      }
    },
    post: {
      signUpByManager(organizationId, model) {
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "post",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/employees/sign-up/by-manager`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      },
      signUpByOrganizationOwner(organizationId, model) {
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "post",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/employees/sign-up/by-organization-owner`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
    }
  },
  developedEmployees: {
    get: {
      profile(username) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/developed-employees/${username}`)
      }
    },
    put: {
      profile(username, model){
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "put",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/developed-employees/${username}/update`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
    }
  },
  skills: {
    get: {
      get(organizationId, skillId) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/skills/${skillId}`)
      },
      getAll(organizationId, startIndex, size) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/skills/read-all`, {
          params: {
            startIndex,
            size
          }
        })
      },
      getAssessors(organizationId, skillId, startIndex, size) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/skills/${skillId}/assessors`, {
          params: {
            startIndex,
            size
          }
        })
      },
      getAllEmployeeSkills(username, startIndex, size) {
        return axios.get(process.env.VUE_APP_EDM_API_BASEPATH + `/developed-employees/${username}/skills`, {
          params: {
            startIndex,
            size
          }
        })
      },
    },
    put: {
      update(organizationId, skillId, model) {
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "put",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/skills/${skillId}/update`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      },
    },
    post: {
      create(organizationId, model) {
        const formData = new FormData()

        Object.keys(model).forEach(key => {
          formData.append(key, model[key])
        })

        return axios({
          method: "post",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/skills/create`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      },
      assignAssessor(organizationId, skillId, userName) {
        return axios({
          method: "post",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/skills/${skillId}/assign-assessor`,
          params: {
            userName: userName
          }
        })
      },
      unassignAssessor(organizationId, skillId, userName) {
        return axios({
          method: "post",
          url: process.env.VUE_APP_EDM_API_BASEPATH + `/organizations/${organizationId}/skills/${skillId}/unassign-assessor`,
          params: {
            userName: userName
          }
        })
      }
    }
  }
}

axios.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response.status === 401) {
    const response = await api.authentication.post.refresh_token()

    const { access_token, refresh_token, expires_in } = response.data
    Vue.$cookies.set('token', access_token, expires_in)
    Vue.$cookies.remove('refresh-token')
    Vue.$cookies.set('refresh-token', refresh_token, 60 * 60 * 24 * 30)

    return axios(error.config)
  }

  return Promise.reject(error)
})

export default api
