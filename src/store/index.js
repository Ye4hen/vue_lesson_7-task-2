import { createStore } from "vuex";

export default createStore({
	state: {
		productsToBuyList: [
			{
				id: 1,
				name: 'Хліб',
				price: 25,
			},
			{
				id: 2,
				name: 'Сосиски',
				price: 30,
			},
			{
				id: 3,
				name: 'Гречка',
				price: 50,
			},
			{
				id: 4,
				name: 'Мандарини',
				price: 15,
			},
			{
				id: 5,
				name: 'Олія',
				price: 20,
			},
		],
		productsCartList: [
			{
				id: 1,
				name: 'Чорна Ікра',
				price: 100
			},
		],
		errorMessage: null,
		currenciesList: [
			{
				id: 1,
				name: 'Доллар',
			},
		],
		selectedCurrency: 'Гривня',
		selectedCurrencyMark: '₴',
		dollarRate: 38,
	},
	getters: {
		productsToBuyList: (state) => state.productsToBuyList,
		productsCartList: (state) => state.productsCartList,
		calcProductsPriceSum: (state) => {
			if (!state.productsCartList || state.productsCartList.length === 0) {
				return 0;
			}
			const totalSum = state.productsCartList.reduce((sum, product) => sum + parseFloat(product.price), 0);
			return totalSum;
		},
		errorMessage: (state) => state.errorMessage,
		currenciesList: (state) => state.currenciesList,
		getSelectedCurrency: (state) => state.selectedCurrency,
		getDollarRate: (state) => state.dollarRate,
		getSelectedCurrencyMark: (state) => {
			if (state.selectedCurrency === 'Гривня') return '₴'
			else if (state.selectedCurrency === 'Доллар') return '$'
		},
	},
	mutations: {
		addProduct(state, { product, index }) {
			state.productsCartList.push(product)
			state.productsToBuyList.splice(index, 1)
			state.errorMessage = null
		},
		returnProduct(state, { product, index }) {
			state.productsToBuyList.push(product)
			state.productsCartList.splice(index, 1)
		},
		payTheCart(state) {
			if (!state.productsCartList.length) {
				state.errorMessage = "Додайте, щось до корзини перед тим, як її оплачувати"
			} else {
				state.errorMessage = null
				const removedProducts = state.productsCartList.splice(0);
				state.productsToBuyList.push(...removedProducts);
			}
		},
		setSelectedCurrency(state, currency) {
			state.selectedCurrency = currency;
		},
		changePrice(state) {
			console.log('changePrice mutation is being executed');
			state.productsToBuyList.forEach((product) => {
				if (state.selectedCurrency === 'Доллар') {
					product.price = (product.price / state.dollarRate).toFixed(2);
				} else {
					product.price = (product.price * state.dollarRate).toFixed(2);
				}
			});

			state.productsCartList.forEach((product) => {
				if (state.selectedCurrency === 'Доллар') {
					product.price = (product.price / state.dollarRate).toFixed(2);
				} else {
					product.price = (product.price * state.dollarRate).toFixed(2);
				}
			});

			console.log(state.productsToBuyList);
			console.log(state.productsCartList);
		},
	},
	//функції, які виклиаємо з компонентів
	actions: {
		addNewProduct({ commit }, { productData, index }) {
			commit('addProduct', {
				product: {
					id: new Date().getTime(),
					name: productData.name,
					price: productData.price,
				},
				index: index,
			})
		},
		returnNewProduct({ commit }, { productData, index }) {
			commit('returnProduct', {
				product: {
					id: new Date().getTime(),
					name: productData.name,
					price: productData.price,
				},
				index: index,
			})
		},
		payTheNewCart({ commit }) {
			commit('payTheCart');
		},
		updateSelectedCurrency({ commit }, currency) {
			commit('setSelectedCurrency', currency);
		},
		updateProductPrices({ commit }) {
			console.log('updateProductPrices action is triggered');
			commit('changePrice');
		},
	},
	modules: {},
});
