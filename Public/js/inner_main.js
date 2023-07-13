function function1(){
let filter_btns = document.querySelectorAll('.filter-btn');
    let tab_items = document.querySelectorAll('.tab-item');

    for(let i=0; i<filter_btns.length; i++){
        filter_btns[i].addEventListener('click', function(){
            for(let j=0; j<filter_btns.length; j++){
                filter_btns[j].classList.remove('active');
            }
            filter_btns[i].classList.add('active');

            let selected_tab = filter_btns[i].getAttribute('data-tab');
            for(let p = 0; p<tab_items.length; p++){
                document.querySelector('.tab-filter-item-container').style.height = tab_items[p].scrollHeight + 'px';
                if(tab_items[p].classList.contains(selected_tab)){
                    tab_items[p].classList.add('selected_tab');
                }
                else{
                    tab_items[p].classList.remove('selected_tab');
                }
            }
        });
    }

    for(let t = 0; t < tab_items.length; t++){
        document.querySelector('.tab-filter-item-container').style.height = tab_items[t].scrollHeight + 'px';
    }
}
function1();

// Calculator Functionality
