<template>
    <div class="product__container">
        <h2 class="title">Корзина</h2>
        <div class="product__card">
            <ul class="product__list">
                <li v-for="(product, index) in productsCartList" :key="index" class="product__item">
                    <div class="product__info">
                        <h4 class="product__name">{{ product.name }}</h4>
                        <div class="product__price">{{ product.price }}{{ getSelectedCurrencyMark }}</div>
                    </div>
                    <button @click="returnProduct(product, index)" class="product__button">Відмовитись</button>
                </li>
            </ul>
            <div class="product__check">
                <div class="product__check-info">
                    <h4 class="product__check-name">Разом до оплати</h4>
                    <div class="product__check-price">{{ displayTotalPrice }}{{ getSelectedCurrencyMark }}</div>
                </div>
                <button @click="payTheNewCart" class="product__check-button">Оплатити</button>
                <div :class="messageStyle" class="payment-message">{{ errorMessage }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'CartProductsList',

    computed: {
        ...mapGetters([
            'productsCartList',
            'calcProductsPriceSum',
            'errorMessage',
            'getSelectedCurrencyMark',
            'messageStyle',
        ]),
        displayTotalPrice() {
            const total = this.calcProductsPriceSum
            return typeof total === 'number' ? total.toFixed(2) : 'Some error happened:('
        },
    },
    methods: {
        ...mapActions(['returnNewProduct', 'payTheNewCart']),
        returnProduct(product, index) {
            this.returnNewProduct({
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
