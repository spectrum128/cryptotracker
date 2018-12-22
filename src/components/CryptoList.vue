<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

@media screen  and (max-width: 423px){
    .crypto-header{
    margin-bottom: 10px; 
}    
}

@media screen  and (max-width: 336px){
    .crypto-header{
    margin-bottom: 0;
}    
}


</style>



<template>

<div>
    <section class="section">

<div class="container">
<div class="pull-left">
                <h2 class="title crypto-header">{{ title }}</h2>
            </div>
            <div class="pull-right">
                <form action="">
                <div class="field">
                    <div class="control">
                        <div class="select">
                <select name="selConvert" id="selConvert" @change="convert">
                    <option value="">USD</option>
                    <option v-for="cur in currencies" :key="cur" :value="cur">{{cur}}</option>
                </select>
                </div>
                </div>
                </div>
                </form>
            </div>
            </div>
    </section>
    <section class="section">
        <div class="container">
            

        


        <div class="box" v-for="tick in orderedList" :key="tick.name">
            <article class="media">
                <div class="media-left">
                <figure class="image is-64x64">
                    <img v-if="getImage(tick.symbol)" v-bind:src="getImage(tick.symbol)" v-bind:alt="tick.name">
                    <span v-if="!getImage(tick.symbol)" class="has-text-info">{{tick.symbol}}</span>
                </figure>
                </div>
                <div class="media-content">
                <div class="content">
                    <div class="level">
                        <div class="level-left">
                            <p>
                                <strong>{{tick.name}}</strong> <small>{{tick.symbol}}</small> 
                            
                            </p>
                        </div>
                        <div class="level-right">
                            <transition name="fade">
                                <span v-if="selectedCur == ''" class="is-size-4 has-text-info has-text-weight-bold" :key="pulse" >
                                    <span v-if="tick.price_usd">$</span> {{format(tick.price_usd)}}
                                </span>
                                <span v-if="selectedCur == 'GBP'" class="is-size-4 has-text-info has-text-weight-bold" :key="pulse" >
                                    <span v-if="tick.price_gbp">£</span> {{format(tick.price_gbp)}}
                                </span>
                                <span v-if="selectedCur == 'EUR'" class="is-size-4 has-text-info has-text-weight-bold" :key="pulse" >
                                    <span v-if="tick.price_eur">€</span> {{format(tick.price_eur)}}
                                </span>
                                
                            </transition>
                        </div>
                    </div>
                    
                </div>
                <nav class="level-left">
                    <div class="">
                        <div class="">
                            <span v-bind:class="{ 'has-text-success' : tick.percent_change_1h > 0, 'has-text-danger' : tick.percent_change_1h < 0   }">1hr: {{tick.percent_change_1h}} %</span>
                        </div>
                        <div class="">
                            <span v-bind:class="{ 'has-text-success' : tick.percent_change_24h > 0, 'has-text-danger' : tick.percent_change_24h < 0   }">24hr: {{tick.percent_change_24h}} %</span>
                        </div>
                        <div class="">
                            <span v-bind:class="{ 'has-text-success' : tick.percent_change_7d > 0, 'has-text-danger' : tick.percent_change_7d < 0   }">7d: {{tick.percent_change_7d}} %</span>
                        </div>
                    </div>
                </nav>
                </div>
            </article>
            </div>


        </div>
   </section>
</div>
</template>


<script>

import api from '@/api.js'
import  images from '@/components/images.js'
import _ from 'lodash'

export default {

    data: function(){

        return {

            title: 'Latest crypto prices',
            tickerList: [],
            pulse: 0,
            currencies: ['GBP', 'EUR'],
            selectedCur: ''
        }
    },

    methods: {

        convert(cur){
            //console.log('cur:', cur.target.value)
            this.selectedCur = cur.target.value;
            this.getTicker();
        },

        format(num){

            if(Number(num)){
                return Number(num).toFixed(2);
            
            }

            return "";
        },

        getTicker() {

            this.tickerList.forEach(x => {

                x.price_usd = ""

            });

            api.getTicker(this.selectedCur).then(resp => {

                this.pulse++;
                if(this.pulse > 999999){
                    this.pulse = 0;
                }
                this.tickerList = resp.data;
                //console.log(this.tickerList)
            });
    
        },

        getImage(tickerName){

            return images[tickerName];
        }
    },

    computed: {

        orderedList(){
            return this.tickerList;
        }
    },


    created(){

        this.getTicker();

        //setInterval(this.getTicker, 10000)

    }

}
</script>
