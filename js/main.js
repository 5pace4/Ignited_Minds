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