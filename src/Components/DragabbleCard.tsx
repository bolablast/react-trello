import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "2px 0px 5px rgba(0,0,0,0.5)" : "none"};
`;

const Btn = styled.button`
  cursor: pointer;
  padding: 0;
  border: none;
  background: none;
`;

interface IDragabbleCardProps {
  droppableId: string;
  id: number;
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({
  toDoId,
  index,
  toDoText,
  id,
  droppableId,
}: IDragabbleCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    const id = Number(event.currentTarget.parentElement?.id);
    setToDos((oldToDos) => {
      return {
        ...oldToDos,
        [droppableId]: oldToDos[droppableId].filter((toDo) => toDo.id !== id),
      };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          id={id + ""}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <span>{toDoText}</span>
          <Btn onClick={onClick}>❌</Btn>
        </Card>
      )}
    </Draggable>
  );
}
//이 컴포넌트의 prop이 변경되지 않았다면 리렌더링 하지 마라
export default React.memo(DragabbleCard);
