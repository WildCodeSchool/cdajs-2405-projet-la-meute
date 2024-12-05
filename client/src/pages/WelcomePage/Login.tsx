import '@/pages/WelcomePage/Login.scss';
import Logo from '@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg';

function Login() {
    return (
        <section className='login__section--all'>
            <img src={Logo} className='login__logo'></img>
        </section>
    );
}

export default Login;