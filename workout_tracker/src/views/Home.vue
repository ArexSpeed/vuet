<template>
  <div v-if="dataLoaded" class="container px-4 mt-10">
    <!-- No Data -->
    <div v-if="data.length === 0" class="flex items-center w-full flex0col">
      <h1 class="text-2xl">Looks empty here...</h1>
      <router-link 
        class="px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-white hover:bg-white hover:text-at-light-green"
        :to="{name: 'Create'}"
      >
        Create Workout
      </router-link>
    </div>

    <!-- Data -->
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <router-link 
        class="flex flex-col items-center p-8 shadow-md cursor-pointer bg-light-grey"
        :to="{name: 'View-Workout', params: {workoutId: workout.id}}"  
        v-for="(workout, index) in data"
        :key="index"
      >
        <!-- Cardio Img -->
        <img v-if="workout.workoutType === 'cardio'" src="@/assets/images/running-light-green.png" class="w-auto h-24" alt="" />
        <!-- Stranght Img -->
        <img v-else src="@/assets/images/dumbbell-light-green.png" class="w-auto h-24" alt="" />

        <p class="px-3 py-1 mt-3 text-xs text-white rounded-lg shadow-md bg-at-light-green">
          {{ workout.workoutType }}
        </p>
        <h1 class="mt-8 mb-2 text-xl text-center text-at-light-green">
          {{ workout.workoutName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from '../supabase/init';
export default {
  name: "Home",
  components: {},
  setup() {
    // Create data / vars
    const data = ref([]);
    const dataLoaded = ref(null);
    // Get data
    const getData = async () => {
      try {
        const {data: workouts, error} = await supabase.from('workouts').select('*');
        if (error) throw error;
        data.value = workouts;
        dataLoaded.value = true;
        console.log(data.value);
      } catch (error) {
        console.warn(error.message);
      }
    }
    // Run data function
    getData();

    return { data, dataLoaded };
  },
};
</script>
