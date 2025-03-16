import { addFormData } from '../../store/formSlice';
import './FormUncontrolled.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FC, useRef, useState } from 'react';
import { countries } from '../../consts/countries.const.ts';

const FormUncontrolled: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLInputElement>('Male');
  const terms = useRef<HTMLInputElement>(null);
  const picture = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLSelectElement>(null);

  const validateForm = (formData: FormData): string[] => {
    const errors: string[] = [];

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors.push(`The field "${key}" is required`);
      }
    });

    if (isNaN(formData.age)) {
      errors.push('Age must be a number');
    }

    const age = Number(formData.age);

    if (age < 0 || age > 100) {
      errors.push('Age must be between 0 and 100');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Email is not valid');
    }

    if (formData.password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (formData.password.includes(' ')) {
      errors.push('Password must not contain whitespace');
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push('Passwords do not match');
    }

    if (!countries.includes(formData.country)) {
      errors.push('Country is not valid');
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //trim data
    const formData: FormData = {
      name: name.current.value,
      age: age.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
      gender: gender.current.value,
      terms: terms.current.checked,
      country: country.current.value,
      picture: picture.current.files[0],
    };
    const errors = validateForm(formData);

    setErrors(errors);

    if (!errors?.length) {
      dispatch(addFormData(formData));
      navigate('/');
    }
  };

  return (
    <>
      <h2 className={'page-title'}>{'Uncontrolled form'}</h2>
      <form className={'form'} onSubmit={handleSubmit}>
        <div className={'form-field'}>
          <label className={'form-label'}>Name</label>
          <input type="text" ref={name} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'}>Age</label>
          <input type="text" ref={age} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'}>Email</label>
          <input type="text" ref={email} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'}>Password</label>
          <input type="text" ref={password} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'}>Confirm Password</label>
          <input type="text" ref={confirmPassword} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'}>Gender</label>
          <select ref={gender}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className={'form-field'}>
          <input type="checkbox" ref={terms} /> Accept Terms and Conditions
        </div>
        <div className={'form-field'}>
          <label className={'form-label'}>Upload Picture</label>
          <input type="file" ref={picture}></input>
        </div>
        <div className={'form-field'}>
          <label className={'form-label'}>Select Country</label>
          <input type="text" ref={country} list="countries" />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>
        {errors.length > 0 && (
          <ul className={'form-errors'}>
            <p>Please fix the following errors:</p>
            {errors.map((error) => (
              <li key={error} className={'form-error'}>
                {error}
              </li>
            ))}
          </ul>
        )}
        <button type="submit" className={'form-submit'}>
          {' '}
          Submit
        </button>
      </form>
    </>
  );
};

export default FormUncontrolled;
