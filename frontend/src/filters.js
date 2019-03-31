import Vue from 'vue';
import moment  from 'moment';

Vue.filter('date', (timestamp)=>{
    return moment(timestamp).fromNow();
})