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


        // Sign Up Verification
        function validation(){
            var form = document.getElementById("form");
            var text = document.getElementById("text");
            var email = document.getElementById("email").value;
            var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if(email.match(pattern)){
                form.classList.add("Valid");
                form.classList.remove("Invalid");
                text.innerHTML = "Valid Email Address";
                text.style.color = "green";
            }
            else{
                form.classList.remove("Valid");
                form.classList.add("Invalid");
                text.innerHTML = "*Invalid Email Address";
                text.style.color = "red";
            }
            if(email == ""){
                form.classList.remove("Valid");
                form.classList.remove("Invalid");
                text.innerHTML = "";
            }
        }

        // Password Matching
        function passfunction(){
            var password = document.querySelector('.password').value,
                confirm_pass = document.querySelector('.confirmpassword').value;
            var text1 = document.getElementById("text1");
            if(password == " "){
                text1.innerHTML = "Password field can't be empty!!!";
                text1.style.color = "orange";
            }
            else if(password != confirm_pass){
                text1.innerHTML = "Password didn't match.";
                text1.style.color = "green";
                return false;
            }
            else if(password == confirm_pass){
                text1.innerHTML = "Password Matched.";
                text1.style.color = "green";
                return true;
            }
        }

        // Open the modal
        function openModal_s() {
            document.getElementById("signupModal").style.display = "block";
        }
    
        // Close the modal
        function closeModal_s() {
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



    