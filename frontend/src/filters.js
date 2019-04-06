import Vue from 'vue';
import moment  from 'moment';

Vue.filter('date', (timestamp)=>{
    return moment(timestamp).fromNow();
})

Vue.filter('max-length', (str, maxLength)=>{
    if (typeof(str) !== 'string') return '';
    if(str.length <= 100) return str;
    return str.substr(0, maxLength) + '...';
});