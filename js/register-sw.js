if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then((message)=>{
        console.log('Service worker esta listo y funcionando!');
    })
} else { 
    alert('Este browser no soporta Service Worker');
}