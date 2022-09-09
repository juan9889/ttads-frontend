<template>
  <EventsABM
    :mode="this.$route.query.mode"
    :communityId="parseInt(this.$route.query.community) == NaN ? undefined : parseInt(this.$route.query.community)"
    :eventId="parseInt(this.$route.query.event) == NaN ? undefined : parseInt(this.$route.query.event)"></EventsABM>
</template>

<script>
export default {}
</script>
