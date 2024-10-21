import { AES } from 'crypto-js';

// We want to encrpty and decrpty messages from here and inthe folder of keyExchange we handle how do we destribute the keys
// We will use AES 256 Stardared algorithm when it comes to encypting and decrypting the algorithm  

export const encrypt = (textContent, key) => {
    return AES.encrypt(textContent, key).toString();
} 


export const decrypt = (textContent, key) => {
    return AES.decrypt(textContent, key).toString();
}



export default {encrypt, decrypt,};