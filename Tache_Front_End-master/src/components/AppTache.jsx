import AppRoute from "../routes/route";
import MyAuthProvider from "./contexts/auth/AuthContext";
import MyCreateUserProvider from "./contexts/users/UserCreateContext";
import MyUserTaskProvider from "./contexts/userTasks/UserTaskContext";

export default function AppTache() {
  return (
    <div>
      <MyAuthProvider>
        <MyUserTaskProvider>
          <MyCreateUserProvider>
            <AppRoute></AppRoute>
          </MyCreateUserProvider>
        </MyUserTaskProvider>
      </MyAuthProvider>
    </div>
  );
}
