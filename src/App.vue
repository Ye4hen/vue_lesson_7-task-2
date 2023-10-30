<template>
    <div class="container">
        <div class="cards__container">
            <available-products-list />
            <cart-products-list />
        </div>
        <filter-products />
    </div>
</template>

<script>
import AvailableProductsList from './components/AvailableProductsList.vue'
import CartProductsList from './components/CartProductsList.vue'
import FilterProducts from './components/FilterProducts.vue'
export default {
    name: 'App',
    components: { AvailableProductsList, CartProductsList, FilterProducts },
}
</script>

<style lang="scss">
@import './assets/style/';
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    margin-block: 60px;
}
</style>
