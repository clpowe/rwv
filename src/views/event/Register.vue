<template> 
      <p>Register for the Event</p>
      <button @click="register">Register Me</button> 
</template>

<script>
export default {
  props:['event'],
  inject: ['GStore'],
  methods:{
    register() {
      // Call to Api
      // If registered the redirect to event details

      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      this.$router.push({
        name: 'EventDetails'
      })
    }
  }
}
</script>