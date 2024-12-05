import Form from "@/components/_molecules/Form/Form";
import "./Registration.scss";
import logo from "@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";

function Registration() {
    return (
      <main className="registration">
			<img className="registration_logo" src={logo} alt="Le logo de PawPlanner" />
        
        <Form className="regristration_form" title="Inscription">
        <TextInput
            type="name"
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
        
          <Button type="form-deny" href="#">
            Retour
          </Button>

          <Button type="form-submit" href="#">
            S'inscrire
          </Button>

        </Form>
      </main>
    );
  };
  
  export default Registration;
