import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'


export function Home() {
  const [auth] = useLocalStorage('auth', {})


   if (auth?.user?.id) {
    return <Navigate to="/dashboard" repalce={true} />

}



  return (
    <div className="h-screen bg-red-700 p-4 text-white flex flex-col items-center">

      <header className="container flex justify-center  max-w-5xl p-4">
        <img src="/imgs/logo-fundo-vermelho.svg" className="w-40 " />
      </header>

      <div className="container max-w-3xl p-4 flex-1 flex flex-col items-center md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="md:flex-1 flex justify-center">
          <img src="/imgs/photo.png" className="w-full max-w-md" />
        </div>

        <div className="md:flex-1 flex flex-col space-y-6">
          <h1 className="text-2xl md: textt-3xl text-center font-bold">Dê seu palpite na Copa do Mundo do Catar 2022!</h1>

          <a href="/signup" className="text-red-700 text-center bg-white text-xl px-8 py-4  rounded-xl">
            Criar minha conta
          </a>

          <a href="/login" className="text-white border border-white text-center text-xl px-8 py-4  rounded-xl">
            Fazer login
          </a>
        </div>
      </div>
    </div>

  )
}


