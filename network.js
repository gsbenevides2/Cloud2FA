const network = {
}
network.start = ()=>{
 firebase.initializeApp({
	apiKey: "AIzaSyC4ngJLgSnWp347vkfw_AQMdsAdnX7YgMs",
	authDomain: "gui-benevides.firebaseapp.com",
	databaseURL: "https://gui-benevides.firebaseio.com",
	projectId: "gui-benevides",
	storageBucket: "gui-benevides.appspot.com",
	messagingSenderId: "275309435614",
	appId: "1:275309435614:web:60fa6801170576b66a804f",
	measurementId: "G-E5FCD4YJW9"
 })
}
network.autenticar= ()=>{
 return new Promise((resolve,reject)=>{
	const provider = new firebase.auth.GoogleAuthProvider()
	firebase.auth().signInWithPopup(provider)
	 .then(result=>{
		resolve(result.user)
	 })
	 .catch(error=>{
		switch(error.code){
		 case 'auth/popup-closed-by-user':
			reject("Por favor não ferche a pop-up ou janela. Aperte em ENTRAR para tentar novamente.")
			break
		 case'auth/popup-blocked':
			reject("Pop-up Bloqueado. Verifique se seu navegador está com a permissão de pop-up ativada.")
			break;
		 case 'auth/operation-not-supported-in-this-environment':
			reject("Verifique se a URL esta em https, e não em http")
			break
		 default:
			reject("Erro desconhecido")
			console.error(error)
			break
		}
	 })
 })
}
network.firestoreStart = ()=>{
 return new Promise(async (resolve)=>{
	await firestore.enablePersistence().catch(error=>{
	 console.log("Erro ao habilitar a persistencia do Firestore",error)
	})
	network.firestoreReference = firebase.firestore().doc(`usuarios/${firebase.auth().currentUser.uid}/servicos/auth`)
 })
}
network.recuperarChaves = (calback)=>{	
 return new Promise(resolve=>{
	network.firestoreReference.collection("chaves")
	 .onSnapshot(snapshot=>{
		const chaves = []
		snapshot.forEach(document=>console.log)
		calback(chaves)
		resolve()
	 })
  })
}
network.saveKey = (keyId,keyData)=>{
 return new Promise((resolve,reject)=>{
	network.firestoreReference.collection("chaves")
	 .update()
	 .then(resolve)
	 .catch((error)=>{
		reject()
	 })
 })
}
