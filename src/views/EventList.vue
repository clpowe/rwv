<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
     <div class="pagination">
    <router-link
     id="page-prev" 
    :to="{ name: 'EventList', query:{ page: page - 1 } }"
    rel="prev"
    v-if="page != 1"
    >Prev Page</router-link>
    
    <span class="page-numbers">
      <router-link 
        v-for="p in pages" :key="p"
        :to="{ name: 'EventList', query:{ page: p } }"
        :class="{color: p === page}"
        >
        {{ p }}
      </router-link>
    </span>

    <router-link 
    id="page-next"
    :to="{ name: 'EventList', query:{ page: page + 1 } }"
    rel="next"
    v-if="hasNextPage"
    >Next Page</router-link>
  </div>
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
import EventService from "../services/EventService.js";

export default {
  name: "EventList",
  props:['page'],
  components: {
    EventCard
  },
    data() {
    return {
      events: null,
      totalEvents: 0,
    }
  },
    beforeRouteEnter(routeTo, routeFrom, next) {
      EventService.getEvents(2,parseInt(routeTo.query.page)||1)
        .then(response => {
          next(comp => {
            comp.events = response.data
            comp.totalEvents = response.headers['x-total-count']
          })
        })
        .catch(() => {
          next({ name: 'NetworkError' })
        })
    },
    beforeRouteUpdate(routeTo,) {
      return EventService.getEvents(2,parseInt(routeTo.query.page)||1)
        .then(response => {
            this.events = response.data
            this.totalEvents = response.headers['x-total-count']
        })
        .catch(() => {
          return ({ name: 'NetworkError' })
        })
    },
    computed: {
      hasNextPage: function(){
        var totalPages = Math.ceil(this.totalEvents / 2)
        return this.page < totalPages
      },
    pages: function(){
      var totalPages = Math.ceil(this.totalEvents / 2)
      let pageA = []
      for (let i = 0; i < totalPages; i++) {
        pageA.push(i + 1)
      }
      return pageA
    }
  },
  
  
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: grid;
  width: 290px;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'prev num next'
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  grid-area: prev;
  text-align: left;
}
#page-next {
  grid-area: next;
  text-align: right;
}
.page-numbers{
  grid-area: num;
}
.page-numbers a{
  margin: 4px;
  border: 1px solid #ccc;
  padding: 1px 6px 1px 6px;
}
.page-numbers a:hover{
  background-color: #42b983;
  color: #fff
}
.color {
  background-color: #42b983;
  color: #fff !important;
}
</style>