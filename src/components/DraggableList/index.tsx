import { Draggable } from 'react-beautiful-dnd'
import DraggableItem from '../DraggableItem'

interface DraggableListProps {
  list: TaskItemType[]
}

const DraggableList: React.FC<DraggableListProps> = ({ list }) => {
  return (
    <>
      {list.map((item, index) => {
        return <DraggableItem key={item.id} item={item} index={index} />
      })}
    </>
  )
}

export default DraggableList
