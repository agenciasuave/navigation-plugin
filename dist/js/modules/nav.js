class Navigation {
    constructor() {
        this.screens = document.querySelectorAll('.screen-container li')
        this.arrows = document.querySelectorAll('.screen-container .screen-arrow')
        this.controls = document.querySelectorAll('.screen-container .screen-control')
        this.RowsLength = document.querySelectorAll('.screen-row').length
    }

    possibleDestinations(obj){
        //Props privadas 
        let index, top, right, bottom, left

        //Obtém número identificador da row
        const rowCurrent = parseFloat(obj.row.dataset.screen)
        
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
        
        this.top = top
        this.right = right
        this.bottom = bottom
        this.left = left
        this.direction = obj.direction
        this.screenWidth = obj.screenCurrent.offsetWidth
        this.screenHeight = obj.screenCurrent.offsetHeight
    }    

    getFatherScreen(screen){
        return screen.parentElement
    }

    getScreenByList(list){
        return list.children
    }


    topScreen(){
        console.log('Para cima!')
        window.scrollTo(window.scrollX, -this.screenHeight)
    }

    bottomScreen(){
        console.log('Para baixo!')
        window.scrollTo(window.scrollX, this.screenHeight)
    }

    nextScreen(){
        console.log('Para frente!')
        window.scrollTo(this.screenWidth + window.scrollX, window.scrollY)
        
    }

    prevScreen(){
        console.log('Para trás!')
        window.scrollTo(window.scrollX - this.screenWidth, window.scrollY)
    }

}

class NavByArrows extends Navigation{
    executeNav(){
        
        if(this.direction == 'left' && this.left){ 
            this.prevScreen() 
        }
        if(this.direction == 'right' && this.right){
            this.nextScreen()
        }
        if(this.direction == 'bottom' && this.bottom){
            this.bottomScreen()
        }
        if(this.direction == 'top' && this.top){
            this.topScreen()
        }

    }
    
    addControlEvent(){        
        this.arrows.forEach(e => {
            //Adiciona evento de clique aos links de controle           
            e.addEventListener('click', control => {  
                control.preventDefault()

                //Passa ao método de destino um objeto
                //com a direção e linha pai da screen                
                this.possibleDestinations({
                    direction: e.dataset.direction,
                    row: this.getFatherScreen(e.parentElement),
                    screens: this.getScreenByList(this.getFatherScreen(e.parentElement)),                    
                    screenCurrent: e.parentElement
                })           

                this.executeNav()
            })              
        })
        return this.arrows
    }

    init(){
        this.addControlEvent()
    }
}



export {NavByArrows}