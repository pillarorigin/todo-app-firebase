import './initialize';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

export default {
    getTodos() {
        return firestore.collection('todos')
            .orderBy('created_at') //필터링의 역할도 겸하고 있어서 값이 없으면 불려오지 않음
            .get()
            .then(snapshot => {
                //doc의 data가 array에 담김 
                return snapshot.docs.map(doc => {//firebase에 한개의 row가 doc에 담김
                    console.log('doc:', doc);
                    const data = doc.data();
                    console.log('data:', data);
                    data.create_at = new Date(data.create_at.toDate());
                    // method를 통해서 data를 전달 받아야 함. 
                    //snapshot(doc.id)의 id값을 _id에 mapping
                    return { _id: doc.id, ...data }
                    // return doc.data()
                });
            })
    },
    postTodos(payload) {
        const data = {
            created_at: firebase.firestore.FieldValue.serverTimestamp(), completed: false, ...payload
        }
        return firestore.collection('todos').add(data)
            .then(docRef => {
                return firestore.collection('todos').get()
                    .then(snapshot => snapshot.docs
                        .find(el => el.id === docRef.id).data())
                    .then(data => {
                        data.create_at = new Date(data.create_at.toDate())
                        return {
                            _id: docRef.id,
                            ...data
                        }
                    })
            });
    },
    deleteTodos(id) {
        return firestore.collection('todos').doc(id).delete()
        // .get()
        // //snapshot의 id여야 하므로 snapshot이 find한 결과값을 promise객체로 return
        // .then(snapshot => snapshot.docs.find(el => el.id === id))
    }
}