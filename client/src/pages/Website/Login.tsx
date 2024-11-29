import '@/pages/Website/Login.scss';
import Logo from '@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg';

function Login() {
    return (
        <>
            <section className='login__section--all'>
                <div className='login__div--all'>
                    <img src={Logo} className='website__header--logo'></img>
                </div>
            </section>
        </>
    );
}

export default Login;