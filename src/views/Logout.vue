<template>
  <loader :loading="true"/>
</template>

<script>
import {mapActions} from 'vuex';
import Loader from '@/components/Loader';
import {postLogout} from '@/lib/backend/auth';
import {goToHome, goToLogin} from '@/lib/redirects';

export default {
  name: 'Logout',
  components: {Loader},
  mounted() {
    this.logout();
  },
  methods: {
    ...mapActions('alert', ['showAlert']),
    async logout() {
      const response = await postLogout();
      if (response) {
        if (response.status === 200) {
          return goToLogin();
        } else {
          this.showAlert({
            message: response.message
          });
        }
      }
      return goToHome();
    }
  }
}
</script>
