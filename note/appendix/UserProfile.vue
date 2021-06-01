<template>
  <div :class="{ loading: !this.isLoaded }" class="employee-details">
    <div class="employee-details__info">
      <div class="employee-details__info__contact-info">
        <div
          class="employee-details__info__contact-info__avatar"
          style="width: 150px; height: 150px"
        >
          <img
            v-if="this.isLoaded"
            :src="profileImage"
            :alt="employeeName"
            class="employee-details__info__contact-info__avatar__image"
          />
        </div>
        <div class="employee-details__info__contact-info__contacts-list">
          <div
            class="employee-details__info__contact-info__contacts-list__contact"
          >
            <a
              target="_top"
              :href="employeeEmailLink"
              class="employee-details__info__contact-info__contacts-list__link"
            >
              <svg
                class="employee-details__info__icon"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                ></path>
              </svg>
            </a>
          </div>
          <div
            class="employee-details__info__contact-info__contacts-list__contact"
          >
            <a
              target="_top"
              :href="employeePhoneLink"
              class="employee-details__info__contact-info__contacts-list__link"
            >
              <svg
                class="employee-details__info__icon"
                focusable="false"
                viewBox="0 0 12 13"
                aria-hidden="true"
                width="12px"
                height="13px"
              >
                <g>
                  <path
                    d="M11.6999312,9.48562069 L9.85162178,7.6317931 C9.48347278,7.26406897 8.87381089,7.27524138 8.49283668,7.65744828 L7.56165043,8.59110345 C7.50281948,8.55858621 7.4419255,8.52462069 7.37790258,8.48858621 C6.78986819,8.16182759 5.98504298,7.71396552 5.13813181,6.864 C4.2887106,6.01224138 3.8417192,5.20386207 3.51489971,4.61375862 C3.48041261,4.55124138 3.44736963,4.49096552 3.41473926,4.43372414 L4.03970201,3.80789655 L4.34695702,3.49937931 C4.72851576,3.11662069 4.73903725,2.50537931 4.37174785,2.13658621 L2.5234384,0.282551724 C2.156149,-0.0857241379 1.54621203,-0.0745517241 1.1646533,0.308206897 L0.64373639,0.83362069 L0.657971347,0.847793103 C0.48330086,1.07131034 0.337340974,1.32910345 0.228722063,1.60710345 C0.128595989,1.87172414 0.0662578797,2.12424138 0.0377535817,2.37727586 C-0.206303725,4.40637931 0.718280802,6.26082759 3.22748424,8.77727586 C6.69596562,12.2554828 9.49110602,11.9927241 9.61169054,11.9798966 C9.87431519,11.9484138 10.1260057,11.8854828 10.381788,11.7858621 C10.6565845,11.6782069 10.913467,11.5320345 11.1362063,11.3572414 L11.1475874,11.3673793 L11.6753123,10.8491379 C12.0560802,10.4664483 12.0670487,9.855 11.6999312,9.48562069 Z"
                  ></path>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="employee-details__info__general-info">
        <div class="employee-details__info__general-info__row">
          <p>Name:</p>
          <p>{{ employeeName }}</p>
        </div>
        <div class="employee-details__info__general-info__row">
          <p>Role:</p>
          <p>{{ employeeRole }}</p>
        </div>
        <div class="employee-details__info__general-info__row">
          <p>Date of Birth:</p>
          <p>{{ getFormattedDate(employeeDateOfBirth) }}</p>
        </div>
        <div class="employee-details__info__general-info__row">
          <p>Employment Date:</p>
          <p>{{ getFormattedDate(employeeEmploymentDate) }}</p>
        </div>
      </div>
      <div class="employee-details__info__additional-info">
        <div class="employee-details__info__additional-info__row">
          <p>Gender:</p>
          <p v-if="!genderUrl">{{ genderType }}</p>
          <a v-if="genderUrl" :href="genderUrl" class="custom-gender-link">
            <p>Download gender</p>
            <svg focusable="false" viewBox="0 0 14 14" aria-hidden="true">
              <g fill="inherit">
                <path
                  d="M4.44218359,11.8783437 C3.80160156,12.5193906 2.762375,12.5193906 2.12176563,11.8783437 C1.49080859,11.2478242 1.48074609,10.2309102 2.09201562,9.58811328 L5.55004297,6.13008594 C4.48057422,5.844125 3.29470312,6.10733594 2.43974609,6.92042969 L0.902179687,8.45799609 C-0.320386719,9.7435625 -0.300261719,11.7773906 0.961679687,13.038457 C2.24287109,14.3205234 4.32132422,14.3205234 5.60251562,13.038457 L7.02017969,11.620793 C7.87945703,10.7620898 8.16273828,9.54526562 7.8701875,8.45036719 L4.44218359,11.8783437 Z"
                ></path>
                <path
                  d="M13.038457,0.961679688 C11.7773906,-0.300261719 9.7435625,-0.320386719 8.45799609,0.902179688 L6.92042969,2.43974609 C6.10736328,3.29473047 5.84415234,4.48060156 6.13008594,5.55004297 L9.58811328,2.09201563 C10.2309102,1.48074609 11.2477969,1.49080859 11.8783438,2.12176563 C12.5193906,2.762375 12.5193633,3.80157422 11.8783438,4.44218359 L8.45033984,7.8701875 C9.54523828,8.16273828 10.7620625,7.87948437 11.6207656,7.02017969 L13.0384297,5.60251562 C14.3205234,4.32132422 14.3205234,2.24287109 13.038457,0.961679688 L13.038457,0.961679688 Z"
                ></path>
                <path
                  d="M4.50553906,9.49451563 C4.82584375,9.81503906 5.34545703,9.81503906 5.66573438,9.49451563 L9.49448828,5.66576172 C9.81501172,5.34545703 9.81501172,4.82584375 9.49448828,4.50556641 C9.17921484,4.19007422 8.67075781,4.18504297 8.34938672,4.49069141 L4.49063672,8.34944141 C4.18501563,8.67078516 4.19004688,9.17924219 4.50553906,9.49451563 L4.50553906,9.49451563 Z"
                ></path>
              </g>
            </svg>
          </a>
        </div>
        <div
          v-if="isManagerExists"
          class="employee-details__info__additional-info__row"
        >
          <p>Manager:</p>
          <router-link
            v-if="this.isLoaded"
            class="manager-link"
            :to="managerProfilePage"
          >
            <p>{{ employeeManager }}</p>
          </router-link>
        </div>
      </div>
      <div class="employee-details__info__action-buttons">
        <AppButton
          class="action-button"
          @click="onUpdateProfileClick"
          v-if="canUpdateUserProfile"
        >
          Update Profile
        </AppButton>
      </div>
    </div>
    <div class="employee-details__navigator" role="tablist">
      <a
        :class="{ active: current_tab == 0 }"
        class="employee-details__navigator__tab"
        v-on:click="onProjectsTabClick"
      >
        <div class="employee-details__navigator__tab__wrapper">
          <div class="employee-details__navigator__tab__wrapper__header">
            <span>{{ projectsTabHeader }}</span>
          </div>
          <div
            v-if="projectsTabFooter"
            class="employee-details__navigator__tab__wrapper__footer"
          >
            <span>{{ projectsTabFooter }}</span>
          </div>
        </div>
      </a>
      <a
        :class="{ active: current_tab == 1 }"
        class="employee-details__navigator__tab"
        v-on:click="onSkillsTabClick"
      >
        <div class="employee-details__navigator__tab__wrapper">
          <div class="employee-details__navigator__tab__wrapper__header">
            <span>Skills</span>
          </div>
        </div>
      </a>
    </div>
    <div class="employee-details__detailedInfo">
      <div class="employee-details__navigator__tab__wrapper__footer">
        <router-view v-on:updateActiveTab="updateActiveTab" />
      </div>
    </div>
  </div>
</template>

<script>
import no_profile_image from "@/assets/user.png";
import api from "@/api";
import { routerHelper, dateTimeHelper, enums, authHelper } from "@/utils";
import AppButton from "@/components/AppButton";

const tabs = ["projects", "skills"];

export default {
  name: "EmployeeDevelopmentUserProfile",
  components: {
    AppButton,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  watch: {
    "$route.params.username": async function (username) {
      await this.loadPageData(username);
    },
  },
  data() {
    return {
      no_profile_image,
      isLoaded: false,
      activeTab: "",
      current_tab: -1,
      model: {
        employee: {
          firstName: "",
          lastName: "",
          organizationId: "",
          profileImageUrl: null,
          email: "",
          phone: "",
          role: "",
          birthday: "",
          employmentDate: "",
          manager: {
            userName: "",
            firstName: "",
            lastName: "",
          },
          genderOption: 1,
          genderUrl: null,
          projectAssignments: [
            {
              projectName: "",
              projectRoles: [],
            },
          ],
        },
        projectsCount: 0,
      },
    };
  },
  computed: {
    canUpdateUserProfile() {
      const organizationId = this.model.employee.organizationId;
      const managerUserName = this.model.employee.manager?.userName;

      return authHelper.developedEmployees.canUpdateUserProfile(
        organizationId,
        managerUserName
      );
    },
    isModelLoaded() {
      return this.isLoaded;
    },
    employeeName() {
      return this.model.employee.firstName + " " + this.model.employee.lastName;
    },
    profileImage() {
      return this.model.employee.profileImageUrl;
    },
    employeeEmailLink() {
      return "mailto:" + this.model.employee.email;
    },
    employeePhoneLink() {
      return "tel:" + this.model.employee.phone;
    },
    employeeRole() {
      return this.model.employee.role;
    },
    employeeDateOfBirth() {
      return this.model.employee.birthday;
    },
    employeeEmploymentDate() {
      return this.model.employee.employmentDate;
    },
    employeeManager() {
      return (
        this.model.employee.manager.firstName +
        " " +
        this.model.employee.manager.lastName
      );
    },
    isManagerExists() {
      return this.model.employee.manager != null;
    },
    managerProfilePage() {
      return {
        name: routerHelper.EmployeeDevelopmentUserProfile,
        params: { username: this.model.employee.manager.userName },
      };
    },
    genderType() {
      return Object.keys(enums.GenderOptions).find(
        (key) => enums.GenderOptions[key] == this.model.employee.genderOption
      );
    },
    genderUrl() {
      return this.model.employee.genderUrl;
    },
    projectsTabHeader() {
      return "Projects (" + this.model.projectsCount + ")";
    },
    projectsTabFooter() {
      if (this.model.employee.projectAssignments.length == 0) {
        return "";
      }

      return this.model.employee.projectAssignments[0].projectName;
    },
  },
  methods: {
    updateActiveTab(data) {
      this.activeTab = data;
      this.current_tab = tabs.indexOf(this.activeTab);
    },
    onProjectsTabClick() {
      this.$router
        .push({
          name: routerHelper.EmployeeDevelopmentUserProjectsProfile,
          params: {
            username: this.username,
          },
        })
        .catch((err) => {});
    },
    onSkillsTabClick() {
      this.$router
        .push({
          name: routerHelper.EmployeeDevelopmentUserSkillsProfile,
          params: {
            username: this.username,
          },
        })
        .catch((err) => {});
    },
    onUpdateProfileClick() {
      this.$router.push({
        name: routerHelper.EmployeeDevelopmentUpdateUserProfile,
      });
    },
    getFormattedDate(dateTimeString) {
      return dateTimeHelper.getFormattedDate(dateTimeString);
    },
    async loadPageData(username) {
      try {
        this.isLoaded = false;
        const response = await api.developedEmployees.get.profile(username);
        const data = response.data;

        this.model = {
          employee: {
            firstName: data.firstName,
            lastName: data.lastName,
            organizationId: data.organizationId,
            profileImageUrl:
              data.imageExternalId == null
                ? no_profile_image
                : api.files.get.imageUrl(data.imageExternalId),
            email: data.email,
            phone: data.phone,
            role: data.role,
            birthday: data.birthday,
            employmentDate: data.employmentDate,
            manager: data.manager,
            genderOption: data.genderOption,
            genderUrl:
              data.genderExternalId == null
                ? null
                : api.files.get.genderUrl(data.genderExternalId),
            projectAssignments: data.projectAssignments,
          },
          projectsCount: data.projectsCount,
        };
      } catch (e) {
        if (e.response.status === 403) {
          this.$router.replace({ name: routerHelper.Error403 });
        } else if (e.response.status === 404) {
          this.$router.replace({ name: routerHelper.Error404 });
        } else {
          this.$router.replace({ name: routerHelper.Error500 });
        }
      } finally {
        this.isLoaded = true;
      }
    },
  },
  async created() {
    await this.loadPageData(this.username);
  },
};
</script>

<style lang="scss">
.employee-details {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 30px;

  &__info {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > *:not(:first-child) {
      margin-left: 40px;
    }

    &__icon {
      width: 1em;
      height: 1em;
      font-size: 1.5rem;
      fill: $mane-color-primary;
    }

    &__contact-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 0 20%;
      max-width: 200px;

      &__avatar {
        width: 40px;
        height: 40px;
        display: flex;
        overflow: hidden;
        position: relative;
        font-size: 1.25rem;
        align-items: center;
        flex-shrink: 0;
        font-family: "Lato", sans-serif;
        line-height: 1;
        user-select: none;
        border-radius: 50%;
        justify-content: center;

        &__image {
          color: transparent;
          width: 100%;
          height: 100%;
          object-fit: cover;
          text-align: center;
        }
      }

      &__contacts-list {
        display: flex;
        margin-top: 5px;

        &__contact {
          color: $mane-color-primary;
          margin-right: 6px;
        }

        &__contact:last-child {
          margin-right: 0;
        }

        &__link {
          display: flex;
          color: inherit;
        }
      }
    }

    &__general-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 0 40%;
      max-width: 350px;

      &__row {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
    }

    &__additional-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 0 40%;
      max-width: 250px;

      &__row {
        display: flex;
        justify-content: space-between;
        width: 100%;

        & .manager-link {
          text-decoration: none;
          color: $white;
        }

        & .custom-gender-link {
          text-decoration: none;
          color: $white;
          display: flex;
          align-items: center;
        }

        & .custom-gender-link svg {
          width: 1em;
          height: 1em;
          margin-left: 10px;
        }
      }
    }

    &__action-buttons {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
      align-items: center;
    }

    &__action-buttons .action-button {
      background-color: $mane-color-alternative;
      color: $white;

      &:hover {
        background-color: darken($mane-color-alternative, 10%);
      }
    }
  }

  &__navigator {
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 2px solid $white;

    display: flex;
    justify-content: flex-start;

    &__tab {
      padding: 20px;
      color: $white;
      text-decoration: none;

      &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 150px;
      }
    }

    &__tab:hover {
      cursor: pointer;
      background-color: $fur-color-alternative;
    }

    &__tab.active {
      border-bottom: 2px solid darken($fur-color-alternative, 10%);
    }
  }
}
</style>