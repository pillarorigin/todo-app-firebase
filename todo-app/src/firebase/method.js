import './initialize';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

export default {
    getTodos () {
        console.log('gettodos')
        return firestore.collection('todos')
        .orderBy('created_at') //필터링의 역할도 겸하고 있어서 값이 없으면 불려오지 않음
        .get()
        .then(snapshot => {
            //doc의 data가 array에 담김 
            console.log(snapshot);
            return snapshot.docs.map(doc => {//firebase에 한개의 row가 doc에 담김
                const data = doc.data();
                data.create_at = new DataView(data.create_at.toDate())
                // method를 통해서 data를 전달 받아야 함. 
                return data
                // return doc.data()
            });
        })
    },
    postTodos(payload){
        return firestore.collection('todos').add({
            created_at: firebase.firestore.FieldValue.serverTimestamp(),...payload
        })
    },

    deleteTodos(id) {
        return firestore.collection('todos')
        .where('id', '==', id).get()
        .then(snapshot => snapshot.docs[0].id)
        //삭제할 document의 id이 then promise
        .then(
            id => firestore.collection('todos').docs[0]
        )
    }
}