import Form from "@/components/_molecules/Form/Form";
import "./Login.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import Header from "@/layouts/WelcomePage/Header";

function NewPassword() {
    return (
        <>
            <Header />
            <main className="login">
                <Form className="login__form" title="Renseignez un nouveau mot de passe">
                    <p className="introductiveText">
                        Ajoutez un nouveau mot de passe puis valider votre nouveau mot de passe.
                    </p>
                    <TextInput type="password" />
                    <TextInput type="password" />
                    <Button type="submit" href="/login">
                        Valider mon nouveau mot de passe
                    </Button>
                </Form>
            </main>
        </>
    );
}

export default NewPassword;
