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

  useEffect(() => {
    if (moveCount > 0 && gridItems.every((item) => item.permanentShown)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  useEffect(() => {
    if (shownCount === 2) {
      const opened = gridItems.filter((item) => item.shown);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          const tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].shown = false;
              tmpGrid[i].permanentShown = true;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          const tmpGrid = [...gridItems];
          setTimeout(() => {
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }

        setMoveCount(moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

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

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGridItems = [...gridItems];
      if (!tmpGridItems[index].permanentShown && !tmpGridItems[index].shown) {
        tmpGridItems[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGridItems);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="" width="200" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem
            label="Tempo"
            value={formatTimeElapsed(timeElapsed)}
          ></InfoItem>
          <InfoItem label="Movimentos" value={moveCount.toString()}></InfoItem>
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
