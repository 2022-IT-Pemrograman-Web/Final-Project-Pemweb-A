<template>
    <table class="table">
        <thead class="thead-dark">
            <br>
            <tr>
                <th class="alias">Alias</th>
                <th class="description">URL</th>
                <th class="description">Click</th>
                <th class="edit">Update</th>
                <th class="go">Go</th>
                <th class="delete">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ url, alias, uid, id, count } in shorten" :key="id">
                <!-- <td class="description" v-bind:class="{ completed: completed }" @click='updateTaskCompletion'>{{description}}</td> -->
                <td>
                    <p>{{ alias }}</p>
                </td>
                <td>
                    <p>{{ url }}</p>
                </td>
                <td>
                    <p>{{ count }}</p>
                </td>
                <td>
                    <button class="btn btn-success" @click="edit(url,alias,id)">Edit</button>
                </td>
                <td>
                    <button class="btn btn-success" @click="gotoLink(alias)">Go</button>
                </td>
                <td>
                <button class="btn btn-danger" @click="deleteLink(id)"> Delete </button>
                </td>
            </tr>
        </tbody>

    </table>
    <div class='form-group' v-if="show"> 
        <!-- buat edit -->
        <label for="newTaskDescription">Type in or paste your link here.</label>
        <input type="text" class="form-control" v-model="urlEdit" placeholder='Type in your link...' required>
        <br>
        <label for="newTaskDescription">Alias.</label>
        <input type="text" class="form-control" v-model="aliasEdit" placeholder='Type in your alias...' required>
        <br>
        <button type="submit" class="btn btn-warning" @click="updateLink()">update shorten</button>
        <button type="submit" class="btn btn-warning" @click="cancel()">Cancel</button>
    </div>


</template>
        
    

<script>
import { doc, getDocs, deleteDoc, collection, query, orderBy, onSnapshot } from '@firebase/firestore';
import axios from 'axios';
import { ref, onUnmounted } from 'vue'
import { db } from '../firebase/config'

export default {
    data() {
        return {
            lists: [],
            url: '',
            alias: '',
            shorten: '',
            update: false,
            currentHost: window.location.host,
            uid: localStorage.getItem('userToken'),
            show: false,
            urlEdit: '',
            aliasEdit: '',
            docidEdit: '',
        }
    },
    setup() { //fungsi list rendering
        const shorten = ref([]);
        //setelah melakukan query ke firebase, dia dapet data (link) yg kemudian disimpan ke shorten, baru ditampilkan pake v-for.

        const getShortens = query(collection(db, 'shorten'));
        onSnapshot(getShortens, (querySnapshot) => { //realtime
            shorten.value = [];
            querySnapshot.forEach((doc) => {
                shorten.value.push({ ...doc.data(), id: doc.id });
            });
            const filtered = shorten.value.filter((item) => item.uid === localStorage.getItem('userToken'));
            shorten.value = filtered;
        });

        console.log(shorten)

        onUnmounted(getShortens);

        return {
            shorten
        }
    },
    methods: {
        async deleteLink(bjir) {
            const res = await axios.delete('http://localhost:3001/delete/' + bjir) //melakukan request ke beken dgn metod delete, akan menghapus link sesuai dengan id yg dimasukkan 
                .then((response) => {
                    console.log(response);
                    this.load
                })
        },

        async gotoLink(alias) {
            this.$router.push('/bjir/' + alias)
            console.log(alias)
        },

        async updateLink() {
            const res = await axios.patch('http://localhost:3001/update/' + this.docidEdit, { //melakukan request kepada beken ke end point update
                url: this.urlEdit,
                alias: this.aliasEdit,
            })
                .then((response) => {
                    console.log(response);
                    this.load
                })
        },

        async edit(url, alias, docid) {
            this.urlEdit = url;
            this.aliasEdit = alias;
            this.show = true;
            this.docidEdit = docid;
        },

        async cancel() {
            this.show = false;
        },

    },

}
</script>

<style>
.tasksList table th.edit,
.tasksList table th.delete {
    width: 100px;
}

.tasksList tbody td.description {
    cursor: pointer;
}

.completed {
    text-decoration: line-through;
    text-decoration-color: brown;
}
</style>