import axios from 'axios'
import { useAsync, useLocalStorage, useAsyncFn } from 'react-use'
import { Navigate } from 'react-router-dom'
import { Icon, Card, DateSelect } from '~/assets/components'
import { format } from 'date-fns'
import React, { useState, useEffect } from 'react';


export const Dashboard = () => {
  const [currentDate, setDate] = useState(new Date(2022, 10, 20))
  const [auth] = useLocalStorage('auth', {})

  const [hunches, fetchHunches] = useAsyncFn(async () => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: `/${auth.user.username}`,
    })

    console.log(res.data)

    const hunches = res.data.hunches.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch
      return acc
    }, {})
    return hunches
  })


  const [games, fetchGames] = useAsyncFn(async (params) => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: '/games',
      params
    })

    return res.data
  })

  const isLoading = games.loading || hunches.loading
  const hasError = games.error || hunches.error
  console.log(games.error, hunches.error)
  const isDone = !isLoading && !hasError

  useEffect(() => {
    fetchHunches()
  }, [])

  useEffect(() => {
    fetchGames({ gameTime: currentDate })

  }, [currentDate])



  if (!auth?.user?.id) {
    return <Navigate to="/" repalce={true} />

  }

  return (
    <>
      <header className="bg-red-500 text-white">
        <div className="container max-w-3xl p-4 flex justify-between ">
          <img src="/imgs/logo-fundo-vermelho.svg" className="w-28 md:w-40" />
          <a href="/profile">
            <Icon name="profile" className="w-10" />
          </a>
        </div>
      </header>

      <main className="space-y-6">
        <section id="header" className=" bg-red-500 text-white p-4">
          <div className="container max-w-3xl space-y-2 p-4">
            <span>Olá {auth.user.name} !</span>
            <h3 className="text-2xl font-bold">Qual seu palpite?</h3>
          </div>
        </section>

        <section id="content" className="container max-w-3xl space-y-4 p-4 ">


          <DateSelect currentDate={currentDate} onChange={setDate} />

          <div className="space-y-4">
            {isLoading && 'Carregando jogos...'}
            {hasError && 'Ops! Algo deu errado.dasboard..'}
            {isDone && games.value?.map(game => (
              <Card
                key={game.id}
                gameId={game.id}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                gameTime={format(new Date(game.gameTime), 'H:mm')}
                homeTeamScore={hunches?.value?.[game.id]?.homeTeamScore || ''}
                awayTeamScore={hunches?.value?.[game.id]?.awayTeamScore || ''}
              />
            ))}
          </div>
        </section>
      </main>

    </>
  );
}