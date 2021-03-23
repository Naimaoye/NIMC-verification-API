export const checkNetwork = (phoneNumber) =>{
	const phoneToArr = phoneNumber.split('');
    const prefixArr = phoneToArr.splice(0, 4);
	const prefix = prefixArr.join('');

    const prefixAndNetwork = {
	    "mtn": ["0703","0706","0803","0806","0810","0813","0814","0816","0903","0906"],
    	"glo": ["0705","0805","0807","0811","0815","0905"],
    	"airtel": ["0701","0708","0802","0808","0812","0902","0907","0901"],
		"9mobile": ["0809","0817","0818","0908","0909"],
}

for(let network in prefixAndNetwork){
	if(prefixAndNetwork[network].includes(prefix)){
		console.log("network", network);
		return network;
	} else {
		return 'mtn';
	}
}

} 
