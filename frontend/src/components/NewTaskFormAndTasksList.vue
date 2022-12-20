<template>
      <div>
    <br>
    <router-link to="/">Dashboard</router-link>
    <br><br>
  </div>
    <div class="newTaskFormAndTasksList">
        <NewTaskForm />
        <TasksList />
    </div>
    <button type="submit" class="btn btn-warning" @click="app.logout()">Logout</button> 
</template>

<script>
import { useApp } from '../stores';
import NewTaskForm from '../components/NewTaskForm.vue'
import TasksList from '../components/TasksList.vue'

export default {

    name : 'App',
    components : {
        NewTaskForm, 
        TasksList,
    },
    data(){
        return{
            app: useApp()
        }
    }
}
</script>

<style>
</style>