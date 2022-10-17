import { usePlacesStore } from "@/composables";
import Mapboxgl from "mapbox-gl";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
    name: "MapView",
    setup() {

        const mapElement = ref<HTMLDivElement>()

        const { userLocation, isUserLocationReady } = usePlacesStore()

        const initMap = async() => {
            if (!mapElement.value) throw new Error('Div element no existe');
            if (!userLocation.value) throw new Error('userlocation no existe');

            await Promise.resolve()

            const map = new Mapboxgl.Map({
                container: mapElement.value!,
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation.value,
                zoom: 15, // starting zoom
            });

            const myLocationPopUp = new Mapboxgl.Popup()
                .setLngLat(userLocation.value)
                .setHTML(`
                <h4>Ubicación actual</h4>
                <p>${userLocation.value}</p>
                `)

            const myLocationMarker = new Mapboxgl.Marker()
                .setLngLat(userLocation.value)
                .setPopup(myLocationPopUp)
                .addTo(map)
        }

        onMounted( () => {
            if(isUserLocationReady.value) return initMap()
            console.log('no tengo localización aun')
        })

        watch(isUserLocationReady, (newVal) => {
            if (isUserLocationReady.value) return initMap()
        })


        return {
            initMap,
            isUserLocationReady,
            mapElement
        }
    },
});