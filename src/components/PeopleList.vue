<script lang="ts">
import { usePersonStore } from "@/stores/person";
import { ref, defineComponent, computed, onMounted } from "vue";
import SinglePerson from "./SinglePerson.vue";
import { countMatches } from "@/helpers/util";
import usePerson from '@/composable/usePerson'
const showDiscarded = ref(false);
export default defineComponent({
  async setup() {
    const personState = usePersonStore();
    const { fetchPersons, users } = usePerson()
    if (personState.$state.persons.length === 0) {
      await fetchPersons()
    }

    const people = ref(personState.filteredPersons);
    const countFemale = computed(() =>
      countMatches(people.value, "female", "gender")
    );
    const countMale = computed(() =>
      countMatches(people.value, "male", "gender")
    );

    const changeFilter = (isOnMounted: boolean): void => {
      if (!isOnMounted) {
        showDiscarded.value = !showDiscarded.value;
      }
      showDiscarded.value
        ? (people.value = personState.persons)
        : (people.value = personState.filteredPersons);
    };
    // eslint-disable-next-line vue/no-lifecycle-after-await
    onMounted(() => {
      changeFilter(true);
    });

    return {
      people,
      countFemale,
      countMale,
      showDiscarded,
      changeFilter,
      users,
    };
  },
  components: { SinglePerson },
});
</script>

<template>
  <div>
    <div class="action-btn">
      {{ users }}
      <button class="btn" @click="changeFilter(false)">
        {{ showDiscarded ? "Hide" : "Show" }} discarded
      </button>
    </div>
    <div class="count-gender">
      <p>Female: {{ countFemale }}</p>
      <p class="text-right">Male: {{ countMale }}</p>
    </div>

    <table>
      <tr>
        <th>Name</th>
        <th>Eye color</th>
        <th>Year of birth</th>
        <th>Edit</th>
      </tr>
      <tr v-for="person in people" :key="person.url">
        <SinglePerson :person="person" />
      </tr>
    </table>
  </div>
</template>
<style scoped>
.action-btn {
  max-width: 10rem;
}

.count-gender {
  display: flex;
  align-items: center;
  font-weight: 900;
  justify-content: space-between;
  margin-top: var(--spacing-medium);
  margin-bottom: var(--spacing-medium);
}
</style>
