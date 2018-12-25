export default class Navigation {
    constructor() {
        this.screens = document.querySelectorAll('.screen-container li')
        this.controls = document.querySelectorAll('.screen-container .screen-control')
        this.RowsLength = document.querySelectorAll('.screen-row').length
    }

    Destiny(obj){
        //Props privadas 
        let index, top, bottom, right, left

        //Obtém número identificador da row
        const rowCurrent = parseFloat(obj.row.dataset.screen)
        //
        const childrensRow = Array.from(obj.screens)
        //Obtém tamanho da linha
        const rowSize = childrensRow.length       
        
        //Obter índice atual para única comparação
        index = 0        
        childrensRow.forEach((e, i) => {
            e == obj.screenCurrent ? index = i : false            
        })
        
        //Determina direções de navegação permitidas
        index === 0 ? left = false : left = true
        index + 1 === rowSize ? right = false : right = true
        rowCurrent === 1 ? top = false : top = true
        rowCurrent === this.RowsLength ? bottom = false : bottom = true

        console.log(left, right, bottom, top)
    }

    getFatherScreen(screen){
        return screen.parentElement
    }

    getScreenByList(list){
        return list.children
    }

    addControlEvent(){
        console.log('aa')
        this.controls.forEach(e => {
            //Adiciona evento de clique aos links de controle           
            e.addEventListener('mousedown', control => {  
                //Passa ao método de destino um objeto
                //com a direção e linha pai da screen                
                this.Destiny({
                    direction: e.dataset.direction,
                    row: this.getFatherScreen(e.parentElement),
                    screens: this.getScreenByList(this.getFatherScreen(e.parentElement)),                    
                    screenCurrent: e.parentElement
                })           
                control.preventDefault()
            })              
        })
        return this.controls
    }

    topScreen(){
    }

    bottomScreen(){

    }

    nextScreen(){

    }

    PrevScreen(){

    }

    init(){
        this.addControlEvent()
    }
}