<script>
import {ref} from 'vue'
import { useApp } from "../stores/index.js"
// import {db} from '../firebase'
import { collection, getDocs, addDoc } from "firebase/firestore";
import axios from 'axios'

export default {
  setup() {
    const app = useApp();
    return {
      app,
    };
  },

    data(){
        return{
            url:"",
            alias:"",
            uid:localStorage.getItem("userToken")
        }
    },

    methods: {
        createNewLink () {
        axios.post("http://localhost:3001/create",{ //mengirim ke backend dengan endpoint create:
                url:this.url,
                alias:this.alias,
                uid:this.uid //kalo gada uid nanti link yg distore bakal bisa diliat lewat akun2 lain juga
            })
        }
    }
};

</script>

<template>
    <div>
        <!-- <img src="../assets/YPY.png"> -->
        <div class="form1">
        <form @submit.prevent = 'createNewLink'>
            <div class = 'form-group'>
                <label for="newTaskDescription">Type in or paste your link here.</label>
                <input type="text" class="form-control" v-model="url"
                placeholder= 'Type in your link...' required>
                <br>
                <label for="newTaskDescription">Alias.</label>
                <input type="text" class="form-control" v-model="alias"
                placeholder= 'Type in your alias...' required>
                <br>
            <button type="submit" class="btn btn-warning" @click="createTask" >Create Shortened Link</button>
            </div>
        </form>
        </div> 
    </div>

    
</template>

<style>
img {
    padding-bottom: 2em;
    padding-top: 2em;
}
h1 {
    text-align: center;
}
.checkbox {
    position:static;
    margin-right: 0.5em;
}

label {
    margin-right: 2em;
}

</style>