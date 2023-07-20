import mongoose from "mongoose";
import generarId from '../helpers/generarId.js';
import bcrypt from 'bcrypt';

const veterinarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token:{
        type: String,
        default: generarId(),    
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

veterinarioSchema.pre('save', async function(next){
    //Si un password ya esta hasheado, no lo vuelve a hashear.
    if(!this.isModified('password')){
        next();
    }
    //Hashea el password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


veterinarioSchema.methods.comprobarPassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}

const Veterinario = mongoose.model("Veterinarios", veterinarioSchema);

export default Veterinario;