import { useForm } from 'react-hook-form';
import { registerUser } from './services/registerUser';

export function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: '',
      name: '',
      age: '',
      password: '',
      passwordCheck: '',
      acceptTerms: false,
    },
  });

  const onSubmit = (data) => {
    registerUser(data);
  };

  const password = watch('password');

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email
            <input
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'email is invalid',
                },
              })}
              type="email"
              placeholder="Email"
            />
          </label>
          <span className="error" role="alert">
            {errors.email?.message}
          </span>
        </div>
        <div>
          <label>Name
            <input
              {...register('name', { required: 'name is required' })}
              type="text"
              placeholder="Name"
            />
          </label>
          <span className="error" role="alert">
            {errors.name?.message}
          </span>
        </div>
        <div>
          <label>Age
            <input
              {...register('age', {
                required: 'age is required',
                validate: (value) =>
                  parseInt(value, 10) >= 18 || 'you must be above 18 to register',
              })}
              type="number"
              placeholder="Age"
            />
          </label>
          <span className="error" role="alert">
            {errors.age?.message}
          </span>
        </div>
        <div>
          <label>Password
            <input
              {...register('password', {
                required: 'password is required',
                minLength: {
                  value: 6,
                  message: 'password is too short',
                },
              })}
              type="password"
              placeholder="Password"
            />
          </label>
          <span className="error" role="alert">
            {errors.password?.message}
          </span>
        </div>
        <div>
          <label>Password check
            <input
              {...register('passwordCheck', {
                required: 'password check is required',
                validate: (value) =>
                  value === password || 'passwords do not match',
              })}
              type="password"
              placeholder="password check"
            />
          </label>
          <span className="error" role="alert">
            {errors.passwordCheck?.message}
          </span>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              {...register('acceptTerms', {
                required: 'please read and accept the terms and conditions',
              })}
            />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
          <span className="error" role="alert">
            {errors.acceptTerms?.message}
          </span>
        </div>
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Sign up
        </button>
      </form>
    </div>
  );
}
