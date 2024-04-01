
import "./CInput.css"

// eslint-disable-next-line react/prop-types
export const CInput = ({ className, type, placeholder, name, disabled, value, onChangeFunction, onBlurFunction }) => {

    return (
        <input
            className={className}           //Design
            type={type}                     //value type
            placeholder={placeholder}
            name={name}                     //Input name in order to identify each one and allow events to happen separately
            disabled={disabled}             // only for non writeable inputs
            value={value}                   //Info typed in input
            onChange={onChangeFunction}     //Allow listen for changes 
            onBlur={onBlurFunction}         //Check values when field is left by user
        />
    )
}

//props contained in the inputs for register, login, profile and CreateAppointment.