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
          {!allUsersLoading && (
            <EditForm
              title={"ایجاد کاربر"}
              inputPatterns={BASE_CREATE_USER_INPUT_PATTERNS}
              isPending={createUserLoading}
              onAction={addUser}
            />
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
