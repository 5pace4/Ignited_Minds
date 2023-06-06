/* Testimonial Slider */

function testimonialSlider(){
    const carouselOne = document.getElementById('carouselOne');
    if(carouselOne){
        carouselOne.addEventListener('slid.bs.carousel', function() {
            const activeItem = this.querySelector(".active");
            document.querySelector(".js-testimonial-img").src =
            activeItem.getAttribute("data-js-testimonial-img");
        })
    }
}
testimonialSlider();

/* Faq Functionality */
const faqs = document.querySelectorAll('.faq');
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('open');

        // For changing Icon
        const icon = faq.querySelector('.faq_icon i');
        if(icon.className === 'fas fa-plus'){
            icon.className = "fas fa-minus"
        }
        else{
            icon.className = "fas fa-plus"
        }
    })
});



    // $(window).scroll(function(){
    //     if($(window).scrollTop()){
    //       $('.header-mneu').addClass("black");
    //     }else{
    //       $('.header-menu').removeClass("black");
    //     }
    // });


        // Open the modal
        function openModal() {
            document.getElementById("signupModal").style.display = "block";
        }
    
        // Close the modal
        function closeModal() {
            document.getElementById("signupModal").style.display = "none";
            
        }

        // Math Modal 1
        function openModal() {
            document.getElementById("m_modal1").style.display = "block";
        }
    
        // Close the modal
        function closeModal() {
            document.getElementById("m_modal1").style.display = "none";
        }

        //technology start
        function openModal1() {
            document.getElementById("tech1").style.display = "block";
        }
        
        // Close the modal
        function closeModal1() {
            document.getElementById("tech1").style.display = "none";
        }

        function openModaltech2() {
            document.getElementById("tech2").style.display = "block";
        }
        
        // Close the modal
        function closeModaltech2() {
            document.getElementById("tech2").style.display = "none";
        }

        // popup
        function openPopup() {
            document.getElementById("popup").style.display = "block";
        }
        
        // Close the modal
        function closePopup() {
            document.getElementById("popup").style.display = "none";
        }
        const parentContainer = document.querySelector('.career_exploration_section1');
        parentContainer.addEventListener('click', event=>{
            const current = event.target;
            const isReadMoreBtn = current.className.includes('Read_more');
            if(!isReadMoreBtn) return;
            const currentText = event.target.parentNode.querySelector('.see-more-text');
            currentText.classList.toggle('see-more-text--show');
            current.textContent = current.textContent.includes('Read More..')?
            "Read More..": "Read Less..";
        })
        const parentContainer1 = document.querySelector('.career_exploration_section2');
        parentContainer1.addEventListener('click', event=>{
            const current = event.target;
            const isReadMoreBtn = current.className.includes('Read_more');
            if(!isReadMoreBtn) return;
            const currentText = event.target.parentNode.querySelector('.see-more-text');
            currentText.classList.toggle('see-more-text--show');
            current.textContent = current.textContent.includes('Read More..')?
            "Read More..": "Read Less..";
        })



    