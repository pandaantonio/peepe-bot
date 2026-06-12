export default class Decode {
    toBase64(text: string){
        try {
            return Buffer.from(text, 'base64').toString('utf-8');
        } catch(e){
            return text;
        }
    }

    toBinary(text: string){
        try {
            return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        } catch(e){
            return text;
        }
    }
};