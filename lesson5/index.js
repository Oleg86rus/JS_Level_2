const app = new Vue({
    el: '#app',
    data: {
        goodsList: [],
        filteredGoods: [],
        filterSearch: "",
    },
    mounted() {
        fetch(
            "https://mock-api-builder.vercel.app/api/schema/get/5fc92d0d8dc8100007c08cb5" 
        )
        .then((r) => r.json())
        .then((r) => {
            this.goodsList = r;
            this.filteredGoods = this.goodsList;
        });
    },
    methods: {
        updateGoodsList() {
            this.filteredGoods = this.goodsList.filter((i) =>
            i.product_name.toLowerCase().includes(this.filterSearch.toLowerCase())
            );
        },
    }
});
