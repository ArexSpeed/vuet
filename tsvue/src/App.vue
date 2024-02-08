<script setup lang="ts">
import { ref, computed } from 'vue'
import Cards from './components/Cards.vue';
import { GENDER, type Invitee } from '@/types';

const name = ref("");
const gender = ref(GENDER.MALE);
const invitees = ref<Invitee[]>([]);

const addInvitee = () => {
  if (name.value) {
    invitees.value.push({
      id: Math.floor(Math.random() * 10000),
      name: name.value,
      gender: gender.value
    });
    name.value = "";
    gender.value = GENDER.MALE;
  }
}

const count = computed<{
  female: number,
  male: number
}>(() => {
  return invitees.value.reduce((countObj, invitee) => {
    if (invitee.gender === GENDER.MALE) {
      return {
        ...countObj,
        male: countObj.male + 1
      }
    }
    return {
      ...countObj,
      female: countObj.female + 1
    }
  }, { male: 0, female: 0 })

})

</script>

<template>
  <main>
    <div>
      <h1>People invited to party</h1>
      <div class="container">
        <input type="text" placeholder="name..." v-model="name" @keypress.enter="addInvitee" />
        <select v-model="gender">
          <option :value="GENDER.MALE">Male</option>
          <option :value="GENDER.FEMALE">Female</option>
        </select>
        {{ invitees }}
      </div>
      <div class="cards-container">
        <Cards v-for="invitee in invitees" :key="invitee.id" :invitee="invitee" />
      </div>
      <div>
        <p>Females - {{ count.female }}</p>
        <p>Males - {{ count.male }}</p>
      </div>
    </div>

  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #101010;

}

input,
select {
  width: 100%;
  padding: 5px;
  margin-bottom: 2px
}
</style>
