import { useState } from "react";
import Form from "@/components/_molecules/Form/Form";
import "./Registration.scss";
import logo from "@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";

function Registration() {
  const [role, setRole] = useState<"trainer" | "owner" | null>(null);
  return (
    <main className="registration">

      <img className="registration__logo" src={logo} alt="Le logo de PawPlanner" />

      {!role ? (
        <div className="registration__roleSelection">
          <h1>Vous êtes ...</h1>
          <Button href="#" type="role-select" onClick={() => setRole("trainer")}>
            Je suis éducateur•trice canin
          </Button>
          <Button href="#" type="role-select" onClick={() => setRole("owner")}>
            Je suis un•e propriétaire de chien
          </Button>
        </div>
      ) : (
        <Form className="registration__form" title="Inscription">

          {role === "trainer" && (
            <>
              <TextInput
                type="SIRET"
                required
              />
              <TextInput
                type="companyName"
                required
              />
            </>
          )}

          <TextInput
            type="name"
            required
          />
          <TextInput
            type="firstname"
            required
          />
          <TextInput
            type="email"
            required
          />
          <TextInput
            type="password"
            required
          />
          <TextInput
            type="city"
            required
          />
          <TextInput
            type="postcode"
            required
          />

          <TextInput
            type="telephone"
          />

          <input type="hidden" name="role" value={role} />

          <Button type="form-deny" href="/">
            Retour
          </Button>

          <Button type="form-submit" href="#">
            S'inscrire
          </Button>

          <p className="registration__bottomLinks">
            Si vous avez oublié votre mot de passe <a href="/">cliquez ici</a>.
          </p>
          <p className="registration__bottomLinks">
            Si vous avez déjà un compte vous pouvez{" "}
            <a href="/login"> vous connecter ici</a>.
          </p>
        </Form>
      )}
    </main>
  );
}

export default Registration;
