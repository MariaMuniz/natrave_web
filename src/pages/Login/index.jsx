import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'
import { Icon, Input } from '~/assets/components'




const validationSchema = yup.object().shape({
  email: yup.string().required('Preencha o email'),
  password: yup.string().required('Preencha a senha')

})

export const Login = () => {
  const [auth, setAuth] = useLocalStorage('auth', {})

  const formik = useFormik({
    onSubmit: async (values) => {

      const res = await axios({
        method: 'get',
        baseURL: import.meta.env.VITE_API_URL,
        url: '/login',
        auth: {
          username: values.email,
          password: values.password
        }
      })

      setAuth(res.data)

    },
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema

  })

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" repalce={true} />

  }
  console.log(formik.errors)



  return (
    <div>
      <header className=" flex justify-center p-4 border-b border-red-300">
        <div className="container max-w-xl">
          <img src="/imgs/logo-fundo-branco.svg" className="w-32 md:w-40" />

        </div>
      </header>

      <main className=" container max-w-xl p-4">
        <div className="p-4 flex space-x-4 items-center">
          <a href="/">
            <Icon name="back" className="h-6" />
          </a>
          <h2 className="text-xl font-bold">Entre na sua conta</h2>
        </div>

        <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>

          <Input
            type="text"
            name="email"
            label="Digite seu email"
            error={formik.touched.email && formik.errors.email}
            placeholder="Digite seu email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

          <Input
            name="password"
            type="password"
            label="Sua senha"
            error={formik.touched.password && formik.errors.password}
            placeholder="Digite sua senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button type='submit' className=" block w-full text-white text-center bg-red-500 text-xl px-8 py-4  rounded-xl disabled:opacity-50"
            disabled={!formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? 'Caregando...' : 'Entrar'}</button>


        </form>
      </main>

    </div>
  )
}