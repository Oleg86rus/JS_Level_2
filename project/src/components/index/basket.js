class Basket {
    constructor(item) {
        this.items = [];
        this.total = null;
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json';
        this.container = null; // basket-items
        this.wrapper = null; //basket all
        this.sum = 0;
        this.totalContainer = null;
        this.init();
    }

            init() {
                this.container = document.querySelector('#basket-items');
                this.wrapper = document.querySelector('#basket-inner');
                this.totalContainer = document.querySelector('#basket-sum');
                
                //async
                this._get(this.url)
                .then(basket => {
                    this.items = basket.content;
                    this._render();
                    this._handleEvents();
                });
            }
            _get(url) {
                return fetch(url).then(d => d.json()); //сделает запрос за джейсоном, дождется ответа и преобразует джейсон в объект, который вернется из данного метода
            }
            _render() {
                let htmlStr = '';

                this.items.forEach(item => {
                    htmlStr += new basketItem(item).render();
                });
                this.container.innerHTML = htmlStr;
                this._calcSum();
            }
            _calcSum() {
                this.sum = 0;
                this.items.forEach(item => {
                    this.sum += item.amount * item.productPrice;
                });

                this.totalContainer.innerText = this.sum;
            }
            add(item) {
            let find = this.items.find(el => item.productId == el.productId);

            if(find) {
                find.amount++;
            } else {
                this.items.push(Object.assign({}, item, { amount: 1 }));
            }

            this._render();
            }
            _remove(id) {
                let find = this.items.find(el => el.productId == id);

                if(find.amount > 1) {
                    find.amount--;
                } else {
                    this.items.splice(this.items.indexOf(find), 1);
                }

                this._render();
            }
            _handleEvents() {
                // +++ организовать скрытие/показ корзины по клику а не по ховеру
                document.querySelector('#basket-btn').addEventListener('click', e => {
                    this.wrapper.classList.toggle('hidden');
                });

                this.container.addEventListener('click', event => {
                    if(event.target.name == 'remove') {
                        this._remove(event.target.dataset.id);
                    }
                });
            }
    
}

    class basketItem {
        constructor(item) {
            this.item = item;
        }
        render() {
            return `
            <div class="cart_item">
                <img src="${this.item.productImg}" alt="product">
                <div class="cart_descr">
                    <div class="cart_title">${this.item.productName}</div>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <div class="cart_price">${this.item.amount} x $${this.item.productPrice}</div>
                </div>
                <a href="#" class="cart_close fas fa-times-circle" name="remove" data-id="${this.item.productId}"></a>
                <hr>
            </div>
        `
        }
       
    }
