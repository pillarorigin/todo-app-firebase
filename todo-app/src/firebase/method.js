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
                    const data = doc.data();
                    data.created_at = new Date(data.created_at.toDate());
                    // method를 통해서 data를 전달 받아야 함. 
                    //snapshot(doc.id)의 id값을 _id에 mapping
                    return { _id: doc.id, ...data }
                    // return doc.data()
                });
            })
    },
    postTodos(payload) {
        const data = {
            created_at: firebase.firestore.FieldValue.serverTimestamp(), 
            completed: false, 
            ...payload
        }
        return firestore.collection('todos').add(data)
        .then(docRef => docRef.get())
        .then(doc => {
            const data = doc.data();
            console.log(data.created_at.toDate()); //Wed Dec 04 2019 09:51:11 GMT+0900 (한국 표준시)
            data.created_at = new Date(data.created_at.toDate());
            return { _id: doc.id ,...data }
        })
            // .then(docRef => {
            //     return firestore.collection('todos').get()
            //         .then(snapshot => snapshot.docs
            //             .find(el => el.id === docRef.id).data())
            //         .then(data => {
            //             data.created_at = new Date(data.created_at.toDate())
            //             return {
            //                 _id: docRef.id,
            //                 ...data
            //             }
            //         })
            // });
    },
    deleteTodos(id) {
        return firestore.collection('todos').doc(id).delete()
        // .get()
        // //snapshot의 id여야 하므로 snapshot이 find한 결과값을 promise객체로 return
        // .then(snapshot => snapshot.docs.find(el => el.id === id))
    },

    patchTodos(id, payload) {
        return firestore.collection('todos').doc(id).update(payload); 
        //doc(id)는 DocumentSnapshot / update(payload)는 //{completed: true / false} 값이 들어있음
    
        //<ollection에서 data 뽑기>
    //     return firestore.collection('todos') // CollectionReference
    //         //where로 접근하게 되면 document의 field값으로 WHERE 동작 (firebase의 document id를 가져옴)
    //         .get() //QuerySnapshot
    //           //{ snapshot.docs.find(el => el.id === id); } 에 {}가 없으면 default로 return을 해주겠다.
    //         .then(snapshot => { snapshot.docs.find(el => el.id === id); }) //QueryDocumentSnapshot
    //         // .then(doc => doc.data()) //data
    },
}