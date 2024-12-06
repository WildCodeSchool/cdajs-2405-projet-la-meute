import Form from "@/components/_molecules/Form/Form";
import Header from "@/layouts/WelcomePage/Header";
import "./Login.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";

function ResetPassword() {
    return (
        <>
            <Header />
            <main className="login">
                <Form className="login__form" title="Mot de passe oublié ?">
                    <p className="introductiveText">
                        Saisissez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe.
                    </p>
                    <TextInput type="email" />
                    <Button type="submit" href="/reset-link">
                        Envoyer à cette adresse email
                    </Button>
                </Form>
            </main>
        </>
    );
}

export default ResetPassword;
