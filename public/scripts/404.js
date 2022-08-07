let menu = null;
function handleClick(e){
    menu?.remove();
    menu = document.createElement("div");
    menu.textContent = '404'
    menu.style.color = 'white';
    menu.style.background= "#f86400";
    menu.style.border = "1px solid black";
    menu.style.position="fixed";
    menu.style.top = event.clientY+"px";
    menu.style.left = event.clientX+"px";
    menu.style.padding="10px";
    document.body.append(menu);
}
function init(){
    document.addEventListener("click", handleClick);
}
window.onload = init;