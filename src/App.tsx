import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function App() {
  const [correctColor, setCorrectColor] = useState(
    Math.floor(Math.random() * 16777215).toString(16)
  );

  const [wrongColors, setWrongColors] = useState(
    Math.floor(Math.random() * 16777215).toString(16)
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
    if (e.target.className.split(' ').includes('correct')) {
      setPoints(points + 1);
      setCirclesCount({ length: circlesCount.length + 1 });
      setWrongColors(Math.floor(Math.random() * 16777215).toString(16));
      setCorrectColor(Math.floor(Math.random() * 16777215).toString(16));
    }
  };

  console.log(wrongColors, correctColor, circlesClass);

  return (
    <div>
      <Title>Check the different color</Title>
      <PointsContainer>
        <span>Pontuação:</span>
        <PoinstDiv>{points}</PoinstDiv>
      </PointsContainer>
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
    </div>
  );
}

interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {
  colorOptions: { correctColor: string; wrongColors: string };
}

const PointsContainer = styled.div`
  color: #f4f3ee;
  width: 300px;
`;

const PoinstDiv = styled.div`
  border: 1px solid #bcb8b1;
  color: #f4f3ee;
  font-size: 30px;
  width: 50px;
  text-align: center;
`;

const Title = styled.h1`
  color: #f4f3ee;
`;

const Section = styled.section`
  background-color: #8a817c;
  border-radius: 10px;
  width: 500px;
  min-height: 500px;
  display: flex;
  flex-wrap: wrap;
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
