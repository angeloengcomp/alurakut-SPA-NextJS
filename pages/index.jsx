import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import React from 'react'

import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'




function ProfileSidebar({ gitHubUser } = props) {
  return (
    <Box  as="aside">
      <img className="imgProfile" src={`https://github.com/${gitHubUser}.png`} />
      <hr />
      <p>
        <a
          target="_blank"
          href={`https://github.com/${gitHubUser}`}
          className="boxLink"
        >
          @{gitHubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home() {
  const gitHubUser = "angeloengcomp";
  const [comunidades, setComunidades] = React.useState([{
    id: '123123345645',
    title: 'eu odeio acordar cedo',
    image: 'https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg'

  }]);
  const pessoasFavoritas = [
    'peas',
    'rafaballerini',
    'omariosouto',
    'juunegreiros',
    'nicolyyy',
    'ArthurMaciel95'
  ]

  return (
    <>
      <AlurakutMenu githubUser={gitHubUser}/>
      <MainGrid>

        <div className="profileArea" styled={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitHubUser={gitHubUser} />
        </div>

        <div className="welcomeArea" styled={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();

              // pega a entrada e retorna
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                titulo: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }


              const comunidadesAtualizadas = [...comunidades, comunidade]

              // comunidades recebem comunidades atualizadas
              setComunidades(comunidadesAtualizadas)


            }}>
              <div>
                <input
                  name="title"
                  aria-label="qual vai ser o nome da sua comunidade?"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <div>
                <input
                  name="title"
                  aria-label="Coloque uma URL para usarmos de capa"
                  placeholder="Colque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>

            </form>

          </Box>

        </div>

        <div className="profileRelationsArea" styled={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>

                )

              })}
            </ul>

          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>

                )

              })}
            </ul>

          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )


}
