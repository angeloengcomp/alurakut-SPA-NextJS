import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'




function ProfileSidebar({ gitHubUser } = props) {
  return (
    <Box>
      <img className="imgProfile" src={`https://github.com/${gitHubUser}.png`} />
    </Box>
  )
}


export default function Home() {
  const gitHubUser = "angeloengcomp";
  const pessoasFavoritas = [
    'peas',
    'rafaballerini',
    'omariosouto',
    'juunegreiros'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>

        <div className="profileArea" styled={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitHubUser={gitHubUser} />
        </div>

        <div className="welcomeArea" styled={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
              </h1>

              <OrkutNostalgicIconSet/>
          </Box>
        </div>

        <div className="profileRelationsArea" styled={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
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
