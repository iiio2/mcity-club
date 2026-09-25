import { easePolyOut } from 'd3-ease'
import { Animate } from 'react-move'
import Otamendi from '../../../resources/images/players/Otamendi.png'
import DeBruyne from '../../../resources/images/players/player_to_upload/MIDF/kevin_de_bruyne.png'
import Sterling from '../../../resources/images/players/Raheem_Sterling.png'
import Kompany from '../../../resources/images/players/Vincent_Kompany.png'
import PlayerCard from '../../../utils/playCard'

const cards = [
  {
    bottom: 90,
    left: 300,
    player: Kompany,
    number: 4,
    name: 'Vincent',
    lastname: 'Kompany',
  },
  {
    bottom: 60,
    left: 200,
    player: Sterling,
    number: 7,
    name: 'Raheem',
    lastname: 'Sterling',
  },
  {
    bottom: 30,
    left: 100,
    player: Otamendi,
    number: 30,
    name: 'Nicolas',
    lastname: 'Otamendi',
  },
  {
    bottom: 0,
    left: 0,
    player: DeBruyne,
    number: 17,
    name: 'Kevin',
    lastname: 'De Bruyne',
  },
]

function HomeCards({ show }: { show: boolean }) {
  const showAnimateCards = () =>
    cards.map(card => (
      <Animate
        key={card.lastname}
        show={show}
        start={{
          left: 0,
          bottom: 0,
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { delay: 500, duration: 500, ease: easePolyOut },
        }}
      >
        {({ left, bottom }) => (
          <div
            style={{
              position: 'absolute',
              left,
              bottom,
            }}
          >
            <PlayerCard
              number={card.number}
              name={card.name}
              lastname={card.lastname}
              bck={card.player}
            />
          </div>
        )}
      </Animate>
    ))

  return <div>{showAnimateCards()}</div>
}

export default HomeCards
