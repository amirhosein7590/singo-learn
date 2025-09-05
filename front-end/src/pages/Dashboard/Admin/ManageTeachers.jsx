/**
 * ManageTeachers Component
 * -------------------------
 * Admin dashboard page for managing teachers.  
 * Provides features to register, edit, ban/unban, view assigned courses, and remove teachers.  
 * Uses modular hooks, global controllers, and reusable UI components.
 *
 * @component
 * @returns {JSX.Element} Teachers management panel with:
 * - Teacher registration form
 * - Paginated & scrollable teachers table
 * - Modal for viewing courses or editing teacher info
 * - Alert for confirmation dialogs
 * - Toast for notifications
 *
 * @state
 * @property {Object} showToast - Controls toast notifications visibility and content.
 * @property {boolean} showModal - Controls modal visibility.
 * @property {boolean} showAlert - Controls alert visibility.
 *
 * @hooks
 * - useListCourses: Fetches courses list used for teacher registration.
 * - useRegisterTeacher: Registers new teachers and manages state.
 * - useTeachersList: Fetches all teachers with infinite scroll support.
 * - useRemoveTeacher: Deletes teacher accounts.
 * - useEditInputPattern: Generates input patterns for editing teacher info.
 * - useEditTeacher: Updates teacher profile data.
 * - useBanTeacher: Bans/unbans teachers from the system.
 * - useCreateInputPattern: Prepares form fields for teacher registration.
 * - useTableDatas: Generates structured data for teacher table.
 *
 * @functions
 * @function addPending(teacherId, action) - Tracks ongoing teacher actions.
 * @function removePending(teacherId, action) - Removes pending state when action completes.
 * @function actionHandler(infos) - Centralized action handler for teachers:
 *   - "viewCourses": Opens modal showing all teacher's courses.
 *   - "edit": Opens modal with editable teacher fields.
 *   - "ban": Toggles teacher’s banned state.
 *   - "remove": Opens confirmation alert before deletion.
 *
 * @effects
 * - Registers modal, toast, and alert setters with global controllers.
 * - Sets document title to "مدیریت مدرسان".
 */


import { lazy, memo, useEffect, useState, useRef } from "react";
import EditForm from "../../../components/sections/EditForm";
import useListCourses from "../../../hooks/Admin/Courses/useListCourses";
import useRegisterTeacher from "../../../hooks/Admin/Teachers/useRegisterTeacher";
import { useQueryClient } from "@tanstack/react-query";
import { resgisterToastSetter } from "../../../utils/ToastController";
import { alertSetter, showAlertHandler } from "../../../utils/AlertController";
import { modalSetter, showModalHandler } from "../../../utils/ModalController";
import Table from "../../../components/sections/Table/Index";
import useTeachersList from "../../../hooks/Admin/Teachers/useTeachersList";
import useTableDatas from "../../../hooks/Admin/Teachers/Table/useTableDatas";
import useCreateInputPattern from "../../../hooks/Admin/Teachers/Table/useCreateInputPattern";
const Toast = lazy(() => import("../../../components/sections/Toast"));
const Alert = lazy(() => import("../../../components/sections/Alert"));
const Modal = lazy(() => import("../../../components/sections/Modal"));
import useRemoveTeacher from "../../../hooks/Admin/Teachers/useRemoveTeacher";
import useEditInputPattern from "../../../hooks/Admin/Teachers/Table/useEditInputPattern";
import uesEditTeacher from "../../../hooks/Admin/Teachers/useEditTeacher";
import useBanTeacher from "../../../hooks/Admin/Teachers/useBanTeacher";
const Spinner = lazy(() => import("../../../components/sections/Spinner"));

function ManageTeachers() {
  const {
    courses,
    coursesError,
    coursesLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useListCourses(true);
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const pendingKeysRef = useRef(new Set());

  const { registerTeacher, registerTeacherLoading } =
    useRegisterTeacher(queryClient);

  const {
    allTeachersData,
    allTeachersError,
    allTeachersLoading,
    isFetchingNextTeacher,
    loadMoreRef,
  } = useTeachersList();

  const { removeTeacher, removeTeacherLoading } = useRemoveTeacher();
  const { editTeacherInputHandler } = useEditInputPattern();
  const { editTeacher, editTeacherPending } = uesEditTeacher();
  const { banTeacher, banTeacherLoading } = useBanTeacher();

  const { createTeacherInputPattern } = useCreateInputPattern(
    coursesLoading,
    courses
  );

  const { tableDatas } = useTableDatas(allTeachersData);

  useEffect(() => {
    resgisterToastSetter(setShowToast);
    alertSetter(setShowAlert);
    modalSetter(setShowModal);
    document.title = "مدیریت مدرسان";
  }, []);

  const addPending = (teacherId, action) => {
    pendingKeysRef.current.add(`${teacherId}:${action}`);
  };
  const removePending = (teacherId, action) => {
    pendingKeysRef.current.delete(`${teacherId}:${action}`);
  };

  const actionHandler = async (infos) => {
    let { entityData: teacher, action: actionType } = infos;
    addPending(teacher.id, actionType);

    switch (actionType) {
      case "viewCourses": {
        let tableData = {
          thead: [{ id: "title", title: "دوره های مدرس" }],
          tbody: teacher.courses.flatMap((course) => ({
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
          tableData,
          title: "دوره های مدرس",
        });
        break;
      }
      case "edit": {
        let inputPatterns = editTeacherInputHandler(teacher);
        showModalHandler({
          inputPatterns,
          isEdit: true,
          isPending: editTeacherPending,
          onAction: (data) => editTeacher(teacher.id, data),
          tableData: [],
          title: "ویرایش مدرس",
        });
        break;
      }
      case "ban": {
        await banTeacher(teacher.id, !teacher.isBanned);
        removePending(teacher.id, actionType);
        break;
      }
      case "remove": {
        showAlertHandler({
          cancelText: "انصراف",
          confirmText: "حذف",
          icon: "warning",
          onConfirm: async () => {
            await removeTeacher(teacher.id);
            removePending(teacher.id, actionType);
          },
          title: "آیا از حذف اطمینان دارید",
        });
        break;
      }
    }
  };

  const actionPending = {
    remove: registerTeacherLoading,
    ban: banTeacherLoading,
  };

  return (
    <>
      <div className="wrapper flex flex-col">
        <div className="add-teacher py-3 px-6 flex flex-col">
          {!coursesLoading ? (
            <EditForm
              title={"ایجاد مدرس"}
              inputPatterns={createTeacherInputPattern}
              isPending={registerTeacherLoading}
              onAction={registerTeacher}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
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
            onAction={actionHandler}
            actionPending={actionPending}
            isFetchingNextPage={isFetchingNextTeacher}
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

export default memo(ManageTeachers);
