import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";
import { auth } from '../firebase/config'
import { 
  signInWithEmailAndPassword,
} from 'firebase/auth'
import router from "../router";

const URL_API = "http://localhost:3001/";
   
export const useApp = defineStore({
  id: "App",
  state: () => ({
    user: {
      logged_in: false,
    },
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
  }),
  actions: {
    async login(email, password) { //mengirim email dan pass ke firebase
      this.loading = true;  //firebase melakukan verifikasi apakah email pass sudah terdaftar
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { //kalo udh login dapet user creds
          const user = userCredential.user;
          localStorage.setItem("userToken", user.uid); //token diset di LocalStorage
          this.router.push("/"); 
      })
      .catch((error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Email or Password is wrong',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
      });

    },
    async register(email, password) { 
      this.loading = true;
      this.error = null;
      console.log("register");
      try {
        const { data } = await axios //library untuk melakukan HTTP request
          .post(URL_API + "signup", { //kirim email dan pass ke backend dengan endpoint signup
            email,
            password,
          })
          .then((res) => {
            localStorage.setItem("userToken", res.data.user.uid);
            document.cookie = `token=${
              res.data.token
            }; path=/; expires=${new Date(
              res.data.expirationTime
            ).toUTCString()}`;
            document.cookie = `refreshToken=${
              res.data.refreshToken
            }; path=/; expires=${new Date(
              res.data.expirationTime
            ).toUTCString()}`;
            this.router.push("/");
          })
          .catch((error) => {
            // Todo: Handle error
            console.log(error.response.data.message.code);
            if (
              error.response.data.message.code === "auth/email-already-in-use"
            ) {
              // Swal.fire("Email already in use");
              Swal.fire({
                title: 'Error!',
                text: 'Email already in use',
                icon: 'error',
                confirmButtonText: 'Try Again'
              })
              console.log('email telah terdaftar')
            // }
          }});
        this.user = data.user;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
      
    },
    async logout(){
      console.log('test')
      this.user.logged_in = false
      this.token = ""
      this.refreshToken = ""
      localStorage.removeItem("userToken");
      router.push('/login')
    },

    fetchUser() {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          this.CLEAR_USER
        } else {
          this.SET_USER(user)

          if (router.isReady() && router.currentRoute.value.path === '/') {
            this.router.push('/login')
          }
        }
      })
    },
    
    async sessionCheck() {
      // Todo: Check if token is valid
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1];

      console.log("token : " + token);
      console.log("refreshToken : " + refreshToken);

      if (token && refreshToken) {
        this.user.logged_in = true;
        console.log("logged_in : " + this.user.logged_in);
        return true;
      }
      return false;
    },
  },
});

export const useView = defineStore({
  id: "View",
  state: () => ({
    user_settings: false,
    use_custom_link: false,
  }),
  actions: {
    useCustomLink() {
      this.use_custom_link = !this.use_custom_link;
    },
    deleteLink() {
      axios.delete(URL_API + "links/1").then((res) => {
        
      })
    },
    editLink() {
      
    },
  
    
  },
  getters: {},
});