import { createStore } from 'vuex'

const store = createStore({
    state(){
        return{
            drinks: [],
            sales: [],
            grouped: [],
            chartData: [],
            dates: [],
            totals: [],
            daysData: [],
            login: true
        } 
    },
    mutations: {
        addSale(state, payload){
          state.sales.unshift(payload)  
        },
        addDrink(state, payload){
            state.drinks.push(payload)
        },
        deleteDrink(state,payload){
            state.drinks.splice(payload, 1)
        }
       }

    
});

export default store;