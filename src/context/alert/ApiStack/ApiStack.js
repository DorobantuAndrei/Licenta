import axios from "axios";

const ApiStack = {
    sendOtp: async (phoneNumber) => {
        return new Promise((resolver,reject)=>{
                axios.post('https://www.getapistack.com/api/v1/otp/send' , 
            {
                phoneNumber: phoneNumber,
                messageFormat: ' - Codul dumneavoastra de verificare'
            },
            {
                headers:{
                    'x-as-apikey':'a61ef09b-fe42-4a12-ae57-b00bb1f087d9',
                    'Content-Type':'application/json'
                }
            }
            ).then((resp)=>resp.data)
            .then((resp)=>{
                resolver(resp.data.requestId);
            })
            .catch((err)=>{
                reject(err);
            });      
        });
    },

    verifyOtp: async (requestId , otp)=>{
        return new Promise((resolver,reject)=>{
            axios.post('https://www.getapistack.com/api/v1/otp/verify',
            {
                requestId: requestId,
                otp:otp
            },
            {
                headers:{
                    'x-as-apikey':'a61ef09b-fe42-4a12-ae57-b00bb1f087d9',
                    'Content-Type':'application/json'
                }
            })
            .then((resp)=>resp.data)
            .then((resp)=>{
                resolver(resp.data.isOtpValid)
            })
            .catch((err)=>{
                reject(err);
            });
        });
    }
};

export default ApiStack;