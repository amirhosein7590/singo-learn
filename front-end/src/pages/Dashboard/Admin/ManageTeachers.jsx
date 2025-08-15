import { lazy, memo, useEffect, useState } from "react";
import EditForm from "../../../components/sections/EditForm";
import useListCourses from "../../../hooks/Admin/Courses/useListCourses";
import useRegisterTeacher from "../../../hooks/Admin/Teachers/useRegisterTeacher";
import { useQueryClient } from "@tanstack/react-query";
import {
  resgisterToastSetter,
  showToastHandler,
} from "../../../utils/ToastController";
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
  }, []);

  const handleAction = (teacher, actionType) => {
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
        banTeacher(teacher.id, !teacher.isBanned);
        break;
      }
      case "remove": {
        showAlertHandler({
          cancelText: "انصراف",
          confirmText: "حذف",
          icon: "warning",
          onConfirm: () => removeTeacher(teacher.id),
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
          {!coursesLoading && (
            <EditForm
              title={"ایجاد مدرس"}
              inputPatterns={createTeacherInputPattern}
              isPending={registerTeacherLoading}
              onAction={registerTeacher}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            />
          )}
        </div>
        <div className="py-3 px-6">
          <Table
            thead={tableDatas.thead}
            tbody={tableDatas.tbody}
            scroll={true}
            onAction={handleAction}
            actionPending={actionPending}
            isFetchingNextPage={isFetchingNextTeacher}
            loadMoreRef={loadMoreRef}
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
