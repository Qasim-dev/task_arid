
        document.addEventListener('DOMContentLoaded', function () {
        
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');

            menuToggle.addEventListener('click', function () {
                nav.classList.toggle('active');
            });

         
            const cartIcon = document.querySelector('.cart');
            const closeCart = document.querySelector('.close-cart');
            const cartDrawer = document.querySelector('.cart-drawer');
            const cartCount = document.querySelector('.cart-count');
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            const cartItems = document.querySelector('.cart-items');
            const cartTotal = document.querySelector('.cart-total span:last-child');
            const checkoutBtn = document.querySelector('.checkout-btn');

            let cart = [];
            let total = 0;

        
            cartIcon.addEventListener('click', function () {
                cartDrawer.classList.add('open');
            });

         
            closeCart.addEventListener('click', function () {
                cartDrawer.classList.remove('open');
            });

          
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const productCard = this.closest('.product-card');
                    const productName = productCard.querySelector('h3').textContent;
                    const productPrice = productCard.querySelector('.product-price').textContent;
                    const productImg = productCard.querySelector('img').src;

           
                    const item = {
                        name: productName,
                        price: productPrice,
                        img: productImg,
                        quantity: 1
                    };

                    cart.push(item);
                    updateCart();

                    animateCartIcon();

                
                    cartDrawer.classList.add('open');
                });
            });

          
            function updateCart() {
             
                cartItems.innerHTML = '';
                total = 0;

            
                cart.forEach((item, index) => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');

                   
                    const price = parseFloat(item.price.replace('$', ''));
                    total += price * item.quantity;

                    cartItem.innerHTML = `
                        <div class="cart-item-img">
                            <img src="${item.img}" alt="${item.name}">
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">${item.price} x ${item.quantity}</div>
                        </div>
                        <div class="cart-item-remove" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </div>
                    `;

                    cartItems.appendChild(cartItem);
                });

             
                cartTotal.textContent = `$${total.toFixed(2)}`;

               
                cartCount.textContent = cart.length;

                
                const removeButtons = document.querySelectorAll('.cart-item-remove');
                removeButtons.forEach(button => {
                    button.addEventListener('click', function () {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart.splice(index, 1);
                        updateCart();
                    });
                });
            }

       
            function animateCartIcon() {
                cartIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartIcon.style.transform = 'scale(1)';
                }, 300);
            }

            checkoutBtn.addEventListener('click', function () {
                if (cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }

                alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
                cart = [];
                updateCart();
                cartDrawer.classList.remove('open');
            });

         
            const productCards = document.querySelectorAll('.product-card');
            const productModal = document.querySelector('.product-modal');
            const closeModal = document.querySelector('.close-modal');
            const modalProductImg = document.querySelector('.modal-product-img img');
            const modalProductTitle = document.querySelector('.modal-product-info h2');
            const modalProductPrice = document.querySelector('.modal-product-price');
            const modalProductDescription = document.querySelector('.modal-product-description');
            const modalAddToCart = document.querySelector('.modal-product-actions .add-to-cart');

           
            productCards.forEach(card => {
                card.addEventListener('click', function (e) {
                    if (!e.target.classList.contains('add-to-cart') &&
                        !e.target.closest('.add-to-cart') &&
                        !e.target.classList.contains('wishlist') &&
                        !e.target.closest('.wishlist')) {

                        const productImg = this.querySelector('img').src;
                        const productTitle = this.querySelector('h3').textContent;
                        const productPrice = this.querySelector('.product-price').textContent;

                        modalProductImg.src = productImg;
                        modalProductTitle.textContent = productTitle;
                        modalProductPrice.textContent = productPrice;
                        modalProductDescription.textContent = `This is a beautiful ${productTitle.toLowerCase()} made with high-quality materials. Perfect for everyday use.`;

                        productModal.classList.add('open');
                    }
                });
            });

          
            closeModal.addEventListener('click', function () {
                productModal.classList.remove('open');
            });

          
            productModal.addEventListener('click', function (e) {
                if (e.target === productModal) {
                    productModal.classList.remove('open');
                }
            });

         
            const variantOptions = document.querySelectorAll('.variant-option');
            variantOptions.forEach(option => {
                option.addEventListener('click', function () {
                    const parent = this.parentElement;
                    parent.querySelector('.variant-option.active').classList.remove('active');
                    this.classList.add('active');
                });
            });

           
            const quantityBtns = document.querySelectorAll('.quantity-btn');
            const quantityInput = document.querySelector('.quantity-input');

            quantityBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    let quantity = parseInt(quantityInput.value);

                    if (this.textContent === '+') {
                        quantity++;
                    } else if (this.textContent === '-' && quantity > 1) {
                        quantity--;
                    }

                    quantityInput.value = quantity;
                });
            });

         
            modalAddToCart.addEventListener('click', function () {
                const quantity = parseInt(quantityInput.value);

                for (let i = 0; i < quantity; i++) {
                    const item = {
                        name: modalProductTitle.textContent,
                        price: modalProductPrice.textContent,
                        img: modalProductImg.src,
                        quantity: 1
                    };

                    cart.push(item);
                }

                updateCart();
                animateCartIcon();
                productModal.classList.remove('open');

                
                alert(`${quantity} ${modalProductTitle.textContent} added to cart!`);
            });
        });
