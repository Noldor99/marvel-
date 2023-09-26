import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTypedDispatch } from "../../hook/useTypedDispatch";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/UI/customButton/CustomButton";
import CustomInput from "../../components/UI/customInput/CustomInput";
import css from './Register.module.sass'
import { validationSchemaRegister } from '../../schema/schema'
import { yupResolver } from '@hookform/resolvers/yup';
import { IRegister } from "../../model/userModel";
import { useRegisterMutation } from "../../store/api/authApi";

interface FormData extends IRegister {
  confirmPassword: string;
}

const Register = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<any>({
    resolver: yupResolver(validationSchemaRegister),
    mode: "onChange",
  });

  const { register, handleSubmit, formState: { errors, isValid } } = methods


  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useTypedDispatch()
  const [registerUser] = useRegisterMutation();

  const { userInfo } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await registerUser({ email: data.email, password: data.password }).unwrap();
        setUser(res);
        // router.push(redirect);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className={css.container}>
      <div className={`paper__rounded ${css.body}`}>
        <h4 className={css.title}>
          Register
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.input__block}>
            <CustomInput
              name="email"
              type="text"
              label="Email Address"
              register={register}
              errors={errors}
            />
            <CustomInput
              name="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
            />
            <CustomInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              register={register}
              errors={errors}
            />
          </div>
          <div className={css.body__button}>
            <CustomButton
              orange
              type="submit"
              disabled={isLoading || !isValid && true}
            >
              {isLoading ? 'Loading...' : "Register"}
            </CustomButton>
          </div>
        </form>

        <div className="login-link">
          <a href="auth/login">Already have an account? Login</a>
        </div>
      </div>
    </div >
  );
};

export default Register;
