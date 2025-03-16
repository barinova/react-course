import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { readFileAsBase64 } from '../../helper/image-reader';
import { addFormData } from '../../store/formSlice';
import './FormControlled.css';
import Button from '../Button/Button.tsx';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  country: string;
  picture: FileList;
}

const FormControlled: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCountries: string[] = useSelector(
    (state: RootState) => state.form.countries
  );

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z]/, 'First letter must be uppercase'),
    age: yup
      .number()
      .required('Age is required')
      .positive()
      .integer()
      .min(1, 'Age must be at least 1')
      .max(100, 'Age cannot exceed 100'),
    email: yup
      .string()
      .required('Email is required')
      .email('Email is not valid'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        'Must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, 1 special character'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.string().required('Gender is required'),
    terms: yup.bool().oneOf([true], 'You must accept the terms'),
    country: yup
      .string()
      .required('Country is required')
      .oneOf(allCountries, 'Country must be one of the predefined options'),
    picture: yup
      .mixed()
      .required('Picture is required')
      .test(
        'fileSize',
        'Picture size must be less than 1MB and not empty',
        (value) => !value || (value && value[0]?.size <= 1048576)
      )
      .test(
        'fileType',
        'Picture must be a PNG or JPEG',
        (value) =>
          !value ||
          (value && ['image/png', 'image/jpeg'].includes(value[0]?.type))
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    if (data.picture && data.picture[0]) {
      data.picture = await readFileAsBase64(data.picture[0]);
    }
    dispatch(addFormData(data));
    navigate('/');
  };

  return (
    <>
      <h2 className={'page-title'}>Controlled form</h2>
      <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="name">
            Name
          </label>
          <input type="text" id="name" {...register('name')} />
          <span className="error">{errors.name?.message}</span>
        </div>

        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="age">
            Age
          </label>
          <input type="number" id="age" {...register('age')} />
          <span className="error">{errors.age?.message}</span>
        </div>

        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="email">
            Email
          </label>
          <input type="email" id="email" {...register('email')} />
          <span className="error">{errors.email?.message}</span>
        </div>

        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="password">
            Password
          </label>
          <input type="password" id="password" {...register('password')} />
          <span className="error">{errors.password?.message}</span>
        </div>

        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          <span className="error">{errors.confirmPassword?.message}</span>
        </div>

        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="gender">
            Select Gender
          </label>
          <select id="gender" {...register('gender')}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <span className="error">{errors.gender?.message}</span>
        </div>

        <div className={'form-field'}>
          <input
            className={'form-checkbox'}
            type="checkbox"
            id="terms"
            {...register('terms')}
          />
          <label className={'form-label'} htmlFor="terms">
            Accept Terms and Conditions
          </label>
          <span className="error">{errors.terms?.message}</span>
        </div>

        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="picture">
            Upload Picture
          </label>
          <input type="file" id="picture" {...register('picture')} />
          <span className="error">{errors.picture?.message}</span>
        </div>

        <div className={'form-field'}>
          <label className={'form-label'} htmlFor="country">
            Select Country
          </label>
          <input
            type="text"
            id="country"
            {...register('country')}
            list="countries"
          />
          <datalist id="countries">
            {allCountries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <span className="error">{errors.country?.message}</span>
        </div>

        <div>
          <Button text={'Submit'} disabled={!isValid}></Button>
        </div>
      </form>
    </>
  );
};

export default FormControlled;
