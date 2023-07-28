// Sticky Header
window.addEventListener("scroll", function() {
    var header = document.querySelector(".header");
    header.classList.toggle("sticky", window.scrollY > 0);
});
    
 // Home Page Section Styling Starts Here
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

    /* Style Switcher Functionality */
    function styleSwitchertoggle(){
        const styleSwitcher = document.querySelector(".js-style-switcher"),
        styleSwitcherToggler= document.querySelector(".js-style-switcher-toggler");

        styleSwitcherToggler.addEventListener("click", function(){
            styleSwitcher.classList.toggle('open');
            this.querySelector("i").classList.toggle("fa-times");
            this.querySelector("i").classList.toggle("fa-cog");
        })
    }
    styleSwitchertoggle();

    // Theme color changer 
    function themecolor(){
        const colorStyle = document.querySelector(".js-color-style"),
        themeColorContainer = document.querySelector(".js-theme-colors");

        themeColorContainer.addEventListener("click", ({target}) => {
            if(target.classList.contains("js-theme-color-item")){
                localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
                setColor();
            }
        });

        function setColor(){
            let path = colorStyle.getAttribute("href").split("/");
            path = path.slice(0, path.length-1);
            // console.log(path);
            colorStyle.setAttribute("href", path.join('/') + "/" + localStorage.getItem("color") + ".css");

            if(document.querySelector(".js-theme-color-item.active")){
                document.querySelector(".js-theme-color-item.active").classList.remove("active");
            }
            document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active");
        }

        if(localStorage.getItem("color") !== null){
            setColor();
        }
        else{
            const defaultcolor = colorStyle.getAttribute("href").split("/").pop().split(".").shift();
            document.querySelector("[data-js-theme-color=" + defaultcolor + "]").classList.add("active");
        }
    }
    themecolor();

    /* Dark Theme Functionality */
    function darkTheme(){
        const darkMode = document.querySelector(".js-dark-mode");

        darkMode.addEventListener("click", function(){
            if(this.checked){
                localStorage.setItem("dark-theme", "true");
            }
            else{
                localStorage.setItem("dark-theme", "false");
            }
            themeMode();
        });

        function themeMode(){
            if(localStorage.getItem("dark-theme") === "true"){
                document.body.classList.add("dark");
            }
            else{
                document.body.classList.remove("dark");
            }
        }
        /* For null value-See the change in console->application->localstorage */
        if(localStorage.getItem("dark-theme") !== null){
            themeMode();
        }
        /* Reload and check remains */
        if(document.body.classList.contains("dark")){
            darkMode.checked = true;
        }
    }
    darkTheme();

    /* Dark Theme Functionality Ends Here */

    /* Glass effect Functionality Starts Here */
    
    function glassEffect(){
        const glassChecker = document.querySelector(".js-glass-effect"),
        glassStyle = document.querySelector(".js-glass-style");

        glassChecker.addEventListener("click", function(){
            if(this.checked){
                localStorage.setItem("glass-effect", "true");
            }
            else{
                localStorage.setItem("glass-effect", "false");
            }
            glass_function();
        });

        function glass_function(){
            if(localStorage.getItem("glass-effect") === "true"){
                glassStyle.removeAttribute("disabled");
            }
            else{
                glassStyle.disabled = true;
            }
        }
        if(localStorage.getItem("glass-effect") !== null){
            glass_function();
        }
        if(!glassStyle.hasAttribute("disabled")){
            glassChecker.checked = true;
        }
    }
    glassEffect();

    /* Glass effect functionality Ends Here */


    // Translator Functionality Starts Here
    function loadGoogleTranslate(){
        new google.translate.TranslateElement("google_element");
    }

    // Home Page Section Styling Ends Here


    // $(window).scroll(function(){
    //     if($(window).scrollTop()){
    //       $('.header-mneu').addClass("black");
    //     }else{
    //       $('.header-menu').removeClass("black");
    //     }
    // });


        /* Sign Up Modal Styling Starts */
        // // Open the modal
        // function openModal_s() {
        //     document.getElementById("signupModal").style.display = "block";
        // }
    
        // // Close the modal
        // function closeModal_s() {
        //     document.getElementById("signupModal").style.display = "none";
            
        // }

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
                text1.style.color = "red";
                return false;
            }
            else if(password == confirm_pass){
                text1.innerHTML = "Password Matched.";
                text1.style.color = "green";
                return true;
            }
        }

        /* Sign Up Modal Styling Ends */

        /* Home_Course Section Modal Styling Starts */
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
        /* Home_Course Section Modal Styling Ends */

   
// Header Menu Functioning
// function headerMenu(){
//     const menu = document.querySelector(".js-header-menu"),
//     backdrop = document.querySelector(".js-header-backdrop").
//     menuCollapsor = 991;

//     function toggleMenu(){
//         menu.classList.toggle("open");
//         backdrop.classList.toggle("active");
//         document.body.classList.toggle("overflow-hidden");
//     }
//     document.querySelectorAll(".js-header-menu-toggler").forEach((item) =>{
//         item.addEventListener("click", toggleMenu);
//     });

//     backdrop.addEventListener("click", toggleMenu);

//     function collapse(){
//         menu.querySelector(".active .js-sub-menu").removeAttribute("style");
//         menu.querySelector(".active").classList.remove("active");
//     }
//     menu.addEventListener("click", (event) => {
//         const {target} = event;
//         if(target.classList.contains("js-toggle-sub-menu") && window.innerWidth <= menuCollapsor){
//             event.preventDefault();

//             if(target.parentElement.classList.contains("active")){
//                 collapse();
//                 return;
//             }

//             if(menu.querySelector(".active")){
//                 collapse();
//             }
            
//             target.parentElement.classList.add("active");
//             target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + "px";
//         }
//     });
//     console.log("ok");
// }
// headerMenu();

function headerMenu() {
    const menu = document.querySelector(".js-header-menu"),
      backdrop = document.querySelector(".js-header-backdrop"),
      menuCollapsor = 991;
  
    function toggleMenu() {
      menu.classList.toggle("open");
      backdrop.classList.toggle("active");
      document.body.classList.toggle("overflow-hidden");
    }
  
    document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
      item.addEventListener("click", toggleMenu);
    });
  
    backdrop.addEventListener("click", toggleMenu);
  
    function collapse() {
      menu.querySelectorAll(".js-sub-menu").forEach((subMenu) => {
        subMenu.removeAttribute("style");
      });
      menu.querySelectorAll(".active").forEach((activeItem) => {
        activeItem.classList.remove("active");
      });
    }
  
    function toggleSubMenu(subMenu) {
      const parentItem = subMenu.closest(".menu-item");
      if (parentItem.classList.contains("active")) {
        collapse();
        return;
      }
  
      if (menu.querySelector(".active")) {
        collapse();
      }
  
      parentItem.classList.add("active");
      subMenu.style.maxHeight = subMenu.scrollHeight + "px";
  
      // Animate sub-menu items
      const subMenuItems = subMenu.querySelectorAll("li");
      subMenuItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 50); // Adjust the delay to control the animation speed
      });
    }
  
    menu.addEventListener("click", (event) => {
      const { target } = event;
  
      if (target.classList.contains("js-toggle-sub-menu") && window.innerWidth <= menuCollapsor) {
        event.preventDefault();
        const subMenu = target.nextElementSibling;
        toggleSubMenu(subMenu);
      }
    });
  
    console.log("ok");
  }
  
  headerMenu();
  