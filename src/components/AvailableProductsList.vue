<template>
    <div class="product__container">
        <h1 class="title">Список Товарів</h1>
        <div class="product__card">
            <ul class="product__list">
                <li v-for="(product, index) in productsToBuyList" :key="index" class="product__item">
                    <div class="product__info">
                        <h4 class="product__name">{{ product.name }}</h4>
                        <div class="product__price">{{ product.price }}{{ getSelectedCurrencyMark }}</div>
                    </div>
                    <button @click="addProduct(product, index)" class="product__button">Купити</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'AvailableProductsList',

    computed: {
        ...mapGetters(['productsToBuyList', 'getSelectedCurrencyMark']),
    },
    methods: {
        ...mapActions(['addNewProduct']),
        addProduct(product, index) {
            this.addNewProduct({
                productData: {
                    name: product.name,
                    price: product.price,
                },
                index: index,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
</style>