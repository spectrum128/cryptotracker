
import axios from 'axios'

export default {


    getTicker(cur){

        var url = 'https://api.coinmarketcap.com/v1/ticker/';
        
        if(cur){
            url = url + '?convert=' + cur;
        }
        return axios.get(url);
    }


}