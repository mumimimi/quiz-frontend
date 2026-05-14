import { JSX } from 'react'
import { Link } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useRegisterPage } from './use-register-page'
import type { RegisterFormT } from './schema'

const RegisterPage = (): JSX.Element => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useRegisterPage()

  const field = (
    name: keyof RegisterFormT,
    label: string,
    type = 'text',
    placeholder = '',
  ) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[#888]">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555]"
      />
      {errors[name] && (
        <span className="text-xs text-red-400">{errors[name]?.message}</span>
      )}
    </div>
  )

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0f0f0f]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm bg-[#181818] p-8 rounded-2xl border border-[#1d1d1d]"
      >
        <h1 className="text-white text-xl font-semibold mb-2">Create account</h1>

        <div className="grid grid-cols-2 gap-3">
          {field('firstName', 'First name', 'text', 'John')}
          {field('lastName', 'Last name', 'text', 'Doe')}
        </div>

        {field('email', 'Email', 'email', 'you@example.com')}
        {field('password', 'Password', 'password', '••••••••')}
        {field('confirmPassword', 'Confirm password', 'password', '••••••••')}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-white text-black text-sm font-medium py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? 'Creating account…' : 'Register'}
        </button>

        <p className="text-center text-xs text-[#666]">
          Already have an account?{' '}
          <Link to={RoutesEnum.AUTH_LOGIN} className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
