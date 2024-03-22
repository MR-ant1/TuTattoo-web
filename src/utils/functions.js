export const validame = (type, value) => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    switch (type) {
        case "name":
        case "nombre":
        case "surname":
        case "firstName":
        case "lastName":
          if (value.length < 3) {
            return "Por favor, el nombre debe de tener mínimo tres caracteres.";
          }
    
          return "";
    
        case "email":
        case "e-mail":
        case "correo":
        case "mail":
    
          if (!emailRegex.test(value)) {
            return "Por favor, el formato del email debe de ser correcto.";
          }
    
          return "";
    
        case "password":
        case "contraseña":
          
          if (!passwordRegex.test(value)) {
            return "El password debe tener 8 caracteres, simbolo y mayúscula";
          }
    
          return "";
        default:
          console.log("No matches found")
      }

}