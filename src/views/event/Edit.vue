<template> 
      <p>Edit the Event</p>
</template>

<script>
export default {
  props:['event'],
  data() {
    return {
      unsavedChanges: true
    }
  },
  beforeRouteLeave(routeTo, routeFrom) {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'Do you really want to leave? You have unsaved changes!'
      )
      if (!answer) {
        return false // <-- Cancels the navigation
      }
    }
  }
}
</script>