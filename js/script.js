window.addEventListener("DOMContentLoaded",()=>{
    const deadline='2023-05-16';


    function TimerRemaining(time){
        let day,hour,minute,second;

        const timer = Date.parse(time) - Date.parse(new Date());
        if(timer<=0){
            day=0;
            hour=0;
            minute=0;
            second=0;
        }
        else{
            day = Math.floor(timer/(1000*60*60*24)),
            hour = Math.floor((timer/(1000*60*60)%24))-3,
            minute =Math.floor((timer/1000/60)%60),
            second = Math.floor((timer/1000)%60);
        }
              

        return{
            'totalTime':timer,
            'day':day,
            'hour':hour,
            'minute': minute,
            'second':second
        };
    }

    function SetZero(number){
        if(number>=0 && number<10){
            return `0${number}`;
        }
        else{
            return number;
        }
    }
    function SetTimer(selector, time){
        const timeBloc = document.querySelector(`.${selector}`),
              day = timeBloc.querySelector('#days'),
              hour = timeBloc.querySelector('#hours'),
              minute = timeBloc.querySelector('#minutes'),
              second = timeBloc.querySelector('#seconds');
              setInterval(UpdateTimer,1000);
              
        UpdateTimer();      
        function UpdateTimer(){
            const remainingTime = TimerRemaining(time);

            day.innerHTML = SetZero(remainingTime.day);
            hour.innerHTML=SetZero(remainingTime.hour);
            minute.innerHTML=SetZero(remainingTime.minute);
            second.innerHTML=SetZero(remainingTime.second);
        }

        
    }
    SetTimer("timer",deadline);

    //modal
    

    const btn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector(".modal"); 
          closebtn = document.querySelector('[data-close]') 
         

    function openModal(){
        modal.style.display='block';
            document.body.style.overflow='hidden';
            clearInterval(openModalByTime);
    }

    btn.forEach(btn=>{
        btn.addEventListener('click', openModal)
    }); 

    function closeModal(){
        modal.style.display = 'none';
        document.body.style.overflow='';
    }

    modal.addEventListener('click',(event)=>{
        if(event.target===modal){
            closeModal();
        }
    })

    closebtn.addEventListener('click', ()=>{
        closeModal();
    });

    document.addEventListener('keydown', (event)=>{
        if(modal.style.display=='block' && event.code=='Escape'){
            closeModal();
        }
    })

    //const openModalByTime = setInterval(openModal, 5000);
        
    function scrollOpenModal(){
        if(window.pageYOffset + window.document.documentElement.clientHeight >= window.document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', scrollOpenModal);
        }
    }
    window.addEventListener('scroll',scrollOpenModal);


    // use class for create menu

    class GetMenu{
        constructor(src,alt,title,content,price,kurs,selector){
            this.src = src,
            this.alt = alt,
            this.title = title,
            this.content = content,
            this.price = price,
            this.kurs = kurs,
            this.selector = selector
        };

        createMenu() {
            const div = document.createElement("div");
            div.innerHTML=`
            <div class="menu__item">
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.content}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price*this.kurs}</span> грн/день</div>
                </div>
            </div>
            `;
            const parent = document.querySelector(this.selector);
            parent.append(div);
        }
        
    }

    new GetMenu(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        250,
        10,
        ".menu .container"
    ).createMenu();

    new GetMenu(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        298,
        10,
        ".menu .container"
    ).createMenu();

    new GetMenu(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        590,
        10,
        ".menu .container"
    ).createMenu();
    
});