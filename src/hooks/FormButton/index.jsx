import React from 'react';
import cls from "./Button.module.scss";


const FormButton = ({buttonText, isValid}) => {
	return (
		<button
			className={cls.formButton}
			type='submit'
			disabled={!isValid}
		>
			<span>{buttonText}</span>
		</button>
	);
};

export default FormButton;
