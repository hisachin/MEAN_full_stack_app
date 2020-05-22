import crypto from 'crypto';

const generateUserTokenAndPassword = async (userPassword) => {
    
    const { accountVeriToken } = await generateUserToken();

    const { hashedPassword,password,salt } = await passwordGenerator(userPassword);

    return {
        accountVeriToken,
        userPassword,
        hashedPassword,
        salt
    }
}

const passwordGenerator = async (userPassword) => {
    const salt = crypto.randomBytes(16).toString('hex'); 
    const hashedPassword = crypto.pbkdf2Sync(userPassword, salt,  1000, 64, `sha512`).toString(`hex`);

    return {
        hashedPassword,
        userPassword,
        salt
    }
}

const validatePassword = async(hashedPassword, salt, password) => {
    let hash = crypto.pbkdf2Sync(password,  salt, 1000, 64, `sha512`).toString(`hex`);
    return hashedPassword === hash;
}

const generateUserToken = async () => {
    const buf =  crypto.randomBytes(20);
    const accountVeriToken = buf.toString('hex');

    return { accountVeriToken };
}

module.exports = {
    generateUserTokenAndPassword,
    validatePassword,
    passwordGenerator,
    generateUserToken
}