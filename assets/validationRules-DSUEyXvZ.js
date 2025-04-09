const e={EMAIL:{pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"Format d'email invalide."},PASSWORD:{pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,message:"Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."},PHONE:{pattern:/^\+?[0-9]{1,4}?[0-9]{6,14}$/,message:"Le format du numéro de téléphone est invalide."},POSTAL_CODE:{pattern:/^\d{5}$/,message:"Le code postal est invalide."},SIRET:{pattern:/^\d{14}$/,message:"Le numéro SIRET doit contenir exactement 14 chiffres."},TERMS:{pattern:/^true$/,message:" Vous devez accepter les Conditions Générales d'Utilisation (CGU) pour vous inscrire."}};export{e as v};
