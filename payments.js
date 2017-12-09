var axios = require('axios')

module.exports ={ makePayment:function(account, amount) {
    axios.post('http://52.18.174.96:8880/fundsTransfer', {
        creditAccountNo: account,
        creditAmount: amount, 
        company: "GB0010001",
        passWord: "123456",
        userName: "HACKATHON1",
        transactionType:"AC",
        debitAccountNo: "77186",
        creditCurrency: "USD"
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}}