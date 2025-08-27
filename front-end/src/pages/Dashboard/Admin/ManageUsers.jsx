/**
 * @file ManageUsers.jsx
 * @description
 * Admin panel page for **managing platform users**.  
 * Provides CRUD operations, user banning, and viewing purchased courses.  
 * Integrates forms, tables, and modals to give administrators full control over user accounts.
 *
 * @component ManageUsers
 * @returns {JSX.Element} The complete user management interface for administrators.
 *
 * @features
 * - **Create User**:
 *   - Uses `EditForm` with `BASE_CREATE_USER_INPUT_PATTERNS` to create new users.
 *   - Displays loading spinner (`Spinner`) while user data is being fetched initially.
 *
 * - **Users Table**:
 *   - Displays all registered users in a scrollable, paginated `Table`.  
 *   - Each row supports actions: **edit, ban/unban, remove, view purchased courses**.
 *   - Integrates with infinite scrolling (`loadMoreRef` + `isFetchingNextUser`).
 *
 * - **Action Handling**:
 *   - **viewCourses**: Fetches user’s purchased courses and shows them inside a `Modal`.
 *   - **edit**: Opens a `Modal` with pre-filled input patterns (`useEditInputPattern`) to update user details.
 *   - **ban**: Toggles the user’s ban status (`isBanned`) via `useBanUser`.
 *   - **remove**: Displays a confirmation `Alert` before permanently removing a user.
 *
 * - **User Courses Modal**:
 *   - If an admin selects *View Courses*, a modal shows all purchased courses with a dynamic `thead` and `tbody`.
 *   - Modal closes automatically when the user navigates away.
 *
 * - **Global State Controllers**:
 *   - `alertSetter`, `modalSetter`, and `resgisterToastSetter` bind the state management of alerts, modals, and toasts.
 *   - Toasts provide feedback for operations (success/error).
 *
 * - **Pending State Tracking**:
 *   - `pendingKeysRef` maintains a set of ongoing operations (`ban`, `remove`) to prevent duplicate actions.
 *   - `actionPending` tracks asynchronous loading states to visually disable buttons.
 *
 * - **Document Title**:
 *   - Sets the browser tab title to `"مدیریت کاربران"` when mounted.
 *
 * @hooks
 * - `useUsersList`: Fetches paginated list of all users.
 * - `useUserCourses`: Fetches a specific user’s purchased courses.
 * - `useCreateUser`: Creates a new user.
 * - `useEditUser`: Updates user details.
 * - `useBanUser`: Bans or unbans a user.
 * - `useRemoveUser`: Removes a user.
 * - `useTableDatas`: Maps users to table data.
 * - `useEditInputPattern`: Generates dynamic inputs for editing users.
 *
 * @optimizations
 * - **Lazy Loading**: Modal, Toast, Alert, and Spinner are dynamically imported to reduce initial bundle size.
 * - **Ref-based Action Tracking**: Prevents unnecessary re-renders when tracking pending states.
 * - **Conditional Rendering**: Shows a loading spinner until users are available for rendering.
 *
 * @usage
 * ```jsx
 * import ManageUsers from "./ManageUsers";
 *
 * <Route path="/dashboard/admin/users" element={<ManageUsers />} />
 * ```
 */


import { lazy, useEffect, useState, useRef } from "react";
const Modal = lazy(() => import("../../../components/sections/Modal"));
import { modalSetter, showModalHandler } from "../../../utils/ModalController";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import { resgisterToastSetter } from "../../../utils/ToastController";
const Alert = lazy(() => import("../../../components/sections/Alert"));
import { alertSetter, showAlertHandler } from "../../../utils/AlertController";
import BASE_CREATE_USER_INPUT_PATTERNS from "../../../constants/InputPatterns/Admin/Users/CreateUsers";
import useUsersList from "../../../hooks/Admin/Users/useUsersList";
import Table from "../../../components/sections/Table/Index";
import EditForm from "../../../components/sections/EditForm";
import useCreateUser from "../../../hooks/Admin/Users/useCreateUser";
import useTableDatas from "../../../hooks/Admin/Users/Table/useTableDatas";
import useUserCourses from "../../../hooks/Admin/Users/useUserCourses";
import useEditUser from "../../../hooks/Admin/Users/useEditUser";
import useEditInputPattern from "../../../hooks/Admin/Users/Table/useEditInputPattern";
import useBanUser from "../../../hooks/Admin/Users/useBanUser";
import useRemoveUser from "../../../hooks/Admin/Users/useRemoveUser";
const Spinner = lazy(() => import("../../../components/sections/Spinner"));

function ManageUsers() {
  const [showToast, setShowToast] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userId, setUserId] = useState(null);
  const pendingKeysRef = useRef(new Set());

  const {
    allUsers,
    allUsersError,
    allUsersLoading,
    isFetchingNextUser,
    loadMoreRef,
  } = useUsersList();
  const { editUserInputPattern } = useEditInputPattern();
  const { userCoursesData, userCoursesError, userCoursesLoading } =
    useUserCourses(userId);
  const { addUser, createUserLoading } = useCreateUser();
  const { editUser, editUserLoading } = useEditUser();
  const { banUser, banUserLoading } = useBanUser();
  const { removeUser, removeUserLoading } = useRemoveUser();
  const { tableDatas } = useTableDatas(allUsers);

  const actionPending = {
    remove: removeUserLoading,
    ban: banUserLoading,
  };

  useEffect(() => {
    alertSetter(setShowAlert);
    resgisterToastSetter(setShowToast);
    modalSetter(setShowModal);
    document.title = "مدیریت کاربران";
  }, []);

  const addPending = (userId, action) => {
    pendingKeysRef.current.add(`${userId}:${action}`);
  };
  const removePending = (userId, action) => {
    pendingKeysRef.current.delete(`${userId}:${action}`);
  };

  const actionHandler = async (infos) => {
    let { entityData: user, action: actionType } = infos;
    addPending(user.id, actionType);

    switch (actionType) {
      case "viewCourses": {
        setUserId(user.id);
        break;
      }
      case "edit": {
        const inputPatterns = editUserInputPattern(user);
        showModalHandler({
          inputPatterns,
          isEdit: true,
          isPending: editUserLoading,
          onAction: (data) => editUser(user.id, data),
          tableData: [],
          title: "ویرایش کاربر",
        });
        break;
      }

      case "ban": {
        const reqBody = {
          targetId: user.id,
          isBanned: !user.isBanned,
          targetType: "user",
        };

        await banUser(reqBody);
        removePending(user.id, actionType);
        break;
      }

      case "remove": {
        showAlertHandler({
          cancelText: "انصراف",
          confirmText: "حذف",
          icon: "warning",
          onConfirm: async () => {
            await removeUser(user.id);
            removePending(user.id, actionType);
          },
          title: "آیا از حذف اطمینان دارید ؟",
        });
        break;
      }
    }
  };

  useEffect(() => {
    if (userCoursesData) {
      const tableData = {
        thead: [{ id: "title", title: "دوره های خریداری شده" }],
        tbody: userCoursesData.courses.flatMap((course) => ({
          id: course.id,
          type: "text",
          text: course.title,
        })),
      };
      showModalHandler({
        inputPatterns: [],
        isEdit: false,
        isPending: false,
        onAction: () => {},
        title: "دوره های خریداری شده",
        tableData,
        onClose: () => {
          setUserId(null);
        },
      });
    }
  }, [userCoursesData, userId]);

  return (
    <>
      <div className="wrapper flex flex-col">
        <div className="add-teacher py-3 px-6 flex flex-col">
          {!allUsersLoading ? (
            <EditForm
              title={"ایجاد کاربر"}
              inputPatterns={BASE_CREATE_USER_INPUT_PATTERNS}
              isPending={createUserLoading}
              onAction={addUser}
            />
          ) : (
            <div className="flex justify-center items-center h-full w-full">
              <Spinner size="lg" />
            </div>
          )}
        </div>
        <div className="py-3 px-6">
          <Table
            thead={tableDatas.thead}
            tbody={tableDatas.tbody}
            scroll={true}
            actionPending={actionPending}
            onAction={actionHandler}
            isFetchingNextPage={isFetchingNextUser}
            loadMoreRef={loadMoreRef}
            pendingKeysRef={pendingKeysRef}
          />
        </div>
      </div>

      {showToast?.visible && <Toast {...showToast} />}
      {showAlert?.visible && <Alert {...showAlert} />}
      {showModal?.visible && <Modal {...showModal} />}
    </>
  );
}

export default ManageUsers;
