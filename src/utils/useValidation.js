import { useCallback, useState } from 'react';
import { isEmail } from 'validator/';


function useValidation (values) {
	const [ formValues, setFormValues ] = useState(values); // стейт значений
	const handleChange = (event) => {
		const { target: input } = event;
		setFormValues({
			...formValues,
			[input.name]: {
				value: input.value,
				validationMessage: input.type === 'email' ? isEmail(input.value) ? '' : 'Не Email' : input.validationMessage,
				isValidValue: input.type === 'email' ? isEmail(input.value) : input.checkValidity(),
				isDirty: true,
				isEmpty: input.value.length === 0,
				isValid: function () {
					return (this.isValidValue && this.isDirty);
				}
			},
		});
	}

	const resetForm = useCallback((newValues = values) => setFormValues(newValues), [setFormValues]);

	return { formValues, handleChange, setFormValues, resetForm };
}

export default useValidation;
