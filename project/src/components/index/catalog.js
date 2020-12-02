class Catalog {
    constructor(item){
        this.items = []
        this.container = null
        this.basket = basket
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json'
        this.init();
    }
        init(basket) {
            this.container = document.querySelector('#catalog');
            this.basket = basket;

            //async
            this._get(this.url)
            .then(catalog => {
                this.items = catalog;
                this._render();
                this._handleEvents();
            });
        }

        _get(url) {
            return fetch(url).then(d => d.json()); //сделает запрос за джейсоном, дождется ответа и преобразует джейсон в объект, который вернется из данного метода
        }
        _render() {
            let htmlStr = '';

            this.items.forEach((item, i) => {
                htmlStr += new CatalogItem(item, i).render();
            });
            this.container.innerHTML = htmlStr;
        }

        _handleEvents() {
            this.container.addEventListener('click', event => {
                if(event.target.name == 'add') {
                    // console.log('КУПЛЕНО!')
                    let id = event.target.dataset.id; //from data-id
                    let item = this.items.find(el => el.productId == id);
                    this.basket.add(item);     // ЗДЕСЬ ВЫДАЕТ ОШИБКУ, ЧТО НЕ МОЖЕТ ПРОЧИТАТЬ add. Не понимаю, объясните пожалуйста.
                }
            });
        }
}

class CatalogItem {
    constructor(item) {
        this.item = item;
    }
    render() {
        return `
            <div class="featuredItem">
                <div class="featuredImgWrap">
                    <div class="featuredBuy">
                        <button 
                            name="add"
                            data-id="${this.item.productId}"
                        >
                            <img src="../src/assets/images/addToCart.png" alt="">
                            Add to Cart
                        </button>
                    </div>
                    <img class="featuredProduct" src="${this.item.productImg}" alt="">
                </div>
                <div class="featuredNameAndPrice">
                    <div class="featuredItemName">
                        ${this.item.productName}
                    </div>
                    <div class="featuredItemPrice">$${this.item.productPrice}</div>
                </div>
            </div>
        `
    }
}