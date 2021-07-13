export default class Main {

    renderAll(){

    }

    suscribeAll(){
        
    }

    init(){
        this.renderAll();
        this.suscribeAll();
    }

    notify(data){
        if(data.beforeUri){
            this.router.clear(data.beforeUri);
            this.router.render();
        }
        if(data.render){
            this.render.clear();
            this.render.render();
        }
    }
}
