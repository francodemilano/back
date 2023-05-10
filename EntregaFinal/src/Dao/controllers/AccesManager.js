import fs  from 'fs';
import __dirname from '../../utils.js';

export default class AccesManager{
    createRecord = async(metod)=>{
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const message = `Date: ${date} - Time: ${time} - Metod: ${metod}\n`;
        await fs.promises.appendFile('./src/Dao/files/log.txt', message, (err) => {return err;});
    }
}