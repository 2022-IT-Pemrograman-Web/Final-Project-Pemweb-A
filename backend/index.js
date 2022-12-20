// import { auth, db } from './config/firebase.js';
import { auth,db } from './config/config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, increment } from "firebase/firestore"; 

 
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan());
const port = 3001;

app.post('/', (req, res) => {
    const { email, password } = req.body;
    
    try {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return res.send({
                message: "User signed in successfully",
                token: user.accessToken,
                // expirationTime: user.expirationTime,
                refreshToken: user.refreshToken
            });
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    try {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            res.send({
                message: "User created successfully",
                token: user.accessToken,
                expirationTime: user.expirationTime,
                refreshToken: user.refreshToken
            })
        })
        .catch((error) => {
            res.status(400).send({
                message: error,
            })
        });
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

app.post('/create',async(req,res) =>{
    const { url, alias, uid } = req.body;
    // mengirim data ke firestore
    const docRef = await addDoc(collection(db, "shorten"), {
    url,alias,uid,count:0
    });
    console.log("Document written with ID: ", docRef.id);
    res.send ("url berhasil dikirim ")
});

app.delete("/delete", async(req, res) => {
    const {id} = req.params
    try {
        await deleteDoc(doc(db, "shorten", id));
        res.send("Berhasil delete")
        console.log('Delete')
    }
    catch(err) {
        console.log(err)
        res.send("Gagal Delete")
}
});

app.get('/link/:alias', async (req, res) => { //mencari link yang memiliki alias tersebut
    const { alias } = req.params;
    const querySnapshot = await getDocs(collection(db, "shorten")).catch(err => (console.log(err)));
    let data;
    var id;
    await querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
      if (doc.data().alias === alias) {
         id = doc.id;
        data = {
            id: id,
            url: doc.data().url,
            alias: doc.data().alias,
            count: doc.data().count,
            uid : doc.data().uid
        }
      }
    });
    
    await updateDoc(doc(db, "shorten", id), {
        count: increment(1) //nambah 1
    });
    
    res.send(data);

    
}),

app.delete("/delete/:id", async(req, res) => { //id bakal diambil
    try {
        await deleteDoc(doc(db, "shorten", req.params.id)).then(() => {
            res.send("Berhasil delete") //hapus link sesuai dengan id
        })
        console.log('Delete')
    } catch (error) {
        console.log(error)
        res.send("Gagal Delete")
        
    }
})

app.patch("/update/:id", async(req, res) => {
    const { id } = req.params;
    const { url, alias } = req.body;
    try {
        await updateDoc(doc(db, "shorten", id), {
            url: url,
            alias: alias //update ke firebase
        }).then(() => {
            res.send("Berhasil update")
        })
        console.log('Update')
    } catch (error) {
        console.log(error)
        res.send("Gagal update")
    }
})
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
