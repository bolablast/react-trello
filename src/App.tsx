import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const Input = styled.input`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  border: none;
  outline: 0;
  &:focus {
    border: 2px solid #c0fdfb;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface IForm {
  board: string;
}

function App() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const handleValid = ({ board }: IForm) => {
    setToDos((oldToDos) => {
      console.log({
        ...oldToDos,
        [board]: [],
      });
      return {
        ...oldToDos,
        [board]: [],
      };
    });
    setValue("board", "");
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register("board", { required: true })}
          type="text"
          placeholder="Add board"
        />
      </Form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
