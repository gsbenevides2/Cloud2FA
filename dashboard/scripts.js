let drawer
let screen = "main"
let keyId
const snackbar = {
 message(msg){
	document.querySelector(".mdc-snackbar__label").innerHTML = msg
	snackbar.el.open()
 }
}
function onload(){
 network.start()
 drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
 const ripplesSelectors = '.mdc-fab,.mdc-drawer .mdc-list-item,.mdc-button,.mdc-card__primary-action'
 const ripplesElements = document.querySelectorAll(ripplesSelectors)
 Array.from(ripplesElements).map(mdc.ripple.MDCRipple.attachTo)
 const circleButtonsElements =  document.querySelectorAll(".mdc-top-app-bar__navigation-icon,.mdc-text-field__icon")
 Array.from(circleButtonsElements).map(el=>{
	const ripple = new mdc.ripple.MDCRipple(el)
	ripple.unbounded=true
 })
 snackbar.el  = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
 const linearProgress = new mdc.linearProgress.MDCLinearProgress(document.querySelector(".mdc-linear-progress"))
 const textFieldsElements = document.querySelectorAll(".mdc-text-field")
 Array.from(textFieldsElements).map(mdc.textField.MDCTextField.attachTo)
 firebase.auth().onAuthStateChanged(async (user)=>{
	if(user){
	 definirUserCard(user)
	 await network.firestoreStart()
	 await network.recuperarChaves(exibirChaves)
	 loading(false)
	}
	else window.location.href = "/";
 })
}
function definirUserCard(user){
 document.getElementById("userCard-name").innerHTML = user.displayName
 document.getElementById("userCard-image").style['background-image'] = `url("${user.photoURL}")`
}
function topAppBarButtonAction(){
 if(screen==="main") drawer.open=true;
 else changeScreen("main")
}
function loading(view){
 anime({
	targets:".mdc-linear-progress",
	opacity:view?1:0
 })
}
function changeScreen(screenName){
 document.querySelector(`#${screen}-screen`).style.display = "none"
 document.querySelector(`#${screenName}-screen`).style.display = "block"
 const drawerButton = document.querySelector(".mdc-top-app-bar__navigation-icon")
 if(screenName === "main") drawerButton.innerHTML = "menu"
 else drawerButton.innerHTML = "arrow_back"
 const fabButton = document.querySelector(".mdc-fab__icon")
 if(screenName === "editKey") fabButton.innerHTML= "save"
 else fabButton.innerHTML = "add"
 screen = screenName
}
function openCard(){
 changeScreen("viewKey")
}
function editKey(KeyInfo){
 const data = JSON.parse(KeyInfo || '{}')
 keyId = keyInfo.id
 document.querySelector("#editKey-screen h2").innerHTML = KeyInfo ? "Editar Chave": "Criar Chave"
 
 changeScreen("editKey")
}
function fabAction(){
 if(screen === "main"){
	editKey(null)
 }
}
function exibirChaves(chaves){
 if(chaves.length === 0){
	const element = document.querySelector("#main-screen .aviso")
	element.style.display = "block"
	 anime({
	 targets:element,
	 opacity:1
	})	
 }
}
function saveKey(){
 network.saveKey(keyId,keyData)
	.then(()=>{
	 changeScreen("viewKey")
	 snackbar.message("Salvo com sucesso!")
	})
	.catch(error=>{
	snackbar.message("Erro ao tentar salvar😢")
}
