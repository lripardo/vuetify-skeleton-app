<template>
  <div/>
</template>

<script>
import {mapActions} from 'vuex';
import {postLogout} from '@/lib/backend/auth';
import {goToHome, goToLogin} from '@/lib/redirects';

export default {
  name: 'Logout',
  mounted() {
    this.logout();
  },
  methods: {
    ...mapActions('alert', ['showAlert']),
    async logout() {
      const response = await postLogout();
      if (!response) return goToHome();
      if (response.status === 200) {
        goToLogin();
      } else {
        this.showAlert({message: response.message});
        goToHome();
      }
    }
  }
}
</script>
