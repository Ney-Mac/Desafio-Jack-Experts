import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useState
} from 'react';

import { Link } from 'react-router-dom';

import { Input } from '../../components/Input/Input';
import { InputType } from '../../types/InputLoginType';
import { validateEmail, validatePassword } from '../../utils/validateLoginForm';

import { Button } from '../../components/Button/Button';

import './register.scss';

const RegisterPage = () => {
    const [email, setEmail] = useState<InputType>({ text: '', error: '' });
    const [password, setPassword] = useState<InputType>({ text: '', error: '' });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setState: Dispatch<SetStateAction<InputType>>
    ) => {
        setState({ text: event.currentTarget.value, error: '' });
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const emailError = validateEmail(email.text);
        const passwordError = validatePassword(password.text);

        if (emailError || passwordError) {
            setEmail((prev) => {
                return {
                    ...prev,
                    error: emailError
                }
            });

            setPassword((prev) => {
                return {
                    ...prev,
                    error: passwordError
                }
            });

            return;
        }

        alert('Register')
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Cadastrar</h1>

                <Input
                    label='Email'
                    inputProps={{
                        placeholder: 'Digite seu email',
                        // required: true,
                        name: 'email',
                        onChange: (event => handleChange(event, setEmail)),
                        value: email.text,
                    }}
                    error={email.error}
                />

                <Input
                    label='Senha'
                    inputProps={{
                        placeholder: 'Digite sua senha',
                        // required: true,
                        name: 'password',
                        onChange: (event => handleChange(event, setPassword)),
                        value: password.text,
                        type: 'password'
                    }}
                    error={password.error}
                />

                <Button
                    type='submit'
                >
                    Criar conta
                </Button>

                <p className="redirect-text">
                    Já tem uma conta? <Link to='/login'>Entrar</Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage;