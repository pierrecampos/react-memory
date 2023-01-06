import { useEffect, useState } from "react";

import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import { Button } from "./components/Button";
import { GridItem } from "./components/GridItem";
import { InfoItem } from "./components/InfoItem";
import { items } from "./data/item";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";
import restartIcon from "./svgs/restart.svg";
import { GridItemType } from "./types/GridItemType";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid, []);

  useEffect(() => {
    let timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  const resetAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++)
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });

    // Preenchimento do Grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    setGridItems(tmpGrid);

    setPlaying(true);
  };

  const handleItemClick = (index: number) => {};

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="" width="200" />
        </C.LogoLink>

        <C.InfoArea>          
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}></InfoItem>
          <InfoItem label="Movimentos" value="0"></InfoItem>
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={restartIcon}
          onClick={resetAndCreateGrid}
        ></Button>
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            ></GridItem>
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
