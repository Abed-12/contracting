import Joi from "joi";

const registrationValidation = (req, res, next) => {
    const dataSchema = Joi.object({
        companyName: Joi.string().required(),
        email: Joi.string().email().required(),
        companyID: Joi.string().length(9).required(),
        password: Joi.string().min(9).max(18).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/).required().messages(
            {
                'string.min': 'Password must be at least 9 characters long.',
                'string.max': 'Password cannot exceed 18 characters.',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'any.required': 'Password is required.',
            }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages(
            {'any.only': 'Passwords do not match'}),
        companyPhone: Joi.string().length(10).required()
    });
    const fileSchema = Joi.object({
        commercialRegister: Joi.binary().required().messages({'any.required': 'Commercial Register is required'})
    });
    const {dataError} = dataSchema.validate(JSON.parse(req.fields.body[0]));
    const {fileError} = fileSchema.validate(req.files);
    if (dataError || fileError) {
        return res.status(400)
            .json({message: "Bad request", dataError: dataError + fileError})
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        companyID: Joi.string().required(),
        password: Joi.string().required()
    });
    next();
}

const loginOtpValidation = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        otp: Joi.string().required()
    });
    schema.validate(req.body)
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
        .json({ message: "Bad request", error })
    }
    next();
}

const updateValidation = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().min(9).max(18).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/).allow('').messages(
            {'string.min': 'Password must be at least 9 characters long.',
            'string.max': 'Password cannot exceed 18 characters.',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'any.required': 'Password is required.',}),
        confirmPassword: Joi.string().valid(Joi.ref('password')).messages(
            {'any.only': 'Passwords do not match'}),
        companyPhone: Joi.string().length(10).allow(''),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
        .json({ message: "Bad request", error })
    }
    next();
}

export {registrationValidation, loginValidation, loginOtpValidation, updateValidation};