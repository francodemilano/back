import fs  from 'fs';
import __dirname from '../../utils.js';

export default class AccesManager{
    createRecord = async(metod)=>{
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const message = `Fecha: ${date} - Hora: ${time} - Metodo: ${metod}\n`;
        await fs.promises.appendFile('./src/Dao/files/log.txt', message, (err) => {return err;});
    }
}