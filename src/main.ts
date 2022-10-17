import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1Ijoic29sZ2c5NCIsImEiOiJjbDlicW9zdHgyNDQwM29uOTBkczMxdDc0In0.v0ibedJXFF9O-KL9Q48dDg';

if (!navigator.geolocation){
    throw new Error('Tu navegador no soporta geolocation')
}

createApp(App).use(store).use(router).mount('#app')
