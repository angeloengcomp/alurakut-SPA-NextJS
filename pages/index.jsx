import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import React from 'react'

import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'




function ProfileSidebar({ gitHubUser } = props) {
  return (
    <Box as="aside">
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

function ProfileRealationsBox({ items, title } = props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>
      <ul>
        {/* {comunidades.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )

}


export default function Home() {
  const gitHubUser = "angeloengcomp";
  const [comunidades, setComunidades] = React.useState([
    // ass comunidads sao chamadas pelo graphQL no DATO
  ]);
  const pessoasFavoritas = [
    'peas',
    'rafaballerini',
    'omariosouto',
    'juunegreiros',
    'nicolyyy',
    'ArthurMaciel95'
  ]


  const [seguidores, setSeguidores] = React.useState([])
  React.useEffect(function () {
    fetch('https://api.github.com/users/angeloengcomp/followers').then(respostaServidor => {
      return respostaServidor.json()
    }).then(respostaCompleta => {
      setSeguidores(respostaCompleta)
    })

    // API GraphQL DATOCMS
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '54bd801002dd2d6897d1eb60627f35',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query": `query{
          allCommunities{
            title
            id
            imageUrl
            creatorslug
      }
        }`})
    })
    .then(aws => aws.json())
    .then(awsFull => {
      const comunidadesVindasDoDato = awsFull.data.allCommunities

      setComunidades(comunidadesVindasDoDato)
      console.log(awsFull)
    })

  }, [])

  console.log(`seguidores ${seguidores.id}`)

  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
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
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image')
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
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  placeholder="Colque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>

            </form>

          </Box>

        </div>

        <div className="profileRelationsArea" styled={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRealationsBox
            title='seguidores'
            items={seguidores}
          />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.id}`} key={itemAtual.title}>
                      <img src={itemAtual.imageUrl} />
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
