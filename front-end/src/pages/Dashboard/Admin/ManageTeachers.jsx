import { lazy, memo, useEffect, useState } from "react";
import EditForm from "../../../components/sections/EditForm";
import useListCourses from "../../../hooks/Admin/Courses/useListCourses";
import useRegisterTeacher from "../../../hooks/Admin/Teachers/useRegisterTeacher";
import { useQueryClient } from "@tanstack/react-query";
import {
  resgisterToastSetter,
  showToastHandler,
} from "../../../utils/ToastController";
import { alertSetter } from "../../../utils/AlertController";
import {modalSetter} from '../../../utils/ModalController'
import Table from "../../../components/sections/Table/Index";
import useTeachersList from "../../../hooks/Admin/Teachers/useTeachersList";
import createTeacherInputPattern from "../../../hooks/Admin/Teachers/Table/useCreateInputPattern";
import useTableDatas from "../../../hooks/Admin/Teachers/Table/useTableDatas";
import useCreateInputPattern from "../../../hooks/Admin/Teachers/Table/useCreateInputPattern";
const Toast = lazy(() => import("../../../components/sections/Toast"));
const Alert = lazy(() => import("../../../components/sections/Alert"));
const Modal = lazy(()=> import('../../../components/sections/Modal'))

function ManageTeachers() {
  const { courses, coursesError, coursesLoading } = useListCourses();
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showModal , setShowModal] = useState(false);

  const {
    registerTeacher,
    registerTeacherData,
    registerTeacherError,
    registerTeacherLoading,
  } = useRegisterTeacher(queryClient);
  const { allTeachersData, allTeachersError, allTeachersLoading } =
    useTeachersList();

  
  const { createTeacherInputPattern } = useCreateInputPattern(
    coursesLoading,
    courses
  );

  const { tableDatas } = useTableDatas(allTeachersData , courses);

  useEffect(() => {
    let error = registerTeacherError?.response.data.error;
    let successMessage = registerTeacherData?.message;
    if (error) {
      showToastHandler(error, "error");
    }
    if (successMessage) {
      showToastHandler(successMessage, "success");
    }
  }, [registerTeacherData, registerTeacherError]);

  useEffect(() => {
    resgisterToastSetter(setShowToast);
    alertSetter(setShowAlert);
    modalSetter(setShowModal)
  }, []);

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
            />
          )}
        </div>
        <div className="py-3 px-6">
          <Table thead={tableDatas.thead} tbody={tableDatas.tbody} scroll={true} />
        </div>
      </div>

      {showToast?.visible && <Toast {...showToast} />}
      {showAlert?.visible && <Alert {...showAlert} />}
      {showModal?.visible && <Modal {...showModal} />}
    </>
  );
}

export default memo(ManageTeachers);
