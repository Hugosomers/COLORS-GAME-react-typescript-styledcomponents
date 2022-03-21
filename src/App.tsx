import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function App() {
  const [saveHex, setSaveHex] = useState<number>(16777215);

  const [correctColor, setCorrectColor] = useState(
    Math.floor(Math.random() * saveHex).toString(16)
  );

  const [wrongColors, setWrongColors] = useState(
    Math.floor(Math.random() * saveHex).toString(16)
  );

  const [circlesCount, setCirclesCount] = useState({ length: 3 });

  const [circlesClass, setCirclesClass] = useState<string[]>([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * circlesCount.length);
    const classes = Array.from({ length: circlesCount.length }, (i, index) => {
      if (index === randomIndex) return 'correct';
      return 'wrong';
    });

    setCirclesClass(classes);
  }, [circlesCount]);

  const [points, setPoints] = useState<number>(0);

  const circleClickHandle = (e: any) => {
    if (saveHex > 100000) {
      setSaveHex(saveHex - 300000);
    }
    if (e.target.className.split(' ').includes('correct')) {
      setPoints(points + 1);
      setCirclesCount({ length: circlesCount.length + 1 });
      setWrongColors(Math.floor(Math.random() * saveHex).toString(16));
      setCorrectColor(Math.floor(Math.random() * saveHex).toString(16));
    } else {
      alert('Game Over');
      setPoints(0);
      setCirclesCount({ length: 3 });
      setSaveHex(16777215);
    }
  };

  console.log(wrongColors, correctColor, circlesClass);

  return (
    <Main>
      <Title>Find the different color</Title>
      <PointsContainer>{points}</PointsContainer>
      <Section>
        {Array.from(circlesCount).map((i, index) => (
          <Circle
            key={index}
            onClick={circleClickHandle}
            colorOptions={{ correctColor, wrongColors }}
            className={circlesClass[index]}
          />
        ))}
      </Section>
    </Main>
  );
}

interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {
  colorOptions: { correctColor: string; wrongColors: string };
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PointsContainer = styled.div`
  color: #f4f3ee;
  width: 300px;
  text-align: center;
  margin: 10px;
  font-size: 25px;
`;

const Title = styled.h1`
  color: #f4f3ee;
`;

const Section = styled.section`
  background-color: #fffe;
  border-radius: 10px;
  width: 500px;
  min-height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Circle = styled.div<CircleProps>`
  width: 130px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 10px;

  background-color: ${(props) =>
    props.className === 'wrong'
      ? `#${props.colorOptions.wrongColors.toUpperCase()}`
      : `#${props.colorOptions.correctColor.toUpperCase()}`};
`;

export default App;
