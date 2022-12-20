<template>
    <h2>WAIT</h2> 
    <!-- fokus di fungsi -->
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            url: "",
            alias: "",

        }
    },
    methods: {
        async getredirect() { // mengambil link asli dari aliasnya
            await axios.get("http://localhost:3001/link/" + this.$route.params.alias).then((res) => { //ngambil alias dr this route params
                window.location.href = res.data.url //redirect
            })
        }
    },
    created() {
        this.getredirect()
        console.log(this.$route.params.alias)
    }   
}

</script>