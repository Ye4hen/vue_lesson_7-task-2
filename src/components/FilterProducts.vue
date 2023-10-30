<template>
    <div class="filters__container">
        <select v-model="currency" @change="updatePrices">
            <option value="Гривня">Гривня</option>
            <option v-for="currency in currenciesList" :key="currency.id" :value="currency.name">
                {{ currency.name }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'FilterProducts',

    computed: {
        ...mapGetters(['currenciesList', 'getSelectedCurrency']),
        currency: {
            get() {
                return this.getSelectedCurrency
            },
            set(newCurrency) {
                this.updateSelectedCurrency(newCurrency)
            },
        },
    },
    methods: {
        ...mapActions(['updateSelectedCurrency', 'updateProductPrices']),
        updatePrices() {
            this.updateProductPrices()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>