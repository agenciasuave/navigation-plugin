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
        this.screenCurrent = obj.screenCurrent
    }    

    getFatherScreen(screen){
        return screen.parentElement
    }

    getScreenByList(list){
        return list.children
    }

    Animate(direction, duration = 150){
        let time, distanceToGo, perMillisecond, start

        time = 0
        perMillisecond = Velocity(duration, this.screenWidth, this.screenHeight)
        
        direction == 'top' || direction == 'bottom' ? start = this.screenCurrent.offsetTop : start = this.screenCurrent.offsetLeft                          
 
        distanceToGo = start

        setInterval(() => {
            if(time < duration){
                time++

                switch (direction) {
                    case 'top':
                        //Incrementa a distância com o tempo
                        distanceToGo -= perMillisecond.y
                        window.scrollTo(window.scrollX, distanceToGo)  
                        break;
                    case 'bottom':
                        distanceToGo += perMillisecond.y 
                        window.scrollTo(window.scrollX, distanceToGo) 
                        break;
                    case 'next':
                        distanceToGo += perMillisecond.x
                        window.scrollTo(distanceToGo, window.scrollY)   
                        break;
                    case 'prev':
                        distanceToGo -= perMillisecond.x
                        window.scrollTo(distanceToGo, window.scrollY)  
                        break;
                
                    default:
                        break;
                }

                          
            }
        })

        //Retorna a velocidade 
        function Velocity (time, width, height) {
            return {
                x: width / time,
                y: height / time
            }         
        }
    }

    topScreen(){
        console.log('Para cima!')
        // window.scrollTo(window.scrollX, -this.screenHeight)
        this.Animate('top')
    }

    bottomScreen(){
        console.log('Para baixo!')
        window.scrollTo(window.scrollX, this.screenHeight)
        this.Animate('bottom')
    }

    nextScreen(){
        console.log('Para frente!')
        this.Animate('next')
    }

    prevScreen(){
        console.log('Para trás!')
        //window.scrollTo(window.scrollX - this.screenWidth, window.scrollY)
        this.Animate('prev')
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

class NavByScreens extends Navigation{
    executeNav(id){
        const screen = document.querySelector(`#${id}`)
        window.scrollTo(screen.offsetLeft, screen.offsetTop)
    }

    addControlEvent(){        
        this.controls.forEach(e => {
            //Adiciona evento de clique aos links de controle           
            e.addEventListener('click', control => {  
                control.preventDefault()

                this.executeNav(e.dataset.direction)
            })              
        })
        return this.controls
    }


    init(){
        this.addControlEvent()
    }
}

export {Navigation, NavByArrows, NavByScreens}