<template>
  <div class="max-w-screen-md px-4 py-10 mx-auto">
    <!-- Status message -->
    <div v-if="statusMsg || errorMsg" class="p-4 mb-10 rounded-md bg-light-gray">
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Create form -->
    <div class="flex items-start p-8 rounded-md shadow-lg bg-light-grey">
      <!-- Form -->
      <form @submit.prevent="createWorkout" class="flex flex-col w-full gap-y-5">
        <h1 class="text-2xl text-at-light-green">Record Workout</h1>

        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green">Workout Name</label>
          <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="workout-name" v-model="workoutName" />
        </div>
        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-light-green">Workout Type</label>
          <select 
            id="workout-type" 
            class="p-2 text-gray-500 focus:outline-none" 
            required 
            @change="workoutChange"
            v-model="workoutType"
          >
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>
        <!-- Strength Training Inputs -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div 
            class="relative flex flex-col gap-x-6 gap-y-2 md:flex-row" 
            v-for="(item, index) in exercises"
            :key="index"
            >
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">Exercise</label>
              <input type="text" class="w-full p-2 text-gray-500 focus:outline-none" required v-model="item.exercise" />
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green">Sets</label>
              <input type="text" class="w-full p-2 text-gray-500 focus:outline-none" required v-model="item.sets" />
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green">Reps</label>
              <input type="text" class="w-full p-2 text-gray-500 focus:outline-none" required v-model="item.reps" />
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green">Weight (LB's)</label>
              <input type="text" class="w-full p-2 text-gray-500 focus:outline-none" required v-model="item.weight" />
            </div>
            <img 
            @click="deleteExercise(item.id)"
            src="@/assets/images/trash-light-green.png" 
            class="absolute w-auto h-4 cursor-pointer -left-5" 
            alt="trash" />
          </div>
            <button
              @click="addExercise"
               type="button"
               class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-white hover:bg-white hover:text-at-light-green"
            >
              Add Exercise
            </button>
        </div>
        <!-- Cardio Inputs -->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div 
            class="relative flex flex-col gap-x-6 gap-y-2 md:flex-row" 
            v-for="(item, index) in exercises"
            :key="index"
            >
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">Type</label>
              <select id="cardio-type" class="w-full p-2 text-gray-500 focus:outline-none" v-model="item.cardioType">
                <option value="#">Select Type</option>
                <option value="run">Runs</option>
                <option value="walk">Walk</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green">Distance</label>
              <input type="text" class="w-full p-2 text-gray-500 focus:outline-none" required v-model="item.distance" />
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green">Duration</label>
              <input type="text" class="w-full p-2 text-gray-500 focus:outline-none" required v-model="item.duration" />
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green">Pace</label>
              <input type="text" class="w-full p-2 text-gray-500 focus:outline-none" required v-model="item.pace" />
            </div>
            <img 
              @click="deleteExercise(item.id)"
              src="@/assets/images/trash-light-green.png" 
              class="absolute w-auto h-4 cursor-pointer -left-5" 
              alt="trash" />
          </div>
            <button 
              @click="addExercise"
              type="button"
              class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-white hover:bg-white hover:text-at-light-green"
            >
              Add Exercise
            </button>
        </div>
       <button
        type="submit" 
        class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-white hover:bg-white hover:text-at-light-green"
       >
         Record Workout
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from '../supabase/init';
export default {
  name: "create",
  setup() {
    // Create data
    const workoutName = ref('');
    const workoutType = ref('');
    const exercises = ref([1]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);
    // Add exercise
    const addExercise = () => {
      if (workoutType.value === 'strength') {
        exercises.value.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: ""
        });
        return;
      }
      exercises.value.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: ""
      })
    }
    // Delete exercise
    const deleteExercise = (id) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter(exercise => exercise.id !== id);
        return;
      }
      errorMsg.value = "Error: Cannot remove, need to at least have one exercise";
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000)
    }
    // Listens for chaging of workout type input
    const workoutChange = () => {
      exercises.value = [];
      addExercise()
    }
    // Create workout
    const createWorkout = async () => {
      try {
        const {error} = await supabase.from('workouts').insert([
          {
            workoutName: workoutName.value,
            workoutType: workoutType.value,
            exercises: exercises.value
          }
        ]);
        if (error) throw error;
        statusMsg.value = 'Success: Workout Created!'
        workoutName.value = null;
        workoutType.value = "select-workout";
        exercises.value = [];
        setTimeout(() => {
          statusMsg.value = false;
        }, 5000)
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000)
      }
    }

    return { workoutName, workoutType, exercises, statusMsg, errorMsg, addExercise, workoutChange, deleteExercise, createWorkout };
  },
};
</script>
