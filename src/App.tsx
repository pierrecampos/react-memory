import { useEffect, useState } from "react";

import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { items } from "./data/item";
import restartIcon from "./svgs/restart.svg";
import { GridItemType } from "./types/GridItemType";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid, []);

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
      let pos = -1;
      for (let i = 0; i < items.length; i++) {       
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }    

    setGridItems(tmpGrid);

    setPlaying(true);
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="" width="200" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value="00:00"></InfoItem>
          <InfoItem label="Movimentos" value="0"></InfoItem>
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={restartIcon}
          onClick={resetAndCreateGrid}
        ></Button>
      </C.Info>

      <C.GridArea>
        <C.Grid></C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
