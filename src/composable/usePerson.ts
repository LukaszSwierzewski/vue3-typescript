import { ref, computed } from "vue";
import { usePersonStore } from "@/stores/person";
import type { People } from '@/types/People.type'
import type { Ref } from 'vue'
const mobileMenu = ref(true);
const users: Ref<People[]> = ref([]) // make it global!!!
const toggleIcon = computed(() => {
  return mobileMenu.value ? "-" : "+";
});
const isMobile = computed(() => {
  if (screen.width <= 767) return true;
  else return false;
});
export default function usePerson() {
  const personState = usePersonStore();
  const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value;
  };
  const fetchPersons = async (): Promise<People[]> => {
    const data: People[] = await personState.fetchPersons();
    return (users.value = data);
  };
  return { toggleIcon, toggleMenu, mobileMenu, isMobile, fetchPersons, users };
}
