export default class Main {

    renderAll(){

    }

    suscribeAll(){
        
    }

    init(){
        this.renderAll();
        this.suscribeAll();
    }

    notify(options){
        if(options.type === "link"){
            this.router.clear(options.beforeUri);
            this.router.render();
        }
    }
}
