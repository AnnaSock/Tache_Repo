import useUserTask from "../contexts/userTasks/useUserTask";
import UserTaskCard from "./UserTaskCard";

export default function UserTaskList() {
  const {tachesPage}=useUserTask()  
  return (
    <div className="flex pt-0 px-0 flex-col gap-1">
      {tachesPage ? (
        tachesPage.map((tache) => (
          <UserTaskCard key={tache.id} tache={tache} />
        ))
      ) : (
        <p>Aucune tâche trouvée</p>
      )}
    </div>
  )
}
