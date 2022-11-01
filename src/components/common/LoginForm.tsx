import React from 'react';
import { useFormik, FormikProvider, Form, useField } from 'formik';
import './styles.css';
import * as Yup from 'yup';

const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

type TextInputLiveFeedbackPropsType = {
    label: string,
    helpText: string,
    name: string,
    id: string,
    type: string
}

const TextInputLiveFeedback = ({ label, helpText, ...props }: TextInputLiveFeedbackPropsType) => {
    const [field, meta] = useField(props);

    // Show inline feedback if EITHER
    // - the input is focused AND value is longer than 2 characters
    // - or, the has been visited (touched === true)
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback =
        (!!didFocus && field.value.trim().length > 2) || meta.touched;

    return (
        <div
            className={`form-control ${
                showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
            }`}
        >
            <div className="flex items-center space-between">
                <label htmlFor={props.id}>{label}</label>{' '}
                {showFeedback ? (
                    <div
                        id={`${props.id}-feedback`}
                        aria-live="polite"
                        className="feedback text-sm"
                    >
                        {meta.error ? meta.error : '✓'}
                    </div>
                ) : null}
            </div>
            <input
                autoComplete={'off'}
                {...props}
                {...field}
                placeholder={label}
                aria-describedby={`${props.id}-feedback ${props.id}-help`}
                onFocus={handleFocus}
            />
            <div className="text-xs" id={`${props.id}-help`} tabIndex={-1}>
                {helpText}
            </div>
        </div>
    );
};



const FormEntity = (props: LoginFormPropsType) => {
    // Создает из props.inputsProps объект с ключами из id в props.inputsProps и пустой строкой в качестве значения, использвуется как initialValues
    let objToInit = Object.fromEntries(props.inputsProps.map((_, i) => [props.inputsProps[i].id, '']))
    // Создает из props.inputsProps объект с ключами из id в props.inputsProps и требования для валидации и ошибками в формате Yup для validationSchema
    let objToValidationSchema = Object.fromEntries(props.inputsProps.map((el, i) => [props.inputsProps[i].id,
        Yup.string()
        .min(8, 'Must be at least 8 characters')
        .max(20, 'Must be less  than 20 characters')
        .required(`${el.label} is required`)]))

    const formik = useFormik({
        initialValues: objToInit,
        onSubmit: async (values) => {
            props.onSubmitClick(values.login, values.password, values.rememberMe ? true : false)
        },
        validationSchema: Yup.object(objToValidationSchema),
    });

    return (
        <FormikProvider value={formik}>
            <Form>
                {props.inputsProps.map( el => {
                    return (
                        <TextInputLiveFeedback
                            key={el.id}
                            label={el.label}
                            id={el.id}
                            name={el.id}
                            helpText={el.helpText}
                            type={el.type}
                        />
                    )
                })}
                {props.rememberCheckbox &&
                    <div className={'flex checkboxForm '}>
                        <input
                            id="rememberData"
                            type="checkbox"
                            {...formik.getFieldProps('remember')}
                        />
                        <label htmlFor="remember" className="text-xs checkbox" >remember me</label>
                    </div>}
                <div>
                    <button type="submit">Login</button>
                    {/*<button type="reset">Reset</button>*/}
                </div>
            </Form>
        </FormikProvider>
    );
};

export type LoginFormPropsType = {
    inputsProps: inputPropsType[]
    rememberCheckbox: boolean
    onSubmitClick: (email: string, password: string, rememberMe: boolean) => void
}

export type inputPropsType = {
    label: string
    id: string
    helpText: string
    type: 'email' | 'text' | 'password' | 'number'
}

export const LoginForm = (props: LoginFormPropsType) => {
    return (
        <div className="loginForm">
            <div className="border">
                <FormEntity {...props}/>
            </div>
        </div>
    )
}
