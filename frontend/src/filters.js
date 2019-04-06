import Vue from 'vue';
import moment  from 'moment';

Vue.filter('dateFromNow', (timestamp)=>{
    return moment(timestamp).fromNow();
})
Vue.filter('timeAndDay', (timestamp)=>{
    return moment(timestamp).format('H:mm | MMM d');
})
Vue.filter('max-length', (str, maxLength)=>{
    if (typeof(str) !== 'string') return '';
    if(str.length <= 100) return str;
    return str.substr(0, maxLength) + '...';
});