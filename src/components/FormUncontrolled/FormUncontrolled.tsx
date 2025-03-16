import { addFormData } from '../../store/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FC, useRef, useState } from 'react';
import { FormData } from '../../store/form.model.ts';
import { readFileAsBase64 } from '../../helper/image-reader.ts';
import { RootState } from '../../store/store.ts';

const FormUncontrolled: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const allCountries: string[] = useSelector(
    (state: RootState) => state.form.countries
  );

  const name = useRef<HTMLInputElement>(undefined);
  const age = useRef<HTMLInputElement>(undefined);
  const email = useRef<HTMLInputElement>(undefined);
  const password = useRef<HTMLInputElement>(undefined);
  const confirmPassword = useRef<HTMLInputElement>(undefined);
  const gender = useRef<HTMLInputElement>('Male');
  const terms = useRef<HTMLInputElement>(undefined);
  const picture = useRef<HTMLInputElement>(undefined);
  const country = useRef<HTMLSelectElement>(undefined);

  const validateForm = (formData: FormData, fileType: string): string[] => {
    const errors: string[] = [];

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors.push(`The field "${key}" is required`);
      }
    });

    if (formData.name?.charAt(0) !== formData.name?.charAt(0).toUpperCase()) {
      errors.push('Name must start with a capital letter');
    }

    if (formData.age && isNaN(formData.age)) {
      errors.push('Age must be a number');
    }

    const age = formData.age && Number(formData.age);

    if (age < 0 || age > 100) {
      errors.push('Age must be between 0 and 100');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Email is not valid');
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      errors.push(
        'Password must be at least 8 characters long and include 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
      );
    }

    if (formData.password?.includes(' ')) {
      errors.push('Password must not contain whitespace');
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push('Passwords do not match');
    }

    if (!allCountries.includes(formData.country)) {
      errors.push('Country must be one of the predefined options');
    }

    if (formData.picture) {
      const file = formData.picture;
      if (file.size > 1024 * 1024) {
        errors.push('Picture size must be less than 1MB');
      }

      if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
        errors.push('Picture must be a PNG or JPEG');
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pictureFile = picture.current?.files?.[0];
    let pictureBase64 = '';

    if (pictureFile) {
      pictureBase64 = await readFileAsBase64(pictureFile);
    }

    const formData: FormData = {
      name: name.current.value,
      age: age.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
      gender: gender.current.value,
      terms: terms.current.checked,
      country: country.current.value,
      picture: pictureBase64,
    };
    const errors = validateForm(formData, pictureFile.type);

    setErrors(errors);

    if (!errors?.length) {
      dispatch(addFormData(formData));
      navigate('/');
    }
  };

  return (
    <>
      <h2 className={'page-title'}>Uncontrolled form</h2>
      <form className={'form'} onSubmit={handleSubmit}>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="name">
            Name
          </label>
          <input type="text" id="name" ref={name} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="age">
            Age
          </label>
          <input type="text" id="age" ref={age} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="email">
            Email
          </label>
          <input type="text" id="email" ref={email} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="password">
            Password
          </label>
          <input type="password" id="password" ref={password} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input type="password" id="confirmPassword" ref={confirmPassword} />
        </div>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="gender">
            Select Gender
          </label>
          <select id="gender" ref={gender}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className={'form-field'}>
          <input type="checkbox" id="terms" ref={terms} />
          <label className={'form-label'} htmlFor="terms">
            Accept Terms and Conditions
          </label>
        </div>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="picture">
            Upload Picture
          </label>
          <input type="file" id="picture" ref={picture}></input>
        </div>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="country">
            Select Country
          </label>
          <input type="text" id="country" ref={country} list="countries" />
          <datalist id="countries">
            {allCountries.map((country) => (
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
          Submit
        </button>
      </form>
    </>
  );
};

export default FormUncontrolled;
