import { computed, defineComponent, ref } from "vue";
import SearchResults from '@/components/search-results/SearchResults.vue';
import { usePlacesStore } from "@/composables";
export default defineComponent({
    name: 'SearchBar',
    components: {SearchResults},
    setup() {

        const debouncedTimeout = ref()
        const debouncedValue = ref('')

        const {searchPlacesByTerm} = usePlacesStore()

        return {
            debouncedValue,

            searchTerm: computed({
                get(){
                    return debouncedValue.value;
                },
                set(val : string){

                    if(debouncedTimeout.value) clearTimeout(debouncedTimeout.value)     

                    debouncedTimeout.value = setTimeout(() => {
                        searchPlacesByTerm(val)
                        debouncedValue.value = val;
                    }, 1000);
                }
            })
        }
    }
})