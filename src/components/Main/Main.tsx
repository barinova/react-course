import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import './Main.css';

const Main = () => {
  const form: FormData = useSelector((state: RootState) => state.form.userForm);

  return (
    <section>
      <h2 className={'page-title'}>{'Main'}</h2>
      {form ? (
        <div className={'form-list'}>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Name</strong>
            </label>
            <span>{form.name}</span>
          </div>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Age</strong>
            </label>
            <span>{form.age}</span>
          </div>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Email</strong>
            </label>
            <span>{form.email}</span>
          </div>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Password</strong>
            </label>
            <span>{form.password}</span>
          </div>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Confirm Password</strong>
            </label>
            <span>{form.confirmPassword}</span>
          </div>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Gender</strong>
            </label>
            <span>{form.gender}</span>
          </div>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Terms</strong>
            </label>
            <span>{form.terms ? 'Accepted' : 'Not Accepted'}</span>
          </div>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Country</strong>
            </label>
            <span>{form.country}</span>
          </div>
          <div className={'form-field'}>
            <label className={'form-label'}>
              <strong>Picture</strong>
            </label>
            {form.picture ? (
              <div className={'form-image'}>
                <img src={form.picture} alt="Uploaded picture" />
              </div>
            ) : (
              <span>No picture uploaded</span>
            )}
          </div>
        </div>
      ) : (
        <p>The form is empty</p>
      )}
    </section>
  );
};

export default Main;
