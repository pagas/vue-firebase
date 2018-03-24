import getFirestore from '../../firestoreInit';
import * as firebase from 'firebase'
const state = {
    properties: []
};
const getters = {
    loadedProperties(state) {
        // we can do soring if we want to get sorted properties
        return state.properties;
    }
};
const mutations = {};
const actions = {
    createProperty({commit}, property) {
        property.creatorId = this.getters.user.id;
        var propertyId;
        var image = property.image;
        delete property.image;
        getFirestore().then(firestore => {
            return firestore.collection('properties').add(property)
                .then(data => {
                    propertyId = data.id;
                    const filename = image.name;
                    const ext = filename.slice(filename.lastIndexOf('.'));
                    return firebase.storage().ref('properties/' + propertyId + ext).put(image);
                })
                .then(fileData => {
                    const imageUrl = fileData.metadata.downloadURLs[0];
                    return getFirestore().then(firestore => {
                        return firestore.collection('properties').doc(propertyId).update({
                            imageUrl: imageUrl
                        });
                    });
                })
                .catch(error => {
                    console.log('error creating', error)
                });
        });
    },
    editProperty({commit}, property) {
        var propertyId = property.id;
        var image = property.image;
        delete property.image;
        getFirestore.collection('properties').doc(property.id).update(property)
            .then(data => {
                if (image) {
                    const filename = image.name;
                    const ext = filename.slice(filename.lastIndexOf('.'));
                    return firebase.storage().ref('properties/' + propertyId + ext).put(image);
                }
            })
            .then(fileData => {
                const imageUrl = fileData.metadata.downloadURLs[0];
                return getFirestore().then(firestore => {
                    return firestore.collection('properties').doc(propertyId).update({
                        imageUrl: imageUrl
                    });
                });
            })
            .catch(error => {
                console.log('error creating', error)
            });
    },
    loadProperties({commit}) {
        return getFirestore().then(firestore => {
            return firestore.collection('properties').get().then(snapshot => {
                let result = [];
                snapshot.forEach(doc => {
                    result.push({...doc.data(), id: doc.id});
                })
                return result;
            });
        })
    },
    loadProperty({commit}, propertyId) {
        return getFirestore().then(firestore => {
            return firestore.collection('properties').doc(propertyId).get().then(doc => {
                return {...doc.data(), id: doc.id};
            });
        });
    },
    removeProperty({commit}, propertyId) {
        return getFirestore().then(firestore => {
            return firestore.collection('properties').doc(propertyId).delete();
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}