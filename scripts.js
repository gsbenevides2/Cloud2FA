const snackbar = {
 message(msg){
	document.querySelector(".mdc-snackbar__label").innerHTML = msg
	snackbar.el.open()
 }
}
let loginProcess = false;
function onLoad(){
 network.start()
 firebase.auth().onAuthStateChanged(user=>{
	if(user){
	 snackbar.message(`Seja bem-vindo ${user.displayName}`)
	 window.location.href="/dashboard"
	}
 })
 snackbar.el  = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
 const buttonRipple = new mdc.ripple.MDCRipple(document.querySelector('.mdc-button'));
}
function entrar(){
 loginProcess=true
 network.autenticar().catch(snackbar.message)
}
